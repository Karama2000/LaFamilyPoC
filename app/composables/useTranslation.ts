// useTranslation.ts
// -------------------
// Composable de traduction pour le site diefamilie.ch — version SANS
// service de traduction en direct (plus besoin de LibreTranslate/Docker).
//
// Principe :
//   - baseTexts (staticTexts.ts, en français) reste la référence
//   - staticTextsEn.ts / staticTextsDe.ts / staticTextsIt.ts contiennent
//     les traductions déjà écrites à l'avance, clé pour clé
//   - t('maCle') lit simplement la bonne valeur selon la langue active,
//     sans aucun appel réseau
//
// Le contenu DYNAMIQUE (agenda, partenaires, articles) n'est plus traduit
// ici : il doit être fourni déjà traduit par l'API (ex: /api/agenda?lang=it),
// à la manière du workflow n8n Gianadda qui écrit un Sheet par langue.
import { baseTexts } from '~/data/staticTexts'
import { staticTextsEn } from '~/data/staticTextsEn'
import { staticTextsDe } from '~/data/staticTextsDe'
import { staticTextsIt } from '~/data/staticTextsIt'

type Lang = 'fr' | 'en' | 'de' | 'it'

// Un seul dictionnaire par langue, prêt à l'emploi — aucune traduction
// n'est calculée au runtime.
const locales: Record<Lang, Record<string, string>> = {
  fr: baseTexts,
  en: staticTextsEn,
  de: staticTextsDe,
  it: staticTextsIt,
}

// State global partagé entre TOUS les composants (singleton pattern Nuxt).
// Déclaré au niveau du module, donc le header et toutes les autres pages
// qui appellent useTranslation() lisent et modifient la même valeur :
// changer la langue dans le header met à jour tout le site automatiquement.
const currentLang = ref<Lang>('fr')

export function useTranslation() {
  // Fonction de traduction utilisée dans les templates : t('maCle')
  // Repli en cascade : langue active -> français -> la clé brute
  // (utile en dev si une clé existe en FR mais n'a pas encore été
  // traduite dans un des 3 fichiers).
  function t(key: string): string {
    return locales[currentLang.value]?.[key] ?? baseTexts[key] ?? key
  }

  // Change la langue active du site. Plus de logique asynchrone :
  // les 4 dictionnaires sont déjà chargés en mémoire au démarrage.
  function setLang(lang: Lang) {
    currentLang.value = lang
  }

  return { currentLang, t, setLang }
}