export type Solution = {
  slug: string
  title: string
  shortDesc: string
  longDesc: string
  heroImage: string
  features: { title: string; description: string }[]
  specs: { label: string; value: string }[]
  sectors: string[]
  relatedSlugs: string[]
}

export const solutions: Solution[] = [
  {
    slug: 'cabines-de-peinture',
    title: 'Cabines de peinture',
    shortDesc: 'Des cabines thermiques, électriques et hybrides dimensionnées pour votre atelier.',
    longDesc:
      "Chaque cabine MatLoc Indus est conçue sur-mesure à partir de votre cahier des charges : dimensions de l'espace, type de véhicules ou de pièces traités, volume journalier, contraintes réglementaires locales. Nous proposons des modèles à chauffage thermique classique, électrique 100% ou hybride à panneaux endothermiques.",
    heroImage:
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1600&q=80',
    features: [
      {
        title: 'Sur-mesure systématique',
        description:
          'Dimensionnement exact selon votre espace, vos pièces et vos volumes. Aucune solution standard imposée.',
      },
      {
        title: 'Homologation garantie',
        description:
          'Toutes nos cabines sont conformes aux réglementations françaises et européennes en vigueur (ICPE, code du travail).',
      },
      {
        title: 'Éclairage LED 360°',
        description:
          "Éclairage à haute efficacité lumineuse et rendu de couleur optimal pour un travail de finition irréprochable.",
      },
      {
        title: 'Filtration haute performance',
        description:
          "Filtres plafond EU5 et filtres sol EU3 assurant une atmosphère de peinture contrôlée, sans poussière.",
      },
      {
        title: 'Systèmes thermiques adaptés',
        description:
          "Au gaz, électrique ou hybride — nous choisissons avec vous la source d'énergie la plus adaptée à vos besoins.",
      },
      {
        title: 'Installation et mise en service',
        description:
          "Nos techniciens prennent en charge l'intégralité de l'installation, du raccordement à la mise en service et la formation.",
      },
    ],
    specs: [
      { label: 'Largeur standard', value: '4 à 8 m' },
      { label: 'Longueur', value: '6 à 14 m' },
      { label: 'Hauteur', value: '2,8 à 4,5 m' },
      { label: 'Puissance thermique', value: '50 à 250 kW' },
      { label: 'Débit air', value: '15 000 à 60 000 m³/h' },
      { label: 'Délai de mise en température', value: '10 à 20 min (gaz) / 6 à 10 min (endothermique)' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['laboratoires-de-peinture', 'aires-de-preparation', 'gain-energetique'],
  },
  {
    slug: 'laboratoires-de-peinture',
    title: 'Laboratoires de peinture',
    shortDesc: 'Postes de mélange et d\'analyse couleur pour carrosseries et ateliers industriels.',
    longDesc:
      "Un laboratoire de peinture bien conçu réduit les pertes de matière, les erreurs de teinte et le temps de préparation. MatLoc Indus conçoit des espaces dédiés au mélange et au contrôle couleur, ergonomiques et conformes aux normes de sécurité (ventilation, stockage produits inflammables).",
    heroImage:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    features: [
      {
        title: 'Poste de mélange haute précision',
        description:
          "Balance analytique, éclairage D65 simulant la lumière du jour, plan de travail ergonomique anti-renversement.",
      },
      {
        title: 'Stockage organisé et sécurisé',
        description:
          "Armoires ventilées ATEX pour produits inflammables, rangement optimisé par famille de teintes.",
      },
      {
        title: 'Hotte d\'aspiration dédiée',
        description:
          "Extraction des vapeurs au plus près du poste de travail pour la santé des opérateurs.",
      },
      {
        title: 'Gestion des déchets intégrée',
        description:
          "Zone de rinçage et collecte des effluents conforme à la réglementation sur les déchets industriels.",
      },
    ],
    specs: [
      { label: 'Surface type', value: '8 à 20 m²' },
      { label: 'Stockage teintes', value: 'jusqu\'à 1 200 références' },
      { label: 'Éclairage', value: 'LED D65 IRC > 95' },
      { label: 'Débit aspiration', value: '800 à 2 000 m³/h' },
    ],
    sectors: ['automobile-carrosserie'],
    relatedSlugs: ['cabines-de-peinture', 'aires-de-preparation'],
  },
  {
    slug: 'aires-de-preparation',
    title: 'Aires de préparation',
    shortDesc: 'Zones de ponçage et de préparation surface intégrées à votre flux de production.',
    longDesc:
      "L'aire de préparation est souvent le goulot d'étranglement d'un atelier de peinture. MatLoc Indus conçoit des postes de ponçage et de masticage optimisés pour accélérer vos cycles sans sacrifier la qualité de préparation surface.",
    heroImage:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    features: [
      {
        title: 'Extraction basse centralisée',
        description:
          "Captation des poussières au plus près de la source pour une qualité d'air maximale et zéro contamination de la cabine.",
      },
      {
        title: 'Éclairage haute luminosité',
        description:
          "LED 5 000K pour révéler tous les défauts de surface avant application. Jusqu'à 1 200 lux au poste.",
      },
      {
        title: 'Sol antistatique',
        description:
          "Résine époxy antistatique évitant l'accumulation de poussières et facilitant le nettoyage.",
      },
      {
        title: 'Bras aspirants mobiles',
        description:
          "Flexibilité maximale pour le traitement de pièces de toutes tailles.",
      },
    ],
    specs: [
      { label: 'Nombre de postes', value: '1 à 4' },
      { label: 'Débit extraction', value: '4 000 à 20 000 m³/h' },
      { label: 'Éclairement', value: '800 à 1 200 lux' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['cabines-de-peinture', 'laboratoires-de-peinture'],
  },
  {
    slug: 'gain-energetique',
    title: 'Solutions gain énergétique',
    shortDesc: "Cabines endothermiques 100 % électriques : -91 % d'énergie vs gaz, ROI moyen 13 mois, 51 t de CO₂ évitées par an.",
    longDesc:
      "La cabine de peinture est l'un des postes les plus énergivores d'un atelier. Une cabine gaz consomme 251 kWh par cycle (dont 220,8 kWh de gaz + 30,4 kWh d'électricité). Une cabine endothermique MatLoc n'en consomme que 21,9 kWh — soit 91 % de moins. Sur 1 000 cycles/an, l'économie annuelle dépasse 13 000 € avec un retour sur investissement de l'ordre de 13 mois. En prime : zéro combustion, zéro émission directe, et une montée en température 2× plus rapide (6–10 min vs 10–20 min pour le gaz).",
    heroImage:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80',
    features: [
      {
        title: '100 % électrique, zéro combustion',
        description:
          "Les panneaux endothermiques chauffent la surface directement par rayonnement. Aucun brûleur, aucune flamme, aucun rejet CO₂ direct — et une efficacité de 95 %.",
      },
      {
        title: 'Montée en température 2× plus rapide',
        description:
          "6 à 10 minutes pour atteindre 60 °C contre 10 à 20 minutes pour une cabine gaz. Chaque cycle gagné, c'est de la capacité de production en plus.",
      },
      {
        title: 'Sélection de zones',
        description:
          "10 zones de chauffe indépendantes : ne chauffez que la zone à peindre. Consommation réduite au strict nécessaire, cycle après cycle.",
      },
      {
        title: 'ROI documenté : 13 mois',
        description:
          "Économie annuelle moyenne de 13 250 € sur l'énergie et les abonnements. Le surcoût de la cabine endothermique est remboursé en moins de 14 mois dans la plupart des configurations.",
      },
      {
        title: '51 tonnes de CO₂ évitées par an',
        description:
          "Basé sur 1 000 cycles/an : 54,6 kgCO₂e/cycle pour le gaz contre 3,2 kgCO₂e pour l'endothermique. Équivalent à 4 800 arbres plantés.",
      },
      {
        title: 'Abonnement simplifié',
        description:
          "Un seul contrat d'énergie (électricité 63 kVA). Supprimez l'abonnement gaz 300 mbar et les contraintes ATEX associées.",
      },
    ],
    specs: [
      { label: 'Énergie/cycle', value: '21,9 kWh (vs 251 kWh gaz)' },
      { label: 'Réduction consommation', value: '−91 %' },
      { label: 'Montée en température', value: '6 à 10 min (vs 10–20 min)' },
      { label: 'Économie annuelle (1 000 cycles)', value: '≈ 13 250 €' },
      { label: 'Retour sur investissement', value: '≈ 13 mois' },
      { label: 'CO₂ évité/an', value: '≈ 51 tonnes' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['cabines-de-peinture'],
  },
  {
    slug: 'location',
    title: 'Location de cabines',
    shortDesc: 'Besoin ponctuel ou pic d\'activité ? Nos cabines en location, sans investissement lourd.',
    longDesc:
      "Travaux, pic saisonnier, sinistre, démarrage d'activité — MatLoc Indus propose des solutions de location de cabines de peinture mobiles ou fixes. Livraison, installation et reprise incluses. Une solution flexible pour ne pas immobiliser du capital sur un équipement non permanent.",
    heroImage:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=80',
    features: [
      {
        title: 'Location courte durée',
        description:
          "De 1 semaine à 3 mois. Idéal pour un remplacement d'urgence ou une période de pointe.",
      },
      {
        title: 'Location longue durée',
        description:
          "De 6 mois à 5 ans. Alternative à l'investissement, préservez votre trésorerie.",
      },
      {
        title: 'Livraison et installation incluses',
        description:
          "Nos techniciens livrent, installent et mettent en service. Vous n'avez qu'à peindre.",
      },
      {
        title: 'Maintenance comprise',
        description:
          "Entretien préventif et curatif inclus dans le contrat de location. Zéro surprise.",
      },
    ],
    specs: [
      { label: 'Durée minimum', value: '1 semaine' },
      { label: 'Délai de livraison', value: '3 à 5 jours ouvrés' },
      { label: 'Modèles disponibles', value: 'A7200, E7200' },
      { label: 'Maintenance', value: 'Incluse' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['cabines-de-peinture'],
  },
]

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug)
}

export function getAllSolutionSlugs() {
  return solutions.map((s) => s.slug)
}
