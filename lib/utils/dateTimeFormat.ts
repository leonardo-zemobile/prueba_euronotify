const localeMap: Record<string, string> = {
    en: 'en-GB',
    it: 'it-IT',
    fr: 'fr-FR',
    es: 'es-ES',
  }
  

  export function formatToLocalTimestamp(isoString: string, lang: string = 'en'): string {
    if (!isoString) return ''
  
    const date = new Date(isoString)
    const locale = localeMap[lang] || 'en-GB'
  
    return date.toLocaleString(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    })
  }
    