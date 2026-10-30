// i18n/zodIssues.js : convertit les erreurs Zod en [{ field, message }] traduits.
export function formatZodIssues(req, issues) {
  return issues.map((issue) => {
    // Cherche le message : 1) issue.message est une clé du dictionnaire,
    // 2) sinon message de secours "zod.<code>", 3) sinon le texte brut de Zod
    const message =
      req.t(issue.message, { min: issue.minimum, max: issue.maximum }) ??
      req.t(`zod.${issue.code}`) ??
      issue.message;

    // path = ["params", "id"] -> on retire "params" pour garder "id"
    const field =
      issue.path.length > 1
        ? issue.path.slice(1).join(".")
        : issue.path.join(".");
    return { field, message };
  });
}
