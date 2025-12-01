import { SignIn } from "@clerk/nextjs";

export default function signIn() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn />;
    </div>
  );
}
