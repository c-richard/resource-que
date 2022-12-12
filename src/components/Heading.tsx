interface HeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  children: React.ReactNode;
}

export function Heading({ children, className, ...attributes }: HeadingProps) {
  return (
    <div className={className}>
      <h1
        className={`mt-16 flex items-end justify-between text-xl tracking-wide text-slate-600`}
        {...attributes}
      >
        {children}
      </h1>
      <hr className="mt-1 border-0 border-b-2 border-slate-200" />
    </div>
  );
}
