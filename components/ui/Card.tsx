import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  gradient?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, gradient, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-neutral-900/50 border border-neutral-800 overflow-hidden',
          hoverable && 'transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900/80 cursor-pointer',
          gradient && `bg-gradient-to-br ${gradient}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-5 py-4 border-b border-neutral-800', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-5 py-4', className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-5 py-4 border-t border-neutral-800', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
