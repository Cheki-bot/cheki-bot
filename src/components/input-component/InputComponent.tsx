interface InputComponentProps {
  placeholder?: string;
  alt?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
export const InputComponent = ({ placeholder, alt, onChange, value }: InputComponentProps) => {
  return <input placeholder={placeholder} alt={alt} className="border border-gray-300 p-2 rounded-md w-full" onChange={onChange} value={value} />;
};
