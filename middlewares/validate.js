// middlewares/validate.js : valide body / params / query avec un schéma Zod.
// Usage : router.get("/:id", validate(idParamSchema), getTaskById)
import { createError } from "../errors/errorMessages.js";
import { formatZodIssues } from "../i18n/zodIssues.js";

export const validate = (schema) => async (req, res, next) => {
  // safeParseAsync ne lance pas d'exception : il renvoie { success, data | error }
  const result = await schema.safeParseAsync({
    body: req.body ?? {}, // Express 5 : req.body vaut undefined s'il n'y a pas de JSON
    query: req.query,
    params: req.params,
  });

  // Échec : on passe une erreur 400 au handler global (messages traduits)
  if (!result.success) {
    const details = formatZodIssues(req, result.error.issues);
    return next(createError("VALIDATION_ERROR", { details }));
  }

  // Succès : on garde les données nettoyées par Zod
  if (result.data.body !== undefined) req.body = result.data.body;
  req.validated = result.data;
  next();
};
