// errors/errorMessages.js : catalogue des erreurs = code -> statut HTTP.
// Les textes sont dans i18n/locales/*.js sous la clé "errors.<CODE>".
import { AppError } from "./AppError.js";

export const ERRORS = {
  VALIDATION_ERROR: 400, // données invalides (Zod)
  INVALID_JSON: 400, // JSON cassé dans le body
  INVALID_ID: 400, // identifiant MongoDB mal formé (filet de sécurité)
  ROUTE_NOT_FOUND: 404, // URL inexistante
  TASK_NOT_FOUND: 404, // tâche inexistante
  DATABASE_UNAVAILABLE: 503, // MongoDB injoignable
  INTERNAL_ERROR: 500, // bug non prévu
};

// Usage : throw createError("TASK_NOT_FOUND")
export function createError(code, options) {
  const status = ERRORS[code];
  if (!status) throw new Error(`Code d'erreur inconnu : ${code}`); // détecte les fautes de frappe
  return new AppError(status, code, options);
}
