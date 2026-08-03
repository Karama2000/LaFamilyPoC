// Données factices (mock) utilisées comme contenu de démonstration pour
// les carrousels de la page d'accueil, en attendant le vrai contenu
// dynamique (venant par ex. de Google Sheets / API).
export interface ContentItem {
  titre: string        // titre affiché sur la carte/diapositive
  description: string  // texte court d'accroche
  image: string        // chemin de l'image (dans /public/images/...)
}

// Contenu du carrousel "Notre sélection" (SelectionCarousel.vue)
export const selectionsFR: ContentItem[] = [
  { titre: 'Adresse', description: "Description courte de l'activité mise en avant cette semaine.", image: '/images/sélection/1.jpeg' },
  { titre: 'Adresse', description: 'Description courte de la deuxième activité de la semaine.', image: '/images/sélection/2.jpeg' },
  { titre: 'Adresse', description: 'Description courte de la troisième activité de la semaine.', image: '/images/sélection/3.jpeg' },
  { titre: 'Adresse', description: 'Description courte de la quatrième activité de la semaine.', image: '/images/sélection/4.jpeg' }
]

// Contenu du carrousel "Nouveautés" (NouveautesSection.vue)
export const nouveautesFR: ContentItem[] = [
  { titre: 'Titre 1', description: "Description brève de l'activité 1.", image: '/images/nouveautes/1.jpeg' },
  { titre: 'Titre 2', description: "Description brève de l'activité 2.", image: '/images/nouveautes/2.jpeg' },
  { titre: 'Titre 3', description: "Description brève de l'activité 3.", image: '/images/nouveautes/3.jpeg' },
  { titre: 'Titre 4', description: "Description brève de l'activité 4.", image: '/images/nouveautes/4.jpeg' },
  { titre: 'Titre 5', description: "Description brève de l'activité 5.", image: '/images/nouveautes/5.jpeg' },
  { titre: 'Titre 6', description: "Description brève de l'activité 6.", image: '/images/nouveautes/6.jpeg' },
  { titre: 'Titre 7', description: "Description brève de l'activité 7.", image: '/images/nouveautes/7.jpeg' },
  { titre: 'Titre 8', description: "Description brève de l'activité 8.", image: '/images/nouveautes/8.jpeg' }
]
