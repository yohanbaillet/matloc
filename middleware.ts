import { NextResponse } from 'next/server'

// Minimal middleware — locale redirect is handled by app/page.tsx
export function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
