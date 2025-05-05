import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { Power } from "lucide-react";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({redirectTo: "/"});
      }}
    >
      <Button type="submit">
        <Power />
      </Button>
    </form>
  );
}