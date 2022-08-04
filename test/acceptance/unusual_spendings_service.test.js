import { UnusualSpendingsService } from '../../src/unusual_spendings_service';

describe('UnusualSpendingsService', () => {
  const userId = 'AN_USER_ID';
  const currentMonth = 2;

  test('alerting users with unusual spendings in some categories', () => {
    const calendar = { currentMonth: () => currentMonth };
    const paymentRepository = {
      find: (userId, month) => {
        if (month === currentMonth) {
          return [{ price: 50, description: 'aDescription', category: 'restaurant' }];
        }
        return [{ price: 10, description: 'aDescription', category: 'restaurant' }];
      }
    };
    const notifier = { notify: jest.fn() };
    const userRepository = { find: (userId) => ({ id: userId, contactDetails: { email: 'user@mail.com' } }) };
    const service = new UnusualSpendingsService(calendar, paymentRepository, notifier, userRepository);

    service.run(userId);

    const expectedAlert = 'Hello card user!\n\tWe have detected unusually high spending on your card in these categories:\n\t* You spent $50 on restaurant\n\tLove,\n\tThe Credit Card Company';
    expect(notifier.notify).toHaveBeenCalledWith({
      contactDetails: { email: 'user@mail.com' },
      alert: { title: 'Unusual spending of $50 detected!', description: expectedAlert },
    });
  });

  test('does not alert users when there are not unusual spendings', () => {
    const calendar = { currentMonth: () => currentMonth };
    const paymentRepository = {
      find: (userId, month) => {
        if (month === currentMonth) {
          return [{ price: 10, description: 'aDescription', category: 'restaurant' }];
        }
        return [{ price: 10, description: 'aDescription', category: 'restaurant' }];
      }
    };
    const notifier = { notify: jest.fn() };
    const userRepository = { find: (userId) => ({ id: userId, contactDetails: { email: 'user@mail.com' } }) };
    const service = new UnusualSpendingsService(calendar, paymentRepository, notifier, userRepository);

    service.run(userId);

    expect(notifier.notify).not.toHaveBeenCalled();
  });
});
