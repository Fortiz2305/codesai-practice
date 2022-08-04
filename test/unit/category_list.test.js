import { CategoryList } from '../../src/category_list';

describe('CategoryList', () => {
  it('should group by category a given list of payments', () => {
    const payments = [
      { price: 50, description: 'aDescription', category: 'restaurant' },
      { price: 10, description: 'aDescription', category: 'restaurant' },
      { price: 10, description: 'aDescription', category: 'videogames' },
    ];

    const categoryList = CategoryList.from(payments);

    expect(categoryList).toStrictEqual({ restaurant: 60, videogames: 10 });
  });

  it('should return an empty object when there is no payments', () => {
    const payments = [];

    const categoryList = CategoryList.from(payments);

    expect(categoryList).toStrictEqual({});
  });
});
