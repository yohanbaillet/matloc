import { cn } from '@/lib/utils'

type Props = {
  value: string
  label: string
  className?: string
}

export default function MetricBig({ value, label, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="metric-xl text-foreground">{value}</div>
      <div className="tech-label text-muted-foreground max-w-[14rem]">{label}</div>
    </div>
  )
}
