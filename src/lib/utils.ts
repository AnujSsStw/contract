import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const whiteListEmail = (email: string) => {
  return email.includes("@paryaniconstruction.com");
};
