import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 md:flex-row py-4 w-full items-center px-8  border-t absolute bottom-0 bg-background md:justify-between">
      <p className="text-xs text-muted-foreground text-center">
        TinderYT. Desarrollado por{" "}
        <span className="font-bold text-foreground">Carlos Arévalo</span>.
      </p>
      <div className="flex space-x-2">
        <Button asChild variant="outline" className="rounded-full h-8 w-8">
          <a href="https://carlosarevalo.dev/" target={"_blank"}>
            <Globe />
          </a>
        </Button>
        {/*<a href="https://open.spotify.com/user/12141348471?si=bb3a11dc843345da" target={"_blank"} className="fab fa-brands fa-spotify"></a>
                <a href="https://twitter.com/carlosandresat" target={"_blank"} className="fab fa-twitter"></a>*/}
        <Button asChild variant="outline" className="rounded-full h-8 w-8">
          <a href="https://www.linkedin.com/in/carlosandresat/" target={"_blank"} className="relative">
          <Image src="/media-icons/linkedin.png" alt="Linkedin Icon" fill={true} className=" dark:invert p-2"/>
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-8 w-8">
          <a href="https://github.com/carlosandresat" target={"_blank"} className="relative">
            <Image src="/media-icons/github.png" alt="Github Icon" fill={true} className=" dark:invert p-2"/>
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-8 w-8">
          <a href="https://www.instagram.com/carlosandresat/" target={"_blank"} className="relative">
            <Image src="/media-icons/instagram.png" alt="Instagram Icon" fill={true} className=" dark:invert p-2"/>
          </a>
        </Button>
      </div>
    </footer>
  );
}
