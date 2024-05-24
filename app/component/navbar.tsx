"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react"; // Import useEffect
import { Amplify } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

export default function Navbar() {
  const { user, signOut, authStatus } = useAuthenticator((context) => [
    context.user,
  ]);
  const router = useRouter();
  const pathname = usePathname();

  // Use useEffect for side effects
  useEffect(() => {
    if (pathname === "/login" && authStatus === "authenticated") {
      router.push("/");
    }
  }, [pathname, authStatus, router]);

  if (pathname === "/chat") return null;

  return (
    <nav className="sticky top-0 z-10 backdrop-blur-2xl  flex w-full items-center justify-between ">
      {/* Stick on the left side */}
      <div className="flex flex-shrink-0 gap-6 pl-[8%]">
        <div className="flex justify-center items-center gap-8 ">
          <Link href="/" className="">
            Home
          </Link>
          <Link href="/chat" className="">
            Chat
          </Link>
          <Link href="/about" className="">
            About
          </Link>
        </div>
      </div>

      {/* Stick on the right hand side  */}
      <div className="flex pr-[8%] gap-6 ">
        {authStatus === "authenticated" && (
          <button
            className="p-2 bg-blue-700 rounded-lg text-white"
            onClick={signOut}
          >
            Sign Out
          </button>
        )}
        {authStatus !== "authenticated" && (
          <Link href="/login" className="p-2 bg-blue-700 rounded-lg text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
