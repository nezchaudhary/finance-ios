export function updateUserPortfolio(portfolio) {
  return {
    type: 'USER_PORTFOLIO',
    payload: portfolio,
  }
}