import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ReactElement } from "react";

export function PaymentDialog({children}: {children: ReactElement}) {
  const pricingOptions = [
    {
      matches: 1,
      regularPrice: 1,
      discountedPrice: 0.5,
    },
    {
      matches: 3,
      regularPrice: 2.5,
      discountedPrice: 1.25,
    },
    {
      matches: 5,
      regularPrice: 4,
      discountedPrice: 2,
    },
  ];

  const bankAccounts = [
    {
      bank: "Banco Pichincha",
      accountName: "Carlos Andrés Arévalo Torres",
      accountNumber: "2210281465",
    },
    {
      bank: "Banco Pacífico",
      accountName: "Carlos Andrés Arévalo Torres",
      accountNumber: "1050898442",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Precios y Pagos</DialogTitle>
          <DialogDescription>
            Escoge tu pack y método de pago preferido.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="pricing" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pricing">Precios</TabsTrigger>
            <TabsTrigger value="payment">Opciones de Pago</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingOptions.map((option) => (
                <Card key={option.matches} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>
                      {option.matches}{" "}
                      {option.matches === 1 ? "Match" : "Matches"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Precio Regular:</span>
                        <span className="font-medium">
                          ${option.regularPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-green-600">
                        <span>Con Descuento:</span>
                        <span className="font-bold">
                          ${option.discountedPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        ¡Ahorra 50% con nuestro descuento de lanzamiento!
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Opciones de Transferencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankAccounts.map((account, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{account.bank}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">
                          A Nombre de:
                        </span>
                        <span>{account.accountName}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">
                          N° Cuenta:
                        </span>
                        <span>{account.accountNumber}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Envía el comprobante de pago por correo electrónico a{" "}
                <a
                  href="mailto:carlosandresat@hotmail.com"
                  target="_blank"
                  className="underline"
                >
                  carlosandresat@hotmail.com
                </a>{" "}
                indicando tu correo electrónico de registro para acreditar tu
                pack escogido.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pago De Una</h3>
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                <div className="bg-white p-2 rounded-lg border mb-4 md:max-w-[300px]">
                  <Image
                    src="/DeUnaQR.jpg"
                    width={500}
                    height={500}
                    alt="De Una QR"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Envía el comprobante de pago por correo electrónico a{" "}
                <a
                  href="mailto:carlosandresat@hotmail.com"
                  target="_blank"
                  className="underline"
                >
                  carlosandresat@hotmail.com
                </a>{" "}
                indicando tu correo electrónico de registro para acreditar tu
                pack escogido.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
