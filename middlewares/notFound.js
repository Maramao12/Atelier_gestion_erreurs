// middlewares/notFound.js : toute route inconnue devient une erreur ROUTE_NOT_FOUND.
import { createError } from "../errors/errorMessages.js";

export function notFound(req, res, next) {
  next(
    createError("ROUTE_NOT_FOUND", {
      details: [{ field: "url", message: `${req.method} ${req.originalUrl}` }],
    }),
  );
}
