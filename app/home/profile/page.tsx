import { auth } from "@/auth";
import { AddBirthdayDialog } from "@/components/add-birthday-dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { UserDescriptionForm } from "@/components/user-description-form";
import { UserNetworksForm } from "@/components/user-networks-form";
import { UserOpenToForm } from "@/components/user-open-to-form";
import { UserInterestsForm } from "@/components/user-interests-form";
import { UserUniversityActivitiesForm } from "@/components/user-university-activities-form";
import { UserProfilePictureForm } from "@/components/user-profile-picture-form";

export default async function Page() {
  const session = await auth();
  const age: number | null = null; // Placeholder for age, replace with actual logic to fetch user's age

  if (!session?.user) {
    return (
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        No has iniciado sesión
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Perfil de usuario
      </h1>
      {session.user.image ? (
        <>
          <h2 className="text-xl font-semibold tracking-tight mt-4">
            {session.user.name}
          </h2>
          <div className="w-32 h-32 rounded-full mt-8">
            <Image
              src={session.user.image ?? ""}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
              width={128}
              height={128}
            />
          </div>
        </>
      ) : (
        <UserProfilePictureForm className="max-w-2xl px-8 w-full mt-8" />
      )}

      <div className="flex flex-col space-y-8 sm:max-w-2xl w-full px-8 mt-8 pb-28">
        <UserDescriptionForm />
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="age" className="text-base">
            Edad
          </Label>
          {age ? (
            <div className="flex items-end justify-center space-x-2">
              <p className="text-2xl">{age}</p>
              <p className="text-muted-foreground">años</p>
            </div>
          ) : (
            <AddBirthdayDialog />
          )}
        </div>
        <Separator />
        <UserNetworksForm />
        <Separator />
        <UserOpenToForm />
        <Separator />
        <UserInterestsForm />
        <Separator />
        <UserUniversityActivitiesForm />
      </div>
    </>
  );
}
