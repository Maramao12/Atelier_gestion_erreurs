// middlewares/language.js : ajoute req.lang et req.t() à chaque requête.
import { translate, resolveLanguage } from "../i18n/index.js";

export function language(req, res, next) {
  req.lang = resolveLanguage(req);
  req.t = (key, params) => translate(req.lang, key, params); // req.t("errors.TASK_NOT_FOUND")
  res.setHeader("Content-Language", req.lang);
  res.vary("Accept-Language");
  next();
}
