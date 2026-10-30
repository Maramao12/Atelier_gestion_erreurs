// errors/AppError.js : erreur "attendue" (métier). Elle porte un CODE stable, jamais un texte figé.
export class AppError extends Error {
  // statusCode : code HTTP | code : identifiant stable | options.params : variables {{...}} | options.details : liste de champs fautifs
  constructor(statusCode, code, { params, details } = {}) {
    super(code); // message de secours = le code
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.params = params;
    this.details = details;
    Error.captureStackTrace(this, this.constructor); // stack trace propre
  }
}
