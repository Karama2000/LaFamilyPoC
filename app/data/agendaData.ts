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
  { key: 'AR', label: 'Appenzell Rhodes-Ext.' },
  { key: 'AI', label: 'Appenzell Rhodes-Int.' },
  { key: 'SG', label: 'Saint-Gall' },
  { key: 'GR', label: 'Grisons' },
  { key: 'AG', label: 'Argovie' },
  { key: 'TG', label: 'Thurgovie' },
  { key: 'TI', label: 'Tessin' },
  { key: 'VD', label: 'Vaud' },
  { key: 'VS', label: 'Valais' },
  { key: 'NE', label: 'Neuchâtel' },
  { key: 'GE', label: 'Genève' },
  { key: 'JU', label: 'Jura' }
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
  { key: 'it', labelKey: 'filterIT' }
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
  sousCategorie: string          // sous-catégorie : clé de menuData.ts (activités/cours) ou de campSubcategories (camps)
  ageKeys: string[]              // tranches d'âge concernées (clés de ageGroups ci-dessus)
}

// Liste d'événements factices (mock) utilisée en attendant le vrai
// contenu dynamique de l'agenda (ex. venant de Google Sheets / API).

export const agendaEventsFR: AgendaEvent[] = [
  {
    id: '1', titre: 'Spectacle de marionnettes « Le Petit Roi »', lieu: 'Théâtre de Vidy, Lausanne',
    cantonKey: 'VD', date: 'Sam. 8 août 2026', dateStart: '2026-08-08', dateEnd: '2026-08-08', image: '/images/sélection/1.jpeg',
    categorie: 'activite', sousCategorie: 'actCulturelles', ageKeys: ['petitEnfant', 'enfant']
  },
  {
    id: '2', titre: 'Rando-découverte en famille', lieu: 'Parc naturel du Jorat',
    cantonKey: 'VD', date: 'Dim. 9 août 2026', dateStart: '2026-08-09', dateEnd: '2026-08-09', image: '/images/sélection/2.jpeg',
    categorie: 'activite', sousCategorie: 'actPleinAir', ageKeys: ['enfant', 'adolescent', 'adulte']
  },
  {
    id: '3', titre: 'Camp de voile — 5 jours avec hébergement', lieu: 'Centre nautique, Genève',
    cantonKey: 'GE', date: 'Du 3 au 7 août 2026', dateStart: '2026-08-03', dateEnd: '2026-08-07', image: '/images/nouveautes/1.jpeg',
    categorie: 'campLogement', sousCategorie: 'sports', ageKeys: ['adolescent']
  },
  {
    id: '4', titre: 'Camp d\'anglais immersif', lieu: 'Institut Le Rosey, Rolle',
    cantonKey: 'VD', date: 'Du 10 au 14 août 2026', dateStart: '2026-08-10', dateEnd: '2026-08-14', image: '/images/nouveautes/2.jpeg',
    categorie: 'campLogement', sousCategorie: 'langues', ageKeys: ['enfant', 'adolescent']
  },
  {
    id: '5', titre: 'Camp de jour multisport', lieu: 'Centre sportif, Fribourg',
    cantonKey: 'FR', date: 'Du 3 au 7 août 2026', dateStart: '2026-08-03', dateEnd: '2026-08-07', image: '/images/nouveautes/3.jpeg',
    categorie: 'campJour', sousCategorie: 'sports', ageKeys: ['petitEnfant', 'enfant']
  },
  {
    id: '6', titre: 'Camp de jour numérique — initiation coding', lieu: 'FabLab, Neuchâtel',
    cantonKey: 'NE', date: 'Du 17 au 21 août 2026', dateStart: '2026-08-17', dateEnd: '2026-08-21', image: '/images/nouveautes/4.jpeg',
    categorie: 'campJour', sousCategorie: 'it', ageKeys: ['enfant', 'adolescent']
  },
  {
    id: '7', titre: 'Cours de soutien scolaire — mathématiques', lieu: 'En ligne / Suisse romande',
    cantonKey: 'VD', date: 'Dès le 25 août 2026', dateStart: '2026-08-25', dateEnd: '2026-12-19', image: '/images/nouveautes/5.jpeg',
    categorie: 'cours', sousCategorie: 'coursSoutien', ageKeys: ['enfant', 'adolescent']
  },
  {
    id: '8', titre: 'Atelier de dessin & bande dessinée', lieu: 'Maison de quartier, Bienne',
    cantonKey: 'BE', date: 'Sam. 15 août 2026', dateStart: '2026-08-15', dateEnd: '2026-08-15', image: '/images/nouveautes/6.jpeg',
    categorie: 'cours', sousCategorie: 'coursArt', ageKeys: ['petitEnfant', 'enfant', 'adolescent']
  },
  {
    id: '9', titre: 'Grand troc de vêtements enfants', lieu: 'Salle communale, Sion',
    cantonKey: 'VS', date: 'Sam. 22 août 2026', dateStart: '2026-08-22', dateEnd: '2026-08-22', image: '/images/nouveautes/7.jpeg',
    categorie: 'activite', sousCategorie: 'actAutres', ageKeys: ['bebe', 'petitEnfant', 'enfant', 'adulte']
  },
  {
    id: '10', titre: 'Camp d\'été « Nature & Aventure »', lieu: 'Chalet des Diablerets',
    cantonKey: 'VD', date: 'Du 3 au 10 août 2026', dateStart: '2026-08-03', dateEnd: '2026-08-10', image: '/images/nouveautes/8.jpeg',
    categorie: 'campLogement', sousCategorie: 'loisirs', ageKeys: ['enfant', 'adolescent']
  },
  {
    id: '11', titre: 'Séances de yoga parent-bébé', lieu: 'Studio Zen, Zurich',
    cantonKey: 'ZH', date: 'Tous les mardis', dateStart: '2026-08-04', dateEnd: '2026-12-15', image: '/images/sélection/3.jpeg',
    categorie: 'cours', sousCategorie: 'coursSport', ageKeys: ['bebe', 'adulte']
  },
  {
    id: '12', titre: 'Cours d\'allemand pour ados', lieu: 'Sprachschule, Bâle',
    cantonKey: 'BS', date: 'Dès le 18 août 2026', dateStart: '2026-08-18', dateEnd: '2026-12-19', image: '/images/sélection/4.jpeg',
    categorie: 'cours', sousCategorie: 'coursLangues', ageKeys: ['adolescent']
  }
]