// utils/priceParser.ts
export const parsePrice = (price: string): number => {
    if (!price) return 0;

    return Number(
        price
            .replace(/[^\d,.-]/g, '') // remove currency symbols
            .replace(',', '.')        // convert comma to dot
    );
};