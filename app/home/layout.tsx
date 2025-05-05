import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex min-h-screen flex-col items-center w-full relative">
        <SidebarTrigger className="self-start m-8" variant="default" />
        {children}
        <Footer />
      </main>
    </SidebarProvider>
  );
}
