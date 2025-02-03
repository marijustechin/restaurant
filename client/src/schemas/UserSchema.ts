import * as z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const UserSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, { message: "Naudotojo vardas privalomas" }),
  email: z.string().trim().email({ message: "Neteisingas el.pašto formatas" }),
  address: z
    .string({ message: "Prašome nurodyti gatvę, namo/buto nr. ir miestą" })
    .trim()
    .min(3, { message: "Adresas privalomas" }),
  phone_number: z
    .string({
      message: "Telefono numeris turi būti sudarytas iš skaičių be šalies kodo",
    })
    .trim()
    .regex(phoneRegex, "Neteisingas telefono numeris")
    .length(
      8,
      "Telefono numeris turi būti sudarytas iš skaičių be šalies kodo"
    ),
});
