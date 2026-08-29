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

  //  ---------- Page devenir partenaire  ----------

  devenirPartnerSubtitle:
    "Rejoignez le réseau LaFamily.ch et gagnez en visibilité auprès des familles de Suisse romande et alémanique.",
  devPartnerAProposTitle: "À propos de Lafamily",
  devPartnerAProposSubtitle: "Le guide de référence des familles suisses",
  devPartnerAProposText:
    "Chaque jour, des milliers de parents utilisent LaFamily.ch pour trouver une garde d'enfant, une école, une activité ou le conseil d'un spécialiste. Fort de 6 sites régionaux (Vaudfamille, Genèvefamille, Valaisfamille, Neuchâtelfamille, Die Familie et LaFamilyShop), le réseau est ancré localement pour répondre aux besoins spécifiques des familles.",
  devPartnerTeamTitle: "Notre équipe",
  devPartnerTeamSubtitle:
    "Les fondateurs de LaFamily.ch, une équipe passionnée à votre écoute",
  devPartnerTeamText:
    "LaFamily.ch est porté par une équipe de parents et de professionnels engagés pour l'information des familles en Suisse.",
  devPartnerTarifsTitle: "Nos tarifs",
  devPartnerTarifsSubtitle:
    "Des formules de référencement adaptées à vos besoins",
  devPartnerTarifsText:
    "Nos référencements sont annuels et renouvelables par tacite reconduction. Choisissez la formule qui correspond à votre zone de diffusion et à vos objectifs de visibilité.",
  devPartnerSpotlightsTitle: "Coups de projecteurs (promotions ponctuelles)",
  devPartnerContactTitle: "Prêt à rejoindre le réseau ?",
  devPartnerContactText:
    "Contactez notre équipe pour recevoir une offre personnalisée, adaptée à votre activité et à votre canton.",
  devPartnerContactAddress: "Dailles 10, 1053 Cugy",
  voirProfilLinkedin: "Voir le profil LinkedIn",
  lePlusChoisi: "Le plus choisi",
  numDieFamilie: " 021 652 52 93",
  mailDieFamilie: "info@lafamily.ch",

  // sidebar
  coupSideBarText: "Nos Coups de cœur de la semaine",
};
