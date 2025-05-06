import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Configuración
      </h1>
      <div className="space-y-2 pt-6 px-8 w-full sm:max-w-2xl">
        <Label>Matchear con</Label>
        <ToggleGroup type="single" variant="outline" className="flex-wrap">
          <ToggleGroupItem value="m">Hombres</ToggleGroupItem>
          <ToggleGroupItem value="f">Mujeres</ToggleGroupItem>
          <ToggleGroupItem value="both">Ambos</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2 pt-6 px-8 w-full sm:max-w-2xl">
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
    </>
  );
}
