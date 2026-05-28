import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroV2 from '@/components/sections/v2/HeroV2'
import ProductArchitectureGrid from '@/components/sections/v2/ProductArchitectureGrid'
import EndothermicTech from '@/components/sections/v2/EndothermicTech'
import EcologicalTransition from '@/components/sections/v2/EcologicalTransition'
import AutomationAI from '@/components/sections/v2/AutomationAI'
import TechnicalValidation from '@/components/sections/v2/TechnicalValidation'
import AboutMatIndus from '@/components/sections/v2/AboutMatIndus'
import StickyCtaBanner from '@/components/layout/StickyCtaBanner'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  return {
    title: 'MAT INDUS | Cabines de peinture endothermiques sur-mesure',
    description: t('hero_subline'),
  }
}

export default function HomePage() {
  return (
    <>
      <HeroV2 />
      <ProductArchitectureGrid />
      <EndothermicTech />
      <EcologicalTransition />
      <AutomationAI />
      <TechnicalValidation />
      <AboutMatIndus />
      <StickyCtaBanner />
    </>
  )
}
