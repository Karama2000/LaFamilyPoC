// server/api/image.ts

const ALLOWED_IMAGE_HOSTS = new Set(['www.anzere.ch', 'anzere.ch'])

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const rawUrl = typeof query.url === 'string' ? query.url : ''

  if (!rawUrl) {
    throw createError({ statusCode: 400, statusMessage: 'URL image manquante' })
  }

  let imageUrl: URL
  try {
    imageUrl = new URL(rawUrl)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'URL image invalide' })
  }

  if (!ALLOWED_IMAGE_HOSTS.has(imageUrl.hostname)) {
    throw createError({ statusCode: 403, statusMessage: 'Domaine image non autorisé' })
  }

  const response = await fetch(imageUrl, {
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (compatible; DieFamilieAgenda/1.0)',
      Referer: 'https://www.anzere.ch/',
    },
  })

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Image distante indisponible (${response.status})`,
    })
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const cacheControl = response.headers.get('cache-control') || 'public, max-age=3600'
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', cacheControl)

  return new Uint8Array(await response.arrayBuffer())
})