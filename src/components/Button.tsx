interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

export function Button({ children, ...attributes }: ButtonProps) {
  return <button {...attributes}>{children}</button>;
}
