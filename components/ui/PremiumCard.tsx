import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from './utils';

interface PremiumCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, children, hoverEffect = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass-panel rounded-2xl overflow-hidden',
          hoverEffect && 'glass-panel-hover',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';
