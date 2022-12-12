import {
  UseFormRegister,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: UseFormRegister<any>;
}

export const Input = ({ name, error, register, ...props }: InputProps) => {
  return (
    <>
      <input
        className="mb-4 w-full bg-slate-100 px-6 py-4 tracking-wide text-slate-800 placeholder-slate-400"
        {...props}
        {...register(name)}
      />
      {typeof error === "string" && <p>{error}</p>}
    </>
  );
};
