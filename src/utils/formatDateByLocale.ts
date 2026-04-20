export function formatDateByLocale(isoString: string, locale = 'en'): string {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return formatter.format(date);
}
