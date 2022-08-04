import { CategoryList } from './category_list';

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

    const paymentsByCategoryThisMonth = CategoryList.from(paymentsThisMonth);
    const paymentsByCategoryPreviousMonth = CategoryList.from(paymentsPreviousMonth);

    const incrementsThisMonth = Object.keys(paymentsByCategoryThisMonth).reduce((cummulative, current) => {
      const paymentsThisMonth = paymentsByCategoryThisMonth[current];
      const paymentsPreviousMonth = paymentsByCategoryPreviousMonth[current];
      if (paymentsPreviousMonth) {
        cummulative[current] = ((paymentsThisMonth - paymentsPreviousMonth) / paymentsThisMonth) * 100;
      }
      return cummulative;
    }, {});


    const shouldNotify = Object.values(incrementsThisMonth).some(value => value > 50);

    const unusualAmount = 50;
    const title = `Unusual spending of $${unusualAmount} detected!`;

    if (shouldNotify) {
      this.notifier.notify({
        contactDetails: user.contactDetails,
        alert: {
          title,
          description: a
        }
      });
    }
  }
}


const a = 'Hello card user!\n\tWe have detected unusually high spending on your card in these categories:\n\t* You spent $50 on restaurant\n\tLove,\n\tThe Credit Card Company';
