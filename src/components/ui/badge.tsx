import * as React from "react";
import { badgeVariants, BadgeVariants } from "./variants/badgeVariants";

import { cn } from "@/lib/utils";


export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, BadgeVariants {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
