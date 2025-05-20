import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Configuración
      </h1>
      <div className="flex flex-col space-y-8 pt-8 px-8 w-full sm:max-w-2xl">
        <div className="space-y-2 w-full">
          <Label>Matchear con</Label>
          <ToggleGroup type="single" variant="outline" className="flex-wrap">
            <ToggleGroupItem value="m">Hombres</ToggleGroupItem>
            <ToggleGroupItem value="f">Mujeres</ToggleGroupItem>
            <ToggleGroupItem value="both">Ambos</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2 w-full">
          <Label>Rango de edad</Label>
          <Slider
            defaultValue={[18, 99]}
            max={99}
            min={18}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>18</p>
            <p>99</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full space-x-4">
          <div className="space-y-0.5">
            <Label>Visible en TinderYT</Label>
            <p className="text-sm text-muted-foreground">
              Si desactivas esta opción, no podrás ver ni ser visto por otros
              usuarios.
            </p>
          </div>
          <Switch />
        </div>
        <Button className="self-end">Guardar cambios</Button>
      </div>
    </>
  );
}
