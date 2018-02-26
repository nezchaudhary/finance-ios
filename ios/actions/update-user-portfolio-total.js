export function updateUserPortfolioTotal(total) {
  return {
    type: 'USER_PORTFOLIO_TOTAL',
    payload: total,
  }
}