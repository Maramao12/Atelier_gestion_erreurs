// i18n/index.js : détecte la langue et traduit une clé.
import fr from "./locales/fr.js";
import en from "./locales/en.js";

const dictionaries = { fr, en }; // ajouter une langue = ajouter une ligne ici
const SUPPORTED_LANGS = Object.keys(dictionaries);
const DEFAULT_LANG = "fr";

// Remplace {{variable}} par sa valeur : interpolate("min {{min}}", { min: 8 }) -> "min 8"
function interpolate(text, params = {}) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    params[name] !== undefined ? String(params[name]) : match,
  );
}

// Traduit une clé. Renvoie undefined si elle n'existe nulle part.
export function translate(lang, key, params) {
  const text = dictionaries[lang]?.[key] ?? dictionaries[DEFAULT_LANG]?.[key]; // à défaut : français
  return text === undefined ? undefined : interpolate(text, params);
}

// Lit "Accept-Language: fr-TN,fr;q=0.9,en;q=0.8" et renvoie la 1re langue supportée
function parseAcceptLanguage(header) {
  if (!header) return undefined;
  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return {
        lang: tag.split("-")[0].toLowerCase(),
        q: q ? parseFloat(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q); // les plus préférées d'abord
  return candidates.find((c) => SUPPORTED_LANGS.includes(c.lang))?.lang;
}

// Priorités : 1) ?lang=en  2) en-tête Accept-Language  3) français
export function resolveLanguage(req) {
  const fromQuery = String(req.query?.lang || "").toLowerCase();
  if (SUPPORTED_LANGS.includes(fromQuery)) return fromQuery;
  return parseAcceptLanguage(req.headers["accept-language"]) || DEFAULT_LANG;
}
