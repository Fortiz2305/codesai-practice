export class CategorySpendings {
  static from(lastMonthSpendings, currentMonthSpendings) {
    const expensesByCategoryLastMonth =
      CategorySpendings.groupByCategory(lastMonthSpendings);
    const expensesByCategoryCurrentMonth = CategorySpendings.groupByCategory(
      currentMonthSpendings
    );

    return Object.keys(expensesByCategoryCurrentMonth).map((category) => {
      const currentSpending = expensesByCategoryCurrentMonth[category];
      const lastMonthSpending = expensesByCategoryLastMonth[category] || 0;
      return {
        name: category,
        currentSpending,
        lastMonthSpending,
        isUnusual:
          !!lastMonthSpending && currentSpending >= lastMonthSpending * 1.5,
      };
    });
  }

  static groupByCategory(lastMonthSpendings) {
    return lastMonthSpendings.reduce((acc, current) => {
      if (!acc[current.category]) {
        acc[current.category] = 0;
      }

      acc[current.category] += current.price;

      return acc;
    }, {});
  }
}
