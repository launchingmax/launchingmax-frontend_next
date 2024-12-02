import { z } from "zod";

export const formSchema = z.object({
  fullname: z.string(),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, "Password must be 6 characters long"),
});
