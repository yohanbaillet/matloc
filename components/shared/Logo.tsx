import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  variant?: 'dark' | 'white'
  className?: string
  priority?: boolean
}

export default function Logo({ variant = 'dark', className, priority }: Props) {
  const src = variant === 'white' ? '/brand/logo-white.png' : '/brand/logo-dark.png'

  return (
    <Image
      src={src}
      alt="MAT INDUS"
      width={1534}
      height={469}
      priority={priority}
      className={cn('h-7 w-auto select-none', className)}
    />
  )
}
