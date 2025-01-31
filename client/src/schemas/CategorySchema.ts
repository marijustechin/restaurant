import * as z from "zod";

const alphaNumeric = new RegExp(/^[A-zÀ-ž0-9\s]*$/);

export const CategorySchema = z.object({
  category_name: z
    .string()
    .trim()
    .min(3, "Kategorijos pavadinimas ne trumpesnis, kaip 3 simboliai")
    .max(32, "Kategorijos pavadinimas turi būti ne ilgenis kaip 32 simboliai")
    .regex(alphaNumeric, {
      message:
        "Kategorijos pavadinimas turi būti sudarytas iš raidžių ir skaičių",
    }),
});
