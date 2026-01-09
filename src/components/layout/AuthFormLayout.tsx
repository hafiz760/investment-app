"use client";

import React from "react";
import Link from "next/link";

interface AuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthFormLayout({
  children,
  title,
  subtitle,
}: AuthFormLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%]  bg-[#D4AF37]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-30%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" />
      <div className="max-w-md w-full relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight py-2">
            {title}
          </h2>
          <p className="text-sm text-gray-400 py-2">{subtitle}</p>
        </div>

        <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 p-8 rounded-3xl shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
