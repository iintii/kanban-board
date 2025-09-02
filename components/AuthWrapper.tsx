"use client";
import { useAuthenticationStatus, useUserData } from "@nhost/nextjs";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { nhost } from "@/lib/nhost";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = useUserData();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR or before mount
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Show the protected content if authenticated
  return (
    <div>
      <div className="p-4 border-b bg-muted/30">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.email}
          </span>
          <button
            onClick={() => nhost.auth.signOut()}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Logout
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}