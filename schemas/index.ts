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