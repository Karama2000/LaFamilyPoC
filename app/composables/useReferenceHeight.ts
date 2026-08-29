import { ref, onMounted, onUnmounted, type Ref } from "vue";

/**
 * Mesure en continu la hauteur d'un élément de référence
 * et la retourne de façon réactive.
 * Usage générique dans n'importe quelle page.
 */
export function useReferenceHeight() {
  const referenceRef = ref<HTMLElement | null>(null);
  const referenceHeight = ref(0);
  let observer: ResizeObserver | null = null;

  onMounted(() => {
    if (!referenceRef.value) return;
    observer = new ResizeObserver(([entry]) => {
      referenceHeight.value = entry.contentRect.height;
    });
    observer.observe(referenceRef.value);
  });

  onUnmounted(() => observer?.disconnect());

  return { referenceRef, referenceHeight };
}