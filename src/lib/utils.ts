import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const whiteListEmail = (email: string) => {
  return email.includes("@paryaniconstruction.com");
};

/**
 * Converts a PDF URL to base64 data
 * @param url - The URL of the PDF to convert
 * @returns Promise<string> - Base64 encoded PDF data with data URL prefix
 */
export async function convertPdfUrlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert to base64 using a more efficient method
    let binary = "";
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);

    return `data:application/pdf;base64,${base64}`;
  } catch (error) {
    console.error("Error converting PDF to base64:", error);
    throw error;
  }
}

/**
 * Converts base64 data to a Blob
 * @param base64Data - Base64 encoded data (with or without data URL prefix)
 * @returns Blob - The PDF as a blob
 */
export function base64ToBlob(base64Data: string): Blob {
  // Remove data URL prefix if present
  const base64 = base64Data.replace(/^data:application\/pdf;base64,/, "");
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/pdf" });
}

export function blobToURL(blob: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}
