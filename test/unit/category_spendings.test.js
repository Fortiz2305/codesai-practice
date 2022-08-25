import { CategorySpendings } from "../../src/category_spending";

describe("CategorySpendings", () => {
  const RESTAURANT_CATEGORY = "restaurant";
  const VIDEOGAMES_CATEGORY = "videogames";

  function aPayment(price, category) {
    return {
      price,
      description: "aDescription",
      category,
    };
  }

  it("should detect unusual high spending", () => {
    const lastMontPayments = [
      aPayment(50, RESTAURANT_CATEGORY),
      aPayment(10, VIDEOGAMES_CATEGORY),
    ];
    const currentPayments = [
      aPayment(60, RESTAURANT_CATEGORY),
      aPayment(400, VIDEOGAMES_CATEGORY),
    ];

    const categorySpendings = CategorySpendings.from(
      lastMontPayments,
      currentPayments
    );

    expect(categorySpendings).toStrictEqual([
      {
        currentSpending: 60,
        lastMonthSpending: 50,
        name: RESTAURANT_CATEGORY,
        isUnusual: false,
      },
      {
        currentSpending: 400,
        lastMonthSpending: 10,
        name: VIDEOGAMES_CATEGORY,
        isUnusual: true,
      },
    ]);
  });

  it("new categories should not be considered as unusual", () => {
    const lastMontPayments = [];
    const currentPayments = [aPayment(10, RESTAURANT_CATEGORY)];

    const categorySpendings = CategorySpendings.from(
      lastMontPayments,
      currentPayments
    );

    expect(categorySpendings).toStrictEqual([
      {
        currentSpending: 10,
        lastMonthSpending: 0,
        name: RESTAURANT_CATEGORY,
        isUnusual: false,
      },
    ]);
  });

  it("should group payments with the same category", () => {
    const lastMontPayments = [
      aPayment(50, RESTAURANT_CATEGORY),
      aPayment(10, RESTAURANT_CATEGORY),
    ];
    const currentPayments = [aPayment(120, RESTAURANT_CATEGORY)];

    const categorySpendings = CategorySpendings.from(
      lastMontPayments,
      currentPayments
    );

    expect(categorySpendings).toStrictEqual([
      {
        currentSpending: 120,
        lastMonthSpending: 60,
        name: RESTAURANT_CATEGORY,
        isUnusual: true,
      },
    ]);
  });
});
