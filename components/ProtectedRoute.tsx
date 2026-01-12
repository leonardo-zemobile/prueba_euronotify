"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

interface ProtectedRouteProps {
    children: React.ReactNode;
    lang?: string;
    dictionary?: Record<string, any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, lang, dictionary }) => {
    const { user, profile, loading, refreshPublicUser, logOut } = useAuth();
    const router = useRouter();

    if (loading) return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-gray-200" />
        </div>

    )

    useEffect(() => {
        if (loading) return;

        if (!user?.id) {
            router.push('/auth/login');
            return;
        }

        if (!profile) {
            router.push('/auth/login');
            return
        };

        if (profile && !profile.is_active) {
            logOut()
            router.push('/auth/login');
            return
        };


    }, [user, profile, loading, router]);


    return <>{children}</>;
};

export default ProtectedRoute;
