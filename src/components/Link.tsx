const classNames = {
  primary:
    "block w-full bg-slate-600 py-4 hover:bg-slate-500 text-white text-lg tracking-wide border-r-8 border-slate-500 text-center hover:text-slate-100",
  secondary:
    "block w-full bg-slate-100 py-4 text-slate-600 text-lg tracking-wide border-4 border-slate-600 text-center hover:border-slate-500 hover:text-slate-500",
  tertiary:
    "block w-full bg-slate-100 py-4 text-slate-600 text-lg tracking-wide border-4 border-slate-600 text-center hover:border-slate-500 hover:text-slate-500",
  card: "border-2 border-slate-200 bg-slate-100 p-6 shadow-md block",
  default: "",
};

import { default as NextLink, LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  variant?: keyof typeof classNames;
  className?: string;
}

export function Link({
  children,
  variant,
  className,
  ...attributes
}: LinkProps) {
  return (
    <NextLink
      className={`${classNames[variant ?? "default"]} ${className ?? ""}`}
      {...attributes}
    >
      {children}
    </NextLink>
  );
}
