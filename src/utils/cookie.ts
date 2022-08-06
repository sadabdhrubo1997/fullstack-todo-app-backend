// import config from '../config';

import config from '../config';

interface ICookieOptions {
  secure?: boolean;
  httpOnly: boolean;
  sameSite?: boolean | 'strict' | 'lax' | 'none';
  expires: Date | undefined;
  path?: string;
}

// max age one month
const maxCookieAge = 30 * 24 * 60 * 60 * 1000;

const cookieOptions = (expiry: Date = new Date(Date.now() + maxCookieAge)) => {
  const options: ICookieOptions = {
    secure: config.environment === 'dev' ? false : true,
    sameSite: 'none',
    httpOnly: true,
    expires: expiry,
  };

  return options;
};

export { cookieOptions };
