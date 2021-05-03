export class DataTypeUtil {

    /**
     * Checks if data's data type is undefined.
     * @param data - data to be checked
     */
    public static isUndefined(data: any): boolean {
        return typeof data === 'undefined';
    }

    /**
     * Checks if data's data type is number.
     * @param data - data to be checked
     */
    public static isNumber(data: any): boolean {
        return typeof data === 'number';
    }

    /**
     * Checks if data's data type is integer.
     * @param data - data to be checked
     */
    public static isInteger(data: any): boolean {
        return typeof data === 'number' && data % 1 === 0;
    }

    /**
     * Checks if data's data type is string.
     * @param data - data to be checked
     */
    public static isString(data: any): boolean {
        return typeof data === 'string';
    }

    /**
     * Checks if data's data type is Array.
     * @param data - data to be checked
     */
    public static isArray(data: any): boolean {
        return Object.prototype.toString.call(data) === '[object Array]';
    }

    /**
     * Checks if data's data type is Date.
     * @param data - data to be checked
     */
    public static isDate(data: any): boolean {
        return Object.prototype.toString.call(data) === '[object Date]';
    }
}
