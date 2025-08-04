interface ButtonComponentProps {
    children: React.ReactNode;
    onPress?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const ButtonComponent = ({
    children,
    onPress,
    type = 'button',
    disabled = false,
}: ButtonComponentProps) => {
    return (
        <button
            style={
                disabled
                    ? { cursor: 'not-allowed' }
                    : {
                          background:
                              'linear-gradient(135deg, rgb(0, 207, 175), rgb(5, 150, 105))',
                      }
            }
            className={` py-2 px-4 rounded-[10px] ${disabled ? 'cursor-not-allowed bg-neutral-500 ' : 'cursor-pointer hover:bg-neutral-800 text-white'}`}
            type={type}
            aria-label="Enviar consulta"
            onClick={onPress}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
