import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'span' | 'p'
}

export default function TechLabel({ children, className, as: Tag = 'div' }: Props) {
  return <Tag className={cn('tech-label text-[var(--text-muted)]', className)}>{children}</Tag>
}
