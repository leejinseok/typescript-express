'use strict';

class ProductSerivce {
  constructor() {}

  products(query: object): object[] {
    return [
      {
        id: 1,
        name: '오뚜기'
      },
      {
        id: 2,
        name: '라면'
      }
    ];
  }
}

export default new ProductSerivce();