import { Countdown } from "@/components/countdown";
import { MatchSection } from "@/components/match-section";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileForm } from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { VerificationForm } from "@/components/verification-form";
import Link from "next/link";

export default function Page() {
  const isVerified = true;
  const matchsDate = new Date("2024-12-05T11:00");
  const isAppActive = true;
  const isFormAnswered = false;

  if (!isVerified) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8 absolute top-0">
          <ModeToggle />
          <Button asChild>
            <Link href="/">Salir</Link>
          </Button>
        </div>
        <div className="w-full max-w-screen-xl p-8">
          <VerificationForm />
        </div>
      </main>
    );
  } else {
    if (!isAppActive) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8 absolute top-0">
            <ModeToggle />
            <Button asChild>
              <Link href="/">Salir</Link>
            </Button>
          </div>
          <div className="w-full max-w-screen-xl p-8">
            <p className="text-xl text-muted-foreground text-center">
              La aplicación no se encuentra activa, quédate atento a las redes
              sociales para saber cuando habrán nuevos matchs
            </p>
          </div>
        </main>
      );
    } else {
      if (Date.now() < matchsDate.getTime()) {
        if (!isFormAnswered) {
          return (
            <main className="flex min-h-screen flex-col items-center justify-center">
              <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8">
                <ModeToggle />
                <Button asChild>
                  <Link href="/">Salir</Link>
                </Button>
              </div>
              <div className="w-full max-w-screen-xl p-8">
                <ProfileForm />
              </div>
            </main>
          );
        } else {
          return (
            <main className="flex min-h-screen flex-col items-center justify-center">
              <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8 absolute top-0">
                <ModeToggle />
                <Button asChild>
                  <Link href="/">Salir</Link>
                </Button>
              </div>
              <div className="w-full max-w-screen-xl p-8">
                <p className="text-xl text-muted-foreground text-center justify-center">
                  Gracias por responder la encuesta, próximamente podrás ver tus
                  matchs
                </p>
                <div className="mt-8">
                  <Countdown targetDate={matchsDate} />
                </div>
              </div>
            </main>
          );
        }
      } else {
        if (!isFormAnswered) {
          return (
            <main className="flex min-h-screen flex-col items-center justify-center">
              <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8 absolute top-0">
                <ModeToggle />
                <Button asChild>
                  <Link href="/">Salir</Link>
                </Button>
              </div>
              <div className="w-full max-w-screen-xl p-8">
                <p className="text-xl text-muted-foreground text-center">
                  Ya se realizaron los matchs. ¡Contesta con tiempo la encuesta
                  para la próxima ronda!
                </p>
              </div>
            </main>
          );
        } else {
          return (
            <main className="flex min-h-screen flex-col items-center justify-center">
              <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8 absolute top-0">
                <ModeToggle />
                <Button asChild>
                  <Link href="/">Salir</Link>
                </Button>
              </div>

              <div className="w-full max-w-screen-xl p-8">
                <MatchSection />
              </div>
            </main>
          );
        }
      }
    }
  }
}
