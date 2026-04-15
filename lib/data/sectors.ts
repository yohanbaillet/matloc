export type Sector = {
  slug: string
  title: string
  headline: string
  description: string
  heroImage: string
  painPoints: { title: string; description: string }[]
  benefits: { title: string; description: string }[]
  relatedSolutions: string[]
}

export const sectors: Sector[] = [
  {
    slug: 'automobile-carrosserie',
    title: 'Automobile & Carrosserie',
    headline: 'L\'équipement qu\'attendent les ateliers de carrosserie modernes',
    description:
      "Les ateliers de carrosserie font face à des exigences croissantes : agréments constructeurs, normes environnementales, rentabilité par poste, attractivité pour les techniciens. MatLoc Indus conçoit des cabines et équipements qui répondent à toutes ces contraintes.",
    heroImage:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    painPoints: [
      {
        title: 'Conformité constructeurs',
        description:
          "Les agréments VW, BMW, Mercedes, PSA exigent des cabines certifiées avec protocoles précis. Nos équipements répondent à ces cahiers des charges.",
      },
      {
        title: 'Coûts énergétiques',
        description:
          "La cabine de peinture représente souvent 40% de la facture énergétique d'un atelier. Nos solutions réduisent ce poste de 30 à 55%.",
      },
      {
        title: 'Réglementation ICPE',
        description:
          "Seuils d'émission, règles de stockage des solvants, contrôles périodiques — nous vous accompagnons dans la mise en conformité.",
      },
      {
        title: 'Recrutement et conditions de travail',
        description:
          "Un atelier bien équipé attire et retient les bons techniciens. Ergonomie, éclairage, qualité de l'air — nous y pensons.",
      },
    ],
    benefits: [
      {
        title: 'Cabines homologuées',
        description: 'Conformes aux référentiels constructeurs et aux normes ICPE françaises.',
      },
      {
        title: 'Finitions haut de gamme',
        description: 'Éclairage LED 360°, flux d\'air laminaire, filtration EU5. Zéro défaut.',
      },
      {
        title: 'Gain énergétique documenté',
        description: 'Panneaux endothermiques et cabines électriques avec ROI mesuré.',
      },
      {
        title: 'SAV rapide',
        description: 'Techniciens disponibles sous 48h. Contrats d\'entretien annuels.',
      },
    ],
    relatedSolutions: [
      'cabines-de-peinture',
      'laboratoires-de-peinture',
      'aires-de-preparation',
      'gain-energetique',
      'location',
    ],
  },
  {
    slug: 'industrie',
    title: 'Industrie',
    headline: 'Des cabines industrielles pour des process exigeants',
    description:
      "Traitement du bois, métallurgie, plasturgie, équipements agricoles — les besoins industriels ne ressemblent pas à ceux de la carrosserie automobile. MatLoc Indus conçoit des cabines adaptées à vos pièces, vos volumes et vos contraintes de production.",
    heroImage:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=80',
    painPoints: [
      {
        title: 'Pièces hors gabarit',
        description:
          "Châssis, panneaux, structures métalliques — vos pièces ne rentrent pas dans une cabine standard. Les nôtres sont dimensionnées pour.",
      },
      {
        title: 'Volumes de production élevés',
        description:
          "Plusieurs dizaines à plusieurs centaines de pièces par jour nécessitent une cabine pensée pour la cadence, pas pour le confort.",
      },
      {
        title: 'Produits spécifiques',
        description:
          "Peintures à l'eau, laque UV, primaires époxy, vernis à solvant — chaque produit a ses contraintes de ventilation et de température.",
      },
      {
        title: 'Conformité réglementaire',
        description:
          "ICPE, ATEX pour les zones explosibles, normes REACH sur les émissions — nous connaissons le cadre réglementaire industriel.",
      },
    ],
    benefits: [
      {
        title: 'Dimensions sur-mesure',
        description: 'Cabines allant jusqu\'à 15m de longueur et 5m de hauteur.',
      },
      {
        title: 'Adaptées à vos produits',
        description: 'Ventilation, température et filtration configurées pour vos formulations.',
      },
      {
        title: 'Intégration process',
        description: 'Convoyeurs, ponts roulants, manutention — nous intégrons votre flux de production.',
      },
      {
        title: 'Maintenance industrielle',
        description: 'Contrats d\'entretien adaptés aux régimes d\'utilisation intensifs.',
      },
    ],
    relatedSolutions: [
      'cabines-de-peinture',
      'aires-de-preparation',
      'gain-energetique',
      'location',
    ],
  },
]

export function getSectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug)
}
