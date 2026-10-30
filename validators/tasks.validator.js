// validators/tasks.validator.js : schémas Zod de /api/tasks.
// Les messages sont des CLÉS du dictionnaire, jamais du texte.
import { z } from "zod";

// Un identifiant MongoDB = 24 caractères hexadécimaux
const objectId = z
  .string({ error: "validation.id.invalid" })
  .regex(/^[a-f\d]{24}$/i, "validation.id.invalid");

// Schéma pour les routes qui ont un :id dans l'URL
export const idParamSchema = z.object({
  params: z.object({ id: objectId }),
});
