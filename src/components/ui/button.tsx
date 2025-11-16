"use client";

import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles = {
  primary:
    "bg-emerald-500 text-white shadow-sm hover:bg-emerald-400 focus-visible:outline-emerald-500",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/15 focus-visible:outline-white",
  ghost:
    "bg-transparent text-foreground hover:bg-foreground/5 focus-visible:outline-foreground/40",
};

const sizeStyles = {
  default: "h-11",
  lg: "h-12 text-base px-6",
  sm: "h-9 text-xs px-4",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", asChild, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
