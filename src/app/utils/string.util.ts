export class StringUtil {

    public static FIRST = 'first';
    public static LAST = 'last';

    /**
     * Get text before separator.
     * @param text - string to search in
     * @param separator - text separator
     * @param occurrence - occurrence of the separator in the text (first or last)
     */
    public static substringBefore(text: string, separator: string, occurrence = this.FIRST): string {
        const length = text.length - (this.substringAfter(text, separator, occurrence).length + separator.length);
        return text.substr(0, length);
    }

    /**
     * Get text in between the start and end identifiers.
     * @param text - string to search in
     * @param start - start identifier
     * @param end - end identifier
     */
    public static substringBetween(text: string, start: string, end: string): string {
        return this.substringBefore(this.substringAfter(text, start), end);
    }

    /**
     * Get text after separator.
     * @param text - string to search in
     * @param separator - text separator
     * @param occurrence - occurrence of the separator in the text (first or last)
     */
    public static substringAfter(text: string, separator: string, occurrence = this.FIRST): string {
        const position = occurrence === this.FIRST ? text.indexOf(separator) : text.lastIndexOf(separator);
        return text.substr(position + separator.length);
    }
}
