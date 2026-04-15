export type Service = {
  slug: string
  title: string
  shortDesc: string
  longDesc: string
  heroImage: string
  steps: { title: string; description: string }[]
  included: string[]
}

export const services: Service[] = [
  {
    slug: 'conseil-vente',
    title: 'Conseil & Vente',
    shortDesc: 'Étude de faisabilité gratuite, recommandation personnalisée, devis détaillé.',
    longDesc:
      "Avant toute commande, notre équipe technique réalise une étude complète de votre projet : visite de site, analyse de vos contraintes, recommandation des équipements adaptés. Vous recevez un devis détaillé et une documentation technique complète — sans engagement de votre part.",
    heroImage:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80',
    steps: [
      {
        title: 'Prise de contact',
        description: 'Échange téléphonique ou par email pour comprendre votre besoin.',
      },
      {
        title: 'Visite de site',
        description: 'Un technicien se déplace pour mesurer l\'espace et analyser les contraintes (électricité, gaz, ventilation existante).',
      },
      {
        title: 'Étude technique',
        description: 'Dimensionnement, plans d\'implantation, sélection des équipements, analyse des aides disponibles.',
      },
      {
        title: 'Devis détaillé',
        description: 'Proposition chiffrée avec options, délais, et conditions de financement si nécessaire.',
      },
    ],
    included: [
      'Visite de site offerte',
      'Plans d\'implantation 2D/3D',
      'Devis détaillé sous 5 jours',
      'Conseil sur les aides CEE et aides régionales',
      'Documentation technique complète',
    ],
  },
  {
    slug: 'montage-installation',
    title: 'Montage & Installation',
    shortDesc: 'Nos techniciens prennent en charge l\'intégralité du chantier, du déchargement à la mise en service.',
    longDesc:
      "L'installation d'une cabine de peinture est un chantier technique qui requiert des compétences spécifiques. Nos techniciens certifiés gèrent l'intégralité des travaux : montage de la structure, raccordements électriques et thermiques, réglages aérauliques, tests de conformité.",
    heroImage:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=80',
    steps: [
      {
        title: 'Préparation du chantier',
        description: 'Coordination avec vos équipes, définition du planning, livraison des équipements.',
      },
      {
        title: 'Montage de la structure',
        description: 'Assemblage des panneaux, pose des plafonds filtrants, installation des équipements thermiques.',
      },
      {
        title: 'Raccordements',
        description: 'Électricité, gaz ou fuel, alimentation en air comprimé, évacuations.',
      },
      {
        title: 'Réglages et mise en service',
        description: 'Équilibrage des flux d\'air, calibration thermique, tests de conformité, formation de vos opérateurs.',
      },
    ],
    included: [
      'Techniciens certifiés',
      'Outillage et matériel de chantier inclus',
      'Gestion des déchets de chantier',
      'Tests de conformité et rapport final',
      'Formation des opérateurs (1 journée)',
      'Garantie travaux 2 ans',
    ],
  },
  {
    slug: 'maintenance-controle',
    title: 'Maintenance & Contrôle',
    shortDesc: 'Entretien préventif, contrôles réglementaires, interventions SAV sous 48h.',
    longDesc:
      "Une cabine bien entretenue dure plus longtemps, consomme moins et produit une meilleure qualité. MatLoc Indus propose des contrats d'entretien annuels adaptés à votre régime d'utilisation, ainsi que des contrôles de conformité réglementaires obligatoires.",
    heroImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    steps: [
      {
        title: 'Diagnostic initial',
        description: 'État des lieux complet de vos équipements : filtres, brûleur, motorisation, électricité.',
      },
      {
        title: 'Contrat d\'entretien annuel',
        description: '2 visites préventives par an, remplacement des consommables inclus, priorité d\'intervention.',
      },
      {
        title: 'Contrôles de conformité',
        description: 'Mesures d\'émission, contrôle ICPE, rapport certifié pour vos organismes de contrôle.',
      },
      {
        title: 'SAV et dépannage',
        description: 'Intervention sous 48h, stock de pièces détachées, techniciens disponibles 5j/7.',
      },
    ],
    included: [
      'Visite préventive semestrielle',
      'Remplacement filtres (consommables inclus)',
      'Nettoyage brûleur et échangeurs',
      'Rapport d\'intervention signé',
      'Contrôle de conformité annuel',
      'Hotline technique 5j/7',
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}
