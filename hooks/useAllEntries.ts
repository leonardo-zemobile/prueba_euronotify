'use client'
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
//import { any } from '@/types/supabase_types';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const PAGE = 1000;
const MAX_ROWS = 10_000;

export const useAllEntries = () => {
    const [entries, setEntries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEntries = useCallback(async () => {
        setIsLoading(true);
        try {
            const all: any[] = [];

            for (let start = 0; start < MAX_ROWS; start += PAGE) {
                const end = start + PAGE - 1;

                const { data, error } = await supabase
                    .from('entries')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .range(start, end);

                if (error) throw error;
                if (!data?.length) break;

                all.push(...(data as any[]));
                if (data.length < PAGE) break;
            }

            const map = new Map<number, any>();
            for (const r of all) map.set(r.id, r);

            const ordered = [...map.values()].sort(
                (a, b) =>
                    (b.created_at ? +new Date(b.created_at) : 0) -
                    (a.created_at ? +new Date(a.created_at) : 0)
            );

            setEntries(ordered.slice(0, MAX_ROWS));
        } catch (error) {
            console.error('Error fetching entries:', error);
            toast.error('Could not fetch entries.');
            setEntries([]);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {

        // 1. Initial fetch
        fetchEntries();

        // 2. Set up real-time subscription with unique channel name
        const channel = supabase
            .channel(`realtime-entries-${Date.now()}`) // Unique channel
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'entries',
                },
                (payload) => {

                    if (payload.eventType === 'INSERT') {
                        const newEntry = payload.new as any;
                        setEntries((current) => {
                            // Prevent duplicates
                            if (current.some(e => e.id === newEntry.id)) {
                                return current;
                            }
                            return [newEntry, ...current];
                        });
                    }

                    if (payload.eventType === 'UPDATE') {
                        const updatedEntry = payload.new as any;
                        setEntries((current) => {
                            const found = current.find(e => e.id === updatedEntry.id);
                            if (!found) {
                                return current;
                            }
                            return current.map((n) =>
                                n.id === updatedEntry.id ? updatedEntry : n
                            );
                        });
                    }

                    if (payload.eventType === 'DELETE') {
                        const oldEntry = payload.old as any;
                        setEntries((current) => {
                            const filtered = current.filter((n) => n.id !== oldEntry.id);
                            return filtered;
                        });
                    }
                }
            )
            .subscribe((status, err) => {
                if (err) {
                    console.error('❌ Subscription error:', err);
                    //toast.error('Realtime connection failed');
                }
                if (status === 'SUBSCRIBED') {
                }
                if (status === 'CHANNEL_ERROR') {
                    //toast.error('Realtime channel error');
                }
                if (status === 'TIMED_OUT') {
                    console.error('⏱ Subscription timed out');
                    //toast.error('Realtime connection timed out');
                }
            });

        // 3. Cleanup
        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchEntries]); // Include fetchEntries as dependency

    return { entries, isLoading, mutate: fetchEntries };
};