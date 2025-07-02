/**
 * Return a random color
 */
export function randomColor(): string {
  //NOSONAR
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

/**
 * Generate a random date
 * @returns date
 */
export function randomDate(start: Date, end: Date): Date {
  //NOSONAR
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

/**
 * Return a random number
 * @param min
 * @param max
 */
export function randomNumber(min: number, max: number): number {
  //NOSONAR
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return a random string
 * @param length
 * @param splitIntoWords
 */
export function randomString(length: number, splitIntoWords = true): string {
  if (length === undefined) {
    length = randomNumber(200, 1000);
  }
  let s = "";
  let wordCount = 0;
  let wordLength = randomNumber(3, 10);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    s += chars.charAt(randomNumber(0, chars.length - 1));
    if (splitIntoWords) {
      wordCount++;
      if (wordCount >= wordLength) {
        wordCount = 0;
        wordLength = randomNumber(3, 10);
        s += " ";
      }
    }
  }
  return s.substring(0, length);
}
