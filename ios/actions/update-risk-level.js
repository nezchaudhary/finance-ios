export function updateRiskLevel(riskLevel) {
  return {
    type: 'UPDATE_RISK_LEVEL',
    payload: riskLevel,
  }
}