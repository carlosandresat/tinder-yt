import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export function LogoutButton() {
  <form
    action={async () => {
      "use server";

      await signOut();
    }}
  >
    <Button type="submit">Salir</Button>
  </form>;
}