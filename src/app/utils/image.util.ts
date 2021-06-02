import {StringUtil} from './string.util';

export class ImageUtil {

    /**
     * Convert data URL(base64) image to blob.
     * @param dataURL - base64 image
     */
    public static dataURLToBlob(dataURL: string): Blob {
        // Convert the data URL to a byte string
        const byteString = atob(dataURL.split(',')[1]);

        // Pull out the mime type from the data URL
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

        // Convert to byte array
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let count = 0; count < byteString.length; count++) {
            uint8Array[count] = byteString.charCodeAt(count);
        }

        return new Blob([arrayBuffer], {type: mimeString});
    }

    /**
     * Convert data URL(base64) image to file.
     * @param dataURL - base64 image
     * @param filename - filename to be set for the file
     */
    public static dataURLToFile(dataURL: string, filename = 'file'): File {
        const blob = this.dataURLToBlob(dataURL);
        filename = this.generateFilename(blob, filename);

        return new File([blob], filename, {type: blob.type});
    }

    /**
     * Generate filename with extension.
     * @param blob - blob info
     * @param filename - desired filename
     */
    private static generateFilename(blob: Blob, filename: string): string {
        filename = filename.replace('.', '');
        const extension = StringUtil.substringAfter(blob.type, '/', 'last');

        return `${filename}.${extension}`;
    }
}
