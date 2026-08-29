// Données de la page "Devenir partenaire" : formules de référencement annuel,
// coups de projecteur ponctuels, offre "Publier un article" et "Devenez Expert".

export interface PartnershipTier {
  key: string
  title: string
  price: string          // ex: 'CHF 530.–'
  priceSuffix: string    // ex: 'HT / an'
  description: string
  tier?:string
  features: string[]
  ctaLabel: string
  highlighted?: boolean   // true pour "Référencement avancé" (le plus choisi)
}

export const partnershipTiers: PartnershipTier[] = [
  {
    key: 'simple',
    title: 'Référencement simple',
    price: 'CHF 530.–',
    priceSuffix: 'HT / an',
    description: 'Pour les petites entreprises ou particuliers qui débutent — 1 canton',
    features: [
      'Page de présentation personnelle (logo, contact, photos, vidéos)',
      '10 rubriques',
      '10 événements dans notre agenda',
      '1 publication Facebook boostée (20.–)',
      '1 Coup de cœur + 1 parution newsletter hebdo + 1 parution page d\'accueil',
    ],
    ctaLabel: 'Je me lance',
  },
  {
    key: 'avance',
    title: 'Référencement avancé',
    price: 'CHF 720.–',
    priceSuffix: 'HT / an',
    description: 'Pour étendre efficacement votre visibilité — Suisse romande',
    features: [
      'Page de présentation personnelle (logo, contact, photos, vidéos)',
      '15 rubriques',
      '20 modules agenda',
      '1 publication Facebook boostée (30.–)',
      '1 Coup de cœur + 1 parution newsletter hebdo + 1 parution page d\'accueil',
    ],
    ctaLabel: 'Je choisis cette offre',
    highlighted: true,
  },
  {
    key: 'superieur',
    title: 'Référencement supérieur',
    price: 'CHF 990.–',
    priceSuffix: 'HT / an',
    description: 'Pour une visibilité inégalée sur nos sites — Suisse romande',
    features: [
      'Page de présentation personnelle (logo, contact, photos, vidéos)',
      '15 rubriques',
      '30 modules agenda',
      '1 publication Facebook boostée (40.–)',
      '1 Coup de cœur + 1 parution newsletter hebdo + 1 parution page d\'accueil',
    ],
    ctaLabel: 'Je me lance',
  },
]

export interface SpotlightOffer {
  key: string
  title: string
  price: string          // ex: 'CHF 380.– HT / semaine'
  description: string
}

export const spotlightOffers: SpotlightOffer[] = [
  {
    key: 'banniereHorizontale',
    title: 'Bannière horizontale',
    price: 'CHF 380.– HT / semaine',
    description: 'Au-dessus du menu, visible sur toutes les pages du site',
  },
  {
    key: 'coupDeCoeur',
    title: 'Coup de Cœur',
    price: 'CHF 450.– HT / semaine',
    description: 'À droite du contenu (desktop) ou sous chaque article (mobile)',
  },
  {
    key: 'banniereAgenda',
    title: 'Bannière Agenda',
    price: 'CHF 520.– HT / 30 jours',
    description: 'En haut de la page agenda — idéal pour les camps de vacances',
  },
  {
    key: 'banniereRubrique',
    title: 'Bannière Rubrique',
    price: 'CHF 380.– HT / 6 mois',
    description: 'Au-dessus du titre d\'une rubrique ciblée',
  },
]

export interface StatItem {
  key: string
  value: string    // ex: "10'000"
  label: string
  icon: 'eye' | 'mail' | 'calendar' | 'article'
}

export const partnersStats: StatItem[] = [
  { key: 'visits', value: "10'000", label: 'visites par jour', icon: 'eye' },
  { key: 'subscribers', value: "30'000+", label: 'familles abonnées à la newsletter', icon: 'mail' },
  { key: 'events', value: "1'500+", label: 'activités dans nos agendas', icon: 'calendar' },
  { key: 'articles', value: "8'000+", label: 'articles écrits pour les familles', icon: 'article' },
]

export const publishArticleOffer = {
  title: 'Publier un article',
  description:
    'Faites-vous connaître en publiant un article : minimum 300 mots, 1 à 2 photos, votre nom/entreprise et un lien vers votre site, tous deux placés dans des balises optimisées pour le référencement (SEO).',
  price: 'CHF 500.–',
  priceSuffix: 'HT / parution / site',
  ctaLabel: 'Je veux participer',
}

export const becomeExpertOffer = {
  badge: 'Aller plus loin',
  title: 'Devenez Expert LaFamily',
  description:
    'Réservé aux partenaires avec un référencement annuel actif. Devenez une référence dans votre domaine et répondez gratuitement aux questions des familles, comme le font déjà nos experts en éducation, psychologie, droit de la famille ou coaching.',
  benefits: [
    '3 articles ou plus par année',
    'Chaque article visible en page d\'accueil au moins 1 semaine',
    'Présence dans la newsletter au moins 4 fois par an',
    'Liaison directe : les familles vous posent leurs questions gratuitement',
  ],
  price: 'CHF 800.–',
  priceSuffix: 'HT / an',
  ctaLabel: 'Devenir Expert',
}