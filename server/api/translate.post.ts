interface TranslateBody {
  q?: unknown;
  source?: unknown;
  target?: unknown;
  format?: unknown;
}

interface LibreTranslateResponse {
  translatedText?: string;
}

const SUPPORTED_LANGUAGES = new Set(["fr", "en", "de", "it"]);

export default defineEventHandler(async (event): Promise<LibreTranslateResponse> => {
  const body = await readBody<TranslateBody>(event);
  const text = typeof body?.q === "string" ? body.q.trim() : "";
  const source = typeof body?.source === "string" ? body.source : "fr";
  const target = typeof body?.target === "string" ? body.target : "fr";
  const format = typeof body?.format === "string" ? body.format : "text";

  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: "Le texte à traduire est obligatoire.",
    });
  }
  if (!SUPPORTED_LANGUAGES.has(source) || !SUPPORTED_LANGUAGES.has(target)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Langue de traduction non supportée.",
    });
  }

  const config = useRuntimeConfig();
  const baseUrl = String(
    config.libretranslateUrl || "http://localhost:5003",
  ).replace(/\/+$/, "");

  try {
    return await $fetch<LibreTranslateResponse>(`${baseUrl}/translate`, {
      method: "POST",
      body: { q: text, source, target, format },
    });
  } catch (error) {
    console.error("[api/translate] LibreTranslate indisponible:", error);
    throw createError({
      statusCode: 502,
      statusMessage: "Le service de traduction est momentanément indisponible.",
    });
  }
});