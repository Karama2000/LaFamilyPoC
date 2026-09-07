// Données de référence pour le blog "Nos nouveautés" : catégories de filtre
// et articles de démonstration (voir blogs.vue et ArticleCard.vue).

export interface ArticleCategoryOption {
  key: string; // valeur technique stockée dans le tableau de filtres actifs
  labelKey: string; // clé de traduction du libellé affiché
}

// ---------- Catégories : les 10 thématiques du blog ----------
export const articleCategories: ArticleCategoryOption[] = [
  { key: "grossesse", labelKey: "catGrossesse" },
  { key: "bebe", labelKey: "catBebe" },
  { key: "petiteEnfance", labelKey: "catPetiteEnfance" },
  { key: "enfance", labelKey: "catEnfance" },
  { key: "adolescence", labelKey: "catAdolescence" },
  { key: "scolarite", labelKey: "catScolarite" },
  { key: "parents", labelKey: "catParents" },
  { key: "vieDeFamille", labelKey: "catVieDeFamille" },
  { key: "travail", labelKey: "catTravail" },
  { key: "assurances", labelKey: "catBudgetAssurance" },
];

//contenu de larticle
export interface ArticleBlock {
  type: "text" | "image";
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface Article {
  id: string; // identifiant unique de l'article
  titre: string; // titre affiché sur la carte et en hero
  category: string; // clé de articleCategories ci-dessus
  date: string; // date affichée en clair (déjà formatée)
  dateISO: string; // date au format ISO, utilisée pour trier/filtrer
  image: string; // chemin de l'image de couverture
  excerpt: string; // court résumé affiché sur la carte

  blocks: ArticleBlock[]; // Contenu libre de l'article texte et images peuvent être mélangés dans n'importe quel ordre.
  relatedEventIds?: string[]; // ids d'événements agendaData.ts à afficher en "Agenda"
  relatedPartnerIds?: number[]; // ids de partnersData.ts à afficher en "Partenaires"
}

// Liste d'articles factices (mock) utilisée en attendant le vrai contenu.
// export const articlesFR: Article[] = [
//   {
//     id: "1",
//     titre: "Les 10 questions à poser à sa sage-femme",
//     category: "grossesse",
//     date: "15 Mai 2025",
//     dateISO: "2025-05-15",
//     image: "/images/nouveautes/1.jpeg",
//     excerpt:
//       "Votre sage-femme est bien plus qu'une professionnelle de santé : elle est votre guide et votre confidente durant ces neuf mois uniques.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Votre sage-femme est bien plus qu'une professionnelle de santé : elle est votre guide, votre soutien et votre confidente durant ces neuf mois uniques. Pour tirer le meilleur parti de vos consultations, il est important de venir préparée avec vos questions.  qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
//       },
      
//       {
//         type: "image",
//         src: "/images/nouveautes/1-photo-2.png",
//         alt: "Accompagnement pendant la grossesse",
    
//       },

//       {
//         type: "text",
//         content:
//           "N'hésitez pas à aborder des sujets comme le déroulement de l'accouchement, les méthodes de relaxation, l'allaitement, ou encore les signes d'alerte à surveiller. Une bonne communication avec votre sage-femme est la clé d'une grossesse épanouie.At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
//       },

//       {
//         type: "image",
//         src: "/images/nouveautes/1-photo-1.png",
//         alt: "Accompagnement pendant la grossesse",
//         caption: "Un accompagnement personnalisé pendant la grossesse.",
//       },

//       {
//         type: "text",
//         content:
//           "Pensez également à lui parler de vos craintes ou appréhensions, même si elles vous semblent anodines. Elle est là pour vous rassurer et vous orienter vers les bons professionnels si besoin.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses",
//       },
//     ],
//     relatedEventIds: ["9"],
//     relatedPartnerIds: [13],
//   },
//   {
//     id: "2",
//     titre: "Accompagnement et conseils pour la grossesse",
//     category: "grossesse",
//     date: "03 Août 2025",
//     dateISO: "2025-08-03",
//     image: "/images/nouveautes/2.jpeg",
//     excerpt:
//       "Préparer sa grossesse avec une personne de confiance, se faire accompagner par des professionnels pour vivre cette période avec sérénité.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Préparer sa grossesse avec une personne de confiance, se faire accompagner par des professionnels pour vivre cette période avec sérénité, voilà l'objectif de beaucoup de futurs parents.",
//       },
//       {
//         type: "text",
//         content:
//           "Sages-femmes, doulas, cours de préparation à la naissance : de nombreuses ressources existent en Suisse romande pour accompagner chaque étape de la grossesse.",
//       },
//     ],
//   },
//   {
//     id: "3",
//     titre: "Alimentation équilibrée pendant la grossesse",
//     category: "grossesse",
//     date: "22 Janvier 2025",
//     dateISO: "2025-01-22",
//     image: "/images/nouveautes/3.jpeg",
//     excerpt:
//       "Bien manger pendant la grossesse, c'est important pour vous et pour votre bébé. Découvrez nos conseils pour une alimentation adaptée.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Bien manger pendant la grossesse, c'est important pour vous et pour votre bébé. Découvrez nos conseils pour une alimentation équilibrée, riche en fer, en calcium et en acide folique.",
//       },
//       {
//         type: "text",
//         content:
//           "Certains aliments sont à éviter pendant la grossesse (charcuterie crue, fromages au lait cru, poissons à forte teneur en mercure) : voici comment adapter votre menu sans stress.",
//       },
//     ],
//   },
//   {
//     id: "4",
//     titre: "Sommeil de bébé : survivre aux premières nuits",
//     category: "bebe",
//     date: "14 Février 2025",
//     dateISO: "2025-02-14",
//     image: "/images/nouveautes/4.jpeg",
//     excerpt:
//       "Les premières semaines avec un nouveau-né sont souvent synonymes de nuits hachées. Découvrez nos conseils pour aider bébé (et vous) à mieux dormir.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Les premières semaines avec un nouveau-né sont souvent synonymes de nuits hachées. Découvrez nos conseils pour aider bébé (et vous) à mieux dormir.",
//       },
//       {
//         type: "text",
//         content:
//           "Rituel du coucher, température de la chambre, gestion des siestes : quelques ajustements simples peuvent faire une grande différence sur la qualité du sommeil de toute la famille.",
//       },
//     ],
//     relatedEventIds: ["11"],
//   },
//   {
//     id: "5",
//     titre: "Allaitement maternel : conseils pratiques pour bien démarrer",
//     category: "bebe",
//     date: "18 Mars 2025",
//     dateISO: "2025-03-18",
//     image: "/images/nouveautes/5.jpeg",
//     excerpt:
//       "L'allaitement est un lien unique entre une mère et son enfant. Voici des conseils pour bien vivre cette expérience, du premier jour au sevrage.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "L'allaitement est un lien unique entre une mère et son enfant. Voici des conseils pour bien vivre cette expérience, du premier jour au sevrage.",
//       },
//       {
//         type: "text",
//         content:
//           "Positionnement, fréquence des tétées, gestion des douleurs éventuelles : n'hésitez pas à consulter une consultante en lactation en cas de doute.",
//       },
//     ],
//   },
//   {
//     id: "6",
//     titre: "Choisir sa poussette : le guide complet pour les parents",
//     category: "bebe",
//     date: "05 Avril 2025",
//     dateISO: "2025-04-05",
//     image: "/images/nouveautes/6.jpeg",
//     excerpt:
//       "Poussette canne, poussette tout-terrain ou duo ? Aidez-vous de ce guide pour faire le bon choix, selon votre mode de vie et votre budget.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Poussette canne, poussette tout-terrain ou duo ? Aidez-vous de ce guide pour faire le bon choix, selon votre mode de vie et votre budget.",
//       },
//       {
//         type: "text",
//         content:
//           "Pensez à tester le pliage, le poids et la maniabilité en magasin avant d'acheter : chaque famille a des besoins différents.",
//       },
//     ],
//   },
//   {
//     id: "7",
//     titre: "Rentrée scolaire : bien préparer son enfant",
//     category: "scolarite",
//     date: "18 Août 2025",
//     dateISO: "2025-08-18",
//     image: "/images/nouveautes/7.jpeg",
//     excerpt:
//       "La rentrée est un moment clé pour les enfants. Voici comment les aider à aborder cette nouvelle année scolaire avec confiance.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "La rentrée est un moment clé pour les enfants. Voici comment les aider à aborder cette nouvelle année scolaire avec confiance.",
//       },
//       {
//         type: "text",
//         content:
//           "Fournitures, emploi du temps, gestion du stress de la rentrée : quelques repères simples pour accompagner votre enfant sereinement.",
//       },
//     ],
//     relatedEventIds: ["7"],
//   },
//   {
//     id: "8",
//     titre: "Soutien scolaire à domicile : les bons réflexes",
//     category: "scolarite",
//     date: "12 Avril 2025",
//     dateISO: "2025-04-12",
//     image: "/images/nouveautes/8.jpeg",
//     excerpt:
//       "Votre enfant rencontre des difficultés à l'école ? Le soutien scolaire à domicile peut être une solution précieuse. Découvrez comment l'organiser.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Votre enfant rencontre des difficultés à l'école ? Le soutien scolaire à domicile peut être une solution précieuse. Découvrez comment l'organiser efficacement.",
//       },
//       {
//         type: "text",
//         content:
//           "Fréquence des séances, choix de l'intervenant, suivi des progrès : nos conseils pour que le soutien scolaire porte vraiment ses fruits.",
//       },
//     ],
//     relatedEventIds: ["7"],
//   },
//   {
//     id: "9",
//     titre: "Comment aider son enfant à réviser efficacement",
//     category: "scolarite",
//     date: "03 Juin 2025",
//     dateISO: "2025-06-03",
//     image: "/images/nouveautes/7.jpeg",
//     excerpt:
//       "Les révisions sont souvent sources de tension. Découvrez des méthodes simples et concrètes pour aider votre enfant à apprendre en s'amusant.",
//     blocks: [
//       {
//         type: "text",
//         content:
//           "Les révisions sont souvent sources de tension. Découvrez des méthodes simples et concrètes pour aider votre enfant à apprendre en s'amusant.",
//       },
//       {
//         type: "text",
//         content:
//           "Fiches de révision, pauses actives, méthode Pomodoro adaptée aux enfants : autant d'outils à tester selon la personnalité de votre enfant.",
//       },
//     ],
//   },
// ];
