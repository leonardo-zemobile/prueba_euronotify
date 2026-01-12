'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
//import { any } from '@/types/supabase_types';


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const useEntries = (customerId: string | null) => {
    const [entries, setEntries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Fetch initial entries for the specific customer
    const fetchEntries = async () => {
        if (!customerId) {
            setEntries([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('entries')
                .select('*')
                .eq('user_id', customerId) // Filter by the customer's ID
                .order('created_at', { ascending: false });

            if (error) throw error;

            setEntries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching entries:', error);
            toast.error('Could not fetch entries.');
            setEntries([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Don't fetch or subscribe if there's no customer ID
        if (!customerId) {
            setEntries([]);
            setIsLoading(false);
            return;
        }

        fetchEntries();

        // 2. Set up real-time subscription for this user's entries
        const channel = supabase
            .channel(`realtime-entries:${customerId}`)
            .on<any>(
                'postgres_changes',
                {
                    event: '*', // Listen for all events
                    schema: 'public',
                    table: 'entries',
                    filter: `user_id=eq.${customerId}` // Only get changes for this user
                },
                (payload) => {
                    console.log('Entries change received!', payload);
                    if (payload.eventType === 'INSERT') {
                        setEntries((current) => [payload.new as any, ...current]);
                    }
                    if (payload.eventType === 'UPDATE') {
                        setEntries((current) =>
                            current.map((n) => (n.id === (payload.new as any).id ? payload.new as any : n))
                        );
                    }
                    if (payload.eventType === 'DELETE') {
                        setEntries((current) =>
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
    }, [customerId]); // Re-run effect if customerId changes

    return { entries, isLoading, mutate: fetchEntries };
};
