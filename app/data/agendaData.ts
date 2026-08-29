// Données de référence pour la page Agenda : listes de filtres (cantons,
// tranches d'âge, sous-catégories de camps) et événements de démonstration
// affichés par défaut (voir AgendaFilterDrawer.vue et AgendaEventCard.vue).

// Structure générique d'une option de filtre à choix multiple
// (utilisée telle quelle pour les sous-catégories de camps)
export interface FilterOption {
  key: string       // valeur technique stockée dans le tableau de filtres actifs
  labelKey: string  // clé de traduction du libellé affiché
}

// ---------- Région : les 26 cantons suisses ----------
export const cantons: { key: string; label: string }[] = [
  { key: 'ZH', label: 'Zurich' },
  { key: 'BE', label: 'Berne' },
  { key: 'LU', label: 'Lucerne' },
  { key: 'UR', label: 'Uri' },
  { key: 'SZ', label: 'Schwytz' },
  { key: 'OW', label: 'Obwald' },
  { key: 'NW', label: 'Nidwald' },
  { key: 'GL', label: 'Glaris' },
  { key: 'ZG', label: 'Zoug' },
  { key: 'FR', label: 'Fribourg' },
  { key: 'SO', label: 'Soleure' },
  { key: 'BS', label: 'Bâle-Ville' },
  { key: 'BL', label: 'Bâle-Campagne' },
  { key: 'SH', label: 'Schaffhouse' },
  { key: 'SG', label: 'Saint-Gall' },
  { key: 'GR', label: 'Grisons' },
  { key: 'AG', label: 'Argovie' },
  { key: 'TG', label: 'Thurgovie' },
  { key: 'TI', label: 'Tessin' },
  { key: 'VD', label: 'Vaud' },
  { key: 'VS', label: 'Valais' },
  { key: 'NE', label: 'Neuchâtel' },
  { key: 'GE', label: 'Genève' },
  { key: 'JU', label: 'Jura' },
  { key: 'AR', label: 'Appenzell Rhodes-Ext.' },
  { key: 'AI', label: 'Appenzell Rhodes-Int.' },
]

// ---------- Âge : catégories avec marge d'âge ----------
export interface AgeGroup {
  key: string       // valeur technique stockée dans le tableau de filtres actifs
  labelKey: string  // clé de traduction du libellé affiché
  range: string     // tranche d'âge affichée sous le libellé (texte libre, non traduit)
}

export const ageGroups: AgeGroup[] = [
  { key: 'bebe', labelKey: 'ageBebe', range: '0 – 2 ans' },
  { key: 'petitEnfant', labelKey: 'agePetitEnfant', range: '3 – 5 ans' },
  { key: 'enfant', labelKey: 'ageEnfant', range: '6 – 11 ans' },
  { key: 'adolescent', labelKey: 'ageAdolescent', range: '12 – 17 ans' },
  { key: 'adulte', labelKey: 'ageAdulte', range: '18 ans et +' }
]

// ---------- Sous-catégories communes à Camps / Camps de jour ----------
export const campSubcategories: FilterOption[] = [
  { key: 'langues', labelKey: 'filterLangues' },
  { key: 'loisirs', labelKey: 'filterLoisirs' },
  { key: 'sports', labelKey: 'filterSports' },
  { key: 'etudes', labelKey: 'filterEtudes' },
  { key: 'digital', labelKey: 'filterIT' }
]

// ---------- Événements (contenu de démonstration) ----------
// Les 4 grandes catégories affichées dans l'agenda et le tiroir de filtres
export type AgendaCategorie = 'activite' | 'campLogement' | 'campJour' | 'cours'

export interface AgendaEvent {
  id: string                   // identifiant unique de l'événement
  titre: string                 // titre affiché sur la carte
  lieu: string                  // lieu affiché (texte libre, avec ville)
  cantonKey: string             // code du canton (correspond à "cantons" ci-dessus), utilisé pour le filtre région
  date: string                  // date affichée en clair sur la carte (déjà formatée pour l'utilisateur)
  dateStart: string             // date de début au format ISO 'YYYY-MM-DD', utilisée pour le filtre de dates
  dateEnd: string                // date de fin au format ISO 'YYYY-MM-DD', utilisée pour le filtre de dates
  image: string                  // chemin de l'image de la carte
    categorie: AgendaCategorie     // grande catégorie de l'événement
  categorieDetaillee?: string     // libellé brut et détaillé fourni par le back
  categorieLabel?: string         // alias du libellé brut fourni par l’API
  sousCategorie: string          // sous-catégorie : clé de menuData.ts (activités/cours) ou de campSubcategories (camps)

