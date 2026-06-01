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
    shortDesc:
      'Cabines endothermiques MI-E ou poids lourds MI-PL — dimensionnées pour votre atelier.',
    longDesc:
      "MAT INDUS conçoit chaque cabine sur-mesure à partir de votre cahier des charges : surface disponible, type de véhicules ou de pièces traités, volume journalier, contraintes réglementaires. Deux familles principales : cabine endothermique MI-E (100 % électrique, rendement ≈ 95 %, montée en température 5–10 min) et cabine poids lourds MI-PL (jusqu'à 23 m de long, débit jusqu'à 60 000 m³/h).",
    heroImage: '/brand/MatIndus-3.png',
    features: [
      {
        title: 'Sur-mesure systématique',
        description:
          "Dimensionnement exact selon votre espace, vos pièces et vos volumes. Étude approfondie en amont, conception clé en main.",
      },
      {
        title: 'Conformité CE et normes industrielles',
        description:
          "CE, ISO 9001, directives 2006/42/CE, 2014/30/UE, 2014/35/UE, RoHS II, EN 12100, EN 60204-1, INRS ED 839.",
      },
      {
        title: 'Éclairage LED haute luminosité',
        description:
          "≥ 1 000 lux sur le modèle MI-E (1 296 W plafond incliné + parois). Rendu couleur optimal pour les finitions.",
      },
      {
        title: 'Filtration multi-étages',
        description:
          "Préfiltre EU5 plafond, filtre sol EU3 paint-stop, plénum isolé auto-extinguible F1 — atmosphère propre et homogène.",
      },
      {
        title: 'Ventilation maîtrisée',
        description:
          "32 000 m³/h sur le modèle MI-E (11 kW soufflage + 11 kW extraction sol). Vitesse ≥ 0,3 m/s, dépression contrôlée.",
      },
      {
        title: 'Installation et mise en service',
        description:
          "Nos techniciens prennent en charge le raccordement, la mise en service, la programmation et la formation des opérateurs.",
      },
    ],
    specs: [
      { label: 'Modèle référence', value: 'MI-E 6900 × 4000 × 2850' },
      { label: 'Dimensions intérieures', value: '6 900 × 4 000 × H 2 800 mm' },
      { label: 'Dimensions extérieures', value: '7 100 × 4 000 × H 3 400 mm' },
      { label: 'Débit air (soufflage)', value: '32 000 m³/h — 11 kW' },
      { label: 'Puissance cabine (MI-E)', value: '52 kW' },
      { label: 'Alimentation', value: '380 V — 50 Hz — Triphasé + N + T' },
      { label: 'Temps de chauffe', value: '5–10 min (MI-E)' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['laboratoires-de-peinture', 'aires-de-preparation', 'gain-energetique'],
  },
  {
    slug: 'laboratoires-de-peinture',
    title: 'Laboratoire de peinture MI-LAB',
    shortDesc:
      "Zone dédiée au mélange peinture : ventilation sécurisée des solvants, options ATEX et charbon actif.",
    longDesc:
      "Le laboratoire de peinture MI-LAB est un espace compact et efficace dédié au mélange et à la préparation. La ventilation sécurise l'exposition aux solvants, l'éclairage est calibré pour un rendu couleur fidèle, et l'organisation simplifie le travail quotidien des opérateurs. Options ATEX, filtration au charbon actif, plan de travail intégré et système de pesée selon vos besoins.",
    heroImage: '/illustrations/lab.png',
    features: [
      {
        title: 'Environnement sécurisé pour l\'opérateur',
        description:
          "Ventilation sécurisée des solvants, captation des particules, faible consommation énergétique.",
      },
      {
        title: 'Qualité de préparation optimisée',
        description:
          "Zone dédiée au mélange peinture, plan de travail intégré (option), système de pesée disponible.",
      },
      {
        title: 'Options ATEX et charbon actif',
        description:
          "Éclairage ATEX, filtration charbon actif et configuration sur mesure selon votre atelier.",
      },
      {
        title: 'Installation simple',
        description:
          "Panneaux acier double face 50 mm, emboîtables, alimentation monophasée 220 V. Conforme environnement atelier.",
      },
    ],
    specs: [
      { label: 'Modèle référence', value: 'MI-LAB 3600 × 2500' },
      { label: 'Dimensions intérieures', value: '4 000 × 2 500 × H 2 550 mm' },
      { label: 'Débit extraction', value: '3 500 m³/h — 0,55 kW' },
      { label: 'Éclairage', value: '12 tubes LED 18 W — ≥ 600 lux' },
      { label: 'Filtration', value: 'Préfiltre G3 + fibre de verre' },
      { label: 'Alimentation', value: '220 V — 50 Hz — monophasée' },
      { label: 'Puissance totale', value: '1 kW' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['cabines-de-peinture', 'aires-de-preparation'],
  },
  {
    slug: 'aires-de-preparation',
    title: 'Aire de préparation MI-AP',
    shortDesc:
      "Aires de ponçage et de préparation surface — soufflage plafond, extraction sol, captation efficace.",
    longDesc:
      "L'aire de préparation MI-AP réduit le goulot d'étranglement avant la cabine de peinture. Soufflage plafond + extraction sol (full-fall) assurent une captation efficace des poussières et des résidus de ponçage. 40 tubes LED inclinés à 10° pour révéler les défauts de surface avant application. Compatible avec les flux automobile, ferroviaire et industriels.",
    heroImage: '/illustrations/prep.png',
    features: [
      {
        title: 'Soufflage plafond / extraction sol',
        description:
          "Système full-fall : 28 000 m³/h, vitesse ≥ 0,28 m/s, niveau sonore ≤ 72 dB. Captation au plus près des sources.",
      },
      {
        title: 'Éclairage révélateur de défauts',
        description:
          "40 tubes LED 18 W (10 rampes × 4) inclinés à 10°, verre trempé 5 mm, ≥ 800 lux au poste de travail.",
      },
      {
        title: 'Plateforme robuste 600 kg/roue',
        description:
          "Caillebotis acier 30 × 4 mm sur structure 300 mm. Charge admissible 600 kg/roue, compatible véhicules lourds.",
      },
      {
        title: 'Filtration plafond + sol',
        description:
          "Plafond F5 (560 g/m², > 5 µm), sol fibre de verre, traitement coton filtrant. Air propre maintenu en continu.",
      },
    ],
    specs: [
      { label: 'Modèle référence', value: 'MI-AP 6900 × 4000' },
      { label: 'Dimensions intérieures', value: '6 900 × 4 000 × H 3 000 mm' },
      { label: 'Dimensions extérieures', value: '8 406 × 4 100 × H 3 500 mm' },
      { label: 'Débit air', value: '28 000 m³/h' },
      { label: 'Vitesse air à vide', value: '≥ 0,28 m/s' },
      { label: 'Moteur', value: '7,5 kW — 380 V — 50 Hz — Triphasé' },
      { label: 'Puissance totale', value: '8,5 kW' },
    ],
    sectors: ['automobile-carrosserie', 'industrie'],
    relatedSlugs: ['cabines-de-peinture', 'laboratoires-de-peinture'],
  },
  {
    slug: 'gain-energetique',
    title: 'Panneaux endothermiques',
    shortDesc:
      "Cabine endothermique MI-E : jusqu'à 50 % d'énergie en moins vs gaz, ROI ≈ 13 mois, 49 t de CO₂ évitées par an.",
    longDesc:
      "La cabine de peinture est l'un des postes les plus énergivores d'un atelier. La cabine endothermique MAT INDUS MI-E consomme ≈ 52 kWh par cycle contre ≈ 272 kWh pour une cabine gaz équivalente. Sur l'année, cela représente jusqu'à 9 250 € d'économie et 49 tonnes de CO₂ évitées. Les 10 panneaux endothermiques (5 × 2 kW + 5 × 4 kW) chauffent par rayonnement infrarouge long : montée en température en 3 à 6 minutes, rendement > 95 %, zéro combustion.",
    heroImage: '/illustrations/endo-panel.png',
    features: [
      {
        title: '100 % électrique, zéro combustion',
        description:
          "Aucun brûleur, aucune flamme, aucun rejet CO₂ direct. Rendement énergétique ≈ 95 %, sécurité incendie renforcée.",
      },
      {
        title: 'Montée en température 5 à 10 min',
        description:
          "Temps de chauffe 5–10 minutes contre 15–20 minutes pour le gaz. Plus de cycles par jour, meilleure productivité.",
      },
      {
        title: '10 panneaux modulaires — 30 kW total',
        description:
          "5 panneaux 2 kW (2380 × 490 × 39 mm) + 5 panneaux 4 kW (2380 × 890 × 39 mm). Implantation murale sur supports isolants.",
      },
      {
        title: 'ROI moyen ≈ 13 mois',
        description:
          "Économie annuelle estimée à ≈ 9 250 € (coût annuel d'exploitation MI-E ≈ 10 450 € vs cabine gaz équivalente ≈ 19 700 €).",
      },
      {
        title: '49 tonnes de CO₂ évitées par an',
        description:
          "≈ 7,8 kg CO₂/cycle (MI-E) contre ≈ 52,87 kg CO₂/cycle pour une cabine gaz équivalente. Zéro émission directe, conformité environnementale.",
      },
      {
        title: 'Compatible neuf ou rétrofit',
        description:
          "Alimentation 400 V triphasé + N + T, 50 Hz, protection IP55, aluminium anodisé. Compatible cabines neuves ou existantes.",
      },
    ],
    specs: [
      { label: 'Énergie / cycle', value: '≈ 52 kWh (vs ≈ 272 kWh gaz)' },
      { label: 'Réduction énergétique', value: 'jusqu\'à 50 %' },
      { label: 'Temps de chauffe', value: '5–10 min (vs 15–20 min gaz)' },
      { label: 'Économie annuelle', value: '≈ 9 250 €' },
      { label: 'Retour sur investissement', value: '≈ 13 mois' },
      { label: 'CO₂ évité / an', value: '≈ 49 tonnes' },
      { label: 'Rendement', value: '≈ 95 %' },
      { label: 'Conformité', value: 'CE — Basse Tension 2014/35/UE & CEM 2014/30/UE' },
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
