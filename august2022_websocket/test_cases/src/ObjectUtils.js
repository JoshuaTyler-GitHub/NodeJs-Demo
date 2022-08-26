const ValidationUtils = require('./ValidationUtils.js');

class ObjectUtils {
  /**
   * @async
   * @recursive
   * @static
   * @param {Object} objectNew
   * @param {Object} objectOld
   * @returns {Promise<Object>}
   */
  static async changeSet(objectNew = {}, objectOld = {}) {
    const keys = Object.keys({ ...objectNew, ...objectOld });
    const changeSet = {};
    await Promise.all(
      keys.map(async (key) => {
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
          const resursiveChangeSet = await ObjectUtils.changeSet(
            objectNew[key],
            objectOld[key],
          );
          if (Object.keys(resursiveChangeSet).length > 0) {
            changeSet[key] = { ...resursiveChangeSet };
          }
        } else if (String(newString) !== String(oldString)) {
          changeSet[key] = {};
          if (ValidationUtils.exists(objectNew[key])) {
            changeSet[key].new = objectNew[key];
          }
          if (ValidationUtils.exists(objectOld[key])) {
            changeSet[key].old = objectOld[key];
          }
        }
      }),
    );
    return changeSet;
  }
}
module.exports = ObjectUtils;