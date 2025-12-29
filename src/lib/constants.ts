import type { LucideIcon } from "lucide-react";
import {
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
  CoinsIcon,
} from "lucide-react";

export interface RouteConfig {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const ROUTES: readonly RouteConfig[] = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "/credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "/billing",
    label: "Billing",
    icon: CoinsIcon,
  },
] as const;

export const APP_NAME = "Plouton AI" as const;
export const APP_DESCRIPTION =
  "AI-native infrastructure built for velocity and precision" as const;
