'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { updateRow } from '@/lib/supabase/supabase_helper';
import { createClient } from '@/lib/supabase/supabase_browser';
import { User } from '@supabase/supabase-js';

const supabase = createClient();

function splitName(fullName: string) {
    if (!fullName) return { first_name: '', last_name: '' };
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return { first_name: parts[0], last_name: '' };
    const last_name = parts.pop()!;
    const first_name = parts.join(' ');
    return { first_name, last_name };
}

function generatePassword(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let pwd = '';
    for (let i = 0; i < length; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
}


// Define the structure for AuthContext
interface AuthContextType {
    user: User | null;
    profile: any; // Consider creating a specific type for your profile
    login: (email: string, password: string) => Promise<any>;
    logOut: () => Promise<void>;
    register: (email: string, fullname: string) => Promise<any>;
    changePassword: (newPassword: string) => Promise<void>;
    loading: boolean;
    refreshPublicUser: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any>(null);
    // The loading state is true until the first auth check is complete.
    const [loading, setLoading] = useState(true);
    

    const router = useRouter();

    const fetchProfile = async (id: string) => {
        const { data, error } = await supabase
            .from('clients')
            .select(`*`)
            .eq('id', id)
            .single(); // .single() is more efficient if you expect only one row

        if (error) {
            console.error('Error fetching profile:', error.message);
            setProfile(null);
        } else {
            setProfile(data);
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const { data: sessionData } = await supabase.auth.getSession();
            const supabaseUser = sessionData?.session?.user;
            //console.log("session data ", sessionData)
            if (supabaseUser) {
                setUser(supabaseUser);
                await fetchProfile(supabaseUser.id!);
            }
            setLoading(false);
        };
        init();

        const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
            const u = session?.user || null;
            setUser(u);
            if (u?.id) fetchProfile(u.id);
        });
        return () => sub?.subscription.unsubscribe();
    }, []);



    const refreshPublicUser = async () => {
        if (user?.id) {
            await fetchProfile(user.id);
        }
    };

    const login = async (email: string, password: string): Promise<any> => {
        // onAuthStateChange will handle setting user and profile automatically.
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return { success: false, error, user: null };
        }
        return { success: true, user: data.user };
    };


    const logOut = async (): Promise<void> => {
        await supabase.auth.signOut();
        // onAuthStateChange will clear user and profile.
        //setUser(null);
        //setProfile(null);
        router.push('/auth/login');
    };

    const register = async (email: string, fullname: string): Promise<any> => {
        // First, check if a user with this email already exists in auth
        const { data: existingUserCheck } = await supabase
            .from('clients')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUserCheck) {
             return { success: false, error: { message: "A user with this email already exists." }, user: null };
        }
        
        // 1. Sign up the new user in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password: generatePassword(), //or can pass password from client
            options: {
                data: { full_name: fullname },
            },
        });

        if (error) {
            console.error("Registration error:", error);
            return { success: false, error, user: null };
        }
        
        // The onAuthStateChange listener will handle setting the user,
        // but we can proceed to create the profile immediately.
        if (data.user) {
            // 2. Create the corresponding profile in the 'profiles' table
            const { error: newProfileError } = await supabase
                .from('clients')
                .insert({
                    id: data.user.id, // Link to the auth user
                    email: email,
                    full_name: fullname,
                });

            if (newProfileError) {
                console.error('Error creating new profile:', newProfileError);
                // Even if profile creation fails, the auth user was created.
                // The user might need to log out and log in again.
                return { success: false, error: newProfileError, user: data.user };
            }
        }

        
        return { success: true, user: data.user };
    };

    const loginWithGoogle = async (): Promise<void> => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // This URL should point to your server-side callback route.
                // It must be in your Supabase URL configuration.
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error("Error logging in with Google:", error.message);
            // You could add user-facing error handling here, like a toast notification.
        }
    };


    const changePassword = async (newPassword: string): Promise<void> => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
            console.error("Password change error:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            const { data: sessionData, error } = await supabase.auth.getSession();
            const supabaseUser = sessionData?.session?.user;

            if (error || !supabaseUser) {
                setUser(null);
                setProfile(null);
                return;
            }

            setUser(supabaseUser);

            if (supabaseUser?.id) {
                await fetchProfile(supabaseUser.id);
            }
        };

        getUserData();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user || null;
            setUser(currentUser);

            if (currentUser?.id) {
                fetchProfile(currentUser.id);
            }
        });

        return () => subscription?.subscription.unsubscribe();
    }, []);


    const contextValue: AuthContextType = {
        user,
        profile,
        login,
        logOut,
        register,
        changePassword,
        loading,
        refreshPublicUser,
        loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {/* We don't render children until the initial auth check is done. */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
