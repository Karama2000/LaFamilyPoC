// Structure d'un partenaire affiché dans la liste/grille des partenaires
// (voir PartnerCard.vue et PartnersFilterBar.vue pour l'affichage/filtrage).
export interface Partner {
  name: string                    // nom complet du partenaire
  slug: string                    // identifiant court, utilisé pour retrouver le logo
  logo: string                    // chemin du logo (dans /public/images/logos/<slug>.png)
  link: string                    // lien externe vers le site du partenaire
  coverage: ('SR' | 'SA')[]       // zone(s) de couverture : SR = Suisse romande, SA = Suisse alémanique
  category: string                // clé de traduction de la catégorie (voir staticTexts.ts et partnerCategories ci-dessous)
}

// Liste complète des partenaires affichés sur la page "Partenaires".
// ⚠️ Catégories déduites automatiquement du nom — à vérifier/corriger si besoin.
// Logos attendus dans /public/images/logos/{slug}.png (à ajouter toi-même).
export const partnersFR: Partner[] = [
  { name: 'Musée suisse de l\'appareil photographique', slug: 'camera-museum', logo: '/images/logos/camera-museum.png', link: 'https://www.cameramuseum.ch/evenements/', coverage: ['SR'], category: 'partnerCatMusee' },
  { name: 'Faisceau Cadet Vaudois et Valaisan', slug: 'cadet-vaudois', logo: '/images/logos/cadet-vaudois.png', link: 'https://www.cadet.ch/activites', coverage: ['SR'], category: 'partnerCatAssociation' },
  { name: 'Conservatoire de l\'Ouest Vaudois', slug: 'covaud', logo: '/images/logos/covaud.png', link: 'https://www.covaud.ch/f/agenda/concert-et-evenements.asp', coverage: ['SR'], category: 'partnerCatEcole' },
  { name: 'friLingue Gmbh', slug: 'frilingue', logo: '/images/logos/frilingue.png', link: 'https://www.frilingue.ch/fr/vacances-enfants-adolescents-suisse', coverage: ['SR', 'SA'], category: 'partnerCatEcole' },
  { name: 'Fondation Pierre Gianadda', slug: 'gianadda', logo: '/images/logos/gianadda.png', link: 'https://www.gianadda.ch/explorer/expositions/catalogues', coverage: ['SR', 'SA'], category: 'partnerCatMusee' },
  { name: 'ILS-Bern / International Language School', slug: 'ils-bern', logo: '/images/logos/ils-bern.png', link: 'https://ils-bern.ch/sprachkurse/sprachcamp-fuer-kinder-und-jugendliche/', coverage: ['SR', 'SA'], category: 'partnerCatEcole' },
  { name: 'Mudac, Fondation Plateforme 10', slug: 'mudac', logo: '/images/logos/mudac.png', link: 'https://mudac.ch/agenda/', coverage: ['SR'], category: 'partnerCatMusee' },
  { name: 'Nax Région Tourisme', slug: 'nax-region', logo: '/images/logos/nax-region.png', link: 'https://nax-region.ch/agenda-evenements', coverage: ['SR', 'SA'], category: 'partnerCatAssociation' },
  { name: 'Ecole Apolline', slug: 'apolline', logo: '/images/logos/apolline.png', link: 'https://camps.apolline.art/', coverage: ['SR'], category: 'partnerCatEcole' },
  { name: 'Ecole d\'art Ceruleum', slug: 'ceruleum', logo: '/images/logos/ceruleum.png', link: 'https://www.ceruleum.ch/fr/cours-de-vacances.html', coverage: ['SR'], category: 'partnerCatEcole' },
  { name: 'Fondation Plateforme 10 - Photo Elysée', slug: 'photo-elysee', logo: '/images/logos/photo-elysee.png', link: 'https://elysee.ch/musee/plateforme10/', coverage: ['SR'], category: 'partnerCatMusee' },
  { name: 'Conservatoire Montreux-Vevey-Riviera', slug: 'conservatoire-mvr', logo: '/images/logos/conservatoire-mvr.png', link: 'https://www.conservatoire.ch/agenda', coverage: ['SR'], category: 'partnerCatEcole' },
  { name: 'Filolo Sprachferien', slug: 'filolo', logo: '/images/logos/filolo.png', link: 'https://filolo.ch/camps-linguistiques/ete', coverage: ['SR', 'SA'], category: 'partnerCatEcole' },
  { name: 'MS Sports AG', slug: 'ms-sports', logo: '/images/logos/ms-sports.png', link: 'https://www.mssports.ch/fr/', coverage: ['SR', 'SA'], category: 'partnerCatAssociation' },
  { name: 'Code Camp Schweiz AG', slug: 'codecampworld', logo: '/images/logos/codecampworld.png', link: 'https://fr.codecampworld.ch/unsere-camps-sommer-ferien', coverage: ['SA'], category: 'partnerCatEcole' },
  { name: 'Fondation HEMU-CL', slug: 'hemu', logo: '/images/logos/hemu.png', link: 'https://www.hemu.ch/agenda', coverage: ['SR'], category: 'partnerCatEcole' },
  { name: 'Cadets de Yens', slug: 'cadets-yens', logo: '/images/logos/cadets-yens.png', link: 'https://www.yens.ch/culture-sport-loisirs/evenements-agenda', coverage: ['SR'], category: 'partnerCatAssociation' },
  { name: 'Plateforme 10 - centrale', slug: 'plateforme10', logo: '/images/logos/plateforme10.png', link: 'https://plateforme10.ch/agenda/?interval=week', coverage: ['SR'], category: 'partnerCatMusee' },
  { name: 'Anzère Tourisme', slug: 'anzere', logo: '/images/logos/anzere.png', link: 'https://www.anzere.ch/fr/evenements/', coverage: ['SR', 'SA'], category: 'partnerCatAssociation' },
  { name: 'Télé-La Fouly - Champex Lac', slug: 'saint-bernard', logo: '/images/logos/saint-bernard.png', link: 'https://www.saint-bernard.ch/fr/activites/agenda-32/', coverage: ['SR'], category: 'partnerCatAssociation' },
  { name: 'Futurekids', slug: 'futurekids', logo: '/images/logos/futurekids.png', link: 'https://futurekids.io/activities/cours-hebdomadaires?city=&online=', coverage: ['SR', 'SA'], category: 'partnerCatEcole' },
  { name: 'Kinderwelt', slug: 'kinderwelt', logo: '/images/logos/kinderwelt.png', link: 'https://www.heidadorf.ch/agenda', coverage: ['SA'], category: 'partnerCatGardeEnfants' },
  { name: 'Fondation Plateforme 10 - MCBA', slug: 'mcba', logo: '/images/logos/mcba.png', link: 'https://www.mcba.ch/', coverage: ['SR'], category: 'partnerCatMusee' },
  { name: 'Camélia Académie de Danse', slug: 'camelia', logo: '/images/logos/camelia.png', link: 'https://www.cameliaacademiededanse.ch/cours-de-danse-gland', coverage: ['SR'], category: 'partnerCatEcole' },
  { name: 'Musées cantonaux du Valais', slug: 'musees-valais', logo: '/images/logos/musees-valais.png', link: 'https://agenda.culturevalais.ch/fr/agenda', coverage: ['SR'], category: 'partnerCatMusee' }
]

// Catégories de partenaires disponibles pour le filtre par pilules
// (voir PartnersFilterBar.vue). "key" et "labelKey" sont identiques ici
// mais restent séparés pour rester cohérent avec le pattern utilisé ailleurs.
export const partnerCategories: { key: string; labelKey: string; emoji: string }[] = [
  { key: 'partnerCatEcole', labelKey: 'partnerCatEcole', emoji: '🏫' },
  { key: 'partnerCatMusee', labelKey: 'partnerCatMusee', emoji: '🖼️' },
  { key: 'partnerCatAssociation', labelKey: 'partnerCatAssociation', emoji: '🤝' },
  { key: 'partnerCatGardeEnfants', labelKey: 'partnerCatGardeEnfants', emoji: '🧸' },
  { key: 'partnerCatCabinet', labelKey: 'partnerCatCabinet', emoji: '🩺' },
  { key: 'partnerCatExpert', labelKey: 'partnerCatExpert', emoji: '💡' }
]