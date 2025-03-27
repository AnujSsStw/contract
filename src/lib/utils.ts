import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const whiteListEmail = (email: string) => {
  return [
    "bhavik@paryaniconstruction.com",
    "manish@paryaniconstruction.com",
    "c.share@paryaniconstruction.com",
    "b.zimmer@paryaniconstruction.com",
    "m.narnor@paryaniconstruction.com",
    "e.butler@paryaniconstruction.com",
    "m.juarez@paryaniconstruction.com",
    "a.shaik@paryaniconstruction.com",
    "c.bond@paryaniconstruction.com",
    "j.kim@paryaniconstruction.com",
  ].includes(email);
};
