//To Calculate rewards each month
const calculateRewardsMonthly = (month, user) => {
  let total_rewards = 0;
  if (user && user.transactions) {
    let rewards = 0;
    user.transactions.map((transaction) => {
      const amount = transaction.purchase_amount;
      const date = transaction.purchase_date;

      if (date.slice(5, 7) == month) {
        if (amount > 100) {
          rewards = (amount - 100) * 2 + 50; // this is whatever left beyond 100 and additional 50 for 50-to-100 range
        } else if (amount > 50) {
          rewards = amount - 50; // this is when the amount is  between 50-100
        }
        total_rewards = total_rewards + rewards;
      }
    });
  }
  return total_rewards;
};

export { calculateRewardsMonthly };
