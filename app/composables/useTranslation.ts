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
const dynamicCache = reactive<Record<string, { selections: ContentItem[]; nouveautes: ContentItem[] }>>({}) // cache du contenu dynamique (carrousels) déjà traduit, par langue

export function useTranslation() {
  const config = useRuntimeConfig()
  const libretranslateUrl = config.public.libretranslateUrl as string

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

    // 2) Appel API générique (LibreTranslate)
    try {
      const data = await $fetch<{ translatedText: string }>(`${libretranslateUrl}/translate`, {
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

  // Traduit le contenu dynamique des carrousels (sélections + nouveautés)
  // vers la langue donnée, et met le résultat en cache. Ne fait rien si
  // la langue est déjà en cache ou si c'est le français.
  async function translateDynamicContent(lang: Lang, selectionsFR: ContentItem[], nouveautesFR: ContentItem[]) {
    if (lang === 'fr' || dynamicCache[lang]) return
    const [selTr, nouvTr] = await Promise.all([
      Promise.all(selectionsFR.map(async item => ({
        ...item,
        titre: await translateText(item.titre, lang),
        description: await translateText(item.description, lang)
      }))),
      Promise.all(nouveautesFR.map(async item => ({
        ...item,
        titre: await translateText(item.titre, lang),
        description: await translateText(item.description, lang)
      })))
    ])
    dynamicCache[lang] = { selections: selTr, nouveautes: nouvTr }
  }

  // Change la langue active du site : bascule immédiatement en français
  // (déjà disponible), ou déclenche la traduction (textes statiques +
  // contenu dynamique en parallèle) si la langue n'est pas encore en cache.
  async function setLang(lang: Lang, selectionsFR: ContentItem[], nouveautesFR: ContentItem[]) {
    currentLang.value = lang
    if (lang === 'fr') return
    isTranslating.value = true
    try {
      await Promise.all([
        translateStaticTexts(lang),
        translateDynamicContent(lang, selectionsFR, nouveautesFR)
      ])
    } finally {
      isTranslating.value = false
    }
  }

  return { currentLang, isTranslating, t, setLang, dynamicCache }
}
