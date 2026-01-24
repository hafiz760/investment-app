"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { Role } from "@/lib/types/auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: Role;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Role-based access control
    if (requiredRole) {
      const isSuperAdmin = user?.roleName === "Super Admin";
      const isAdmin = user?.roleName === "Admin";
      const isUser = user?.roleName === "User";

      if (requiredRole === Role.ADMIN && !isAdmin && !isSuperAdmin) {
        if (isUser) {
          router.push("/user/dashboard");
        } else {
          router.push("/");
        }
        return;
      }

      if (requiredRole === Role.SUPER_ADMIN && !isSuperAdmin) {
        if (isAdmin) {
          router.push("/admin");
        } else if (isUser) {
          router.push("/user/dashboard");
        } else {
          router.push("/");
        }
        return;
      }

      if (requiredRole === Role.USER && !isUser) {
        if (isSuperAdmin) {
          router.push("/super-admin");
        } else if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
        return;
      }
    }

    setIsAuthorized(true);
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4 text-[#D4AF37]">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-sm font-medium animate-pulse">
          Checking authorization...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
