import { unlockMatch } from "@/actions/match-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function UnlockMatchDialog({ matchId }: { matchId: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Desbloquear</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar desbloqueo</AlertDialogTitle>
          <AlertDialogDescription>
            Revelar este match gastará uno de tus desbloqueos disponibles. Si
            estás seguro de que quieres desbloquearlo, porfa confirma.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form
            action={async () => {
              "use server";

              await unlockMatch(matchId);
            }}
          >
            <AlertDialogAction type="submit" className="w-full md:w-auto">
              Desbloquear
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
