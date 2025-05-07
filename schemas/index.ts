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
  picture: z.instanceof(File).refine((file) => file.size < 2000000, {
    message: 'Tu foto debe pesar menos de 2MB. Puedes reducir su tamaño tomándole una captura de pantalla.',
  }),
  description: z
    .string({
      required_error: "Tienes que subir una descripción",
    })
    .min(150, "Tienes que ingresar una descripción de al menos 150 caracteres. Una buena descripción puede motivar a tu match a escribirte. 😉")
    .max(500, "Tu descripción no puede tener más de 500 caracteres"),
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
  question2: z.number({
    required_error: "Tienes que seleccionar una respuesta",
  }),
  question3: z.number({
    required_error: "Tienes que seleccionar una respuesta",
  }),
  question4: z.number({
    required_error: "Tienes que seleccionar una respuesta",
  }),
  question5: z
    .array(z.number({ required_error: "Tienes que ingresar una respuesta" }))
    .min(1, "Tienes que seleccionar al menos una opción")
    .max(3, "Tienes que seleccionar máximo 3 respuestas"),
  question6: z
    .array(z.number({ required_error: "Tienes que ingresar una respuesta" }))
    .min(1, "Tienes que seleccionar al menos una opción")
    .max(3, "Tienes que seleccionar máximo 3 respuestas"),
  question7: z
    .array(z.number({ required_error: "Tienes que ingresar una respuesta" }))
    .min(1, "Tienes que seleccionar al menos una opción")
    .max(3, "Tienes que seleccionar máximo 3 respuestas"),
  question8: z
  .array(z.number({ required_error: "Tienes que ingresar una respuesta" }))
  .min(1, "Tienes que seleccionar al menos una opción")
  .max(3, "Tienes que seleccionar máximo 3 respuestas"),
  question9: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
  question10: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
  question11: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
  question12: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
  question13: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
  question14: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
  question15: z
    .number({
      required_error: "Tienes que ingresar una respuesta",
    })
    .min(1, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?")
    .max(7, "¿Cómo seleccionaste eso? ¿Acaso eres hacker?"),
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

export const WeeklyMultipleQuestionSchema = z.object({
  answer: z
    .array(z.number({ required_error: "Tienes que ingresar una respuesta" }))
    .min(1, "Tienes que seleccionar al menos una opción")
    .max(3, "Tienes que seleccionar máximo 3 respuestas"),
}).refine(
  (data) => !(data.answer.includes(4) && data.answer.length !== 1),
  {
    message: "Si seleccionas la opción 4, no puedes seleccionar más opciones",
    path: ["answer"], // Path to the field causing the error
  }
)

export const BirthdaySchema = z.object({
  day: z.string().min(1, "Tienes que seleccionar un día"),
  month: z.string().min(1, "Tienes que seleccionar un mes"),
  year: z.string().min(1, "Tienes que seleccionar un año"),
}).refine((data) => {
  const { day, month, year } = data;
  const date = new Date(`${year}-${month}-${day}`);
  return date <= new Date();
}, {
  message: "La fecha de nacimiento no puede ser mayor a la fecha actual",
});
