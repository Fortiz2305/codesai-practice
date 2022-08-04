export class CategoryList {
  static from(payments) {
    return payments.reduce((cummulative, current) => {
      if (!cummulative[current.category]) {
        cummulative[current.category] = current.price;
      } else {
        cummulative[current.category] += current.price;
      }

      return cummulative;
    }, {});
  }
}
