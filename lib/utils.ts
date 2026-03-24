import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function maskEmail(email: string) {
	const [name, domain] = email.split("@");
	if (!name || !domain) return "";
	if (name.length <= 2) return `${name[0] ?? ""}*@${domain}`;
	return `${name[0]}${"*".repeat(Math.max(1, name.length - 2))}${name[name.length - 1]}@${domain}`;
}
