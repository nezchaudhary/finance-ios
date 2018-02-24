export function updateCustomPortfolio(portfolio) {
  return {
    type: 'USER_PORTFOLIO',
    payload: portfolio,
  }
}