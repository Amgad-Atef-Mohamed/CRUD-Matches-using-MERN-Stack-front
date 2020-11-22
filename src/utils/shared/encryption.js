// @flow

import Crypto from 'crypto-js';

const key = '8C6A5A98C796D1293C2129FE89E51';

/**
 * Encrypt a string
 * @param {string} data
 * @returns {string}
 */
export const encrypt = (data: string): string => Crypto.AES.encrypt(data, key);

/**
 * Decrypt a string
 * @param {string} data
 * @returns {string}
 */
export const decrypt = (data: string): string => {
  const bytes = Crypto.AES.decrypt(data.toString(), key);
  return bytes.toString(Crypto.enc.Utf8);
};

/**
 * Decode the JWT token
 * @param {string} token
 * @returns {Object}
 */
export const decodeJwtToken = (token: string): Object => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payLoad = JSON.parse(
    decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    ),
  );
  const header = undefined;

  return {
    header,
    payLoad,
  };
};
