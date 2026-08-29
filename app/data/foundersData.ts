// Données de l'équipe fondatrice, affichées dans la section "Notre équipe"
// de la page "Devenir partenaire" (pages/devenir-partenaire.vue).
export interface Founder {
  id: number
  name: string
  role: string
  photo: string       // chemin vers la photo, ex: '/images/equipe/isabelle.jpg'
  linkedin: string     // URL du profil LinkedIn
}

export const foundersFR: Founder[] = [
  {
    id: 1,
    name: 'Isabelle Henzi de Boissoudy',
    role: 'Fondatrice',
    photo: '/images/equipe/isabelle.png',
    linkedin: 'https://www.linkedin.com/in/isabelle-henzi-de-boissoudy/',
  },
  {
    id: 2,
    name: 'Edouard Henzi',
    role: 'Fondateur',
    photo: '/images/equipe/edouard.png',
    linkedin: 'https://www.linkedin.com/in/edouard-henzi/',
  },
]