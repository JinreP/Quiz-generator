import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <div>
        <SidebarProvider defaultOpen={false}>
          <div className="w-full">
            <div className="flex justify-between px-10 items-center  w-full">
              <Navbar />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <div className="flex">
              <AppSidebar />
              {children}
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ClerkProvider>
  );
}
