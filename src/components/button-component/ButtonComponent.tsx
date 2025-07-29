interface ButtonComponentProps {
  children: React.ReactNode;
}

export const ButtonComponent = ({ children }: ButtonComponentProps) => {
  return (
    <button
      className="text-white py-2 px-4 rounded-[10px]"
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 207, 175), rgb(5, 150, 105))",
      }}
    >
      {children}
    </button>
  );
};
