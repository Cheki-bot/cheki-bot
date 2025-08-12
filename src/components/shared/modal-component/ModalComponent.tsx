import { type ReactNode } from 'react';

import { ButtonComponent } from '@/components/button-component/ButtonComponent';

interface ModalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    Accept: () => void;
}

export const ModalComponent = ({ children, isOpen, onClose, Accept }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="bg-black/80 fixed flex top-0 left-0 w-screen h-screen justify-center items-center z-50"
            role="dialog"
            aria-modal
            onClick={onClose}
        >
            <div
                className="flex flex-col gap-5 relative bg-neutral-900 rounded-2xl p-10 max-w-4xl w-fit "
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-[5%] right-[5%] text-black font-bold text-xl"
                    onClick={onClose}
                >
                    x
                </button>
                {children}
                <ButtonComponent onPress={() => Accept()}>
                    Aceptar
                </ButtonComponent>
            </div>
        </div>
    );
};