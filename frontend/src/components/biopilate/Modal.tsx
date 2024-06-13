// src/components/biopilate/Modal.tsx
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 z-10 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-lg">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};
