import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

export default function Modal({ open, onClose, label, children }) {
    const closeRef = useRef(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) return undefined;
        const previouslyFocused = document.activeElement;
        document.body.classList.add('no-scroll');
        closeRef.current && closeRef.current.focus();
        const onKey = (e) => e.key === 'Escape' && onCloseRef.current();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.classList.remove('no-scroll');
            window.removeEventListener('keydown', onKey);
            previouslyFocused && previouslyFocused.focus && previouslyFocused.focus();
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div className="modal-lux" role="dialog" aria-modal="true" aria-label={label}>
            <div className="modal-lux__backdrop" onClick={onClose} />
            <div className="modal-lux__panel">
                <button ref={closeRef} type="button" className="modal-lux__close" onClick={onClose} aria-label="Close">
                    <FiX />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}
