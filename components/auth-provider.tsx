"use client";

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!session?.user;
  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';

  useEffect(() => {
    // Don't do anything while session is loading
    if (isPending) return;

    // If user is authenticated but on auth pages, redirect to dashboard
    if (isAuthenticated && isAuthRoute) {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, isAuthRoute, router, isPending]);

  return (
    <AuthContext.Provider 
      value={{
        isLoading: isPending,
        isAuthenticated,
        user: session?.user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}