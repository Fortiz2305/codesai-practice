import { CategorySpendings } from './category_spending';
import { Alert } from './alert';

export class UnusualSpendingsService {
  constructor(calendar, paymentRepository, notifier, userRepository) {
    this.calendar = calendar;
    this.paymentRepository = paymentRepository;
    this.notifier = notifier;
    this.userRepository = userRepository;
  }

  run(userId) {
    const user = this.userRepository.find(userId);
    const currentMonth = this.calendar.currentMonth();
    const paymentsThisMonth = this.paymentRepository.find(userId, currentMonth);
    const paymentsPreviousMonth = this.paymentRepository.find(userId, currentMonth - 1);

    const spendingsByCategory = CategorySpendings.from(paymentsPreviousMonth, paymentsThisMonth);

    const shouldNotify = spendingsByCategory.some((spendings) => spendings.isUnusual);
    if (shouldNotify) {
      const unusualSpendings = spendingsByCategory.filter((spending) => spending.isUnusual);
      this.notifier.notify({
        contactDetails: user.contactDetails,
        alert: Alert.from(unusualSpendings),
      });
    }
  }
}
