// server/utils/imageService.ts

const DEFAULT_IMAGE = '/images/famille.jpeg'
const IMAGE_PROXY_PATH = '/api/image?url='
const ALLOWED_IMAGE_HOSTS = new Set(['www.anzere.ch', 'anzere.ch'])

/**
 * Transforme l'URL distante en URL same-origin servie par server/api/image.ts.
 * La query string est conservée, car elle peut faire partie de la signature/CDN
 * de la photo et ne doit pas être supprimée.
 */
export async function saveImageFromUrl(url: string | undefined, _id: string): Promise<string> {
  if (!url || typeof url !== 'string') return DEFAULT_IMAGE

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return DEFAULT_IMAGE

  try {
    const parsed = new URL(trimmedUrl)

    if (ALLOWED_IMAGE_HOSTS.has(parsed.hostname)) {
      return `${IMAGE_PROXY_PATH}${encodeURIComponent(parsed.toString())}`
    }

    // Pour une autre source, l'URL reste utilisable directement par le navigateur.
    return parsed.toString()
  } catch (error) {
    console.error('URL image invalide:', trimmedUrl, error)
    return DEFAULT_IMAGE
  }
}