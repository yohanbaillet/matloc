import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // TODO: Send email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@matlocindus.fr',
    //   to: 'contact@matlocindus.fr',
    //   subject: `Nouveau message de ${data.firstName} ${data.lastName}`,
    //   html: `...`,
    // })

    // TODO: Store in Supabase
    // const supabase = createClient(...)
    // await supabase.from('leads').insert({ ...data, type: 'contact' })

    console.log('[Contact form submission]', data)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
