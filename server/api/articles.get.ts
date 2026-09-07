import { articlesData as articlesFR, type ArticleRaw } from '../data/articles.data'
import { articlesData as articlesEN } from '../data/articles.en'
import { articlesData as articlesIT } from '../data/articles.it'
import { articlesData as articlesDE } from '../data/articles.de'

interface Article {
  id: string
  titre: string
  excerpt: string
  category: string
  image: string
  date: string
  dateISO: string; 
  blocks: { type: 'text'; content: string }[]
  relatedEventIds: string[]
  relatedPartnerIds: number[]
}

const CATEGORY_KEY_MAP: Record<string, string> = {
  'Grossesse': 'grossesse',
  'Bébé': 'bebe',
  'Petite enfance': 'petiteEnfance',
  'Enfance': 'enfance',
  'Adolescence': 'adolescence',
  'Scolarité': 'scolarite',
  'Parents': 'parents',
  'Vie de famille': 'vieDeFamille',
  'Travail': 'travail',
  'Budget et assurance': 'assurances',
}

const CATEGORY_TO_AGE_KEYS: Record<string, string[]> = {
  grossesse: ['bebe'],
  bebe: ['bebe'],
  petiteEnfance: ['petitEnfant'],
  enfance: ['enfant'],
  adolescence: ['adolescent'],
  scolarite: ['enfant', 'adolescent'],
  parents: ['adulte', 'famille'],
  vieDeFamille: ['famille'],
  travail: ['adulte'],
  assurances: ['adulte', 'famille'],
}

const CATEGORY_TO_PARTNER_CATS: Record<string, string[]> = {
  grossesse: ['partnerCatCabinet', 'partnerCatExpert'],
  bebe: ['partnerCatGardeEnfants', 'partnerCatCabinet'],
  petiteEnfance: ['partnerCatGardeEnfants', 'partnerCatEcole'],
  enfance: ['partnerCatEcole', 'partnerCatAssociation'],
  adolescence: ['partnerCatAssociation', 'partnerCatExpert'],
  scolarite: ['partnerCatEcole'],
  parents: ['partnerCatAssociation', 'partnerCatExpert'],
  vieDeFamille: ['partnerCatAssociation', 'partnerCatMusee'],
  travail: ['partnerCatExpert'],
  assurances: ['partnerCatCabinet', 'partnerCatExpert'],
}

// Une seule source de vérité pour la liste des langues supportées
const DATA_BY_LANG: Record<string, ArticleRaw[]> = {
  fr: articlesFR,
  en: articlesEN,
  it: articlesIT,
  de: articlesDE,
}

function makeExcerpt(text: string, max = 150): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean
}

function normalizeRow(row: ArticleRaw): Omit<Article, 'relatedEventIds' | 'relatedPartnerIds'> {
  return {
    id: row.id,
    titre: row.titre,
    excerpt: makeExcerpt(row.contenu),
    category: CATEGORY_KEY_MAP[row.categorie] || 'vieDeFamille',
    image: row.image || '/images/famille.jpeg',
    date: row.date || '',
    dateISO: row.dateISO || '',   
    blocks: [{ type: 'text', content: row.contenu }],
  }
}

export default defineEventHandler(async (event): Promise<Article[]> => {
  const query = getQuery(event)
  const requestedLang = typeof query.lang === 'string' ? query.lang : 'fr'
  const lang = DATA_BY_LANG[requestedLang] ? requestedLang : 'fr' // fallback si langue inconnue
  const source = DATA_BY_LANG[lang]

  try {
    const [partners, agendaEvents] = await Promise.all([
      $fetch<Array<{ id: number; category: string }>>('/api/partners'),
      $fetch<Array<{ id: string; ageKeys: string[] }>>('/api/agenda'),
    ])

    return source.map(normalizeRow).map((article) => {
      const ageKeys = CATEGORY_TO_AGE_KEYS[article.category] || []
      const partnerCats = CATEGORY_TO_PARTNER_CATS[article.category] || []

      const relatedPartnerIds = partners
        .filter((p) => partnerCats.includes(p.category))
        .slice(0, 3)
        .map((p) => p.id)

      const relatedEventIds = agendaEvents
        .filter((e) => e.ageKeys?.some((k) => ageKeys.includes(k)))
        .slice(0, 3)
        .map((e) => e.id)

      return { ...article, relatedPartnerIds, relatedEventIds }
    })
  } catch (error) {
    console.error('[api/articles] Erreur:', error)
    return source.map(normalizeRow).map((a) => ({ ...a, relatedEventIds: [], relatedPartnerIds: [] }))
  }})