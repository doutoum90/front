// utils/format.ts
export const formatMarketCap = (value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
    });
    return formatter.format(value);
};