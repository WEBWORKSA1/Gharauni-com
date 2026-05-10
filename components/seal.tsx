import { cn } from '@/lib/utils';

interface SealProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-9 h-9 text-base',
  md: 'w-11 h-11 text-xl',
  lg: 'w-14 h-14 text-2xl'
};

export function Seal({ size = 'md', className }: SealProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center text-ivory-50 display rounded-full',
        SIZE_MAP[size],
        className
      )}
      style={{
        background: 'radial-gradient(circle at 30% 30%, #C2410C, #7C2D12)',
        boxShadow: '0 2px 8px rgba(124, 45, 18, 0.3)'
      }}
    >
      घ
    </div>
  );
}
