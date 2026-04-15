'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone requis'),
  company: z.string().min(2, 'Société requise'),
  sector: z.string().min(1, 'Secteur requis'),
  projectType: z.string().min(1, 'Type de projet requis'),
  message: z.string().min(10, 'Description requise (min. 10 caractères)'),
})

type FormData = z.infer<typeof schema>

export default function QuoteForm() {
  const t = useTranslations('forms')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-green-500" />
        <h3 className="text-2xl font-bold">{t('success_title')}</h3>
        <p className="max-w-sm text-muted-foreground">{t('success_desc')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Identity */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Vos coordonnées
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('first_name')} *</label>
            <input
              {...register('firstName')}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              placeholder="Jean"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('last_name')} *</label>
            <input
              {...register('lastName')}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              placeholder="Dupont"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('email')} *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              placeholder="jean.dupont@entreprise.fr"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('phone')} *</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              placeholder="+33 6 00 00 00 00"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium">{t('company')} *</label>
          <input
            {...register('company')}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            placeholder="Carrosserie Martin"
          />
          {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
        </div>
      </div>

      {/* Project */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Votre projet
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('sector')} *</label>
            <select
              {...register('sector')}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            >
              <option value="">Sélectionner...</option>
              <option value="automobile">{t('sector_auto')}</option>
              <option value="industrie">{t('sector_industry')}</option>
              <option value="autre">{t('sector_other')}</option>
            </select>
            {errors.sector && <p className="mt-1 text-xs text-red-500">{errors.sector.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('project_type')} *</label>
            <select
              {...register('projectType')}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            >
              <option value="">Sélectionner...</option>
              <option value="nouvelle-installation">{t('project_new')}</option>
              <option value="remplacement">{t('project_replace')}</option>
              <option value="location">{t('project_rental')}</option>
              <option value="maintenance">{t('project_maintenance')}</option>
              <option value="autre">{t('project_other')}</option>
            </select>
            {errors.projectType && <p className="mt-1 text-xs text-red-500">{errors.projectType.message}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium">{t('message')} *</label>
          <textarea
            {...register('message')}
            rows={5}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 resize-none"
            placeholder={t('message_placeholder')}
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t('error_desc')}
        </div>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3.5 text-base font-semibold text-white shadow-amber transition-all hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t('sending') : t('submit_quote')}
          <Send className="h-4 w-4" />
        </button>
        <p className="text-xs text-muted-foreground text-center">{t('gdpr_notice')}</p>
      </div>
    </form>
  )
}
