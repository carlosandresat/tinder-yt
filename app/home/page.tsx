import { isVerified } from "@/actions/register";
import { getUserWeeklyAnswersStatus, getWeeklyAnswersData } from "@/actions/weekly-survey";
import { auth } from "@/auth";
import { Countdown } from "@/components/countdown";
import { LogoutButton } from "@/components/logout-button";
import { MatchSection } from "@/components/match-section";
import { ModeToggle } from "@/components/mode-toggle";
import { Question1Chart } from "@/components/question1-chart";
import { Question2Chart } from "@/components/question2-chart";
import { Question3Chart } from "@/components/question3-chart";
import { Button } from "@/components/ui/button";
import { VerificationForm } from "@/components/verification-form";
import Link from "next/link";

export default async function Page() {
  const session = await auth()
  const isUserVerified = await isVerified(session?.user?.id)
  const matchsDate = new Date("2024-12-16T05:00");
  const isAppActive = false;
  const isFormAnswered = false;
  
  if (!isUserVerified.verified) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8 absolute top-0">
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
        const weeklyData = await getWeeklyAnswersData();
        const isWeeklyAnswered = await getUserWeeklyAnswersStatus(session?.user?.id)
      
        if (!isFormAnswered) {
          return (
            <main className="flex min-h-screen flex-col items-center pb-24">
              <div className="w-full max-w-screen-xl flex items-center justify-between mt-8 px-8">
                <ModeToggle />
                <LogoutButton />
              </div>
              <div className="w-full flex flex-col max-w-screen-xl p-8 space-y-8">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                  Encuesta de la Semana
                </h3>
                {/*<ProfileForm />*/}
                <Question3Chart userId={session?.user?.id} answersData={weeklyData.question3data} isAnswered={isWeeklyAnswered.hasAnsweredQuestionC}/>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                  Encuesta de la Semana anterior (Tiempo Yapa)
                </h3>
                <Question1Chart userId={session?.user?.id} answersData={weeklyData.question1data} isAnswered={isWeeklyAnswered.hasAnsweredQuestionA}/>
                <Question2Chart userId={session?.user?.id} answersData={weeklyData.question2data} isAnswered={isWeeklyAnswered.hasAnsweredQuestionB}/>
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
