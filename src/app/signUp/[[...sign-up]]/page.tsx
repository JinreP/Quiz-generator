import { SignUp } from "@clerk/nextjs";

export default function signUP() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignUp />;
    </div>
  );
}
