import { computed, ref, watch, type Ref } from "vue";
import type { Partner } from "~/data/partnersData";

// Images de repli déjà présentes dans /public/images/partners.
// Même mapping que celui utilisé dans PartnerCard.vue, pour garder
// un comportement identique entre la liste et la page détail.
const defaultLogoByCategory: Record<string, string> = {
  partnerCatAssociation: "/images/partners/association.png",
  partnerCatCabinet: "/images/partners/cabinet.png",
  partnerCatEcole: "/images/partners/ecole.png",
  partnerCatExpert: "/images/partners/expert.png",
  partnerCatGardeEnfants: "/images/partners/garde-enfant.png",
  partnerCatMusee: "/images/partners/musee.png",
};

/**
 * Renvoie une URL de logo toujours affichable : celle du partenaire si elle
 * est définie et charge correctement, sinon une image de repli basée sur sa
 * catégorie. `useFallbackLogo` doit être appelé sur l'événement `@error` de
 * chaque <img> qui utilise `displayedLogo`.
 */
export function usePartnerLogo(partner: Ref<Partner | null | undefined>) {
  const logoFailed = ref(false);

  const fallbackLogo = computed(
    () =>
      defaultLogoByCategory[partner.value?.category ?? ""] ??
      "/images/partners/association.png",
  );

  const displayedLogo = computed(() =>
    logoFailed.value || !partner.value?.logo
      ? fallbackLogo.value
      : partner.value.logo,
  );

  function useFallbackLogo() {
    logoFailed.value = true;
  }

  watch(
    () => partner.value?.logo,
    () => {
      logoFailed.value = false;
    },
  );

  return { displayedLogo, useFallbackLogo };
}