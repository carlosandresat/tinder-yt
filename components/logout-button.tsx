import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({redirectTo: "/auth/login"});
      }}
    >
      <Button type="submit">Salir</Button>
    </form>
  );
}