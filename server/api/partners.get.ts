interface PartnerDescription {
  title: string
  text: string
}

interface Partner {
  id: number
  name: string
  slug: string
  logo: string
  link: string
  website: string
  coverage: ('SR' | 'SA')[]
  category: string
  about: string | null
  description: PartnerDescription[] | null
  contact: {
    address: string | null
    phone: string | null
    mobile: string | null
    email: string | null
    website: string | null
  }
  socialNetworks: {
    facebook: string | null
    instagram: string | null
    youtube: string | null
    linkedin: string | null
    tiktok: string | null
  }
  photos: string[]
}

type RawRow = Record<string, unknown>

const CACHE_DURATION_MS = 10 * 60 * 1000
const DEFAULT_LOGOS: Record<string, string> = {
  partnerCatEcole: '/images/partners/ecole.png',
  partnerCatMusee: '/images/partners/musee.png',
  partnerCatAssociation: '/images/partners/association.png',
  partnerCatGardeEnfants: '/images/partners/garde-enfant.png',
  partnerCatCabinet: '/images/partners/cabinet.png',
  partnerCatExpert: '/images/partners/expert.png',
}

let cache: { data: Partner[]; fetchedAt: number } | null = null

function normalizeKey(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function value(row: RawRow, ...keys: string[]): string {
  const wanted = keys.map(normalizeKey)
  const entry = Object.entries(row).find(([key, raw]) =>
    wanted.includes(normalizeKey(key)) && raw !== undefined && raw !== null && String(raw).trim(),
  )
  return entry ? String(entry[1]).trim() : ''
}

function slugify(name: string): string {
  return normalizeKey(name) || 'partenaire'
}

function categoryFrom(row: RawRow): string {
  const text = normalizeKey(`${value(row, 'Nom du client', 'Nom', 'name')} ${value(row, 'Entreprise', 'category')}`)
  if (/(musee|museum|plateforme10|alimentarium|chaplin|chateau|fondation.*culturelle)/.test(text)) return 'partnerCatMusee'
  if (/(garde|creche|enfance|parents|famille|massagebebe|jumeaux|supermamans)/.test(text)) return 'partnerCatGardeEnfants'
  if (/(cabinet|clinique|medecin|sante|allergie|psych|therap|massage)/.test(text)) return 'partnerCatCabinet'
  if (/(expert|coaching|conseil|commerce|agence|educationfirst|studyl|esl|babel)/.test(text)) return 'partnerCatExpert'
  if (/(ecole|school|academie|cours|langue|camp|formation|universite|conservatoire|hemu|edidact|pasaj)/.test(text)) return 'partnerCatEcole'
  return 'partnerCatAssociation'
}

function coverageFrom(address: string): ('SR' | 'SA')[] {
  const text = normalizeKey(address)
  const germanSwiss = ['zurich', 'bern', 'basel', 'lucerne', 'luzern', 'stgallen', 'winterthur', 'aarau', 'solothurn', 'schaffhausen', 'zug', 'thun', 'biel', 'olten', 'davos', 'chur', 'graubunden', 'thurgau', 'appenzell', 'fribourg', 'fribourg'].some((item) => text.includes(item))
  const frenchSwiss = ['geneve', 'lausanne', 'vevey', 'montreux', 'sion', 'martigny', 'monthey', 'neuchatel', 'yverdon', 'delémont', 'delemont', 'nendaz', 'saillon', 'valais', 'vaud', 'jura', 'fribourg'].some((item) => text.includes(normalizeKey(item)))
  if (germanSwiss && frenchSwiss) return ['SR', 'SA']
  if (germanSwiss) return ['SA']
  if (frenchSwiss) return ['SR']
  return ['SR', 'SA']
}

function parseId(row: RawRow, index: number): number {
  const id = Number(value(row, 'ID', 'id'))
  return Number.isFinite(id) && id > 0 ? id : index + 1
}

function normalizeRow(row: RawRow, index: number): Partner {
  const name = value(row, 'Nom du client', 'Nom', 'name') || value(row, 'Entreprise', 'Organisation') || `Partenaire ${index + 1}`
  const site = value(row, 'Site', 'website', 'url')
  const category = categoryFrom(row)
  const logoFromSheet = value(row, 'Logo', 'logo')
  const fallbackLogo: string = DEFAULT_LOGOS[category] ?? '/images/partners/association.png'
  const logo: string = /^(null|undefined|n\/a|na|-)+$/i.test(logoFromSheet)
    ? fallbackLogo
    : (logoFromSheet || fallbackLogo)
  const address = value(row, 'Adresse', 'address') || null
  const email = value(row, 'Email', 'email') || null
  const phone = value(row, 'Tel', 'Téléphone', 'phone') || null
  const descriptionFr = value(row, 'DescriptionFR', 'Description FR', 'about')
  const id = parseId(row, index)
  const slug = `${slugify(name)}-${id}`

  return {
    id,
    name,
    slug,
    logo,
    link: site || '#',
    website: site || '#',
    coverage: coverageFrom(address || name),
    category,
    about: descriptionFr || null,
    description: descriptionFr ? [{ title: name, text: descriptionFr }] : null,
    contact: { address, phone, mobile: null, email, website: site || null },
    socialNetworks: { facebook: null, instagram: null, youtube: null, linkedin: null, tiktok: null },
    photos: [],
  }
}

export default defineEventHandler(async (): Promise<Partner[]> => {
  if (cache && Date.now() - cache.fetchedAt < CACHE_DURATION_MS) return cache.data

  try {
    const config = useRuntimeConfig()
    const rawResponse = await $fetch<unknown>(config.n8nPartnersWebhookUrl)
    const responseObject: { data?: unknown; items?: unknown; body?: unknown } = rawResponse as { data?: unknown; items?: unknown; body?: unknown }
    const candidate: unknown = Array.isArray(rawResponse)
      ? rawResponse
      : (responseObject.data ?? responseObject.items ?? responseObject.body ?? [])
    const parsed: unknown = typeof candidate === 'string'
      ? (() => { try { return JSON.parse(candidate) as unknown } catch { return [] as unknown[] } })()
      : candidate
    const rows: RawRow[] = Array.isArray(parsed)
      ? parsed.filter((row: unknown): row is RawRow => Boolean(row && typeof row === 'object'))
      : []
    const usedIds = new Set<number>()
    const partners: Partner[] = rows.map((row: RawRow, index: number) => normalizeRow(row, index)).filter((partner: Partner) => {
      if (usedIds.has(partner.id)) return false
      usedIds.add(partner.id)
      return Boolean(partner.name)
    })
    cache = { data: partners, fetchedAt: Date.now() }
    return partners
  } catch (error) {
    console.error('[api/partners] Erreur:', error)
    return cache?.data ?? []
  }
})
