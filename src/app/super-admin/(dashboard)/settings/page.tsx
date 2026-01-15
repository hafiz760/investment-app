"use client";

import React from "react";
import {
  Settings as SettingsIcon,
  ShieldIcon,
  Bell,
  Globe,
  User,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AdminSettingsPage() {
  const settingsSections = [
    {
      title: "General",
      desc: "Global app title, logo and metadata",
      icon: Globe,
    },
    {
      title: "Notifications",
      desc: "Configure admin alert preferences",
      icon: Bell,
    },
    {
      title: "Security",
      desc: "Admin credentials and MFA settings",
      icon: ShieldIcon,
    },
    {
      title: "Administration",
      desc: "Role permissions and audit logs",
      icon: User,
    },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-gray-400 mt-1">
            Configure application rules and management preferences.
          </p>
        </div>
        <Button className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold rounded-xl h-11 px-6">
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.title}
              className="bg-[#0F1C2E]/60 border-[#D4AF37]/20 backdrop-blur-xl shadow-2xl rounded-3xl group hover:border-[#D4AF37]/40 transition-colors"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-3 bg-[#D4AF37]/10 rounded-2xl group-hover:bg-[#D4AF37] transition-colors group-hover:text-[#0F1C2E] text-[#D4AF37]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-xs mt-0.5">
                    {section.desc}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-24 flex items-center justify-center border-t border-white/5 mt-4">
                  <p className="text-xs text-gray-600 italic">
                    Configuration inputs for {section.title.toLowerCase()} will
                    be placed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
