import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleClassName?: string
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleClassName,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl font-bold leading-tight text-foreground sm:text-4xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
