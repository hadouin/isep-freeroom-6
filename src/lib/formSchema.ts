import { z } from 'zod';

export const formSchema = z
  .object({
    firstname: z.string().min(1, 'Prénom requis').max(50, 'Prénom trop long'),
    lastname: z.string().min(2, 'Nom de famille requis').max(50, 'Nom de famille trop long'),
    email: z
      .string()
      .email('Adresse e-mail invalide')
      .regex(/.+\..+@(eleve\.)?isep\.fr$/, "Adresse e-mail doit être de l'ISEP"),
    reason: z.string().min(2, 'Raison trop courte').max(100, 'Raison trop longue'),
    rooms: z.array(z.string()).min(1, 'Choisissez au moins une salle'),
    startDate: z
      .string()
      .regex(/\d{4}-\d\d-\d\d/, 'Choisissez une date')
      .refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), 'Choisissez une date future'),
    endDate: z.string().min(10, 'Choisissez une date').optional(),
    startTime: z.string().regex(/^\d\d:\d\d$/, 'Choisissez une heure de début'),
    endTime: z.string().regex(/^\d\d:\d\d$/, 'Choisissez une heure de fin'),
    comments: z.string().max(1000).optional(),
  })
  .refine((data) => (data.endDate ? new Date(data.startDate) < new Date(data.endDate) : true), {
    message: 'La date de fin doit être après la date de début',
    path: ['endDate'],
  });
