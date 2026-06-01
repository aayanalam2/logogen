"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender/50 disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 active:scale-[0.99]",
    secondary:
      "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.99]",
    ghost:
      "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 active:scale-[0.99]",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
