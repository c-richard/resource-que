interface FormProps extends React.ComponentPropsWithoutRef<"form"> {
  children: React.ReactNode;
}

export function Form({ children, ...attributes }: FormProps) {
  return (
    <form
      className="my-2 border-2 border-gray-200 bg-gray-100 p-8 px-6 shadow-md"
      {...attributes}
    >
      {children}
    </form>
  );
}
