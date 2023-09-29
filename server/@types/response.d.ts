import * as express from 'express';
import { CookieParseOptions } from 'cookie-parser'

declare global {
  namespace Express {
    interface Response {
      cookie: (name: string, value: string, options: CookieParseOptions) => Response;
    }
  } 
}