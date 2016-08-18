
declare let numeral: any;

export function formatAmount(amount: number): string {
    return numeral(amount).format('(0 a)');
}

export function formatCurrency(amount: number): string {
    return numeral(amount).format('(0,000)');
}