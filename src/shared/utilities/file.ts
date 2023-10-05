export class FileUtility {
  /**
   * Check if a file mime type.ts matches expected file type.ts
   * @param mimeType
   * @param expectedType
   */
  static ofType(mimeType: string, expectedType: 'image' | 'video') {
    const fileType = this.getType(mimeType);
    return fileType === expectedType;
  }

  /**
   * Get a file type.ts, given the mime type.ts
   * @param mimeType
   */
  static getType(mimeType: string): 'image' | 'video' {
    const type = mimeType.split('/')[0];
    switch (type) {
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      default:
        throw new Error('Media type.ts not supported.');
    }
  }
}
