const INTRODUCTION = "Hello card user!\n\tWe have detected unusually high spending on your card in these categories:\n\t";
const ENDING = "Love,\n\tThe Credit Card Company";

export class Alert {

  static from(categorySpendings) {
    const unusualSpendings = categorySpendings.filter(spending => spending.isUnusual);
    const totalUnusualAmount = unusualSpendings.reduce(
      (acc, categorySpending) => acc + categorySpending.currentSpending,
      0
    );

    const title = `Unusual spending of $${totalUnusualAmount} detected!`;
    const categoryLines = unusualSpendings.map((categorySpending) => {
      return `* You spent $${categorySpending.currentSpending} on ${categorySpending.name}\n\t`;
    });
    const description = `${INTRODUCTION}${categoryLines.join("")}${ENDING}`;

    return { title, description };
  }
}
