import * as z from 'zod';

export const MenusSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Pamiršote įvesti pavadinimą' })
    .max(32, { message: 'Maksimalus pavadinimo ilgis 32 simboliai' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Pamiršote įvesti aprašymą' })
    .max(255, { message: 'Maksimalus pavadinimo ilgis 255 simboliai' }),
  price: z.coerce
    .number()
    .positive({ message: 'Kaina turi būti teigiamas skaičius' }),
  image: z
    .string()
    .trim()
    .min(1, { message: 'Pamiršote nurodyti nuotraukos URL adresą' })
    .url({ message: 'Nuotrauka turi būti URL adresas' }),
  category_id: z.coerce
    .number()
    .positive({ message: 'Kategorijos ID turi būti teigiamas skaičius' }),
});
