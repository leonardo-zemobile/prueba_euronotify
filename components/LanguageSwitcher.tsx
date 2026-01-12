'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { staticLanguages } from '@/lib/utils/languages';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { getAllData } from '@/lib/supabase/supabase_helper';

interface Selected {
    name: string;
    slug: string;
    flag: string
}

interface Language {

}

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const [selected, setSelected] = useState<Selected | null>(null);
    const [languages, setLanguages] = useState<any[]>(staticLanguages);


    // ⬇️ Detect initial language based on URL
    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean);
        const firstSegment = segments[0];

        const found = languages.find((lang) => lang.slug === firstSegment) || null;

        if (found) {
            setSelected(found);
        } else {
            // Default to Spanish if no slug
            const spanish = languages.find((lang) => lang.slug === 'es');
            if (spanish) setSelected(spanish);
        }
    }, [pathname, languages]);

    function handleLanguageChange(langSlug: string) {
        const segments = pathname.split('/').filter(Boolean);

        // Check if the first segment is a language slug
        const firstSegmentIsLang = languages.some((lang) => lang.slug === segments[0]);

        // If the first segment is a language, replace it with the new language
        if (firstSegmentIsLang) {
            segments[0] = langSlug; // Replace the language
        } else {
            // If no language is in the URL, prepend the new language
            segments.unshift(langSlug);
        }

        const newPath = '/' + segments.join('/');
        router.push(newPath);

        // Set the selected language state
        const newSelected = languages.find((lang) => lang.slug === langSlug);
        if (newSelected) setSelected(newSelected);
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2">
                    {selected?.flag && (
                        <img
                            src={selected.flag}
                            alt={selected.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                        />
                    )}
                    <span className="font-medium">{selected?.name ?? '…'}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.slug}
                            onClick={() => handleLanguageChange(lang.slug)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <img
                                src={lang.flag}
                                alt={lang.name}
                                width={24}
                                height={24}
                                className="rounded-full object-cover"
                            />
                            <span>{lang.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
