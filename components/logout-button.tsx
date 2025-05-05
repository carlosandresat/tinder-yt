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
      className="px-0 py-0 max-w-fit"
    >
      <Button type="submit" size="icon" variant="secondary" className="flex items-center justify-center">
        <Power />
      </Button>
    </form>
  );
}