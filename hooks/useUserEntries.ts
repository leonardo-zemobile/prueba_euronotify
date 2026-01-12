'use client'
import { useState, useEffect, useCallback } from 'react'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useAuth } from '@/context/auth-context'
import { createClient } from '@/lib/supabase/supabase_browser'
//import { Entry } from '@/types/supabase_types'

const supabase = createClient()

// Define the hook's return type
interface UseUserEntriesReturn {
    entries: any[] //todo: for now then Entry[]
    loading: boolean
    error: Error | null
    refetch: () => Promise<void>
}

export function useUserEntries(): UseUserEntriesReturn {
    const { user } = useAuth()

    //const [entries, setEntries] = useState<Entry[]>([]) todo change Entry
    const [entries, setEntries] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchEntries = useCallback(async () => {
        if (!user?.id) {
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const { data, error: dbError } = await supabase
                .from('entries')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (dbError) {
                throw dbError
            }

            setEntries(data || [])
        } catch (e) {
            setError(e as Error)
        } finally {
            setLoading(false)
        }
    }, [user?.id])

    useEffect(() => {
        if (user?.id) {
            fetchEntries()
        } else {
            setEntries([])
            setLoading(false)
        }
    }, [user?.id, fetchEntries])

    useEffect(() => {
        if (!user?.id) {
            return
        }

        const channel = supabase
            .channel(`public:entries:user_id=${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'entries',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Realtime change received!', payload)
                    fetchEntries()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, user?.id, fetchEntries])

    return { entries, loading, error, refetch: fetchEntries }
}