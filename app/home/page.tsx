import { isAlreadyAnswered } from "@/actions/register";
import { isVerified } from "@/actions/register";
import { auth } from "@/auth";
import { Countdown } from "@/components/countdown";
import { MatchSection } from "@/components/match-section";
import { ProfileForm } from "@/components/profile-form";
import { VerificationForm } from "@/components/verification-form";

export default async function Page() {
  const session = await auth();
  const isUserVerified = await isVerified(session?.user?.id);
  const matchsDate = new Date("2025-04-18T01:00");
  const isAppActive = true;

  if (!isUserVerified.verified) {
    return (
      <div className="max-w-screen-xl p-8 absolute flex-1 top-1/2 -translate-y-1/2">
        <VerificationForm userId={session?.user?.id} />
      </div>
    );
  } else {
    if (!isAppActive) {
      return (
        <div className="max-w-screen-lg p-8 absolute top-1/2 transform -translate-y-1/2">
          <p className="text-xl text-muted-foreground text-center">
            La aplicación no se encuentra activa, quédate atento a las redes
            sociales para saber cuando habrán nuevos matchs
          </p>
        </div>
      );
    } else {
      const isFormAnswered = await isAlreadyAnswered();
      if (!isFormAnswered) {
        return (
          <div className="w-full flex flex-col max-w-screen-xl px-8 pb-28 space-y-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
              Formulario TinderYT
            </h3>
            <ProfileForm
              username={
                session?.user?.email?.split("@")[0].replace(".", "-") ?? ""
              }
            />
          </div>
        );
      } else {
        if (Date.now() < matchsDate.getTime()) {
          return (
            <div className="absolute h-full flex flex-col justify-center max-w-screen-xl p-8 -z-10">
              <p className="text-xl text-muted-foreground text-center justify-center">
                Gracias por responder la encuesta, próximamente podrás ver tus
                matchs
              </p>
              <div className="mt-8">
                <Countdown targetDate={matchsDate} />
              </div>
            </div>
          );
        } else {
          return <MatchSection />;
        }
      }
    }
  }
}
