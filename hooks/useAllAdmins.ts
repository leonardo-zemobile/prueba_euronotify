'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

export type Clients = {
    id: string; // uuid not null
    created_at: string; // timestamp with time zone not null
    first_name: string | null;
    email: string | null;
    last_name: string | null;
    is_company: boolean | null;
    company_name: string | null;
    vat_number: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state_province_region: string | null;
    postal_code: string | null;
    country: string | null;
    is_active: boolean | null;
    stripe_id: string | null;
    subscription_id: string | null;
    is_admin: boolean | null;
    permissions: string[] | null;
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// same pattern as useAllEntries
const PAGE = 1000;
const MAX_ROWS = 10_000;

export const useAdmins = () => {
    const [users, setUsers] = useState<Clients[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const all: Clients[] = [];

            for (let start = 0; start < MAX_ROWS; start += PAGE) {
                const end = start + PAGE - 1;

                const { data, error } = await supabase
                    .from('clients')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .filter('is_admin', 'eq', true)
                    .range(start, end);

                if (error) throw error;
                if (!data?.length) break;

                all.push(...(data as Clients[]));

                // if this page is not full, no more rows
                if (data.length < PAGE) break;
            }

            // de-dup by id (paranoia) + keep newest first
            const map = new Map<string, Clients>();
            for (const c of all) map.set(c.id, c);

            const ordered = [...map.values()].sort(
                (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
            );

            setUsers(ordered.slice(0, MAX_ROWS));
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Could not fetch users.');
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();

        const channel = supabase
            .channel('realtime-users')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'clients',
                },
                (payload) => {
                    console.log('clients change received!', payload);
                    if (payload.eventType === 'INSERT') {
                        setUsers((current) => {
                            const map = new Map<string, Clients>();
                            // new one first
                            map.set(payload.new.id, payload.new as Clients);
                            for (const c of current) map.set(c.id, c);
                            // keep sorted by created_at desc
                            return [...map.values()].sort(
                                (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
                            );
                        });
                    }
                    if (payload.eventType === 'UPDATE') {
                        setUsers((current) =>
                            current.map((c) =>
                                c.id === payload.new.id ? (payload.new as Clients) : c
                            )
                        );
                    }
                    if (payload.eventType === 'DELETE') {
                        setUsers((current) =>
                            current.filter((c) => c.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { users, isLoading, mutate: fetchClients };
};
