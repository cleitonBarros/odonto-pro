const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
});

export function formatCurrency(value: number) { 
  return CURRENCY_FORMATTER.format(value);
}