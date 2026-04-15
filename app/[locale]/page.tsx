import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import ProofBar from '@/components/sections/ProofBar'
import SectorCards from '@/components/sections/SectorCards'
import SolutionsGrid from '@/components/sections/SolutionsGrid'
import WhyUsFeatures from '@/components/sections/WhyUsFeatures'
import RealizationsPreview from '@/components/sections/RealizationsPreview'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactCta from '@/components/sections/ContactCta'
import StickyCtaBanner from '@/components/layout/StickyCtaBanner'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  return {
    title: 'MatLoc Indus | Cabines de peinture sur-mesure',
    description: t('hero_subline'),
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <SectorCards />
      <SolutionsGrid />
      <WhyUsFeatures />
      <RealizationsPreview />
      <ProcessTimeline />
      <TestimonialsSection />
      <ContactCta />
      <StickyCtaBanner />
    </>
  )
}
