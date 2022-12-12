const classNames = {
  primary:
    "w-full bg-slate-600 py-4 hover:bg-slate-500 text-white text-lg tracking-wide border-r-8 border-slate-500",
  tertiary:
    "block w-full py-4 text-slate-600 text-lg tracking-wide text-center hover:text-slate-500 underline",
  secondary:
    "block w-full py-4 text-slate-600 text-lg tracking-wide border-2 border-slate-600 text-center hover:border-slate-500 hover:text-slate-500",
  small:
    "block py-1 px-4 text-slate-900 text-base tracking-wide border-2 border-slate-500 text-center hover:border-slate-500 hover:text-slate-500",
  card: "my-2 border-2 border-slate-200 bg-slate-100 p-8 px-6 shadow-md",
  default: "",
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  variant?: keyof typeof classNames;
}

export function Button({
  children,
  variant,
  className,
  ...attributes
}: ButtonProps) {
  return (
    <button
      className={`${classNames[variant ?? "default"]} ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
}
