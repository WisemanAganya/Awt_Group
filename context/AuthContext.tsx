import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                checkUserRole(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                checkUserRole(session.user.id);
            } else {
                setLoading(false);
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkUserRole = async (userId: string) => {
        try {
            // STRICT ADMIN ENFORCEMENT
            // Only 'aganyawiseman@gmail.com' is allowed.
            const { data: { user } } = await supabase.auth.getUser();

            if (user?.email === 'aganyawiseman@gmail.com') {
                setIsAdmin(true);
            } else {
                // If not the admin, strictly deny access and sign out
                setIsAdmin(false);
                await supabase.auth.signOut();
                alert("ACCESS DENIED: This system is for the Administrator only.");
                window.location.href = '/'; // Force redirect
            }

            setLoading(false);
        } catch (error) {
            console.error("Error checking role:", error);
            setLoading(false);
            // Default to deny on error
            setIsAdmin(false);
            await supabase.auth.signOut();
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
