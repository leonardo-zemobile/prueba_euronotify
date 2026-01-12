'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
//import { any } from '@/types/supabase_types';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);


const PAGE = 1000;
const MAX_ROWS = 10_000;

export const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchSubscriptions = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const all: any[] = [];

            for (let start = 0; start < MAX_ROWS; start += PAGE) {
                const end = start + PAGE - 1;

                const { data, error } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .order('created', { ascending: false })
                    .range(start, end);             // fetch a slice

                if (error) throw error;
                if (!data?.length) break;

                all.push(...(data as any[]));
                if (data.length < PAGE) break;    // no more pages
            }

            // de-dup (paranoid) + keep newest first
            const map = new Map<string, any>();
            for (const r of all) map.set(r.id, r);
            const ordered = [...map.values()].sort((a, b) =>
                (b.created ? +new Date(b.created) : 0) - (a.created ? +new Date(a.created) : 0)
            );

            setSubscriptions(ordered.slice(0, MAX_ROWS));
        } catch (err) {
            console.error('Error fetching subscriptions:', err);
            setSubscriptions([]);
            setError((err as Error).message);
            toast.error('Could not fetch subscriptions.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Don't fetch or subscribe if there's no customer ID
        fetchSubscriptions();

        // 2. Set up real-time subscription for this user's entries
        const channel = supabase
            .channel(`realtime-subscriptions`)
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen for all events
                    schema: 'public',
                    table: 'subscriptions',
                },
                (payload) => {
                    console.log('Entries change received!', payload);
                    if (payload.eventType === 'INSERT') {
                        setSubscriptions((current) => [payload.new as any, ...current]);
                    }
                    if (payload.eventType === 'UPDATE') {
                        setSubscriptions((current) =>
                            current.map((n) => (n.id === (payload.new as any).id ? payload.new as any : n))
                        );
                    }
                    if (payload.eventType === 'DELETE') {
                        setSubscriptions((current) =>
                            current.filter((n) => n.id !== (payload.old as any).id)
                        );
                    }
                }
            )
            .subscribe();

        // 3. Cleanup subscription on unmount or if customerId changes
        return () => {
            supabase.removeChannel(channel);
        };
    }, []); // Re-run effect if customerId changes

    return { subscriptions, isLoading, mutate: fetchSubscriptions, error };
};
