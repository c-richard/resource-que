interface FormProps extends React.ComponentPropsWithoutRef<"form"> {
  children: React.ReactNode;
}

export function Form({ children, ...attributes }: FormProps) {
  return (
    <form className="my-4" {...attributes}>
      {children}
    </form>
  );
}
