'use client';

import { useEffect, useCallback, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, isOpen, onClose, title, size = 'md', children, ...props }, ref) => {
    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative w-full rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl',
            sizes[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1.5 rounded-lg"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
