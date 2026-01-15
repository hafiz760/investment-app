"use client";

import React, { useState } from "react";
import { SuperAdminSidebar } from "@/components/super-admin/SuperAdminSidebar";
import { SuperAdminNavbar } from "@/components/super-admin/SuperAdminNavbar";
import { AuthGuard } from "@/components/common/AuthGuard";
import { Role } from "@/lib/types/auth";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard requiredRole={Role.SUPER_ADMIN}>
      <div className="h-screen bg-[#020617] flex overflow-hidden">
        {/* Sidebar */}
        <SuperAdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <SuperAdminNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
            <div className="max-w-[1600px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
