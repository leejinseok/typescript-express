'use strict';

import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";

@Middleware({type: "after"})
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any): void {
    console.error('[ErrorHandler]', error);
    response.status(500).send("Internal Server Error");
  }
}