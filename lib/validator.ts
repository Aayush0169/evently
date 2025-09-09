import { z } from "zod";

// the form schema
export  const eventFormSchema = z.object({
    title:z.string().min(3, 'title must be at least 3 charchters').max(20,'title must be less than 20 charchters'),
    description:z.string().min(3, 'description must be at least 3 charchters').max(400,'description must be less than 400 charchters'),
    location:z.string().min(3, 'location must be at least 3 charchters').max(30,'location must be less than 400 charchters'),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url(),
});