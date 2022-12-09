interface HeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  children: React.ReactNode;
}

export function Heading({ children, ...attributes }: HeadingProps) {
  return (
    <h1
      className="mx-4 text-base tracking-wide tracking-wider text-gray-500"
      {...attributes}
    >
      {children}
    </h1>
  );
}
