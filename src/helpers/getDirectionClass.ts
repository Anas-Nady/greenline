const arabicRegex = /[\u0600-\u06FF]/;

export function getDirectionClass(text: string): string {
  return arabicRegex.test(text) ? "rtl" : "ltr";
}
