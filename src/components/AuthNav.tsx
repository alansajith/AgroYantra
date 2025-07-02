"use client";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function AuthNav() {
  return (
    <div className="flex items-center space-x-2 ml-4">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            Login
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
            Register
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
