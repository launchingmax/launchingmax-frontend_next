import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "Enter name" }),
  industries: z.array(z.string()).max(10).optional(),
  logo: z.string({ required_error: "You must select logo" }).optional(),
  about: z.string().optional(),
  country: z.string({ required_error: "Select country" }),
  city: z.string(),
  group: z.array(z.string()).optional(),
  strategy: z.array(z.string()).optional(),
  address: z.string().optional().optional(),
  website: z
    .string()
    .regex(
      /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
      "Website must start with 'http://', 'https://', or 'www.'"
    )
    .optional(),

  email: z.array(z.string().email().optional()),
  tel: z.array(z.string().optional()),
});
