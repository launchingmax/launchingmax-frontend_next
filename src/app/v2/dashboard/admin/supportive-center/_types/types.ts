import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "Enter name" }),
  industries: z
    .array(z.string(), {
      required_error: "You must select at least one industry",
      description: "Industries that this startup works on.",
    })
    .max(10),
  logo: z.string({ required_error: "You must select logo" }),
  about: z.string(),
  country: z.string({ required_error: "Select country" }),
  city: z.string(),
  group: z.array(z.string()),
  strategy: z.array(z.string()),
  address: z.string(),
  website: z
    .string()
    .regex(
      /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
      "Website must start with 'http://', 'https://', or 'www.'"
    ),

  // "email.0": z.array(z.string()),
  // "tel.0": z.array(z.string()),
});
