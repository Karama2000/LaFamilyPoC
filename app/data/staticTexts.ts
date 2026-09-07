// Textes statiques de référence, en français, pour tout le site.
// Chaque clé est utilisée dans les composants via la fonction t('cléIci')
// fournie par useTranslation.ts. Les traductions EN/DE/IT sont générées
// (ou surchargées via translationGlossary.ts) à partir de ce fichier.
export const baseTexts: Record<string, string> = {
  // ---------- Header / navigation ----------
  navSearch: "Je cherche...",
  navActivites: "Activités",
  navVacances: "Vacances enfants",
  navCours: "Cours",
  navPartenaire: "Devenir partenaire",
  login: "Login",

  // ---------- Menu "Je cherche..." ----------
  catGrossesse: "Grossesse",
  catBebe: "Bébé",
  catPetiteEnfance: "Petite enfance",
  catEnfance: "Enfance",
  catAdolescence: "Adolescence",
  catScolarite: "Scolarité",
  catParents: "Parents",
  catVieDeFamille: "Vie de famille",
  catTravail: "Travail",
  catBudgetAssurance: "Budget et assurance",


  
  // ---------- Descriptions du menu "Je cherche..." ----------
  // Affichées en sous-titre du hero sur pages/menuFolder/article.vue,
  // référencées par menuData.ts (searchCategories[].descriptionKey).
  catGrossesseDesc:
    "Tout ce qu'il faut savoir pour vivre sereinement la grossesse et préparer l'arrivée de bébé.",
  catBebeDesc:
    "Conseils, services et ressources pour accompagner bébé dans ses premiers mois et ses premières années.",
  catPetiteEnfanceDesc:
    "Des ressources et activités pour accompagner les enfants dans leurs premières années.",
  catEnfanceDesc:
    "Services, activités et informations pour accompagner les enfants au quotidien et dans leur développement.",
  catAdolescenceDesc:
    "Des ressources, activités et services pour accompagner les adolescents dans cette période de changement.",
  catScolariteDesc:
    "Tout pour accompagner les enfants et les jeunes dans leur parcours scolaire et leur réussite.",
  catParentsDesc:
    "Conseils, services et ressources pour accompagner les parents dans leur quotidien et leur rôle.",
  catVieDeFamilleDesc:
    "Des ressources et services pour faciliter la vie familiale et profiter pleinement des moments en famille.",
  catTravailDesc:
    "Informations, services et ressources pour concilier vie professionnelle, familiale et personnelle.",
  catBudgetAssuranceDesc:
    "Des informations et services pour mieux gérer le budget familial, les dépenses et les assurances.",

  // ---------- Menu "Activités" ----------
  actPleinAir: "Activités physiques",
  actCulturelles: "Activités culturelles",
  actAutres: "Autres activités",

  // ---------- Menu "Vacances enfants" ----------
  vacCamps: "Camps",
  vacCampsDuJour: "Camps du jour",

  // ---------- Menu "Cours" ----------
  coursSoutien: "Soutien scolaire",
  coursLangues: "Cours de langues",
  coursArt: "Ateliers d'art",
  coursSport: "Séances de sport",
  coursNumeriques: "Cours numériques",

  // ---------- Descriptions du menu "Activités" ----------
  actPleinAirDesc:
    "Des activités sportives et de plein air pour bouger, se divertir et profiter du temps en famille.",
  actCulturellesDesc:
    "Découvrez des activités culturelles, artistiques et créatives pour petits et grands.",
  actAutresDesc:
    "Une sélection d'autres activités et idées de loisirs adaptées aux familles.",

  // ---------- Descriptions du menu "Vacances enfants" ----------
  vacCampsDesc:
    "Des camps de vacances pour permettre aux enfants et aux jeunes de s'amuser, découvrir et faire de nouvelles expériences.",
  vacCampsDuJourDesc:
    "Des camps à la journée pour occuper les enfants pendant les vacances tout en leur offrant des activités variées.",

  // ---------- Descriptions du menu "Cours" ----------
  coursSoutienDesc:
    "Des cours et accompagnements pour aider les élèves à progresser, comprendre et réussir à l'école.",
  coursLanguesDesc:
    "Des cours de langues pour apprendre, pratiquer et développer ses compétences linguistiques.",
  coursArtDesc:
    "Des ateliers artistiques pour développer la créativité et découvrir différentes formes d'expression.",
  coursSportDesc:
    "Des séances sportives adaptées aux enfants, aux jeunes et aux familles pour bouger et prendre plaisir à pratiquer.",
  coursNumeriquesDesc:
    "Des cours pour découvrir les outils numériques, développer ses compétences et apprendre autrement.",



  // ---------- Page d'accueil (hero, sélection, blog, nouveautés, coups de cœur, newsletter, pied de page) ----------
  heroTitle1: "Centre Global ",
  heroTitle2: "d'informations de la famille",
  heroTitle3: "suisse-alémanique",
  heroSubtitle:
    "Parce que les plus beaux moments ne se passent jamais à chercher.",
  ctaBonsPlans: "Découvrez nos bons plans",
  ctaPartenaires: "Découvrez nos partenaires",
  selectionTitle: "Notre Sélection de la semaine",
  enSavoirPlus: "En savoir plus",
  voirLesDetails: "Voir les détails",
  blogTitle: "Blog",
  voirPlus: "Voir plus",
  coupsDeCoeurTitle: "Nos Coups de cœur de la semaine",
  newsletterTitle: "Restez toujours informés de tout avec nous",
  newsletterSubtitle:
    "Inscrivez-vous à notre newsletter pour recevoir toutes les bonnes actualités.",
  emailPlaceholder: "Email",
  subscribe: "S'inscrire",
  mentionsLegales: "Mentions légales",
  rights: "Tous droits réservés",


  ChoisirText:"Choisir",
  Nothing: "Aucun canton trouvé",

  // ---------- Page Agenda ----------
  agendaTitle: "Notre agenda",
  agendaSubtitle:
    "Retrouvez tous nos événements et activités coups de cœur et faites le plein de bonheur en famille !",
  agendaFilterBtn: "Filtrer",
  agendaApply: "Voir les résultats",
  agendaReset: "Réinitialiser",
  agendaResultsSuffix: "résultat(s) trouvé(s)",
  agendaEmptyTitle: "Aucun résultat pour ces critères",
  agendaEmptyText:
    "Essayez d'élargir votre recherche en retirant un ou plusieurs filtres.",
  agendaCalendarClear: "Effacer",
  agendaCalendarToday: "Aujourd'hui",
  agendaSearchTitle: "Raffiner votre recherche",
  agendaSearchBtn: "Chercher",
  agendaSearchDateFrom: "Du",
  agendaSearchDateTo: "Au",
  agendaFiltresTitle: "Filtres",
  filterRegionChoisir: "Choisir",
  filterReset: "Réinitialiser",
  filterRegionSelected: " régions sélectionnées",

  // ---------- Page détail Agenda ----------
  agendaInfosPratiques: "Informations pratiques",
  agendaLabelDate: "Date",
  agendaLabelLieu: "Lieu",
  agendaLabelHoraires: "Horaires",
  agendaLabelTarif: "Tarif",
  agendaContact: "Contact",
  agendaDescription: "Description",
  agendaAutresDates: "Autres dates",
  agendaAutresAdresses: "Autres adresses",
  agendaAutresLieuxDates: "Retrouvez-nous également à",
  agendaLe: "le",
  agendaSiteOrganisateur: "Plus d'infos sur le site de l'organisateur",
  agendaDateValidate: "Valider",

  // Libellés des sections de filtres (tiroir AgendaFilterDrawer.vue)
  filterRegion: "Région",
  filterRegionAll: "Toute la Suisse",
  filterAge: "Âge",
  filterActivites: "Activités",
  filterCamps: "Camps (avec logement)",
  filterCampsJour: "Camps de jour (sans logement)",
  filterCours: "Cours",
  filterLangues: "Langues",
  filterLoisirs: "Loisirs",
  filterSports: "Sports",
  filterEtudes: "Études",
  filterIT: "Digital",
  filterClose: "Fermer",
  filterCampsDuJour:"Camps du jour",

  // Libellés des tranches d'âge
  ageBebe: "Bébé",
  agePetitEnfant: "Petit enfant",
  ageEnfant: "Enfant",
  ageAdolescent: "Adolescent",
  ageAdulte: "Adulte",

  // ---------- Page Partenaires ----------
  partnersTitle: "Nos partenaires",
  partnersSubtitle1: "Des partenaires engagés à nos côtés",
  partnersSubtitle2: "Ensemble on va plus loin !",
  partnersFilterZone: "Zone",
  partnersZoneAll: "Toute la Suisse",
  partnersZoneSR: "Suisse romande",
  partnersZoneSA: "Suisse alémanique",
  partnersFilterCategory: "Catégorie",
  partnersCategoryAll: "Toutes",
  partnerCatEcole: "École",
  partnerCatMusee: "Musée",
  partnerCatAssociation: "Association",
  partnerCatGardeEnfants: "Garde d'enfants",
  partnerCatCabinet: "Cabinet",
  partnerCatExpert: "Expert",
  partnersResultsSuffix: "partenaire(s) trouvé(s)",
  partnersEmptyTitle: "Aucun partenaire pour ces critères",
  partnersEmptyText:
    "Essayez d'élargir votre recherche en retirant un ou plusieurs filtres.",
  visitSite: "Visiter le site",
  partnersReset: "Réinitialiser",
  partnerCoordonnees: "Coordonnées",
  partnerEvenements: "Evènements de",
  VisiterLeSite: "Visiter le site",
  partnerAPropos: "A propos",
  partnerDescription: "Description",
  partnerGalerie: "Galerie photos",
  partnerLabelAdresse: "Adresse",
  partnerLabelTelephone: "phone",
  partnerLabelMobile: "mobile",
  partnerLabelEmail: "Email",
  partnerLabelSite: "Site Internet",
  partnerReseauxSociaux: "Réseaux Sociaux",

  //  ---------- Blog  ----------

  blogRefineSearch: "Raffiner votre recherche",
  blogSubtitle:
    "Conseils d’experts,dossiers pratiques et informations utiles pour accompagner votre famille au quotidien",
  articleAlsoRead: "Autres articles",
  filterAgenda: "Agenda",
  partnerBtn: "Partenaires",
  AutreArticles: "Autres articles",
  cantons_sélectionnés:" cantons sélectionnés",

// ---------- Page devenir partenaire : hero + nav ----------

devenirPartnerSubtitle: "Faites connaître votre activité auprès de milliers de familles en Suisse romande.",

// ---------- Page devenir partenaire : à propos ----------
devPartnerAProposTitle: "À propos de LaFamily.ch",
devPartnerAProposSubtitle: "La référence des familles en Suisse romande",
devPartnerAProposText: "Depuis sa création, LaFamily.ch accompagne au quotidien les parents dans l'éducation, les loisirs et la vie de famille. Rejoindre notre réseau de partenaires, c'est gagner en visibilité auprès d'une communauté de familles engagées et fidèles, à travers nos rubriques, notre agenda et notre newsletter.",

// ---------- Page devenir partenaire : statistiques (labels déjà présents, gardés) ----------
// statVisitsLabel, statSubscribersLabel, statEventsLabel, statArticlesLabel : déjà dans ton fichier

// ---------- Page devenir partenaire : notre équipe ----------
devPartnerTeamTitle: "Notre équipe",
devPartnerTeamSubtitle: "Des passionnées au service des familles",
devPartnerTeamText: "LaFamily.ch est porté par une équipe de fondatrices convaincues que l'information et l'entraide facilitent la vie de famille. Découvrez les visages derrière le projet.",
voirProfilLinkedin: "Voir le profil LinkedIn",

// ---------- Page devenir partenaire : nos tarifs ----------
devPartnerTarifsTitle: "Nos tarifs",
devPartnerTarifsSubtitle: "Un référencement adapté à vos besoins",
devPartnerTarifsText: "Choisissez la formule qui correspond le mieux à votre visibilité souhaitée, du référencement local au rayonnement sur toute la Suisse romande.",

// ---------- Page devenir partenaire : coups de projecteur (titre de section) ----------
devPartnerSpotlightsTitle: "Coups de projecteur",

// ---------- Page devenir partenaire : contact ----------
devPartnerContactTitle: "Contact",
devPartnerContactText: "Une question sur nos offres partenaires ? Notre équipe vous répond avec plaisir.",
devPartnerContactAddress: "Suisse romande",
mailDieFamilie: "info@lafamily.ch",
numDieFamilie: "021 652 52 93",




   // ---------- Page devenir partenaire : tarifs ----------
  perYearHT: "HT / an",
  tierSimpleTitle: "Référencement simple",
  tierSimpleDesc: "Pour les petites entreprises ou particuliers qui débutent — 1 canton",
  tierAvanceTitle: "Référencement avancé",
  tierAvanceDesc: "Pour étendre efficacement votre visibilité — Suisse romande",
  tierSuperieurTitle: "Référencement supérieur",
  tierSuperieurDesc: "Pour une visibilité inégalée sur nos sites — Suisse romande",
  tierCtaJeMeLance: "Je me lance",
  tierCtaJeChoisis: "Je choisis cette offre",

  featurePagePerso: "Page de présentation personnelle (logo, contact, photos, vidéos)",
  featureCoupDeCoeurNewsletterAccueil: "1 Coup de cœur + 1 parution newsletter hebdo + 1 parution page d'accueil",
  featureSimpleRubriques: "10 rubriques",
  featureSimpleAgenda: "10 événements dans notre agenda",
  featureSimpleFacebook: "1 publication Facebook boostée (20.–)",
  featureAvanceRubriques: "15 rubriques",
  featureAvanceAgenda: "20 modules agenda",
  featureAvanceFacebook: "1 publication Facebook boostée (30.–)",
  featureSuperieurAgenda: "30 modules agenda",
  featureSuperieurFacebook: "1 publication Facebook boostée (40.–)",

  // ---------- Page devenir partenaire : coups de projecteur ----------
  periodPerWeek: "HT / semaine",
  periodPer30Days: "HT / 30 jours",
  periodPer6Months: "HT / 6 mois",
  spotlightBanniereHorizontaleTitle: "Bannière horizontale",
  spotlightBanniereHorizontaleDesc: "Au-dessus du menu, visible sur toutes les pages du site",
  spotlightCoupDeCoeurTitle: "Coup de Cœur",
  spotlightCoupDeCoeurDesc: "À droite du contenu (desktop) ou sous chaque article (mobile)",
  spotlightBanniereAgendaTitle: "Bannière Agenda",
  spotlightBanniereAgendaDesc: "En haut de la page agenda — idéal pour les camps de vacances",
  spotlightBanniereRubriqueTitle: "Bannière Rubrique",
  spotlightBanniereRubriqueDesc: "Au-dessus du titre d'une rubrique ciblée",

  // ---------- Page devenir partenaire : statistiques ----------
  statVisitsLabel: "visites par jour",
  statSubscribersLabel: "familles abonnées à la newsletter",
  statEventsLabel: "activités dans nos agendas",
  statArticlesLabel: "articles écrits pour les familles",

  // ---------- Page devenir partenaire : publier un article ----------
  publishArticleTitle: "Publier un article",
  publishArticleDesc: "Faites-vous connaître en publiant un article : minimum 300 mots, 1 à 2 photos, votre nom/entreprise et un lien vers votre site, tous deux placés dans des balises optimisées pour le référencement (SEO).",
  publishArticlePriceSuffix: "HT / parution / site",
  publishArticleCta: "Je veux participer",

  // ---------- Page devenir partenaire : devenez Expert ----------
  expertBadge: "Aller plus loin",
  expertTitle: "Devenez Expert LaFamily",
  expertDesc: "Réservé aux partenaires avec un référencement annuel actif. Devenez une référence dans votre domaine et répondez gratuitement aux questions des familles, comme le font déjà nos experts en éducation, psychologie, droit de la famille ou coaching.",
  expertBenefit1: "3 articles ou plus par année",
  expertBenefit2: "Chaque article visible en page d'accueil au moins 1 semaine",
  expertBenefit3: "Présence dans la newsletter au moins 4 fois par an",
  expertBenefit4: "Liaison directe : les familles vous posent leurs questions gratuitement",
  expertCta: "Devenir Expert",

  // sidebar
  coupSideBarText: "Nos Coups de cœur de la semaine",

  rechercherCanton:"Rechercher un canton...",

  //date
  agendaJanuary: "janvier",
agendaFebruary: "février",
agendaMarch: "mars",
agendaApril: "avril",
agendaMay: "mai",
agendaJune: "juin",
agendaJuly: "juillet",
agendaAugust: "août",
agendaSeptember: "septembre",
agendaOctober: "octobre",
agendaNovember: "novembre",
agendaDecember: "décembre",

agendaMonday: "lu",
agendaTuesday: "ma",
agendaWednesday: "me",
agendaThursday: "je",
agendaFriday: "ve",
agendaSaturday: "sa",
agendaSunday: "di",

agendaPreviousMonth: "Mois précédent",
agendaNextMonth: "Mois suivant",
};
