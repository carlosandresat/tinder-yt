import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { logout } from "@/actions/login";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        await logout()
      }}
      className="px-0 py-0 max-w-fit"
    >
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        className="flex items-center justify-center"
      >
        <Power />
      </Button>
    </form>
  );
}
