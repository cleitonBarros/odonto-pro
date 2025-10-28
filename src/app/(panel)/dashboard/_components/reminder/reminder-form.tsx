"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

 
 export const reminderSchema = z.object({  
   description: z.string().min(1, { message: 'A descrição é obrigatória' }),
 });

 export type ReminderSchemaType = z.infer<typeof reminderSchema>;

 export function ReminderForm() {
   return useForm<ReminderSchemaType>({
     resolver: zodResolver(reminderSchema),
     defaultValues:{
        description: '',
     }
   })
 }