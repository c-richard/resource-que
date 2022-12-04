import {
  UseFormRegister,
  FieldValues,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: UseFormRegister<FieldValues>;
}

export const Input = ({ name, error, register, ...props }: InputProps) => {
  return (
    <label className="block">
      <input
        className="border-2 border-solid border-black"
        {...props}
        {...register(name)}
      />
      {typeof error === "string" && <p>{error}</p>}
    </label>
  );
};
