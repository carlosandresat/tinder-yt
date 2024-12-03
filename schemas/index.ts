import { z } from "zod";

export const RegisterSchema = z.object({
  fullname: z
    .string({
      required_error: "Por favor ingresa tu nombre",
    })
    .min(2, "Tu nombre debe contener más de 2 caracteres")
    .max(50, "Tu nombre debe contener menos de 50 caracteres"),
  sex: z.enum(["m", "f"], {
    required_error: 'Debes elegir una opción'
  }),
  email: z
    .string()
    .email("Correo inválido, revisa la sintaxis.")
    .endsWith(
      "@yachaytech.edu.ec",
      "Debes usar tu correo institucional para comprobar que eres estudiante de la poderosísima Yachay Tech 💅"
    ),
  password: z
    .string()
    .min(6, "Tu contraseña debe contener mínimo 6 caracteres")
    .max(20, "Tu contraseña no debe poseer más de 20 caracteres"),
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Las contraseñas no coinciden",
});

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Por favor ingresa tu correo institucional.",
    })
    .email("Correo inválido, revisa la sintaxis.")
    .endsWith("@yachaytech.edu.ec", {
      message: "Usa tu correo institucional",
    }),
  password: z
    .string()
    .min(1, "Debes ingresar tu contraseña")
    .max(20, "Tu contraseña no puede poseer más de 20 caracteres"),
});

export const MatchFormSchema = z.object({
  picture: z.instanceof(File).refine((file) => file.size < 4500000, {
    message: 'Tu foto debe pesar menos de 4.5MB',
  }),
  description: z
    .string({
      required_error: "Tienes que subir una descripción",
    })
    .min(15, "Tienes que ingresar una descripción de al menos 15 caracteres")
    .max(300, "Tu descripción no puede tener más de 300 caracteres"),
  contact: z
    .string({
      required_error: "Tienes que poner algún contacto para tu match",
    })
    .min(5, "Tienes que ingresar un contacto (Minimo 5 caracteres)")
    .max(100, "Tu información de contacto no puede tener más de 100 caracteres"),
  sexPreference: z.enum(["m", "f", "both"], {
    required_error: 'Debes elegir una opción',
  }),
  question1: z.number({
    required_error: "Tienes que seleccionar una respuesta",
  }),
  question2: z
    .array(z.number({ required_error: "Tienes que ingresar una respuesta" }))
    .min(1, "Tienes que seleccionar al menos una opción")
    .max(3, "Tienes que seleccionar máximo 3 respuestas"),
  question3: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(5, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
});

export const VerificationFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export const WeeklyQuestionSchema = z.object({
  answer: z.number({
    required_error: "Tienes que seleccionar una respuesta",
  }).min(1, "Tienes que seleccionar una respuesta"),
})