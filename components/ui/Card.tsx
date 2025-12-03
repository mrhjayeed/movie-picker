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
          'rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden',
          hoverable && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-gray-600/50 cursor-pointer',
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
      className={cn('px-6 py-4 border-b border-gray-700/50', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4', className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-t border-gray-700/50', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
