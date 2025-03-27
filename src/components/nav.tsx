"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@cvx/_generated/api";
import { useQuery } from "convex/react";
import { LampDesk, MoonIcon, SunIcon, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
export function Nav() {
  return (
    <header className="sticky top-0 z-10 text-primary-foreground p-4 border-b-2 flex flex-row justify-between items-center bg-primary ">
      <Link href="/" className="text-4xl font-bold text-center">
        <Image
          src="/Inverse_Logo-removebg-preview.png"
          alt="logo"
          width={150}
          height={150}
        />
      </Link>
      <SignOutButton />
    </header>
  );
}

function SignOutButton() {
  // const { isAuthenticated, } = useConvexAuth();
  const { signOut } = useAuthActions();
  const { theme, setTheme } = useTheme();
  const user = useQuery(api.user.getUser);

  return (
    <>
      {user && (
        <div className="flex items-center gap-2 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="User"
                    className="rounded-full w-8 h-8"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name ?? user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center gap-2 py-0 font-normal">
                Theme
                <ToggleGroup
                  type="single"
                  size="sm"
                  onValueChange={setTheme}
                  value={theme}
                >
                  <ToggleGroupItem value="light" aria-label="Light">
                    <SunIcon />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dark" aria-label="Dark">
                    <MoonIcon />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="system" aria-label="System">
                    <LampDesk />
                  </ToggleGroupItem>
                </ToggleGroup>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => void signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
