"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { AuthGuard } from "@/components/common/AuthGuard";
import { Role } from "@/lib/types/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard requiredRole={Role.ADMIN}>
      <div className="h-screen bg-[#020617] flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminNavbar
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
