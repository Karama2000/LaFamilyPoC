// Structure d'un partenaire affiché dans la liste/grille des partenaires
// (voir PartnerCard.vue et PartnersFilterBar.vue pour l'affichage/filtrage).
export interface Partner {
  id: number;

  // Informations générales
  name: string;
  slug: string;
  logo: string;
  link: string;
  website: string;
  coverage: ("SR" | "SA")[];
  category: string;

  // Page détail
  description:
    | {
        title: string;
        text: string;
      }[]
    | null;

  // Coordonnées
  contact: {
    address: string | null;
    phone: string | null;
    mobile: string | null;
    email: string | null;
    website: string | null;
  };

  // Réseaux sociaux
  socialNetworks: {
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    linkedin: string | null;
    tiktok: string | null;
  };

  // Photos
  photos: string[];
}

// Liste complète des partenaires affichés sur la page "Partenaires".
// ⚠️ Catégories déduites automatiquement du nom — à vérifier/corriger si besoin.
// Logos attendus dans /public/images/logos/{slug}.png (à ajouter toi-même).
export const partnersFR: Partner[] = [
  {
    id: 1,
    name: "Musée suisse de l'appareil photographique",
    slug: "camera-museum",
    logo: "/images/logos/camera-museum.png",
    link: "https://www.cameramuseum.ch/evenements/",
    website: "https://www.cameramuseum.ch/evenements/",
    coverage: ["SR"],
    category: "partnerCatMusee",
    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
  },

  {
    id: 2,
    name: "Faisceau Cadet Vaudois et Valaisan",
    slug: "cadet-vaudois",
    logo: "/images/logos/cadet-vaudois.png",
    link: "https://www.cadet.ch/activites",
    website: "https://www.cadet.ch/activites",
    coverage: ["SR"],
    category: "partnerCatAssociation",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    // events: []
  },

  {
    id: 3,
    name: "Conservatoire de l'Ouest Vaudois",
    slug: "covaud",
    logo: "/images/logos/covaud.png",
    link: "https://www.covaud.ch/f/agenda/concert-et-evenements.asp",
    website: "https://www.covaud.ch/f/agenda/concert-et-evenements.asp",
    coverage: ["SR"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 4,

    name: "FriLingue Gmbh",
    slug: "frilingue",
    logo: "/images/logos/frilingue.png",

    link: "https://www.frilingue.ch/fr/",
    website: "https://www.frilingue.ch/fr/",

    coverage: ["SR", "SA"],
    category: "partnerCatEcole",

    description: [
      {
        title:"A propos",//about
        text:" Camps et séjours linguistiques en Suisse et à l`étranger pour enfants et adolescents entre 8 et 17 ans. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,"//
      },
      {
        title: "Bienvenue chez friLingue !",
        text: `Depuis 2007, friLingue organise des camps de langue pour enfants et adolescents de 8 à 17 ans en Suisse, ainsi que des séjours linguistiques à l’étranger. À Liddes dans le Valais, à Leysin, à Estavayer et autour du lac de Schwarzsee, les participants peuvent apprendre l’allemand, l’anglais ou le français dans une ambiance multilingue et interculturelle, et toujours avec le sourire ! Nos camps en Suisse sont ouverts pendant les vacances scolaires : au printemps, en été, en automne et même en hiver !`,
      },
      {
        title: "Cours de langues",
        text: `Avec friLingue, les leçons d’allemand ou d’anglais se déroulent en petits groupes, pour que les participants aient tous le temps de s’exprimer et que les enseignants, enthousiastes et compétents, puissent les aider individuellement à progresser.`,
      },
      {
        title: "Excursions",
        text: `Deux après-midis par semaine, et tous les samedis, les participants partent en excursion pour découvrir la région : des randonnées dans les montagnes, mais aussi des villes comme Fribourg, Neuchâtel et Sion. Ils découvrent également des musées, comme le Musée Olympique de Lausanne ou le Musée Chaplin de Corsier-sur-Vevey, ainsi que des sites historiques comme le Château de Chillon à Montreux. Au programme également : accrobranche, parcs d’attractions et même du Lasertag !`,
      },
      {
        title: "Ateliers et activités",
        text: `Avec friLingue, il ne suffit pas d’apprendre une langue étrangère pendant les cours du matin. C’est pourquoi, le reste de la journée, les participants de langues maternelles différentes participent à des activités et des ateliers. Ils doivent s’exprimer et se comprendre pour mieux s’amuser, créer des liens et vivre pleinement l’expérience du camp.`,
      },
    ],

    contact: {
      address: "Stöckackerstrasse 93, 3018 Bern, Switzerland",
      phone: "+41 (0)26 321 34 34",
      mobile: null,
      email: "info@frilingue.com",
      website: "https://www.frilingue.ch/fr/",
    },

    socialNetworks: {
      facebook: "https://www.facebook.com/fRilingue/",
      instagram: "https://www.instagram.com/frilingue",
      youtube: "https://www.youtube.com/user/fRilingue",
      linkedin: null,
      tiktok: null,
    },

    photos: [
      "/images/partners/frilingue/1.png",
      "/images/partners/frilingue/2.png",
      "/images/partners/frilingue/3.png",
    ],
  },

  {
    id: 5,
    name: "Fondation Pierre Gianadda",
    slug: "gianadda",
    logo: "/images/logos/gianadda.png",
    link: "https://www.gianadda.ch/explorer/expositions/catalogues",
    website: "https://www.gianadda.ch/explorer/expositions/catalogues",
    coverage: ["SR", "SA"],
    category: "partnerCatMusee",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 6,
    name: "ILS-Bern / International Language School",
    slug: "ils-bern",
    logo: "/images/logos/ils-bern.png",
    link: "https://ils-bern.ch/sprachkurse/sprachcamp-fuer-kinder-und-jugendliche/",
    website:
      "https://ils-bern.ch/sprachkurse/sprachcamp-fuer-kinder-und-jugendliche/",
    coverage: ["SR", "SA"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 7,
    name: "Mudac, Fondation Plateforme 10",
    slug: "mudac",
    logo: "/images/logos/mudac.png",
    link: "https://mudac.ch/agenda/",
    website: "https://mudac.ch/agenda/",
    coverage: ["SR"],
    category: "partnerCatMusee",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 8,
    name: "Nax Région Tourisme",
    slug: "nax-region",
    logo: "/images/logos/nax-region.png",
    link: "https://nax-region.ch/agenda-evenements",
    website: "https://nax-region.ch/agenda-evenements",
    coverage: ["SR", "SA"],
    category: "partnerCatAssociation",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 9,
    name: "Ecole Apolline",
    slug: "apolline",
    logo: "/images/logos/apolline.png",
    link: "https://camps.apolline.art/",
    website: "https://camps.apolline.art/",
    coverage: ["SR"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 10,
    name: "Ecole d'art Ceruleum",
    slug: "ceruleum",
    logo: "/images/logos/ceruleum.png",
    link: "https://www.ceruleum.ch/fr/cours-de-vacances.html",
    website: "https://www.ceruleum.ch/fr/cours-de-vacances.html",
    coverage: ["SR"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    // events: []
  },

  {
    id: 11,
    name: "Fondation Plateforme 10 - Photo Elysée",
    slug: "photo-elysee",
    logo: "/images/logos/photo-elysee.png",
    link: "https://elysee.ch/musee/plateforme10/",
    website: "https://elysee.ch/musee/plateforme10/",
    coverage: ["SR"],
    category: "partnerCatMusee",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 12,
    name: "Conservatoire Montreux-Vevey-Riviera",
    slug: "conservatoire-mvr",
    logo: "/images/logos/conservatoire-mvr.png",
    link: "https://www.conservatoire.ch/agenda",
    website: "https://www.conservatoire.ch/agenda",
    coverage: ["SR"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 13,
    name: "Filolo Sprachferien",
    slug: "filolo",
    logo: "/images/logos/filolo.png",
    link: "https://filolo.ch/camps-linguistiques/ete",
    website: "https://filolo.ch/camps-linguistiques/ete",
    coverage: ["SR", "SA"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 14,
    name: "MS Sports AG",
    slug: "ms-sports",
    logo: "/images/logos/ms-sports.png",
    link: "https://www.mssports.ch/fr/",
    website: "https://www.mssports.ch/fr/",
    coverage: ["SR", "SA"],
    category: "partnerCatAssociation",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 15,
    name: "Code Camp Schweiz AG",
    slug: "codecampworld",
    logo: "/images/logos/codecampworld.png",
    link: "https://fr.codecampworld.ch/unsere-camps-sommer-ferien",
    website: "https://fr.codecampworld.ch/unsere-camps-sommer-ferien",
    coverage: ["SA"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 16,
    name: "Fondation HEMU-CL",
    slug: "hemu",
    logo: "/images/logos/hemu.png",
    link: "https://www.hemu.ch/agenda",
    website: "https://www.hemu.ch/agenda",
    coverage: ["SR"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 17,
    name: "Cadets de Yens",
    slug: "cadets-yens",
    logo: "/images/logos/cadets-yens.png",
    link: "https://www.yens.ch/culture-sport-loisirs/evenements-agenda",
    website: "https://www.yens.ch/culture-sport-loisirs/evenements-agenda",
    coverage: ["SR"],
    category: "partnerCatAssociation",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    // events: []
  },

  {
    id: 18,
    name: "Plateforme 10 - centrale",
    slug: "plateforme10",
    logo: "/images/logos/plateforme10.png",
    link: "https://plateforme10.ch/agenda/?interval=week",
    website: "https://plateforme10.ch/agenda/?interval=week",
    coverage: ["SR"],
    category: "partnerCatMusee",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 19,
    name: "Anzère Tourisme",
    slug: "anzere",
    logo: "/images/logos/anzere.png",
    link: "https://www.anzere.ch/fr/evenements/",
    website: "https://www.anzere.ch/fr/evenements/",
    coverage: ["SR", "SA"],
    category: "partnerCatAssociation",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    // events: []
  },

  {
    id: 20,
    name: "Télé-La Fouly - Champex Lac",
    slug: "saint-bernard",
    logo: "/images/logos/saint-bernard.png",
    link: "https://www.saint-bernard.ch/fr/activites/agenda-32/",
    website: "https://www.saint-bernard.ch/fr/activites/agenda-32/",
    coverage: ["SR"],
    category: "partnerCatAssociation",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 21,
    name: "Futurekids",
    slug: "futurekids",
    logo: "/images/logos/futurekids.png",
    link: "https://futurekids.io/activities/cours-hebdomadaires?city=&online=",
    website:
      "https://futurekids.io/activities/cours-hebdomadaires?city=&online=",
    coverage: ["SR", "SA"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 22,
    name: "Kinderwelt",
    slug: "kinderwelt",
    logo: "/images/logos/kinderwelt.png",
    link: "https://www.heidadorf.ch/agenda",
    website: "https://www.heidadorf.ch/agenda",
    coverage: ["SA"],
    category: "partnerCatGardeEnfants",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 23,
    name: "Fondation Plateforme 10 - MCBA",
    slug: "mcba",
    logo: "/images/logos/mcba.png",
    link: "https://www.mcba.ch/",
    website: "https://www.mcba.ch/",
    coverage: ["SR"],
    category: "partnerCatMusee",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 24,
    name: "Camélia Académie de Danse",
    slug: "camelia",
    logo: "/images/logos/camelia.png",
    link: "https://www.cameliaacademiededanse.ch/cours-de-danse-gland",
    website: "https://www.cameliaacademiededanse.ch/cours-de-danse-gland",
    coverage: ["SR"],
    category: "partnerCatEcole",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },

  {
    id: 25,
    name: "Musées cantonaux du Valais",
    slug: "musees-valais",
    logo: "/images/logos/musees-valais.png",
    link: "https://agenda.culturevalais.ch/fr/agenda",
    website: "https://agenda.culturevalais.ch/fr/agenda",
    coverage: ["SR"],
    category: "partnerCatMusee",

    
    description: null,

    contact: {
      address: null,
      phone: null,
      mobile: null,
      email: null,
      website: null,
    },

    socialNetworks: {
      facebook: null,
      instagram: null,
      youtube: null,
      linkedin: null,
      tiktok: null,
    },

    photos: [],
    //events: []
  },
];

// Catégories de partenaires disponibles pour le filtre par pilules
// (voir PartnersFilterBar.vue). "key" et "labelKey" sont identiques ici
// mais restent séparés pour rester cohérent avec le pattern utilisé ailleurs.
export const partnerCategories: { key: string; labelKey: string }[] = [
  { key: "partnerCatEcole", labelKey: "partnerCatEcole" },
  { key: "partnerCatMusee", labelKey: "partnerCatMusee" },
  { key: "partnerCatAssociation", labelKey: "partnerCatAssociation" },
  { key: "partnerCatGardeEnfants", labelKey: "partnerCatGardeEnfants" },
  { key: "partnerCatCabinet", labelKey: "partnerCatCabinet" },
  { key: "partnerCatExpert", labelKey: "partnerCatExpert" },
];
