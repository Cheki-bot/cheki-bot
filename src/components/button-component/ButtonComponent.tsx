interface ButtonComponentProps {
    children: React.ReactNode;
    onPress?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export const ButtonComponent = ({
    children,
    onPress,
    type = 'button',
}: ButtonComponentProps) => {
    return (
        <button
            className="text-white py-2 px-4 rounded-[10px] cursor-pointer"
            type={type}
            aria-label="Enviar consulta"
            onClick={onPress}
            style={{
                background:
                    'linear-gradient(135deg, rgb(0, 207, 175), rgb(5, 150, 105))',
            }}
        >
            {children}
        </button>
    );
};
