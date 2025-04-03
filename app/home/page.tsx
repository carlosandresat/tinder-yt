//import { isAlreadyAnswered } from "@/actions/match-data";
import { isVerified } from "@/actions/register";
import { auth } from "@/auth";
import { Countdown } from "@/components/countdown";
import { LogoutButton } from "@/components/logout-button";
import { MatchSection } from "@/components/match-section";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileForm } from "@/components/profile-form";
import { VerificationForm } from "@/components/verification-form";

export default async function Page() {
  const session = await auth()
  const isUserVerified = await isVerified(session?.user?.id)
  const matchsDate = new Date("2025-04-03T10:00");
  const isAppActive = true;
  const isFormAnswered = true;
  
  if (!isUserVerified.verified) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mt-8 px-8 absolute top-0">
          <ModeToggle />
          <LogoutButton />
        </div>
        <div className="w-full max-w-screen-xl p-8">
          <VerificationForm userId={session?.user?.id}/>
        </div>
      </main>
    );
  } else {
    if (!isAppActive) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mt-8 px-8 absolute top-0">
            <ModeToggle />
            <LogoutButton />
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
        //const weeklyData = await getWeeklyAnswersData();
        //const isWeeklyAnswered = await getUserWeeklyAnswersStatus(session?.user?.id)
      
        if (!isFormAnswered) {
          return (
            <main className="flex min-h-screen flex-col items-center pb-24">
              <div className="w-full flex items-center justify-between mt-8 px-8">
                <ModeToggle />
                <LogoutButton />
              </div>
              <div className="w-full flex flex-col max-w-screen-xl p-8 space-y-8">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                  Formulario TinderYT
                </h3>
                <ProfileForm username={session?.user?.email?.split("@")[0].replace(".", "-") ?? ""}/>
              </div>
            </main>
          );
        } else {
          return (
            <main className="flex min-h-screen flex-col items-center">
              <div className="w-full flex items-center justify-between mt-8 px-8">
                <ModeToggle />
                <LogoutButton />
              </div>
              <div className="absolute h-full w-full flex flex-col justify-center max-w-screen-xl p-8 -z-10">
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
            <main className="flex min-h-screen flex-col items-center">
              <div className="w-full flex items-center justify-between mt-8 px-8">
                <ModeToggle />
                <LogoutButton />
              </div>
              <div className="absolute h-full w-full flex flex-col justify-center max-w-screen-xl p-8 -z-10">
                <p className="text-xl text-muted-foreground text-center">
                  Ya se realizaron los matchs. ¡Contesta con tiempo la encuesta
                  para la próxima ronda!
                </p>
              </div>
            </main>
          );
        } else {
          return (
            <main className="flex min-h-screen flex-col items-center pb-24">
              <div className="w-full flex items-center justify-between mt-8 px-8">
                <ModeToggle />
                <LogoutButton />
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
