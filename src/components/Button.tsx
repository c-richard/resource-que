const classNames = {
  primary:
    "w-full bg-gray-600 py-4 hover:bg-gray-500 text-white text-lg tracking-wide border-r-8 border-gray-500",
  default: "",
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  variant?: keyof typeof classNames;
}

export function Button({ children, variant, ...attributes }: ButtonProps) {
  return (
    <button className={classNames[variant ?? "default"]} {...attributes}>
      {children}
    </button>
  );
}
