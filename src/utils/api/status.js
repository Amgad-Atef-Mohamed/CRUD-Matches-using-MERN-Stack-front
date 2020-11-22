// @flow

class Status {
  // Getting access to status codes constants
  static SUCCESS = 200;

  static CREATED = 201;

  static NO_CONTENT = 204;

  static CONFLICT = 409;

  static INVALID = 400;

  static NOT_AUTHORIZED = 401;

  static FORBIDDEN = 403;

  static NOT_FOUND = 404;

  /**
   * Check if the api status code is 200 or 201
   * @param {number} statusCode api status code
   * @returns {boolean}
   */
  static isSuccess = (statusCode: number): boolean => {
    if (
      statusCode === Status.SUCCESS ||
      statusCode === Status.CREATED ||
      statusCode === Status.NO_CONTENT
    ) {
      return true;
    }
    return false;
  };

  /**
   * Check if the api status code is 409
   * @param {number} statusCode api status code
   * @returns {boolean}
   */
  static isConflict = (statusCode: number): boolean => {
    if (statusCode === Status.CONFLICT) {
      return true;
    }
    return false;
  };

  /**
   * Check if the api status code is 400
   * @param {number} statusCode api status code
   * @returns {boolean}
   */
  static isInvalid = (statusCode: number): boolean => {
    if (statusCode === Status.INVALID) {
      return true;
    }
    return false;
  };

  /**
   * Check if the api status code is 401
   * @param {number} statusCode api status code
   * @returns {boolean}
   */
  static isNotAuthorized = (statusCode: number): boolean => {
    if (statusCode === Status.NOT_AUTHORIZED) {
      return true;
    }
    return false;
  };

  /**
   * Check if the api status code is 403
   * @param {number} statusCode api status code
   * @returns {boolean}
   */
  static isForbidden = (statusCode: number): boolean => {
    if (statusCode === Status.FORBIDDEN) {
      return true;
    }
    return false;
  };

  /**
   * Check if the api status code is 404
   * @param {number} statusCode api status code
   * @returns {boolean}
   */
  static isNotFound = (statusCode: number): boolean => {
    if (statusCode === Status.NOT_FOUND) {
      return true;
    }
    return false;
  };
}

export default Status;
