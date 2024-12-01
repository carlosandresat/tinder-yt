"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { VerificationFormSchema } from "@/schemas"
import { useTransition } from "react"
import { verifyAccount } from "@/actions/register"
  
export function VerificationForm({userId}:{userId:string|undefined}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof VerificationFormSchema>>({
    resolver: zodResolver(VerificationFormSchema),
    defaultValues: {
      pin: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof VerificationFormSchema>) {
    startTransition(async () => {
      if (!userId) {
        toast({
          title: "¡Acción denegada!",
          description: "No tienes una sesión valida",
          variant: "destructive",
        });
      } else {
        const result = await verifyAccount(userId, data);

        if (result.error) {
          toast({
            title: "¡Error!",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "¡Verificación existosa!",
            description: result.success,
          });
        }
      }
    });
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" items-center flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verifica tu cuenta</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Ingresa el código de verificación enviado a tu correo electrónico
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button type="submit" disabled={isPending}>Verificar</Button>
      </form>
    </Form>
  )
}