import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <div className="w-full">
          <Navbar />
          <div className="flex">
            <AppSidebar />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
