// i18n/locales/fr.js : textes en français (langue par défaut).
export default {
  // Une entrée "errors.<CODE>" pour chaque code du catalogue
  "errors.VALIDATION_ERROR": "Les données envoyées sont invalides",
  "errors.INVALID_JSON": "Le corps de la requête n'est pas un JSON valide",
  "errors.INVALID_ID": "Identifiant invalide",
  "errors.ROUTE_NOT_FOUND": "Route introuvable",
  "errors.TASK_NOT_FOUND": "Tâche introuvable",
  "errors.DATABASE_UNAVAILABLE":
    "Service momentanément indisponible, réessayez plus tard",
  "errors.INTERNAL_ERROR": "Une erreur interne est survenue",

  // Messages utilisés dans les schémas Zod
  "validation.id.invalid": "Identifiant invalide",

  // Messages de secours pour les erreurs Zod non prévues
  "zod.invalid_type": "Type de donnée invalide",
  "zod.invalid_format": "Format invalide",
};
