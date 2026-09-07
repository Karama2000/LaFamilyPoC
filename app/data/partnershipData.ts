// ============================================================
// FICHIER : partnershipData.ts
// DESCRIPTION : Données de la page "Devenir partenaire"
// Les textes utilisent les clés de traduction i18n.
// ============================================================

// ------------------------------------------------------------
// 1. FORMULES DE RÉFÉRENCEMENT ANNUEL
// ------------------------------------------------------------

export interface PartnershipTier {
  key: string

  // Clés i18n
  title: string
  description: string

  price: string
  priceSuffix: string

  // Clés i18n des fonctionnalités
  features: string[]

  // Clé i18n du bouton
  ctaLabel: string

  tier?: string

  highlighted?: boolean
}

export const partnershipTiers: PartnershipTier[] = [
  {
    key: "simple",

    title: "tierSimpleTitle",

    price: "CHF 530.–",

    priceSuffix: "perYearHT",

    description: "tierSimpleDesc",

    features: [
      "featurePagePerso",
      "featureSimpleRubriques",
      "featureSimpleAgenda",
      "featureSimpleFacebook",
      "featureCoupDeCoeurNewsletterAccueil",
    ],

    ctaLabel: "tierCtaJeMeLance",
  },

  {
    key: "avance",

    title: "tierAvanceTitle",

    price: "CHF 720.–",

    priceSuffix: "perYearHT",

    description: "tierAvanceDesc",

    features: [
      "featurePagePerso",
      "featureAvanceRubriques",
      "featureAvanceAgenda",
      "featureAvanceFacebook",
      "featureCoupDeCoeurNewsletterAccueil",
    ],

    ctaLabel: "tierCtaJeChoisis",

    highlighted: true,
  },

  {
    key: "superieur",

    title: "tierSuperieurTitle",

    price: "CHF 990.–",

    priceSuffix: "perYearHT",

    description: "tierSuperieurDesc",

    features: [
      "featurePagePerso",
      "featureAvanceRubriques",
      "featureSuperieurAgenda",
      "featureSuperieurFacebook",
      "featureCoupDeCoeurNewsletterAccueil",
    ],

    ctaLabel: "tierCtaJeMeLance",
  },
]

// ------------------------------------------------------------
// 2. COUPS DE PROJECTEUR
// ------------------------------------------------------------

export interface SpotlightOffer {
  key: string

  // Clés i18n
  title: string
  description: string

  price: string
}

export const spotlightOffers: SpotlightOffer[] = [
  {
    key: "banniereHorizontale",

    title: "spotlightBanniereHorizontaleTitle",

    price: "CHF 380.–",

    description: "spotlightBanniereHorizontaleDesc",
  },

  {
    key: "coupDeCoeur",

    title: "spotlightCoupDeCoeurTitle",

    price: "CHF 450.–",

    description: "spotlightCoupDeCoeurDesc",
  },

  {
    key: "banniereAgenda",

    title: "spotlightBanniereAgendaTitle",

    price: "CHF 520.–",

    description: "spotlightBanniereAgendaDesc",
  },

  {
    key: "banniereRubrique",

    title: "spotlightBanniereRubriqueTitle",

    price: "CHF 380.–",

    description: "spotlightBanniereRubriqueDesc",
  },
]

// ------------------------------------------------------------
// 3. STATISTIQUES
// ------------------------------------------------------------

export interface StatItem {
  key: string

  value: string

  // Clé i18n
  label: string

  icon: "eye" | "mail" | "calendar" | "article"
}

export const partnersStats: StatItem[] = [
  {
    key: "visits",
    value: "10'000",
    label: "statVisitsLabel",
    icon: "eye",
  },

  {
    key: "subscribers",
    value: "30'000+",
    label: "statSubscribersLabel",
    icon: "mail",
  },

  {
    key: "events",
    value: "1'500+",
    label: "statEventsLabel",
    icon: "calendar",
  },

  {
    key: "articles",
    value: "8'000+",
    label: "statArticlesLabel",
    icon: "article",
  },
]

// ------------------------------------------------------------
// 4. PUBLIER UN ARTICLE
// ------------------------------------------------------------

export const publishArticleOffer = {
  title: "publishArticleTitle",

  description: "publishArticleDesc",

  price: "CHF 500.–",

  priceSuffix: "publishArticlePriceSuffix",

  ctaLabel: "publishArticleCta",
}

// ------------------------------------------------------------
// 5. DEVENIR EXPERT
// ------------------------------------------------------------

export const becomeExpertOffer = {
  badge: "expertBadge",

  title: "expertTitle",

  description: "expertDesc",

  benefits: [
    "expertBenefit1",
    "expertBenefit2",
    "expertBenefit3",
    "expertBenefit4",
  ],

  price: "CHF 800.–",

  priceSuffix: "perYearHT",

  ctaLabel: "expertCta",
}