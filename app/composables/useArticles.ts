export function useArticles() {
  const { currentLang } = useTranslation()
  return useFetch('/api/articles', {
    query: { lang: currentLang },
    key: computed(() => `articles-${currentLang.value}`),
    default: () => [],
  })
}