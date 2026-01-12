"use client";

import React from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { DashboardSubNavbar } from "@/components/dashboard/DashboardSubNavbar";
import { AuthGuard } from "@/components/common/AuthGuard";
import { Role } from "@/lib/types/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole={Role.USER}>
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <DashboardSubNavbar />
        <main className="flex-1 container-custom py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
