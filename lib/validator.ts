import * as z from 'zod';

export const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .max(400, 'Description must be less than 400 characters'),
  location: z.string().max(400, 'Location must be less than 400 characters'),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url().optional(),
  breweryId: z.string(),
});

export const breweryFormSchema = z.object({
  name: z.string().min(3, 'Brewery name must be at least 3 characters'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(2000, 'Description must be less than 1000 characters'),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters')
    .max(400, 'Location must be less than 400 characters'),
  imageUrl: z.string(),
  url: z.string().url(),
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string(),
  hhMonday: z.string(),
  hhTuesday: z.string(),
  hhWednesday: z.string(),
  hhThursday: z.string(),
  hhFriday: z.string(),
  hhSaturday: z.string(),
  hhSunday: z.string(),
  onTapUrl: z.string(),
  happyHour: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  untappd: z.string(),
  slug: z.string(),
  city: z.string(),
});
