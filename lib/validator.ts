import { z } from "zod";

// the form schema
export  const eventFormSchema = z.object({
    title: z.string().min(3, 'title must be at least 3 characters').max(40,'title must be less than 40 characters'),    description:z.string().min(3, 'description must be at least 3 charchters').max(600,'description must be less than 600 charchters'),
    location:z.string().min(3, 'location must be at least 3 charchters').max(50,'location must be less than 50 charchters'),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url().or(z.literal('')).optional(),
});