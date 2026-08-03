// Type utilitaire listant les langues cibles (le français n'est pas
// inclus ici car c'est la langue source/pivot des contenus)
type Lang = 'en' | 'de' | 'it'

// Glossaire de traductions "forcées" pour des termes métier ambigus
// qu'un moteur de traduction automatique (ex: LLM) pourrait mal
// interpréter. Utilisé pour surcharger/corriger certaines traductions
// avant ou après le passage dans les chaînes n8n / Mistral.
export const translationOverrides: Record<string, Record<Lang, string>> = {
  'Stage': { en: 'Day camp', de: 'Tagescamp', it: 'Campo diurno' },
  'Stages': { en: 'Day camps', de: 'Tagescamps', it: 'Campo diurno' },
  // Ajoute ici tout autre terme métier ambigu
}
