import Link from "next/link";
export function Navbar() {
  return (
    <div className="flex items-center justify-between px-15 h-[55px]  ">
      <Link href={"http://localhost:3000"}>
        <h1 className="text-2xl font-bold">Quiz app</h1>
      </Link>
    </div>
  );
}
