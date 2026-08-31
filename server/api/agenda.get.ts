import { saveImageFromUrl } from "../utils/imageService";

interface NormalizedAgendaEvent {
  id: string;
  titre: string;
  lieu: string;
  cantonKey: string;
  date: string;
  dateStart: string;
  dateEnd: string;
  image: string;
  // Clé de la grande catégorie attendue par Nuxt pour les filtres/menu.
  // Valeurs : activite, campLogement, campJour ou cours.
  categorie: string;
  // Libellé BRUT et détaillé de la colonne "Catégorie" du Sheet. Il reste
  // indépendant de la taxonomie du site et est affiché tel quel sur la carte.
  // Exemples : "Course de sport", "Ateliers d'art", "Aventure".
  // Alias explicite conservé dans le payload pour les consommateurs back/front
  // qui préfèrent nommer ce champ selon son rôle métier.
  categorieDetaillee: string;
  // Libellé BRUT de la colonne "Catégorie" du Sheet, tel qu'écrit par les
  // workflows n8n (ex: "Ateliers d'art", "Concert", "Théâtre"...), SANS
  // passer par la logique de mots-clés de subCategoryFrom(). Sert à
  // afficher sur la carte la catégorie exacte du Sheet plutôt qu'un libellé
  // générique de repli quand le Sheet utilise une valeur non répertoriée
  // dans cette table (voir AgendaEventCard.vue).
  categorieLabel: string;
  sousCategorie: string;
  ageKeys: string[];
  age?: number;
  ageMin?: number;
  ageMax?: number;
  ageLabel?: string;
  partnerId?: number;
  horaires?: string;
  tarif?: string;
  description?: string;
  infoComplementaire?: string;
  contactTel?: string;
  contactEmail?: string;
  siteUrl?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Occurrences supplémentaires du même événement (autres dates et/ou
  // autres adresses), affichées dans une section dédiée sur la page détail
  // ET signalées par un badge "Se répète" sur la carte de l'agenda.
  autresDates?: string[];
  autresAdresses?: string[];
  autresLieuxDates?: { lieu: string; date: string }[];
  // Dates ISO (YYYY-MM-DD) de ces mêmes occurrences supplémentaires, pour
  // permettre au filtre de recherche par dates de matcher un événement dès
  // qu'UNE de ses dates (pas seulement la date principale) tombe dans la
  // période recherchée. Non affiché tel quel : sert uniquement au filtrage.
  autresDatesISO?: { dateStart: string; dateEnd: string }[];
  // Indique si l'événement doit apparaître dans le carrousel "Notre
  // sélection" de la page d'accueil. Alimenté par une colonne du Sheet
  // (ex: "Sélection", "Mis en avant", "À la une"...). Toute valeur du
  // type oui/yes/true/1/x est considérée comme "vrai".
  misEnAvant: boolean;
}

type RawRow = Record<string, unknown>;

const DEFAULT_IMAGE = "/images/famille.jpeg";
const CACHE_DURATION_MS = 10 * 60 * 1000;

let cache: { data: NormalizedAgendaEvent[]; fetchedAt: number } | null = null;

function normalizeKey(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function findValue(row: RawRow, ...wantedKeys: string[]): string {
  const wanted = wantedKeys.map(normalizeKey);
  const entry = Object.entries(row).find(
    ([key, raw]) =>
      wanted.includes(normalizeKey(key)) &&
      raw !== undefined &&
      raw !== null &&
      String(raw).trim(),
  );
  return entry ? String(entry[1]).trim() : "";
}

function splitValues(input: unknown): string[] {
  if (Array.isArray(input)) return input.flatMap(splitValues);
  return String(input ?? "")
    .split(/[;,|\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseOtherLocations(
  valueToParse: unknown,
): { lieu: string; date: string }[] {
  if (Array.isArray(valueToParse)) {
    return valueToParse.flatMap((item) => {
      if (item && typeof item === "object") {
        const object = item as Record<string, unknown>;
        const lieu = String(
          object.lieu ?? object.Lieu ?? object.address ?? object.Adresse ?? "",
        ).trim();
        const date = String(object.date ?? object.Date ?? "").trim();
        return lieu || date ? [{ lieu, date }] : [];
      }
      const text = String(item ?? "").trim();
      const parts = text.split(/\s+(?:le|du|—|-|\|)\s+/i);
      return text
        ? [{ lieu: parts[0] ?? text, date: parts.slice(1).join(" ") }]
        : [];
    });
  }
  const text = String(valueToParse ?? "").trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parseOtherLocations(parsed);
  } catch {
    // Format texte libre utilisé par certaines lignes de feuille.
  }
  return splitValues(text).map((item) => {
    const [lieu, date = ""] = item.split(/\s+(?:le|du|—|-|\|)\s+/i);
    return { lieu: lieu?.trim() ?? item, date: date.trim() };
  });
}

function parseDate(valueToParse: string): string {
  if (!valueToParse) return "";
  const iso = valueToParse.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (iso) {
    const [, year, month, day] = iso;
    if (year && month && day)
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const european = valueToParse.match(/(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (european) {
    const [, day, month, year] = european;
    if (year && month && day)
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return valueToParse;
}

const AGE_MIN_KEYS = [
  "Âge Min",
  "Age Min",
  "ageMin",
  "ajmine",
  "age mine",
  "âge mine",
  "âge minimum",
  "age minimum",
];
const AGE_MAX_KEYS = [
  "Âge Max",
  "Age Max",
  "ageMax",
  "ajmax",
  "age max",
  "âge max",
  "âge maximum",
  "age maximum",
];

function numericAgeFromRow(row: RawRow, keys: string[]): number | undefined {
  const value = findValue(row, ...keys);
  if (value === "") return undefined;
  const number = Number(value.replace(",", "."));
  return Number.isFinite(number) ? number : undefined;
}

function singleAgeFromRow(row: RawRow): number | undefined {
  const value = findValue(row, "Âge", "Age", "age");
  if (value === "") return undefined;
  const match = value.match(/^\s*(\d{1,3})(?:[,.]0+)?\s*(?:ans?)?\s*$/i);
  if (!match) return undefined;
  const age = Number(match[1]);
  return Number.isFinite(age) ? age : undefined;
}

function ageLabelFromRow(row: RawRow): string | undefined {
  const age = singleAgeFromRow(row);
  const min = numericAgeFromRow(row, AGE_MIN_KEYS);
  const max = numericAgeFromRow(row, AGE_MAX_KEYS);
  // Les bornes Âge Min / Âge Max sont prioritaires lorsqu’elles existent.
  if (min !== undefined && max !== undefined) {
    if (min <= 0 && max >= 99) return "Tout public";
    if (min === max) return `${min} an${min > 1 ? "s" : ""}`;
    return `${min} - ${max} ans`;
  }
  if (min !== undefined) return `À partir de ${min} ans`;
  if (max !== undefined) return `Jusqu'à ${max} ans`;
  if (age !== undefined) return `${age} an${age > 1 ? "s" : ""}`;

  // Repli pour les anciennes lignes qui ne possèdent pas encore ces colonnes.
  const values = splitValues(
    row.ageKeys ??
      row["Age Keys"] ??
      row["Âge"] ??
      row["Age"] ??
      row["Public cible"] ??
      row["Public"],
  );
  const label = values.join(" · ").trim();
  const normalized = normalizeKey(label);
  if (/toutpublic|touspublics?|touslespublics?/.test(normalized))
    return "Tout public";
  if (/famille|familial|familiale/.test(normalized)) return "Famille";
  const range = label.match(/(\d+)\s*(?:-|–|—|à|a)\s*(\d+)\s*(?:ans?|años?)?/i);
  if (range) return `${range[1]} - ${range[2]} ans`;

  // ageKeys sont des valeurs techniques de filtrage : elles ne doivent pas
  // être renvoyées comme texte visible dans les cartes ou le détail.
  const technicalAgeKeys = new Set([
    "bebe",
    "petitenfant",
    "enfant",
    "adolescent",
    "jeune",
    "adulte",
    "famille",
  ]);
  if (
    values.length > 0 &&
    values.every((value) => technicalAgeKeys.has(normalizeKey(value)))
  ) {
    return undefined;
  }
  return label || undefined;
}
function ageKeysFromRow(row: RawRow): string[] {
  const explicit = splitValues(
    row.ageKeys ??
      row["Age Keys"] ??
      row["Âge"] ??
      row["Age"] ??
      row["Public cible"] ??
      row["Public"],
  );
  const rangeText = explicit.join(" ");
  const rangeNumbers = rangeText.match(/(\d+)\s*(?:-|–|à|a)\s*(\d+)/i);
  if (rangeNumbers) {
    const min = Number(rangeNumbers[1]);
    const max = Number(rangeNumbers[2]);
    return [
      ...(min <= 2 && max >= 0 ? ["bebe"] : []),
      ...(min <= 5 && max >= 3 ? ["petitEnfant"] : []),
      ...(min <= 11 && max >= 6 ? ["enfant"] : []),
      ...(min <= 17 && max >= 12 ? ["adolescent"] : []),
      ...(max >= 18 ? ["adulte"] : []),
    ];
  }
  const normalized = explicit.map((age) => {
    const n = normalizeKey(age);
    if (/^0.*2|bebe/.test(n)) return "bebe";
    if (/3.*5|petitenfant/.test(n)) return "petitEnfant";
    if (/6.*11|enfant/.test(n)) return "enfant";
    if (/12.*17|adolescent|ado/.test(n)) return "adolescent";
    if (/jeune|jeunes/.test(n)) return "jeune";
    if (/famille|familial|familiale/.test(n)) return "famille";
    if (/18|adulte/.test(n)) return "adulte";
    return age;
  });
  const min = numericAgeFromRow(row, AGE_MIN_KEYS);
  const max = numericAgeFromRow(row, AGE_MAX_KEYS);
  if (!normalized.length && min !== undefined) {
    const upper = max ?? 99;
    return [
      ...(min <= 2 && upper >= 0 ? ["bebe"] : []),
      ...(min <= 5 && upper >= 3 ? ["petitEnfant"] : []),
      ...(min <= 11 && upper >= 6 ? ["enfant"] : []),
      ...(min <= 17 && upper >= 12 ? ["adolescent"] : []),
      ...(upper >= 18 ? ["adulte"] : []),
    ];
  }
  return [...new Set(normalized)];
}

function cantonFrom(valueToParse: string): string {
  const normalized = normalizeKey(valueToParse);
  const aliases: Record<string, string> = {
    zurich: "ZH",
    berne: "BE",
    bern: "BE",
    lucerne: "LU",
    luzern: "LU",
    fribourg: "FR",
    vaud: "VD",
    geneve: "GE",
    geneva: "GE",
    valais: "VS",
    wallis: "VS",
    neuchatel: "NE",
    neuchâtel: "NE",
    tessin: "TI",
    ticino: "TI",
    jura: "JU",
    soleure: "SO",
    solothurn: "SO",
    argovie: "AG",
    aargau: "AG",
    grisons: "GR",
    graubunden: "GR",
    thurgovie: "TG",
    schaffhouse: "SH",
    saintgall: "SG",
    bâleville: "BS",
    baleville: "BS",
  };
  return aliases[normalized] || valueToParse.toUpperCase();
}

// Table de correspondance ENTRE le texte de la colonne "Catégorie" du Sheet
// (écrit par les workflows n8n) ET la clé technique de sous-catégorie
// utilisée côté site (menuData.ts / staticTexts.ts). Ces 8 clés sont les
// SEULES sous-catégories réelles du site sous "Activités" et "Cours" —
// "Camps" / "Camps du jour" n'ont pas de sous-catégorie (categorie suffit).
//
// Chaque sous-catégorie est associée à une LISTE DE MOTS-CLÉS (normalisés :
// sans accents/espaces/ponctuation) recherchés n'importe où dans le libellé
// du Sheet — pas seulement en préfixe comme avant. Ça couvre les libellés
// composés ("Autres activités – Aventure") ET les formulations différentes
// d'un client à l'autre ("Sport", "Plein air", "Randonnée"...) sans avoir à
// connaître à l'avance le texte exact écrit par chaque client.
//
// L'ORDRE COMPTE : les groupes "Cours" sont testés AVANT les groupes
// "Activités", et les mots-clés les plus précis sont placés avant les plus
// génériques dans chaque groupe. Ça évite qu'un libellé comme "Séances de
// sport" (un COURS) ne matche à tort le mot-clé générique "sport" du groupe
// actPleinAir (une ACTIVITÉ) : "seancesdesport" est testé en premier et
// gagne.
//
// IMPORTANT : si un nouveau client utilise un libellé vraiment inédit qui ne
// contient aucun de ces mots-clés, l'événement retombe sur categorie='activite'
// SANS sousCategorie plutôt que de planter — mais il ne sera alors PAS
// reconnu par les sous-menus "Activités"/"Cours" (juste par le clic sur le
// TITRE de la section, qui filtre categorie entière). Ajoutez le mot-clé
// manquant ci-dessous dès que vous repérez ce cas.
const SUBCATEGORY_KEYWORDS: { key: string; keywords: string[] }[] = [
  // --- Cours : testés en premier (les plus spécifiques) ---
  {
    key: "coursSoutien",
    keywords: [
      "soutienscolaire",
      "aidedevoirs",
      "appuiscolaire",
      "coursdesoutien",
      "devoirssurveilles",
      "remediation",
    ],
  },
  {
    key: "coursLangues",
    keywords: [
      "coursdelangue",
      "coursdelangues",
      "coursdanglais",
      "coursdallemand",
      "francaislanguetrangere",
      "coursdefle",
      "languesetrangeres",
    ],
  },
  {
    key: "coursArt",
    keywords: [
      "ateliersdart",
      "atelierdart",
      "coursdedessin",
      "coursdepeinture",
      "coursdemusique",
      "coursdetheatre",
      "coursdedanse",
      "coursdechant",
      "coursartistique",
    ],
  },
  {
    key: "coursSport",
    keywords: [
      "seancesdesport",
      "seancedesport",
      "coursdesport",
      "coursdefitness",
      "coursdenatation",
      "coursdegym",
      "coursdegymnastique",
      "coursdeyoga",
    ],
  },
  {
    key: "coursNumeriques",
    keywords: [
      "coursnumerique",
      "coursnumeriques",
      "coursinformatique",
      "coursdecodage",
      "coursderobotique",
      "coursdeprogrammation",
    ],
  },
  // --- Activités : testées ensuite, mots-clés plus génériques ---
  {
    key: "actPleinAir",
    keywords: [
      "activitesphysiques",
      "activitephysique",
      "pleinair",
      "sportif",
      "sportive",
      "sport",
      "randonnee",
      "rando",
      "velo",
      "balade",
      "nature",
      "exterieur",
      "montagne",
      "ski",
      "baignade",
      "aventure",
      "escalade",
      "course",
    ],
  },
  {
    key: "actCulturelles",
    keywords: [
      "activitesculturelles",
      "activiteculturelle",
      "culture",
      "culturel",
      "musee",
      "exposition",
      "concert",
      "theatre",
      "spectacle",
      "cinema",
      "patrimoine",
      "visiteguidee",
      "conte",
    ],
  },
  {
    key: "actAutres",
    keywords: [
      "autresactivites",
      "autreactivite",
      "loisir",
      "loisirs",
      "divers",
    ],
  },
];

// Étape 1 (prioritaire) : libellés "composés" du Sheet, de la forme
// "Catégorie générale – précision libre" (ex: "Autres activités – Atelier
// mécanique vélo", "Autres activités – Aventure"). La catégorie générale
// n'est reconnue qu'EN PRÉFIXE (pas n'importe où dans le texte) : sans ça,
// un mot du texte libre après le tiret ("vélo" ci-dessus) matcherait le
// mot-clé générique "velo" du groupe actPleinAir AVANT qu'on ait pu voir que
// le client annonçait lui-même "Autres activités" — et l'événement finirait
// classé plein air au lieu d'autres activités.
const KNOWN_PREFIXES: { key: string; prefixes: string[] }[] = [
  { key: "coursSoutien", prefixes: ["soutienscolaire"] },
  { key: "coursLangues", prefixes: ["coursdelangues", "coursdelangue"] },
  { key: "coursArt", prefixes: ["ateliersdart", "atelierdart"] },
  { key: "coursSport", prefixes: ["seancesdesport", "seancedesport"] },
  { key: "coursNumeriques", prefixes: ["coursnumeriques", "coursnumerique"] },
  { key: "actPleinAir", prefixes: ["activitesphysiques", "activitephysique"] },
  {
    key: "actCulturelles",
    prefixes: ["activitesculturelles", "activiteculturelle"],
  },
  { key: "actAutres", prefixes: ["autresactivites", "autreactivite"] },
];

function subCategoryFrom(valueToParse: string): string {
  const normalized = normalizeKey(valueToParse);
  if (!normalized) return "";

  // Étape 1 : préfixe connu, le plus long d'abord (au cas où deux préfixes
  // candidats se chevauchent, pour matcher la clé la plus précise).
  const allPrefixes = KNOWN_PREFIXES.flatMap((group) =>
    group.prefixes.map((prefix) => ({ key: group.key, prefix })),
  ).sort((a, b) => b.prefix.length - a.prefix.length);
  const prefixMatch = allPrefixes.find((candidate) =>
    normalized.startsWith(candidate.prefix),
  );
  if (prefixMatch) return prefixMatch.key;

  // Étape 2 (repli) : mot-clé cherché n'importe où dans le texte — pour les
  // libellés "libres" qui ne suivent pas le format "Catégorie – précision"
  // (ex: un client qui écrit juste "Vélo", "Randonnée", "Musée"...).
  for (const group of SUBCATEGORY_KEYWORDS) {
    if (group.keywords.some((keyword) => normalized.includes(keyword)))
      return group.key;
  }
  return "";
}

function categoryFrom(valueToParse: string): string {
  const category = normalizeKey(valueToParse);
  // On priorise la détection par mots-clés de subCategoryFrom() ci-dessus :
  // "Ateliers d'art", "Soutien scolaire", "Séances de sport"... ne
  // contiennent pas le mot "cours" mais SONT des sous-catégories de "Cours".
  const subKey = subCategoryFrom(valueToParse);
  if (subKey?.startsWith("cours")) return "cours";
  if (subKey?.startsWith("act")) return "activite";
  if (
    category.includes("camp") &&
    (category.includes("jour") || category.includes("day"))
  )
    return "campJour";
  if (category.includes("camp")) return "campLogement";
  if (category.includes("cours") || category.includes("course")) return "cours";
  return "activite";
}

/** Interprète une case du Sheet comme un booléen (oui/yes/true/1/x). */
function truthyFlag(value: string): boolean {
  const normalized = normalizeKey(value);
  return ["oui", "yes", "true", "1", "x", "vrai"].includes(normalized);
}

/**
 * Lit la colonne "mis en avant" du Sheet, sous n'importe lequel de ces
 * intitulés (le premier trouvé et non vide gagne).
 */
function misEnAvantFromRow(row: RawRow): boolean {
  const value = findValue(
    row,
    "Sélection",
    "Selection",
    "Mis en avant",
    "MisEnAvant",
    "À la une",
    "A la une",
    "Vedette",
    "Featured",
  );
  return truthyFlag(value);
}

// Champs qu'une ligne de "continuation" (occurrence supplémentaire du même
// événement, ligne souvent quasi vide dans le Sheet) peut hériter de la
// ligne précédente lorsqu'elle appartient au même groupe.
const INHERITED_FIELDS = [
  "Titre",
  "titre",
  "Title",
  "Photo",
  "photo",
  "image",
  "Image",
  "Catégorie",
  "Categorie",
  "categorie",
  "Category",
  "Categoria",
  "Catégorie détaillée",
  "Categorie detaillee",
  "categorieLabel",
  "categoryLabel",
  "Sous-catégorie",
  "Sous categorie",
  "sousCategorie",
  "Description",
  "description",
  "Information complémentaire",
  "Information complementaire",
  "infoComplementaire",
  "Infos",
  "Téléphone",
  "Telephone",
  "contactTel",
  "Téléphone de contact",
  "E-mail",
  "Email",
  "contactEmail",
  "Adresse e-mail",
  "Prix",
  "prix",
  "tarif",
  "Price",
  "Âge",
  "Age",
  "ageKeys",
  "Age Keys",
  "Âge Min",
  "Age Min",
  "Age Max",
  "Âge Max",
  "ajmine",
  "ajmax",
  "âge mine",
  "age mine",
  "âge max",
  "age max",
  "Lien de l'événement",
  "Lien de evenement",
  "siteUrl",
  "url",
  "Sélection",
  "Selection",
  "Mis en avant",
  "MisEnAvant",
  "À la une",
  "A la une",
  "Vedette",
  "Featured",
];

/**
 * Complète les lignes de "continuation" (occurrences supplémentaires d'un
 * même événement, souvent quasi vides dans le Sheet hormis la date/le lieu)
 * avec les infos de la ligne précédente du même groupe : titre, image,
 * description, contact, etc.
 *
 * Règle de détection d'une ligne de continuation : ELLE N'A PAS DE TITRE.
 * C'est le seul signal fiable disponible dans le Sheet — une "vraie" nouvelle
 * ligne d'événement porte toujours un Titre, une ligne de continuation
 * (= une date supplémentaire du même événement) ne le répète pas.
 *
 * On se base UNIQUEMENT là-dessus (et plus sur "Num"/id ou la présence
 * d'une Photo) : certaines feuilles donnent un identifiant "Num" différent
 * à chaque ligne (numéro de ligne, pas d'événement) et/ou remplissent la
 * Photo sur les lignes de continuation — ces deux signaux faisaient
 * auparavant échouer la détection de continuation, donc l'héritage du
 * titre ne se faisait pas, et l'événement apparaissait ensuite comme
 * plusieurs cartes "Événement sans titre" au lieu d'une seule carte avec
 * ses autres dates.
 */
function inheritRepeatedEventFields(rows: RawRow[]): RawRow[] {
  let previousEvent: RawRow | null = null;

  return rows.map((row) => {
    const current = { ...row };
    const hasTitle = Boolean(findValue(row, "Titre", "titre", "Title"));
    const isContinuation = Boolean(previousEvent) && !hasTitle;

    if (isContinuation) {
      for (const field of INHERITED_FIELDS) {
        const currentValue = current[field];
        const previousValue = previousEvent![field];
        if (
          (currentValue === undefined ||
            currentValue === null ||
            String(currentValue).trim() === "") &&
          previousValue !== undefined &&
          previousValue !== null &&
          String(previousValue).trim()
        ) {
          current[field] = previousValue;
        }
      }
    }

    // Une ligne devient la nouvelle "ancre" du groupe dès qu'elle porte un
    // titre (nouvel événement), ou reste rattachée à l'ancre précédente si
    // c'est une continuation. Une ligne sans titre ET sans ancre précédente
    // (ex: ligne totalement vide en tête de feuille) ne rattache à rien.
    if (hasTitle || isContinuation) {
      previousEvent = current;
    } else {
      previousEvent = null;
    }
    return current;
  });
}

/** Lieu affiché pour une ligne donnée. */
function lieuFromRow(row: RawRow): string {
  const address = findValue(row, "Adresse", "address");
  const city = findValue(row, "Ville", "city");
  return (
    [address, city].filter(Boolean).join(", ") || findValue(row, "lieu", "Lieu")
  );
}

function formatDisplayDate(
  startText: string,
  endText: string,
  fallback: string,
): string {
  const start = parseDate(startText);
  const end = parseDate(endText);
  const toFrench = (value: string) => {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return value;
    const date = new Date(`${value}T12:00:00`);
    return new Intl.DateTimeFormat("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  if (!startText && !endText) return fallback;
  if (!endText || start === end) return toFrench(start || fallback);
  return `Du ${toFrench(start)} au ${toFrench(end)}`;
}

/** Date affichée pour une ligne donnée (même règle que dans normalizeRow). */
function dateFromRow(row: RawRow): string {
  const startText =
    findValue(row, "Date début", "Date debut", "dateStart") ||
    findValue(row, "Date", "date");
  const endText = findValue(row, "Date fin", "dateEnd");
  return formatDisplayDate(
    startText,
    endText,
    findValue(row, "Date", "date") || startText,
  );
}

/**
 * Clé de regroupement stable pour un événement, dérivée du "Row Key" généré
 * côté n8n (motif : {slug-du-titre}-{Num}-{OccIndex}). On retire le dernier
 * segment numérique (l'index d'occurrence) pour obtenir une clé partagée par
 * toutes les occurrences du même événement.
 *
 * Repli si "Row Key" est absent : regroupement par titre + sous-catégorie
 * normalisés (index en dernier recours si aucun des deux n'est renseigné,
 * pour ne jamais fusionner par erreur deux lignes vides sans rapport).
 *
 * IMPORTANT : on ne regroupe PLUS par lieu. Le lieu (Adresse/Ville) n'est
 * volontairement PAS hérité entre lignes de continuation (une même
 * occurrence peut avoir une adresse différente d'une date à l'autre), donc
 * une ligne de continuation dont l'Adresse/Ville est laissée vide dans le
 * Sheet obtenait un lieu "" différent de celui de la ligne principale : la
 * clé ne matchait plus, et l'événement se dupliquait en 2 cartes au lieu
 * d'une seule avec ses "autres dates". Titre + sous-catégorie sont eux
 * toujours hérités (voir INHERITED_FIELDS), donc stables sur tout le groupe.
 */
function groupKeyFromRow(row: RawRow, index: number): string {
  const rowKey = findValue(row, "Row Key", "RowKey");
  if (rowKey) {
    const stripped = rowKey.replace(/-\d+$/, "");
    if (stripped) return stripped;
  }
  const titre = normalizeKey(findValue(row, "Titre", "titre", "Title"));
  if (!titre) return `__no-title-${index}`;
  const sousCategorie = normalizeKey(
    findValue(row, "Sous-catégorie", "Sous categorie", "sousCategorie"),
  );
  return `${titre}__${sousCategorie}`;
}

/**
 * Regroupe les lignes du sheet par événement (voir groupKeyFromRow),
 * indépendamment de leur ordre d'arrivée. L'ordre des groupes en sortie
 * suit l'ordre de première apparition de chaque clé.
 */
function groupEventRows(rows: RawRow[]): RawRow[][] {
  const order: string[] = [];
  const groups = new Map<string, RawRow[]>();
  rows.forEach((row, index) => {
    const key = groupKeyFromRow(row, index);
    const existing = groups.get(key);
    if (existing) {
      existing.push(row);
    } else {
      groups.set(key, [row]);
      order.push(key);
    }
  });
  return order.map((key) => groups.get(key) as RawRow[]);
}

/**
 * Choisit la ligne "principale" d'un groupe : en priorité celle qui porte à
 * la fois un identifiant (Num) ET un titre (la vraie 1ère occurrence) ; à
 * défaut celle qui a au moins un titre ; à défaut celle qui a un identifiant ;
 * en dernier recours la première ligne du groupe.
 */
function pickPrimaryRow(group: RawRow[]): RawRow {
  const withIdAndTitle = group.find(
    (row) =>
      findValue(row, "Num", "id", "ID") &&
      findValue(row, "Titre", "titre", "Title"),
  );
  if (withIdAndTitle) return withIdAndTitle;
  const withTitle = group.find((row) =>
    findValue(row, "Titre", "titre", "Title"),
  );
  if (withTitle) return withTitle;
  return group.find((row) => findValue(row, "Num", "id", "ID")) ?? group[0]!;
}

/**
 * Complète la ligne principale d'un groupe avec les champs "constants" de
 * l'événement (titre, photo, catégorie, description, contact, prix, âges,
 * lien...) en allant les chercher sur N'IMPORTE QUELLE ligne du groupe qui
 * les possède — peu importe l'ordre d'arrivée des lignes dans le flux n8n.
 * C'est ce qui évite l'affichage "Événement sans titre" quand la ligne
 * choisie comme principale a une case Titre vide dans le Sheet alors qu'une
 * autre ligne du même événement (même Row Key) la renseigne.
 */
function fillConstantFieldsFromGroup(
  group: RawRow[],
  primaryRow: RawRow,
): RawRow {
  const filled: RawRow = { ...primaryRow };
  for (const field of INHERITED_FIELDS) {
    const current = filled[field];
    if (current !== undefined && current !== null && String(current).trim())
      continue;
    const donor = group.find((row) => {
      const value = row[field];
      return value !== undefined && value !== null && String(value).trim();
    });
    if (donor) filled[field] = donor[field];
  }
  return filled;
}

/**
 * Construit, à partir des occurrences supplémentaires d'un même événement
 * (autres lignes du groupe), les champs à afficher dans la section "Autres
 * dates / adresses" de la page détail ET dans le badge "Se répète" de la
 * carte agenda :
 *  - toutes au même lieu, dates différentes  -> autresDates
 *  - toutes à la même date, lieux différents -> autresAdresses
 *  - sinon (lieu ET date qui varient)        -> autresLieuxDates
 */
function buildAutresOccurrences(
  primaryRow: RawRow,
  otherRows: RawRow[],
): Pick<
  NormalizedAgendaEvent,
  "autresDates" | "autresAdresses" | "autresLieuxDates"
> {
  if (!otherRows.length) return {};

  const primaryLieu = lieuFromRow(primaryRow);
  const primaryDate = dateFromRow(primaryRow);

  const occurrences = otherRows
    .map((row) => ({
      lieu: lieuFromRow(row) || primaryLieu,
      date: dateFromRow(row),
    }))
    .filter((occ) => occ.date || occ.lieu);

  if (!occurrences.length) return {};

  const sameLieu = occurrences.every((occ) => occ.lieu === primaryLieu);
  const sameDate = occurrences.every((occ) => occ.date === primaryDate);

  if (sameLieu && !sameDate)
    return { autresDates: occurrences.map((occ) => occ.date).filter(Boolean) };
  if (sameDate && !sameLieu)
    return {
      autresAdresses: occurrences.map((occ) => occ.lieu).filter(Boolean),
    };
  return { autresLieuxDates: occurrences };
}

/** Dates ISO (début/fin) d'une ligne, mêmes règles que dans normalizeRow. */
function isoRangeFromRow(row: RawRow): { dateStart: string; dateEnd: string } {
  const startText =
    findValue(row, "Date début", "Date debut", "dateStart") ||
    findValue(row, "Date", "date");
  const endText = findValue(row, "Date fin", "dateEnd");
  const dateStart = parseDate(startText);
  const dateEnd = parseDate(endText) || dateStart;
  return { dateStart, dateEnd };
}

/**
 * Dates ISO de toutes les occurrences supplémentaires (autres lignes du
 * groupe), utilisées uniquement pour le filtrage par dates côté site — pas
 * pour l'affichage (voir autresDates/autresAdresses/autresLieuxDates, qui
 * restent au format texte lisible pour l'utilisateur).
 */
function buildAutresDatesISO(
  otherRows: RawRow[],
): { dateStart: string; dateEnd: string }[] {
  return otherRows.map(isoRangeFromRow).filter((occ) => occ.dateStart);
}

/**
 * Complète les occurrences auto-détectées (lignes répétées dans le Sheet)
 * avec d'éventuelles "Autres dates / adresses" saisies manuellement dans une
 * seule cellule de la ligne principale. Les deux sources sont fusionnées et
 * dédoublonnées, sans jamais se marcher dessus.
 */
function mergeManualAutres(
  primaryRow: RawRow,
  fromGroup: Pick<
    NormalizedAgendaEvent,
    "autresDates" | "autresAdresses" | "autresLieuxDates"
  >,
): Pick<
  NormalizedAgendaEvent,
  "autresDates" | "autresAdresses" | "autresLieuxDates"
> {
  const manualDates = splitValues(
    findValue(
      primaryRow,
      "Autres dates",
      "Autres date",
      "autresDates",
      "Dates supplémentaires",
      "Dates supplementaires",
    ),
  );
  const manualAdresses = splitValues(
    findValue(
      primaryRow,
      "Autres adresses",
      "Autres adresse",
      "autresAdresses",
      "Adresses supplémentaires",
      "Adresses supplementaires",
    ),
  );
  const manualLieuxDates = parseOtherLocations(
    findValue(
      primaryRow,
      "Autres lieux et dates",
      "Autres lieux dates",
      "autresLieuxDates",
      "Retrouvez-nous également à",
    ),
  );

  const autresDates = [
    ...new Set([...(fromGroup.autresDates ?? []), ...manualDates]),
  ];
  const autresAdresses = [
    ...new Set([...(fromGroup.autresAdresses ?? []), ...manualAdresses]),
  ];
  const seen = new Set(
    (fromGroup.autresLieuxDates ?? []).map((o) => `${o.lieu}__${o.date}`),
  );
  const autresLieuxDates = [
    ...(fromGroup.autresLieuxDates ?? []),
    ...manualLieuxDates.filter((o) => !seen.has(`${o.lieu}__${o.date}`)),
  ];

  return {
    ...(autresDates.length ? { autresDates } : {}),
    ...(autresAdresses.length ? { autresAdresses } : {}),
    ...(autresLieuxDates.length ? { autresLieuxDates } : {}),
  };
}

function normalizeRow(
  row: RawRow,
  index: number,
): Omit<NormalizedAgendaEvent, "image"> & { imageUrl: string } {
  const startText =
    findValue(row, "Date début", "Date debut", "dateStart") ||
    findValue(row, "Date", "date");
  const endText = findValue(row, "Date fin", "dateEnd");
  const address = findValue(row, "Adresse", "address");
  const city = findValue(row, "Ville", "city");
  const canton = findValue(row, "Canton", "canton", "cantonKey");
  const lieu =
    [address, city].filter(Boolean).join(", ") ||
    findValue(row, "lieu", "Lieu");
  const categorieLabelRaw = findValue(
    row,
    "Catégorie détaillée",
    "Categorie detaillee",
    "Catégorie",
    "Categorie",
    "categorie",
    "categorieLabel",
    "categoryLabel",
    "Category",
    "Categoria",
  );
  const categorieRow = categoryFrom(categorieLabelRaw);
  const age = singleAgeFromRow(row);
  const ageMin = numericAgeFromRow(row, AGE_MIN_KEYS);
  const ageMax = numericAgeFromRow(row, AGE_MAX_KEYS);
  return {
    id: findValue(row, "Num", "id", "ID") || `auto-${index}-${Date.now()}`,
    titre: findValue(row, "Titre", "titre", "Title") || "Événement sans titre",
    lieu,
    cantonKey: cantonFrom(canton),
    date: formatDisplayDate(
      startText,
      endText,
      findValue(row, "Date", "date") || startText,
    ),
    dateStart: parseDate(startText),
    dateEnd: parseDate(endText),
    categorie: categorieRow,
    categorieDetaillee: categorieLabelRaw,
    categorieLabel: categorieLabelRaw,
    // La colonne "Catégorie" du Sheet contient déjà le libellé précis
    // ("Ateliers d'art", "Activités physiques"...) : on en dérive la clé
    // technique de sous-catégorie. Si le Sheet a un jour une vraie colonne
    // "Sous-catégorie" dédiée, elle prend le dessus (findValue en repli).
    // Pour "Camps" / "Camps du jour" il n'existe aucune vraie sous-catégorie
    // côté site : on retombe sur une clé stable dérivée de la catégorie elle-
    // même ('vacCamps' / 'vacCampsDuJour', les mêmes clés que dans
    // menuData.ts/vacancesItems), pour que le clic sur "Vacances enfants" >
    // "Camps" dans le menu du site puisse filtrer ces événements malgré
    // l'absence de sous-catégorie réelle.
    sousCategorie:
      subCategoryFrom(categorieLabelRaw) ||
      findValue(row, "Sous-catégorie", "Sous categorie", "sousCategorie") ||
      (categorieRow === "campLogement"
        ? "vacCamps"
        : categorieRow === "campJour"
          ? "vacCampsDuJour"
          : ""),
    ageKeys: ageKeysFromRow(row),
    age,
    ageMin,
    ageMax,
    ageLabel: ageLabelFromRow(row),
    partnerId: Number(findValue(row, "partnerId", "_partnerId")) || undefined,
    horaires: findValue(row, "Heure", "horaires", "Horaire"),
    tarif: findValue(row, "Prix", "prix", "tarif", "Price"),
    description: findValue(row, "Description", "description"),
    infoComplementaire: findValue(
      row,
      "Information complémentaire",
      "Information complementaire",
      "infoComplementaire",
      "Infos",
    ),
    contactTel: findValue(
      row,
      "Téléphone",
      "Telephone",
      "contactTel",
      "Téléphone de contact",
    ),
    contactEmail: findValue(
      row,
      "E-mail",
      "Email",
      "contactEmail",
      "Adresse e-mail",
    ),
    siteUrl: findValue(
      row,
      "Lien de l'événement",
      "Lien de evenement",
      "siteUrl",
      "url",
    ),
    imageUrl: findValue(row, "Photo", "photo", "image", "Image"),
    seoDescription: findValue(row, "Description SEO", "seoDescription"),
    seoKeywords: findValue(
      row,
      "Mots clés SEO",
      "Mots cles SEO",
      "seoKeywords",
    ),
    misEnAvant: misEnAvantFromRow(row),
  };
}

export default defineEventHandler(async () => {
  if (cache && Date.now() - cache.fetchedAt < CACHE_DURATION_MS)
    return cache.data;
  try {
    const config = useRuntimeConfig();
    const rawResponse = await $fetch<unknown>(config.n8nAgendaWebhookUrl);
    const responseObject = rawResponse as {
      data?: unknown;
      events?: unknown;
      items?: unknown;
      body?: unknown;
    };
    const candidate = Array.isArray(rawResponse)
      ? rawResponse
      : (responseObject.data ??
        responseObject.events ??
        responseObject.items ??
        responseObject.body ??
        []);
    const parsedCandidate =
      typeof candidate === "string"
        ? (() => {
            try {
              return JSON.parse(candidate);
            } catch {
              return [];
            }
          })()
        : candidate;
    const rows: RawRow[] = Array.isArray(parsedCandidate)
      ? (parsedCandidate as RawRow[])
      : [];

    const validRows = rows.filter((row) => row && typeof row === "object");
    const repeatedRows = inheritRepeatedEventFields(validRows);

    // Un seul événement par groupe (= 1 carte par titre), les occurrences
    // supplémentaires alimentent "autresDates" / "autresAdresses" / "autresLieuxDates".
    const groupedRows = groupEventRows(repeatedRows);

    const processed: NormalizedAgendaEvent[] = await Promise.all(
      groupedRows.map(async (group, index): Promise<NormalizedAgendaEvent> => {
        const primaryRow = pickPrimaryRow(group);
        const filledPrimaryRow = fillConstantFieldsFromGroup(group, primaryRow);
        const otherRows = group.filter((row) => row !== primaryRow);
        const normalized = normalizeRow(filledPrimaryRow, index);
        const autresOccurrences = mergeManualAutres(
          filledPrimaryRow,
          buildAutresOccurrences(primaryRow, otherRows),
        );
        const autresDatesISO = buildAutresDatesISO(otherRows);
        const imageUrl = normalized.imageUrl;

        const eventData: Omit<NormalizedAgendaEvent, "image"> = {
          id: normalized.id,
          titre: normalized.titre,
          lieu: normalized.lieu,
          cantonKey: normalized.cantonKey,
          date: normalized.date,
          dateStart: normalized.dateStart,
          dateEnd: normalized.dateEnd,
          categorie: normalized.categorie,
          categorieDetaillee: normalized.categorieDetaillee,
          categorieLabel: normalized.categorieLabel,
          sousCategorie: normalized.sousCategorie,
          ageKeys: normalized.ageKeys,
          age: normalized.age,
          ageMin: normalized.ageMin,
          ageMax: normalized.ageMax,
          ageLabel: normalized.ageLabel,
          partnerId: normalized.partnerId,
          horaires: normalized.horaires,
          tarif: normalized.tarif,
          description: normalized.description,
          infoComplementaire: normalized.infoComplementaire,
          contactTel: normalized.contactTel,
          contactEmail: normalized.contactEmail,
          siteUrl: normalized.siteUrl,
          seoDescription: normalized.seoDescription,
          seoKeywords: normalized.seoKeywords,
          misEnAvant: normalized.misEnAvant,
          ...autresOccurrences,
          ...(autresDatesISO.length ? { autresDatesISO } : {}),
        };

        let image = DEFAULT_IMAGE;
        if (imageUrl) {
          try {
            image = await saveImageFromUrl(imageUrl, normalized.id);
          } catch {
            image = DEFAULT_IMAGE;
          }
        }
        return { ...eventData, image };
      }),
    );

    // Garde-fou : même après regroupement, deux groupes distincts pourraient
    // partager un id issu du Sheet (erreur de saisie) -> on les rend uniques
    // pour éviter que Vue/Nuxt ne confonde deux cartes différentes.
    const usedIds = new Map<string, number>();
    const uniqueProcessed = processed.map((event, index) => {
      const baseId = event.id || `auto-${index}`;
      const occurrence = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, occurrence + 1);
      return occurrence === 0
        ? event
        : { ...event, id: `${baseId}-${occurrence + 1}` };
    });

    cache = { data: uniqueProcessed, fetchedAt: Date.now() };
    return uniqueProcessed;
  } catch (error) {
    console.error("[api/agenda] Erreur:", error);
    return cache?.data ?? [];
  }
});
