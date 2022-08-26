import { Alert } from "../../src/alert";

describe("Alert", () => {
  it("creates an alert for a category with unusual expenses", () => {
    const categorySpendings = [
      {
        currentSpending: 40,
        lastMonthSpending: 10,
        name: "restaurant",
        isUnusual: true,
      },
    ];

    const alert = Alert.from(categorySpendings);

    expect(alert.title).toEqual("Unusual spending of $40 detected!");
    expect(alert.description).toEqual(
      "Hello card user!\n\tWe have detected unusually high spending on your card in these categories:\n\t* You spent $40 on restaurant\n\tLove,\n\tThe Credit Card Company"
    );
  });

  it("creates an alert for several categories with unusual expenses", () => {
    const categorySpendings = [
      {
        currentSpending: 40,
        lastMonthSpending: 10,
        name: "restaurant",
        isUnusual: true,
      },
      {
        currentSpending: 80,
        lastMonthSpending: 10,
        name: "shopping",
        isUnusual: true,
      }
    ];

    const alert = Alert.from(categorySpendings);

    expect(alert.title).toEqual("Unusual spending of $120 detected!");
    expect(alert.description).toEqual(
      "Hello card user!\n\tWe have detected unusually high spending on your card in these categories:\n\t* You spent $40 on restaurant\n\t* You spent $80 on shopping\n\tLove,\n\tThe Credit Card Company"
    );
  });
});
