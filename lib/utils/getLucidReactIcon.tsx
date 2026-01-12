import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function getLucideIcon(name: string | null | undefined): LucideIcon {
    if (!name) return Icons.Layers;

    // lucide-react exports icons as named exports, so we can index into it
    const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];

    return Icon ?? Icons.Layers; // fallback if name is wrong
}
