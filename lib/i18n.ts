// lib/i18n.ts

// Import your dictionaries
import en from '../dictionaries/en.json';
import fr from '../dictionaries/fr.json';
import es from '../dictionaries/es.json';
import it from '../dictionaries/it.json';
import pt from '../dictionaries/pt.json';

// Create a mapping of language codes to dictionaries
const dictionaries: { [key: string]: any } = {
  en,
  fr,
  es,
  it,
  pt
};

// Helper function to retrieve the correct dictionary
/*export function getDictionary(lang: any) {
  if (!dictionaries[lang]) {
    console.warn(`No dictionary found for lang "${lang}", falling back to 'es'`);
  }

  return dictionaries[lang] || dictionaries['en'];;
}*/

export async function getDictionary(lang: string): Promise<Record<string, string>> {
  const baseUrl = 'https://gosqitkydrezcagjsfza.supabase.co/storage/v1/object/public/aceteka-main-content/dictionaries';

  try {
    const res = await fetch(`${baseUrl}/${lang}.json`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${lang} dictionary`);
    }

    const dict = await res.json();
    return dict;
  } catch (error) {
    console.warn(`Error loading "${lang}" dictionary:`, error);
    // Fallback to spanish
    const fallback = await fetch(`${baseUrl}/es.json`, { cache: 'no-store' });
    return await fallback.json();
  }
}


export async function safeGetDictionary(lang: string): Promise<Record<string, string>> {
  if (!lang || lang.includes('.') || lang.length > 10) {
    console.warn(`Invalid language code "${lang}" — skipping dictionary fetch`);
    return {};
  }

  return await getDictionary(lang);
}


/**
 * Retrieves a dictionary of translations for a given language from local JSON files.
 * @param lang The language code (e.g., 'en', 'es').
 * @returns The dictionary object for the specified language, falling back to English if not found.
 */
export function getLocalDictionary(lang: string) {
  if (!dictionaries[lang]) {
    console.warn(`No local dictionary found for lang "${lang}", falling back to 'en'`);
  }
  return dictionaries[lang] || dictionaries['en'];
}
