// useTranslation.ts
// -------------------
// Composable de traduction (i18n "maison") pour le site diefamilie.ch.
// Principe :
//   - le français (baseTexts) sert de langue source, écrite en dur
//   - les traductions EN/DE/IT sont générées à la volée via une API
//     LibreTranslate, puis mises en cache en mémoire pour éviter de
//     re-traduire à chaque changement de langue
//   - un glossaire (translationOverrides) permet de forcer certaines
//     traductions de termes métier ambigus avant l'appel à l'API
import { baseTexts } from '~/data/staticTexts'
import { translationOverrides } from '~/data/translationGlossary'
import type { ContentItem } from '~/data/mockContent'

type Lang = 'fr' | 'en' | 'de' | 'it'

// State global partagé entre tous les composants (singleton pattern Nuxt)
const currentLang = ref<Lang>('fr')                 // langue actuellement affichée sur le site
const isTranslating = ref(false)                    // true pendant qu'une traduction est en cours (pour afficher un loader par ex.)
const staticCache = reactive<Record<string, Record<string, string>>>({})   // cache des textes statiques déjà traduits, par langue

// Cache générique du contenu DYNAMIQUE (événements agenda, partenaires,
// articles...) déjà traduit, indexé par "<cacheKey>:<id>:<lang>".
// Remplace l'ancien dynamicCache qui ne couvrait que selections/nouveautes
// et n'était de toute façon jamais lu par les composants.
const dynamicItemCache = reactive<Record<string, Record<string, any>>>({})

export function useTranslation() {
  // Fonction de traduction utilisée dans les templates : t('maCle')
  // Retourne le texte français si la langue courante est 'fr', sinon la
  // version mise en cache pour la langue courante (ou le FR/la clé brute
  // en repli si la traduction n'est pas encore disponible).
  function t(key: string): string {
    if (currentLang.value === 'fr') return baseTexts[key] ?? key
    return staticCache[currentLang.value]?.[key] ?? baseTexts[key] ?? key
  }

  // Traduit un texte français vers la langue cible.
  // Priorité au glossaire métier (translationGlossary.ts) pour éviter les
  // mauvaises traductions automatiques de termes spécifiques (ex: "Stage"
  // traduit littéralement en "internship" au lieu de "camp").
  // En cas d'échec de l'API, on retourne le texte français d'origine
  // plutôt que de faire planter l'affichage (repli silencieux).
  async function translateText(text: string, target: Lang): Promise<string> {
    if (!text || target === 'fr') return text

    // 1) Glossaire métier prioritaire (ex: "Stage" -> "Camp", pas "internship")
    const exactOverride = Object.keys(translationOverrides).find(
      key => key.toLowerCase() === text.trim().toLowerCase()
    )
    if (exactOverride) {
      return translationOverrides[exactOverride]?.[target as 'en' | 'de' | 'it'] ?? text
    }

    // 2) Appel API générique (LibreTranslate), via la route serveur /api/translate
    //    (l'URL réelle de LibreTranslate reste côté serveur, cf. nuxt.config.ts)
    try {
      const data = await $fetch<{ translatedText: string }>('/api/translate', {
        method: 'POST',
        body: { q: text, source: 'fr', target, format: 'text' }
      })
      return data.translatedText || text
    } catch (e) {
      console.error('Erreur traduction:', e)
      return text // fallback silencieux : on garde le FR si l'API est down
    }
  }

  // Traduit tous les textes statiques (baseTexts) vers la langue donnée,
  // en une seule fois, et met le résultat en cache. Ne fait rien si la
  // langue est déjà en cache ou si c'est le français.
  async function translateStaticTexts(lang: Lang) {
    if (lang === 'fr' || staticCache[lang]) return
    const entries = await Promise.all(
      Object.entries(baseTexts).map(async ([key, value]) => [key, await translateText(value, lang)])
    )
    staticCache[lang] = Object.fromEntries(entries)
  }

  // Traduit UN item de contenu dynamique (événement agenda, partenaire,
  // article...) sur les champs texte demandés, et met le résultat en
  // cache par id+langue. Réutilisable depuis n'importe quelle page/liste :
  // deux pages qui affichent le même item (ex: liste agenda + détail
  // agenda) partagent le même cache, pas de re-traduction inutile.
  //
  //   translateItem('en', 'agenda', event.id, event, ['titre', 'lieu'])
  async function translateItem<T extends Record<string, any>>(
    lang: Lang,
    cacheKey: string,
    id: string | number,
    item: T,
    fields: (keyof T)[]
  ): Promise<T> {
    if (lang === 'fr' || !item) return item
    const cacheId = `${cacheKey}:${id}`
    dynamicItemCache[lang] ??= {}
    if (dynamicItemCache[lang][cacheId]) return dynamicItemCache[lang][cacheId]

    const copy: any = { ...item }
    await Promise.all(
      fields.map(async (field) => {
        const value = item[field]
        if (typeof value === 'string' && value.trim()) {
          copy[field] = await translateText(value, lang)
        }
      })
    )
    dynamicItemCache[lang][cacheId] = copy
    return copy
  }

  // Traduit une LISTE d'items dynamiques (événements, partenaires,
  // articles...) en parallèle. `idField` sert de clé de cache par
  // défaut sur 'id'.
  //
  //   translateItems('en', 'agenda', agendaEvents, ['titre', 'lieu'])
  async function translateItems<T extends Record<string, any>>(
    lang: Lang,
    cacheKey: string,
    items: T[],
    fields: (keyof T)[],
    idField: keyof T = 'id' as keyof T
  ): Promise<T[]> {
    if (lang === 'fr' || !items?.length) return items
    return Promise.all(
      items.map((item) => translateItem(lang, cacheKey, item[idField], item, fields))
    )
  }

  // Change la langue active du site : bascule immédiatement en français
  // (déjà disponible), ou déclenche la traduction des textes statiques
  // si la langue n'est pas encore en cache. La traduction du contenu
  // dynamique (agenda/partenaires/articles) est déclenchée séparément
  // par chaque page via translateItems/translateItem (voir plus haut),
  // car chaque page a des données et des champs différents.
  async function setLang(lang: Lang) {
    currentLang.value = lang
    if (lang === 'fr') return
    isTranslating.value = true
    try {
      await translateStaticTexts(lang)
    } finally {
      isTranslating.value = false
    }
  }

  return { currentLang, isTranslating, t, setLang, translateItem, translateItems }
}