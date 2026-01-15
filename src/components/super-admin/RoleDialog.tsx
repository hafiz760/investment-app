"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ApiRole, Permission } from "@/lib/types/auth";
import { useCreateRole, useUpdateRole } from "@/lib/hooks/useRoles";
import { useForm, useFieldArray } from "react-hook-form";

interface RoleFormValues {
  name: string;
  permissions: {
    moduleName: string;
    read: boolean;
    write: boolean;
    update: boolean;
    delete: boolean;
  }[];
}

const DEFAULT_MODULES = ["User", "Role", "Investment", "Payment", "Setting"];

export function RoleDialog({
  open,
  onOpenChange,
  role,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: ApiRole | null;
}) {
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const { register, control, handleSubmit, reset, setValue } = useForm<RoleFormValues>({
    defaultValues: {
      name: "",
      permissions: DEFAULT_MODULES.map((m) => ({
        moduleName: m,
        read: false,
        write: false,
        update: false,
        delete: false,
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "permissions",
  });

  useEffect(() => {
    if (role) {
      reset({
        name: role.name,
        permissions: DEFAULT_MODULES.map((m) => {
          const existing = role.permissions.find((p) => p.moduleName === m);
          return existing
            ? {
                moduleName: m,
                read: existing.read,
                write: existing.write,
                update: existing.update,
                delete: existing.delete,
              }
            : {
                moduleName: m,
                read: false,
                write: false,
                update: false,
                delete: false,
              };
        }),
      });
    } else {
      reset({
        name: "",
        permissions: DEFAULT_MODULES.map((m) => ({
          moduleName: m,
          read: false,
          write: false,
          update: false,
          delete: false,
        })),
      });
    }
  }, [role, reset, open]);

  const onSubmit = async (values: RoleFormValues) => {
    try {
      if (role) {
        await updateMutation.mutateAsync({ id: role.id, payload: values });
      } else {
        await createMutation.mutateAsync(values);
      }
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0F1C2E] border-[#D4AF37]/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#D4AF37]">
            {role ? "Edit Role" : "Create New Role"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              placeholder="e.g. Manager"
            />
          </div>

          <div className="space-y-4">
            <Label>Module Permissions</Label>
            <div className="border border-[#D4AF37]/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Module</th>
                    <th className="py-3 px-2 font-medium">Read</th>
                    <th className="py-3 px-2 font-medium">Write</th>
                    <th className="py-3 px-2 font-medium">Update</th>
                    <th className="py-3 px-2 font-medium">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {fields.map((field, index) => (
                    <tr key={field.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-white">
                        {field.moduleName}
                        <input type="hidden" {...register(`permissions.${index}.moduleName`)} />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Switch
                          className="data-[state=checked]:bg-[#D4AF37]"
                          onCheckedChange={(checked) => setValue(`permissions.${index}.read`, !!checked)}
                          defaultChecked={field.read}
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Switch
                          className="data-[state=checked]:bg-[#D4AF37]"
                          onCheckedChange={(checked) => setValue(`permissions.${index}.write`, !!checked)}
                          defaultChecked={field.write}
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Switch
                          className="data-[state=checked]:bg-[#D4AF37]"
                          onCheckedChange={(checked) => setValue(`permissions.${index}.update`, !!checked)}
                          defaultChecked={field.update}
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Switch
                          className="data-[state=checked]:bg-[#D4AF37]"
                          onCheckedChange={(checked) => setValue(`permissions.${index}.delete`, !!checked)}
                          defaultChecked={field.delete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold px-8"
            >
              {role ? "Update Role" : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