  ageKeys: string[]              // tranches d'âge concernées (clés de ageGroups ci-dessus)
  partnerId?: number
  horaires?: string          // ex: '14h à 15h'
  tarif?: string              // ex: 'CHF 15.– enfants) / CHF 20.– (adultes)'
  description?: string        // texte long affiché dans la carte "Description"
  infoComplementaire?: string // note courte affichée sous la description (ex: durée, réservation)
  contactTel?: string         // ex: '021 619 45 45'
  contactEmail?: string       // ex: 'billetterie@vidy.ch'
  siteUrl?: string            // lien "Plus d'infos sur le site de l'organisateur"
  autresDates?: string[]      // ex: ['8 août', '15 août', '22 août']
  autresAdresses?: string[]   // ex: ['Zurich', 'Berne']
    autresLieuxDates?: { lieu: string; date: string }[] // ex: [{ lieu: 'Fribourg', date: '14 septembre 2026' }]
  autresDatesISO?: { dateStart: string; dateEnd: string }[] // occurrences supplémentaires pour le filtrage par date

}

// Liste d'événements factices (mock) utilisée en attendant le vrai
// contenu dynamique de l'agenda (ex. venant de Google Sheets / API).

export const agendaEventsFR: AgendaEvent[] = [
  {
    id: '1', titre: 'Spectacle de marionnettes « Le Petit Roi »', lieu: 'Théâtre de Vidy, Lausanne',
    cantonKey: 'VD', date: 'Sam. 8 août 2026', dateStart: '2026-08-08', dateEnd: '2026-08-08', image: '/images/sélection/1.jpeg',
    categorie: 'activite', sousCategorie: 'actCulturelles', ageKeys: ['petitEnfant', 'enfant'],partnerId: 8,
    horaires: '14h à 15h',
    tarif: 'CHF 15.– (enfants) / CHF 20.– (adultes)',
    description: 'Une compagnie de marionnettistes présente « Le Petit Roi », un conte poétique et drôle qui emmène petits et grands dans un royaume imaginaire peuplé de créatures attachantes. Le spectacle mêle marionnettes à fils, ombres chinoises et musique live pour une expérience immersive adaptée dès 3 ans.',
    infoComplementaire: 'Durée : 50 minutes, sans entracte. Places limitées, réservation conseillée.',
    contactTel: '021 619 45 45',
    contactEmail: 'billetterie@vidy.ch',
    siteUrl: 'https://vidy.ch',
    autresDates: ['8 août', '15 août', '22 août'],
    autresAdresses: ['Zurich', 'Berne'],
    autresLieuxDates: [
      { lieu: 'Fribourg', date: '14 septembre 2026' },
      { lieu: 'Lausanne', date: '12 décembre 2026' },
    ],
  },
  {
    id: '2', titre: 'Rando-découverte en famille', lieu: 'Parc naturel du Jorat',
    cantonKey: 'VD', date: 'Dim. 9 août 2026', dateStart: '2026-08-09', dateEnd: '2026-08-09', image: '/images/sélection/2.jpeg',
    categorie: 'activite', sousCategorie: 'actPleinAir', ageKeys: ['enfant', 'adolescent', 'adulte'],partnerId: 6,
    horaires: '9h à 12h30',
    tarif: 'Gratuit',
    description: 'Une balade guidée en famille au cœur du Parc naturel du Jorat, ponctuée de jeux de piste, d\'observations de la faune locale et d\'ateliers nature pour les enfants. Un moment convivial pour (re)découvrir la forêt vaudoise autrement, encadré par des guides nature diplômés.',
    infoComplementaire: 'Durée : environ 3h30, parcours de 6 km, praticable en poussette tout-terrain. Prévoir de bonnes chaussures et une gourde.',
    contactTel: '021 316 43 21',
    contactEmail: 'info@parcjorat.ch',
    siteUrl: 'https://parc-jorat.ch',
    autresDates: ['9 août', '23 août', '6 septembre'],
    autresAdresses: ['Lausanne'],
  },
  {
    id: '3', titre: 'Camp de voile — 5 jours avec hébergement', lieu: 'Centre nautique, Genève',
    cantonKey: 'GE', date: 'Du 3 au 7 août 2026', dateStart: '2026-08-03', dateEnd: '2026-08-07', image: '/images/nouveautes/1.jpeg',
    categorie: 'campLogement', sousCategorie: 'sports', ageKeys: ['adolescent'],partnerId: 4,
    horaires: 'Arrivée dim. 18h — Départ ven. 16h',
    tarif: 'CHF 690.– (pension complète incluse)',
    description: 'Cinq jours d\'immersion totale sur les rives du Léman pour apprendre ou perfectionner la voile, en dériveur ou en catamaran, avec des moniteurs brevetés Swiss Sailing. Hébergement en dortoirs au centre nautique, encadrement 24h/24, activités du soir et veillées organisées entre les sessions sur l\'eau.',
    infoComplementaire: 'Groupes de 8 jeunes maximum par moniteur. Niveau débutant à intermédiaire, matériel fourni. Places limitées à 24 participants.',
    contactTel: '022 735 60 12',
    contactEmail: 'camps@centrenautique-geneve.ch',
    siteUrl: 'https://centrenautique-geneve.ch',
    autresDates: ['Du 3 au 7 août', 'Du 10 au 14 août', 'Du 17 au 21 août'],
  },
  {
    id: '4', titre: 'Camp d\'anglais immersif', lieu: 'Institut Le Rosey, Rolle',
    cantonKey: 'VD', date: 'Du 10 au 14 août 2026', dateStart: '2026-08-10', dateEnd: '2026-08-14', image: '/images/nouveautes/2.jpeg',
    categorie: 'campLogement', sousCategorie: 'langues', ageKeys: ['enfant', 'adolescent'],partnerId: 14,
    horaires: 'Arrivée dim. 17h — Départ ven. 15h',
    tarif: 'CHF 890.– (pension complète incluse)',
    description: 'Une semaine d\'anglais 100% immersif dans le cadre prestigieux de l\'Institut Le Rosey : cours en petits groupes le matin, activités sportives et culturelles l\'après-midi, tout en anglais. Encadrement par des enseignants natifs, méthode ludique adaptée à chaque niveau.',
    infoComplementaire: 'Groupes de niveau (débutant à avancé) établis dès le premier jour. Hébergement en chambres de 2 à 4 lits, pension complète.',
    contactTel: '021 822 55 00',
    contactEmail: 'summercamps@rosey.ch',
    siteUrl: 'https://rosey.ch/summer-camps',
    autresDates: ['Du 10 au 14 août', 'Du 17 au 21 août'],
  },
  {
    id: '5', titre: 'Camp de jour multisport', lieu: 'Centre sportif, Fribourg',
    cantonKey: 'FR', date: 'Du 3 au 7 août 2026', dateStart: '2026-08-03', dateEnd: '2026-08-07', image: '/images/nouveautes/3.jpeg',
    categorie: 'campJour', sousCategorie: 'sports', ageKeys: ['petitEnfant', 'enfant'],partnerId: 2,
    horaires: '8h30 à 17h30 (garderie dès 7h30)',
    tarif: 'CHF 245.– la semaine (repas de midi inclus)',
    description: 'Une semaine dynamique autour de la découverte sportive : football, athlétisme, escalade, jeux d\'eau et sports collectifs, encadrée par des moniteurs J+S. Chaque journée alterne activités individuelles et jeux d\'équipe pour développer la motricité et l\'esprit d\'équipe des enfants.',
    infoComplementaire: 'Accueil à la journée ou à la semaine. Repas de midi et goûter fournis. Prévoir une tenue de sport et des habits de rechange.',
    contactTel: '026 351 90 10',
    contactEmail: 'camps@centresportif-fribourg.ch',
    siteUrl: 'https://www.ville-fribourg.ch/sports',
    autresDates: ['Du 3 au 7 août', 'Du 10 au 14 août'],
    autresAdresses: ['Bulle'],
  },
  {
    id: '6', titre: 'Camp de jour numérique — initiation coding', lieu: 'FabLab, Neuchâtel',
    cantonKey: 'NE', date: 'Du 17 au 21 août 2026', dateStart: '2026-08-17', dateEnd: '2026-08-21', image: '/images/nouveautes/4.jpeg',partnerId: 4,
    categorie: 'campJour', sousCategorie: 'digital', ageKeys: ['enfant', 'adolescent'],
    horaires: '9h à 16h',
    tarif: 'CHF 280.– la semaine (matériel inclus)',
    description: 'Une semaine pour s\'initier à la programmation et à la robotique de façon ludique : création de petits jeux vidéo, découverte du code avec Scratch, montage et programmation de robots. Les participants repartent avec leur propre projet terminé en fin de semaine.',
    infoComplementaire: 'Aucune connaissance préalable requise. Groupes de 10 enfants maximum par animateur, ordinateurs et robots fournis sur place.',
    contactTel: '032 889 69 00',
    contactEmail: 'fablab@ne.ch',
    siteUrl: 'https://fablab-neuchatel.ch',
    autresDates: ['Du 17 au 21 août', 'Du 24 au 28 août'],
  },
  {
    id: '7', titre: 'Cours de soutien scolaire — mathématiques', lieu: 'En ligne / Suisse romande',
    cantonKey: 'VD', date: 'Dès le 25 août 2026', dateStart: '2026-08-25', dateEnd: '2026-12-19', image: '/images/nouveautes/5.jpeg',
    categorie: 'cours', sousCategorie: 'coursSoutien', ageKeys: ['enfant', 'adolescent'],
    horaires: 'Mardis et jeudis, 17h à 18h',
    tarif: 'CHF 45.– / séance ou CHF 380.– le semestre',
    description: 'Cours de soutien en mathématiques dispensés en ligne par des enseignants diplômés, en petits groupes de niveau (primaire, secondaire I ou secondaire II). Suivi personnalisé, exercices ciblés sur les lacunes identifiées et préparation aux évaluations scolaires.',
    infoComplementaire: 'Séance d\'évaluation gratuite avant inscription. Groupes de 4 élèves maximum, cours via visioconférence.',
    contactTel: '021 555 12 34',
    contactEmail: 'soutien@coursenligne.ch',
    siteUrl: 'https://coursenligne.ch',
  },
  {
    id: '8', titre: 'Atelier de dessin & bande dessinée', lieu: 'Maison de quartier, Bienne',
    cantonKey: 'BE', date: 'Sam. 15 août 2026', dateStart: '2026-08-15', dateEnd: '2026-08-15', image: '/images/nouveautes/6.jpeg',
    categorie: 'cours', sousCategorie: 'coursArt', ageKeys: ['petitEnfant', 'enfant', 'adolescent'],
    horaires: '10h à 12h',partnerId: 9,
    tarif: 'CHF 25.– (matériel fourni)',
    description: 'Un atelier animé par une illustratrice professionnelle pour découvrir les bases du dessin et de la bande dessinée : personnages, cases, bulles de texte. Chaque participant repart avec sa propre planche de BD illustrée.',
    infoComplementaire: 'Aucune expérience requise. Tout le matériel (papier, crayons, feutres) est fourni sur place.',
    contactTel: '032 322 14 88',
    contactEmail: 'ateliers@maisonquartier-bienne.ch',
    siteUrl: 'https://www.biel-bienne.ch/fr/generations-et-quartiers.html/830',
    autresDates: ['15 août', '29 août', '12 septembre'],
  },
  {
    id: '9', titre: 'Grand troc de vêtements enfants', lieu: 'Salle communale, Sion',
    cantonKey: 'VS', date: 'Sam. 22 août 2026', dateStart: '2026-08-22', dateEnd: '2026-08-22', image: '/images/nouveautes/7.jpeg',
    categorie: 'activite', sousCategorie: 'actAutres', ageKeys: ['bebe', 'petitEnfant', 'enfant', 'adulte'],partnerId: 9,
    horaires: '9h à 16h (dépôt dès 8h)',
    tarif: 'Entrée libre',
    description: 'Grand événement d\'échange et de troc de vêtements, jouets et matériel de puériculture entre familles. Apportez ce dont vous n\'avez plus besoin et repartez avec des trésors pour vos enfants, dans une démarche solidaire et écoresponsable. Buvette et animations pour enfants sur place.',
    infoComplementaire: 'Dépôt des articles la veille ou le matin même avant 8h30. Système de bons d\'échange, aucun argent liquide nécessaire.',
    contactTel: '027 322 40 10',
    contactEmail: 'contact@trocenfants-sion.ch',
    siteUrl: 'https://venteechangesion.wordpress.com/',
    autresLieuxDates: [
      { lieu: 'Martigny', date: '5 septembre 2026' },
      { lieu: 'Monthey', date: '19 septembre 2026' },
    ],
  },
  {
    id: '10', titre: 'Camp d\'été « Nature & Aventure »', lieu: 'Chalet des Diablerets',
    cantonKey: 'VD', date: 'Du 3 au 10 août 2026', dateStart: '2026-08-03', dateEnd: '2026-08-10', image: '/images/nouveautes/8.jpeg',
    categorie: 'campLogement', sousCategorie: 'loisirs', ageKeys: ['enfant', 'adolescent'],partnerId: 19,
    horaires: 'Arrivée dim. 14h — Départ lun. 11h',
    tarif: 'CHF 750.– (pension complète incluse)',
    description: 'Une semaine complète en pleine nature dans le cadre alpin des Diablerets : randonnées, construction de cabanes, jeux de piste, nuit sous tente et veillées autour du feu. Un camp pensé pour développer l\'autonomie, l\'esprit d\'équipe et la découverte de la nature loin des écrans.',
    infoComplementaire: 'Hébergement en chalet et sous tente selon les nuits. Encadrement par des moniteurs brevetés Croix-Rouge / J+S. Liste du matériel à emporter fournie à l\'inscription.',
    contactTel: '024 492 33 45',
    contactEmail: 'info@chalet-diablerets.ch',
    siteUrl: 'https://chalet-diablerets.ch',
    autresDates: ['Du 3 au 10 août', 'Du 10 au 17 août'],
  },
  {
    id: '11', titre: 'Séances de yoga parent-bébé', lieu: 'Studio Zen, Zurich',
    cantonKey: 'ZH', date: 'Tous les mardis', dateStart: '2026-08-04', dateEnd: '2026-12-15', image: '/images/sélection/3.jpeg',
    categorie: 'cours', sousCategorie: 'coursSport', ageKeys: ['bebe', 'adulte'],partnerId: 22,
    horaires: 'Mardis, 10h à 11h',
    tarif: 'CHF 32.– / séance ou CHF 280.– la carte de 10',
    description: 'Des séances douces de yoga parent-bébé pour renforcer le lien avec votre tout-petit tout en prenant soin de votre corps après l\'accouchement. Postures adaptées, exercices de respiration et moments de détente partagés, dans une ambiance bienveillante et sans jugement.',
    infoComplementaire: 'Ouvert dès 6 semaines après l\'accouchement (avec accord médical). Tapis et coussins fournis, prévoir une tenue confortable.',
    contactTel: '044 251 77 20',
    contactEmail: 'hello@studiozen-zurich.ch',
    siteUrl: 'https://studiozen-zurich.ch',
  },
  {
    id: '12', titre: 'Cours d\'allemand pour ados', lieu: 'Sprachschule, Bâle',
    cantonKey: 'BS', date: 'Dès le 18 août 2026', dateStart: '2026-08-18', dateEnd: '2026-12-19', image: '/images/sélection/4.jpeg',
    categorie: 'cours', sousCategorie: 'coursLangues', ageKeys: ['adolescent'],partnerId: 15,
    horaires: 'Mercredis, 16h à 17h30',
    tarif: 'CHF 55.– / séance ou CHF 420.– le semestre',
    description: 'Cours d\'allemand conçus spécifiquement pour les adolescents romands, avec une approche communicative et interactive : jeux de rôle, mises en situation réelles et préparation aux examens scolaires. Groupes de niveau formés après un test de placement initial.',
    infoComplementaire: 'Test de niveau gratuit avant la première séance. Groupes de 6 élèves maximum, supports de cours inclus dans le tarif.',
    contactTel: '061 271 84 50',
    contactEmail: 'info@sprachschule-basel.ch',
    siteUrl: 'https://sprachschule-basel.ch',
  },
]