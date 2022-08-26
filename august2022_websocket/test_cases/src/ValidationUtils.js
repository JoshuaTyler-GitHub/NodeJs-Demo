/**
 * Copyright (c) 2022 Relyt LLC
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International
 */

class ValidationUtils {
  /**
   * exists validation
   * not null and not undefined
   *
   * @static
   * @param {any} value
   * @returns {Boolean}
   */
  static exists(value) {
    try {
      return (
        value !== null &&
        value !== undefined &&
        String(value) !== String('null') &&
        String(value) !== String('undefined')
      );
    } catch {
      return Boolean(false);
    }
  }

  /**
   * string validation
   * not null and not undefined
   * string is not "[object Object]"
   * string is not empty or only whitespace
   *
   * @static
   * @param {any} value
   * @returns {Boolean}
   */
  static string(value) {
    try {
      return (
        ValidationUtils.exists(value) &&
        String(value).trim() !== '[object Object]' &&
        String(value).trim() !== ''
      );
    } catch {
      return Boolean(false);
    }
  }
}
module.exports = ValidationUtils;
