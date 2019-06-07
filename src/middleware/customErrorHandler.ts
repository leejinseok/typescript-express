'use strict';

import {ExpressErrorMiddlewareInterface} from "routing-controllers";

export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any): void {
    console.error('CustomErrorHandler', error);
    next();
  }
}