"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

const notificationTypes = [
  {
    id: 1,
    type: "Add Balance",
    email: true,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 2,
    type: "KYC Approved Successfully",
    email: false,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 3,
    type: "KYC Rejected Successfully",
    email: false,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 4,
    type: "Admin Replied Ticket",
    email: false,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 5,
    type: "Balance deducted by Admin",
    email: false,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 6,
    type: "Withdraw Request",
    email: true,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 7,
    type: "Two-Factor Authentication",
    email: true,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 8,
    type: "Password Reset",
    email: true,
    sms: true,
    push: true,
    inApp: true,
  },
  {
    id: 9,
    type: "Account Verification",
    email: true,
    sms: true,
    push: true,
    inApp: true,
  },
];

export default function NotificationPermissionPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">
            Notification Permission
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Notification Permission
        </h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20"
          >
            <CheckCircle2 className="h-4 w-4" />
            Check All
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">TYPE</TableHead>
              <TableHead className="text-center text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" /> EMAIL
                </div>
              </TableHead>
              <TableHead className="text-center text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" /> SMS
                </div>
              </TableHead>
              <TableHead className="text-center text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <Bell className="h-4 w-4" /> PUSH
                </div>
              </TableHead>
              <TableHead className="text-center text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <Smartphone className="h-4 w-4" /> IN APP
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationTypes.map((row) => (
              <TableRow
                key={row.id}
                className="border-white/5 hover:bg-white/5 text-white"
              >
                <TableCell className="font-medium text-gray-200">
                  {row.type}
                </TableCell>
                <TableCell className="text-center">
                  <Switch defaultChecked={row.email} />
                </TableCell>
                <TableCell className="text-center">
                  <Switch defaultChecked={row.sms} />
                </TableCell>
                <TableCell className="text-center">
                  <Switch defaultChecked={row.push} />
                </TableCell>
                <TableCell className="text-center">
                  <Switch defaultChecked={row.inApp} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
