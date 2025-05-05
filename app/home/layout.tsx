import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex min-h-screen flex-col items-center w-full">
        <SidebarTrigger className="self-start m-8" variant="default"/>
        {children}
      </main>
    </SidebarProvider>
  );
}
