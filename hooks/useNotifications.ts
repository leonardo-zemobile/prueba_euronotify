'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Define the Notification type based on your new table schema
export type Notification = {
    id: string;
    created_at: string;
    type: string | null;
    body: string | null;
    link: string | null;
    read: boolean | null;
    expires_at: string | null;
    project_id: string | null;
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

/**
 * Custom hook to fetch and listen for real-time updates on the 'notifications' table.
 * @param projectId The ID of the project to fetch notifications for.
 * @returns An object containing the list of notifications and a loading state.
 */
export const useNotifications = (projectId: string | null) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Fetch initial notifications
    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            //console.log("notifications: ", data)
            setNotifications(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching initial notifications:', error);
            toast.error('Could not fetch notifications.');
            setNotifications([]); // <-- this is critical
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Don't run if there is no projectId
        if (!projectId) {
            setIsLoading(false);
            setNotifications([]);
            return;
        }

        fetchNotifications();

        // 2. Set up real-time subscription
        const channel = supabase
            .channel(`realtime-notifications-${projectId}`)
            .on<Notification>(
                'postgres_changes',
                {
                    event: '*', // Listen for all events
                    schema: 'public',
                    table: 'notifications',
                    filter: `project_id=eq.${projectId}`, // Filter by project_id
                },
                (payload) => {
                    console.log('Notification change received!', payload);
                    if (payload.eventType === 'INSERT') {
                        setNotifications((current) => [payload.new, ...current]);
                    }
                    if (payload.eventType === 'UPDATE') {
                        setNotifications((current) =>
                            current.map((n) => (n.id === payload.new.id ? payload.new : n))
                        );
                    }
                    if (payload.eventType === 'DELETE') {
                        setNotifications((current) =>
                            current.filter((n) => n.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        // 3. Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, [projectId]); // Re-run if projectId changes

    return { notifications, isLoading, mutate: fetchNotifications };
};
