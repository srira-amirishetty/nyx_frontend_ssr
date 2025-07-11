import { z } from "zod";

function emptyStringToUndefined<T = unknown>(value: T): undefined | T {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const waitlistSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is reuqired.")
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""),
      "Name should contain only alphabets",
    ),
  phone: z
    .string()
    .min(10, "Enter minimum 10 ")
    .refine(
      (value) => phoneRegExp.test(value ?? ""),
      "Enter valid mobile number",
    ),
  email: z.string().email(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is reuqired.")
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""),
      "Name should contain only alphabets",
    ),
  // phone: z
  //   .string()
  //   .min(10, "Enter minimum 10 ")
  //   .refine(
  //     (value) => phoneRegExp.test(value ?? ""),
  //     "Enter valid mobile number",
  //   ),
  email: z.string().email(),
  company: z.string().min(1, "Company is required."),
  message: z.string().min(1, "Message is required."),
});

export const demoSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is reuqired.")
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""),
      "Name should contain only alphabets",
    ),
  phone: z
    .string()
    .min(10, "Enter minimum 10 ")
    .max(10, "Enter maximum 10 ")
    .refine(
      (value) => phoneRegExp.test(value ?? ""),
      "Enter valid mobile number",
    ),
  email: z.string().email(),
  company: z
    .string()
    .min(3, "Company is required.")
    
});

export const feedbackSchema = z.object({
  name: z
    .string()
    .min(1, "Name is reuqired.")
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""),
      "Name should contain only alphabets",
    ),
  email: z.string().email(),
  feedback: z.string().min(1, "Company is required."),
});
