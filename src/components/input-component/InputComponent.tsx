interface InputComponentProps {
  placeholder?: string;
  alt?: string;
}
export const InputComponent = ({ placeholder, alt }: InputComponentProps) => {
  return <input placeholder={placeholder} alt={alt} className="border border-gray-300 p-2 rounded-md w-full" />;
};
