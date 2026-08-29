import type { AgendaEvent } from "~/data/agendaData";

/**
 * Formate la tranche d’âge à partir des valeurs numériques envoyées par l’API.
 * Les valeurs ageMin/ageMax sont prioritaires sur ageLabel.
 */
export function formatAgeLabel(event: Pick<AgendaEvent, "age" | "ageMin" | "ageMax" | "ageLabel">): string {
  const min = event.ageMin;
  const max = event.ageMax;
  const hasMin = typeof min === "number" && Number.isFinite(min);
  const hasMax = typeof max === "number" && Number.isFinite(max);

  if (hasMin && hasMax) {
    if (min === 0 && max === 99) return "Tout public";
    if (min === max) return `${min} an${min > 1 ? "s" : ""}`;
    return `${min} - ${max} ans`;
  }

  if (hasMin) return `À partir de ${min} an${min === 1 ? "" : "s"}`;
  if (hasMax) return `Jusqu'à ${max} an${max === 1 ? "" : "s"}`;

  if (typeof event.age === "number" && Number.isFinite(event.age)) {
    return `${event.age} an${event.age === 1 ? "" : "s"}`;
  }

  const fallback = event.ageLabel?.trim() ?? "";
  // Ne jamais afficher les clés internes du filtre comme badge utilisateur.
  if (/^(?:bebe|petitEnfant|enfant|adolescent|jeune|adulte|famille)(?:\s*[·,;|]\s*(?:bebe|petitEnfant|enfant|adolescent|jeune|adulte|famille))*$/i.test(fallback)) {
    return "";
  }
  return fallback;
}
