import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(80),
  lastName: z.string().min(1, "Last name is required").max(80),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(30).optional(),
  company: z.string().min(1, "Company is required").max(120),
  jobTitle: z.string().max(120).optional(),
  message: z.string().min(10, "Tell us a bit more (at least 10 characters)").max(5000),
  region: z.enum(["north-america", "europe", "apac", "other"]).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
