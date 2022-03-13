import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { extname } from 'path';

export const Hash = (password) => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};

export const Compare = async (password = '', password_from_database = '') =>
  compareSync(password, password_from_database);

export const JsonSuccess = (
  status = true,
  message = '',
  data: any = null,
  optional = undefined,
) => {
  return { status, message, data, ...optional };
};

export const JsonError = (error = null, optional = {}) => {
  return { status: false, error, ...optional };
};

interface handleAsyncInterface {
  data: any;
  error: any;
}
export const handleAsync = async (promise) => {
  const payload = {
    data: null,
    error: null,
  };
  try {
    const data = await promise;
    payload.data = data;
    return payload;
  } catch (error) {
    console.log(error);
    payload.error = error;
    return payload;
  }
};

export const convertHMS = (d) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
};

export const rjxHandler = (userClient, pattern, payload) => {
  return new Promise((resolve, reject) => {
    userClient.send(pattern, payload).subscribe({
      next: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
