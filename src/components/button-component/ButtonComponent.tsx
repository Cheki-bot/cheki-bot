interface ButtonComponentProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const ButtonComponent = ({
  children,
  onPress,
}: ButtonComponentProps) => {
  return (
    <button
      className="text-white py-2 px-4 rounded-[10px]"
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 207, 175), rgb(5, 150, 105))",
      }}
      onClick={onPress}
    >
      {children}
    </button>
  );
};
