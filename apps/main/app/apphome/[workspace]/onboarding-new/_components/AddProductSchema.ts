import { z } from "zod";

export const AddProductSchema = z.object({
  productName: z.string().min(1, "Please enter Product Name"),
  productDescription: z.string().min(1, "Please enter Product Description"),
  logo: z.unknown().transform((value) => {
    return value as FileList | null | undefined;
  }),
});
