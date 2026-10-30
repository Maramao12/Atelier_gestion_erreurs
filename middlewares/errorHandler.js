// middlewares/errorHandler.js : le SEUL endroit qui écrit une réponse d'erreur.
// 4 paramètres (err, req, res, next) = Express le reconnaît comme middleware d'erreur.
import mongoose from "mongoose";
import { AppError } from "../errors/AppError.js";
import { createError } from "../errors/errorMessages.js";

// Noms d'erreurs du driver MongoDB quand la base est injoignable
const DB_DOWN_NAMES = [
  "MongoNetworkError",
  "MongoNetworkTimeoutError",
  "MongoServerSelectionError",
  "MongooseServerSelectionError",
];

// Étape 1 : transforme n'importe quelle erreur en AppError (du plus précis au plus général)
function normalizeError(err) {
  if (err instanceof AppError) return err; // déjà prête

  if (err.type === "entity.parse.failed") return createError("INVALID_JSON"); // JSON cassé (express.json)

  if (err instanceof mongoose.Error.CastError) return createError("INVALID_ID"); // ObjectId invalide

  // MongoDB injoignable (ou requête restée en attente trop longtemps)
  if (
    DB_DOWN_NAMES.includes(err.name) ||
    /buffering timed out/i.test(err.message || "")
  ) {
    return createError("DATABASE_UNAVAILABLE");
  }

  return createError("INTERNAL_ERROR"); // bug inconnu : réponse générique, détail dans la console
}

// Étape 2 : journalise puis répond
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const error = normalizeError(err);

  // Erreur serveur (5xx) : on affiche l'erreur d'origine avec sa stack. Erreur client (4xx) : une ligne.
  if (error.statusCode >= 500)
    console.error(
      `ERREUR ${req.method} ${req.originalUrl} -> ${error.code}`,
      err,
    );
  else console.warn(`WARN ${req.method} ${req.originalUrl} -> ${error.code}`);

  if (res.headersSent) return next(err); // réponse déjà partie : Express ferme la connexion

  res.status(error.statusCode).json({
    error: {
      code: error.code, // identique dans toutes les langues
      message: req.t(`errors.${error.code}`, error.params) ?? error.message, // traduit ici
      ...(error.details && { details: error.details }),
    },
  });
}
