class ObjectUtils {
  /**
   * @recursive
   * @static
   * @param {Object} objectNew
   * @param {Object} objectOld
   * @param {String[]} ignoreKeys
   * @returns {Object}
   */
  static changeSet(objectNew = {}, objectOld = {}, ignoreKeys = []) {
    const keys = Object.keys({ ...objectNew, ...objectOld });
    const changeSet = {};
    keys.forEach((key) => {
      let recursionRequired = Boolean(false);

      // stringify new values
      let newString = String('undefined');
      if (ValidationUtils.exists(objectNew[key])) {
        if (ValidationUtils.string(objectNew[key])) {
          newString = String(objectNew[key]);
        } else {
          recursionRequired = Boolean(true);
        }
      }

      // stringify old values
      let oldString = String('undefined');
      if (ValidationUtils.exists(objectOld[key])) {
        if (ValidationUtils.string(objectOld[key])) {
          oldString = String(objectOld[key]);
        } else {
          recursionRequired = Boolean(true);
        }
      }

      // recurse if needed
      if (recursionRequired) {
        const resursiveChangeSet = ObjectUtils.changeSet(
          objectNew[key],
          objectOld[key],
        );
        if (Object.keys(resursiveChangeSet).length > 0) {
          changeSet[key] = { ...resursiveChangeSet };
        }
      }

      // othwerwise, add to changeSet
      else if (String(newString) !== String(oldString)) {
        changeSet[key] = {};
        if (objectNew[key] !== null && objectNew[key] !== undefined) {
          changeSet[key].new = objectNew[key];
        }
        if (objectOld[key] !== null && objectOld[key] !== undefined) {
          changeSet[key].old = objectOld[key];
        }
      }
    });
    return changeSet;
  }
}
module.exports = ObjectUtils;

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
