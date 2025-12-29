"use client";

import React from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { DashboardSubNavbar } from "@/components/dashboard/DashboardSubNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      <DashboardSubNavbar />
      <main className="flex-1 container-custom py-8">{children}</main>
    </div>
  );
}
