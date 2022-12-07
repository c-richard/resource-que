interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

export function Button({ children, ...attributes }: ButtonProps) {
  return (
    <button className="text-leftbg-gray-300 w-full bg-gray-300" {...attributes}>
      {children}
    </button>
  );
}
