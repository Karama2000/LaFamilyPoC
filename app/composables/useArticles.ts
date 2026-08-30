export function useArticles() {
  return useFetch('/api/articles', {
    key: 'articles',
    default: () => [],
  })
}