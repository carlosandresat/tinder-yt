"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MatchFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { upload } from "@vercel/blob/client";
import {
  calculateMatchScoreForUser,
  insertMatchData,
  updateImage,
} from "@/actions/match-data";

export function ProfileForm({ username }: { username: string }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MatchFormSchema>>({
    resolver: zodResolver(MatchFormSchema),
    defaultValues: {
      description: "",
      contact: "",
      question5: [],
      question6: [],
      question7: [],
      question8: [],
      question9: 4,
      question10: 4,
      question11: 4,
      question12: 4,
      question13: 4,
      question14: 4,
      question15: 4,
    },
  });

  const question9options = [
    "No le doy importancia, prefiero la variedad emocional.",
    "Poco importante, vivo intensamente mis altibajos.",
    "Algo importante, aunque me dejo llevar por el momento.",
    "Valoro la estabilidad, pero también la emoción.",
    "Bastante importante, busco serenidad en mis emociones.",
    "Muy importante, priorizo un ambiente emocional constante.",
    "Esencial, necesito estabilidad para sentirme seguro y equilibrado.",
  ];

  const question10options = [
    "Para nada, la vida es incierta",
    "Poco importante, uno tiene que vivir el presente",
    "Algo importante, pero no es lo más relevante",
    "A veces lo considero, pero no siempre me preocupa",
    "Me gusta tener metas, aunque no siempre son rígidas",
    "Muy importante, me esfuerzo por tener un plan claro para mi futuro",
    "Esencial, me gusta tener un plan y saber que todo está bajo control",
  ];

  const question11options = [
    "Evito los riesgos a toda costa; prefiero la seguridad",
    "Muy cauteloso, solo asumo riesgos mínimos",
    "Poco arriesgado, solo tomo riesgos calculados en ocasiones",
    "Tomo riesgos cuando veo una oportunidad",
    "Bastante arriesgado, me gusta probar mis límites",
    "Muy aventurero, asumo grandes riesgos frecuentemente",
    "Extremadamente arriesgado, vivo para apostar y desafiar lo seguro",
  ];

  const question12options = [
    "Muy reservado; prefiero la tranquilidad y la soledad.",
    "Bastante introvertido; disfruto de espacios reducidos.",
    "Mayormente tranquilo, socializo en grupos pequeños.",
    "Me gusta socializar sin perder mi espacio personal.",
    "Disfruto conversar y reunirme con amigos.",
    "Me energiza la interacción constante.",
    "Extrovertido en exceso, siempre busco grandes encuentros sociales.",
  ];

  const question13options = [
    "No le doy ninguna importancia a mi estado físico.",
    "Casi no me preocupo por mantenerme en forma.",
    "Reconozco la importancia, pero la cuido de manera esporádica.",
    "Intento mantenerme activo, aunque no es mi prioridad principal.",
    "Trabajo regularmente en mi condición física y me esfuerzo por estar en forma.",
    "La actividad física es fundamental para mi bienestar y la practico con frecuencia.",
    "No pain, no gain",
  ];

  const question14options = [
    "Siempre veo el lado negativo de todo.",
    "Rara vez encuentro motivos para el optimismo.",
    "Tiendo a ver dificultades aunque reconozco lo positivo en ocasiones.",
    "Reconozco tanto los desafíos como las oportunidades.",
    "Soy optimista y veo el vaso medio lleno.",
    "Confío en que las cosas saldrán bien la mayoría de las veces.",
    "Soy extremadamente optimista y tengo una visión positiva e inspiradora de la vida.",
  ];

  const question15options = [
    "Evitarlo por completo: Hago todo lo posible por no tener conflictos, incluso si eso implica callar mis opiniones.",
    "Evitarlo en lo posible: Trato de evitar el conflicto la mayor parte del tiempo, incluso cuando algo me molesta.",
    "Prefiero evitarlo, pero lo enfrento si es necesario: Me incomodan los conflictos, pero si no hay otra opción, los enfrento.",
    "Depende de la situación: Mi reacción ante el conflicto varía según el contexto o la persona.",
    "Prefiero enfrentarlo, aunque con cuidado: Suelo abordar los conflictos cuando ocurren, pero trato de hacerlo con calma.",
    "Suelo enfrentar el conflicto directamente: No me gusta dejar asuntos sin resolver y normalmente los enfrento rápidamente.",
    "Lo enfrento de inmediato: Siempre busco resolver los conflictos apenas surgen, sin postergarlos.",
  ];

  function onSubmit(data: z.infer<typeof MatchFormSchema>) {
    startTransition(async () => {
      try {
        const newBlob = await upload(`tinder-yt/${username}`, data.picture, {
          access: "public",
          handleUploadUrl: "/api/avatar/upload",
        });

        await updateImage(newBlob.url);

        const res = await insertMatchData(data);

        await calculateMatchScoreForUser();

        if (res.success) {
          toast({
            title: "¡Respuestas ingresadas!",
            description: "Tus respuestas han sido ingresadas correctamente",
          });
        }
      } catch (e) {
        if (e instanceof Error) {
          const message = e.message;
          toast({
            title: "¡Error!",
            description: message,
          });
        }
      }
    });
  }

  const [picturePreview, setPicturePreview] = useState<string | undefined>(
    undefined
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Completa tu perfil</CardTitle>
        <CardDescription>
          Crea tu perfil con los datos que se mostrarán a tu match cuando te
          desbloquee
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="picture"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Foto de Perfil</FormLabel>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-24 h-24">
                      {picturePreview !== undefined ? (
                        <AvatarImage
                          src={picturePreview}
                          alt="Profile picture preview"
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback>Foto</AvatarFallback>
                      )}
                    </Avatar>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Picture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                          setPicturePreview(
                            event.target.files && event.target.files[0]
                              ? URL.createObjectURL(event.target.files[0])
                              : undefined
                          );
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Háblanos de ti" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Instagram, Facebook, Whatsapp..."
                    />
                  </FormControl>
                  <FormDescription>
                    Añade un método de contacto para tu match
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sexPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matchear con</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="m">Hombres</ToggleGroupItem>
                      <ToggleGroupItem value="f">Mujeres</ToggleGroupItem>
                      <ToggleGroupItem value="both">Ambos</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardHeader className="p-0">
              <CardTitle>Preguntas para match</CardTitle>
              <CardDescription>
                Responde las siguientes preguntas cuidadosamente y con
                sinceridad para encontrar a tu match más compatible 💯
              </CardDescription>
            </CardHeader>
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Qué buscas conocer en TinderYT?</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Amistad</ToggleGroupItem>
                      <ToggleGroupItem value="2">Amor</ToggleGroupItem>
                      <ToggleGroupItem value="3">Vacile</ToggleGroupItem>
                      <ToggleGroupItem value="4">
                        Que fluya lo que tenga que fluyar
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona 1 opción</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Prefieres las aventuras espontáneas o las salidas
                    planificadas?
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Espontáneas</ToggleGroupItem>
                      <ToggleGroupItem value="2">Planificadas</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona 1 opción</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué es más importante para ti en una relación?
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">
                        Intereses compartidos
                      </ToggleGroupItem>
                      <ToggleGroupItem value="2">
                        Conversaciones profundas
                      </ToggleGroupItem>
                      <ToggleGroupItem value="3">
                        Independencia mutua
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona 1 opción</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Cuál es tu modo preferido de comunicación cuando no estás
                    presente?
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Mensajes</ToggleGroupItem>
                      <ToggleGroupItem value="2">Llamadas</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona 1 opción</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué temas de conversación te emocionan más?
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value.map((answer) => answer.toString())}
                      onValueChange={(values) =>
                        field.onChange(values.map((value) => Number(value)))
                      }
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Viajes</ToggleGroupItem>
                      <ToggleGroupItem value="2">Tecnología</ToggleGroupItem>
                      <ToggleGroupItem value="3">Arte</ToggleGroupItem>
                      <ToggleGroupItem value="4">
                        Eventos actuales
                      </ToggleGroupItem>
                      <ToggleGroupItem value="5">Filosofía</ToggleGroupItem>
                      <ToggleGroupItem value="6">Deportes</ToggleGroupItem>
                      <ToggleGroupItem value="7">Chisme</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona hasta 3 opciones</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué cualidades valoras más en una pareja?
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value.map((answer) => answer.toString())}
                      onValueChange={(values) =>
                        field.onChange(values.map((value) => Number(value)))
                      }
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">Honestidad</ToggleGroupItem>
                      <ToggleGroupItem value="2">Humor</ToggleGroupItem>
                      <ToggleGroupItem value="3">Ambición</ToggleGroupItem>
                      <ToggleGroupItem value="4">Compasión</ToggleGroupItem>
                      <ToggleGroupItem value="5">Lealtad</ToggleGroupItem>
                      <ToggleGroupItem value="6">Independencia</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    Selecciona hasta 3 opciones. Nota: pilas que lealtad y
                    fidelidad son distintas. Fidelidad: exclusividad y
                    cumplimiento de promesas o deberes. Lealtad: apoyo
                    incondicional y la defensa de los intereses del otro. La
                    fidelidad ya debería venir por defecto xd
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Qué tipo de cocina te gusta más?</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value.map((answer) => answer.toString())}
                      onValueChange={(values) =>
                        field.onChange(values.map((value) => Number(value)))
                      }
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">
                        Ecuatoriana (Costa)
                      </ToggleGroupItem>
                      <ToggleGroupItem value="2">
                        Ecuatoriana (Sierra)
                      </ToggleGroupItem>
                      <ToggleGroupItem value="3">Mexicana</ToggleGroupItem>
                      <ToggleGroupItem value="4">Asiática</ToggleGroupItem>
                      <ToggleGroupItem value="5">Italiana</ToggleGroupItem>
                      <ToggleGroupItem value="6">
                        Estadounidense
                      </ToggleGroupItem>
                      <ToggleGroupItem value="7">Vegetariana</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona hasta 3 opciones</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question8"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Cuál sería tu reacción más sincera al conocer que la
                    persona que te gusta tiene un super mejor amig@ del sexo
                    opuesto?
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value.map((answer) => answer.toString())}
                      onValueChange={(values) =>
                        field.onChange(values.map((value) => Number(value)))
                      }
                      className="flex-wrap"
                    >
                      <ToggleGroupItem value="1">
                        Yo también tengo
                      </ToggleGroupItem>
                      <ToggleGroupItem value="2">
                        Las relaciones de amistad son igual de importantes que
                        las románticas 🤓☝
                      </ToggleGroupItem>
                      <ToggleGroupItem value="3">
                        Mientras haya límites
                      </ToggleGroupItem>
                      <ToggleGroupItem value="4">
                        ¿Amig@ o amiguit@? 🤨
                      </ToggleGroupItem>
                      <ToggleGroupItem value="5">
                        Tu pareja debería ser tu mejor amig@
                      </ToggleGroupItem>
                      <ToggleGroupItem value="6">
                        Prefiero evitarme ese evento canónico
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Selecciona hasta 3 opciones</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question9"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué tan importante es para ti la estabilidad emocional?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question9options[form.watch("question9") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué tan importante es saber dónde estarás en 5 años?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question10options[form.watch("question10") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question11"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué tan arriesgado eres al tomar decisiones?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question11options[form.watch("question11") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question12"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué tan introvertido-extrovertido te consideras?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question12options[form.watch("question12") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question13"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué tan importante es la condición física en tu vida?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question13options[form.watch("question13") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question14"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Qué tan optimista eres acerca de la vida?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question14options[form.watch("question14") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question15"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ¿Cuál es tu modo de responder al conflicto en una relación?
                  </FormLabel>
                  <div className="flex gap-6 w-full items-center justify-between">
                    <p>1</p>
                    <FormControl>
                      <Slider
                        min={1}
                        max={7}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <p>7</p>
                  </div>
                  <div className="text-center text-sm" aria-live="polite">
                    {question15options[form.watch("question15") - 1]}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto "
              >
                {isPending ? "Ingresando respuestas..." : "Ingresar respuestas"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
