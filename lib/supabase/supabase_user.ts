import { createClient } from "./supabase_browser"


const supabase = await createClient()

export default async function getUser() {

    const { data: { user } } = await supabase.auth.getUser()
    return user
}