export type Realization = {
  slug: string
  title: string
  client: string
  sector: 'Automobile' | 'Industrie'
  sectorSlug: 'automobile-carrosserie' | 'industrie'
  type: string
  solutionSlug: string
  location: { city: string; region: string }
  date: string
  challenge: string
  solution: string
  results: { label: string; value: string }[]
  images: string[]
  testimonial?: { quote: string; author: string; role: string }
}

export const realisations: Realization[] = [
  {
    slug: 'cabine-a7200-carrosserie-dupont-rennes',
    title: 'Cabine A7200 — Carrosserie Dupont',
    client: 'Carrosserie Dupont',
    sector: 'Automobile',
    sectorSlug: 'automobile-carrosserie',
    type: 'Cabine de peinture VU/VL',
    solutionSlug: 'cabines-de-peinture',
    location: { city: 'Rennes', region: 'Bretagne' },
    date: '2024',
    challenge:
      "L'atelier Dupont traitait jusqu'à 40 véhicules par semaine mais sa cabine vieillissante consommait trop d'énergie et ne permettait plus des finitions conformes aux standards constructeurs. Un remplacement s'imposait.",
    solution:
      "Installation d'une cabine A7200 sur-mesure adaptée aux VU et VL, avec système de filtration haute performance et éclairage LED 360°. Travaux réalisés en 4 jours pour minimiser l'immobilisation de l'atelier.",
    results: [
      { label: 'Réduction consommation énergétique', value: '-32%' },
      { label: "Durée d'installation", value: '4 jours' },
      { label: 'Capacité journalière', value: '+25%' },
    ],
    images: [
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
    ],
    testimonial: {
      quote:
        "Installation impeccable, délais tenus. La cabine tourne à plein régime depuis l'ouverture. On a gagné en qualité et en consommation.",
      author: 'Laurent D.',
      role: 'Gérant, Carrosserie Dupont',
    },
  },
  {
    slug: 'installation-industrielle-menuiserie-leblanc-nantes',
    title: 'Cabine bois industrielle — Menuiseries Leblanc',
    client: 'Menuiseries Leblanc',
    sector: 'Industrie',
    sectorSlug: 'industrie',
    type: 'Cabine bois grande capacité',
    solutionSlug: 'cabines-de-peinture',
    location: { city: 'Nantes', region: 'Pays de la Loire' },
    date: '2024',
    challenge:
      "Menuiseries Leblanc produisait 600 portes et fenêtres par mois. Leur procédé de laquage était externalisé, ce qui générait des délais et des coûts logistiques importants. Ils souhaitaient internaliser la finition.",
    solution:
      "Conception et installation d'une cabine grande capacité (8x4x3,5m) spécifiquement étudiée pour les pièces bois : ventilation adaptée aux solvants, sol antidérapant facilement nettoyable, panneaux endothermiques pour une montée en température rapide.",
    results: [
      { label: 'Économie logistique annuelle', value: '48 000 €' },
      { label: 'Délai de finition', value: '-3 jours' },
      { label: 'Réduction consommation gaz', value: '-40%' },
    ],
    images: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    ],
    testimonial: {
      quote:
        "Le ROI était là dès la première année. Et on a récupéré la maîtrise de notre qualité de finition. C'est une décision qu'on aurait dû prendre bien plus tôt.",
      author: 'Sylvie L.',
      role: 'Directrice production, Menuiseries Leblanc',
    },
  },
  {
    slug: 'cabine-electrique-e7200-groupe-bernard-lille',
    title: 'Cabine E7200 électrique — Groupe Bernard',
    client: 'Groupe Bernard',
    sector: 'Automobile',
    sectorSlug: 'automobile-carrosserie',
    type: 'Cabine électrique écologique',
    solutionSlug: 'cabines-de-peinture',
    location: { city: 'Lille', region: 'Hauts-de-France' },
    date: '2024',
    challenge:
      "Le Groupe Bernard s'était engagé dans une démarche RSE avec un objectif de réduction de 50% de ses émissions d'ici 2026. Leurs 3 cabines au gaz représentaient 35% de leur consommation énergétique totale.",
    solution:
      "Installation de 2 cabines E7200 100% électriques avec récupération de chaleur sur les flux d'air. Intégration dans le système de monitoring énergétique du groupe pour un suivi en temps réel.",
    results: [
      { label: 'Réduction émissions CO₂', value: '-58%' },
      { label: 'Économies annuelles', value: '62 000 €' },
      { label: 'Retour sur investissement', value: '2,8 ans' },
    ],
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    ],
    testimonial: {
      quote:
        "On a largement dépassé nos objectifs RSE sur ce poste. Et contrairement à ce qu'on craignait, les performances de peinture sont identiques, voire meilleures.",
      author: 'Marc T.',
      role: 'Directeur technique, Groupe Bernard',
    },
  },
  {
    slug: 'cabine-sablage-metallerie-morin-lorient',
    title: 'Cabine de sablage CS-OL — Métallerie Morin',
    client: 'Métallerie Morin',
    sector: 'Industrie',
    sectorSlug: 'industrie',
    type: 'Cabine de sablage',
    solutionSlug: 'cabines-de-peinture',
    location: { city: 'Lorient', region: 'Bretagne' },
    date: '2023',
    challenge:
      "La métallerie traitait des pièces de structure jusqu'à 2m80 de long. Le sablage manuel en atelier ouvert posait des problèmes de sécurité, de contamination des autres postes et de non-conformité avec les normes ICPE.",
    solution:
      "Installation d'une cabine de sablage CS-OL à ouverture latérale, dimensionnée pour les grandes pièces. Système de filtration 3 étages, collecte automatique des abrasifs, vestiaire sas intégré.",
    results: [
      { label: 'Conformité ICPE', value: '✓ obtenue' },
      { label: 'Productivité sablage', value: '+45%' },
      { label: 'Incidents sécurité', value: '0 depuis installation' },
    ],
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'laboratoire-peinture-multimarques-vannes',
    title: 'Laboratoire peinture — Centre Multimarques Vannes',
    client: 'Centre Multimarques Vannes',
    sector: 'Automobile',
    sectorSlug: 'automobile-carrosserie',
    type: 'Laboratoire de peinture',
    solutionSlug: 'laboratoires-de-peinture',
    location: { city: 'Vannes', region: 'Bretagne' },
    date: '2023',
    challenge:
      "Le centre agréé multi-constructeurs devait gérer plus de 800 références de teintes différentes. Les erreurs de mélange et les pertes de peinture représentaient 12% du coût matière.",
    solution:
      "Aménagement d'un laboratoire de peinture complet : poste de mélange avec balance haute précision, stockage organisé par famille de teintes, hotte d'aspiration dédiée, éclairage à rendu de couleur D65.",
    results: [
      { label: 'Réduction pertes peinture', value: '-65%' },
      { label: 'Temps de préparation teinte', value: '-40%' },
      { label: 'Erreurs de teinte', value: '-90%' },
    ],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'aire-preparation-carrosserie-martin-brest',
    title: 'Aire de préparation — Carrosserie Martin',
    client: 'Carrosserie Martin',
    sector: 'Automobile',
    sectorSlug: 'automobile-carrosserie',
    type: 'Aire de préparation',
    solutionSlug: 'aires-de-preparation',
    location: { city: 'Brest', region: 'Bretagne' },
    date: '2023',
    challenge:
      "L'atelier voulait accélérer ses cycles de préparation pour ne plus créer de goulot d'étranglement avant la cabine de peinture. Le ponçage à sec en zone ouverte était aussi source de contamination.",
    solution:
      "Installation d'une aire de préparation 2 postes avec extraction basse centralisée, éclairage LED haute luminosité, sol résine antistatique et bras aspirants mobiles.",
    results: [
      { label: 'Throughput atelier', value: '+35%' },
      { label: 'Poussière résiduelle', value: '-80%' },
      { label: 'Retouches après peinture', value: '-55%' },
    ],
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]

export function getRealizationBySlug(slug: string) {
  return realisations.find((r) => r.slug === slug)
}

export function getRealizationsBySector(sector: string) {
  return realisations.filter((r) => r.sectorSlug === sector)
}
