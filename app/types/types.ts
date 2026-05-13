export interface MetaNotification {
    alarm: {
        deviceCount: number;
    }
};

export interface Notification {
    id: number;
    sourceType: string;
    sourceId: number;
    action: string;
    title: string;
    message: string;
    severity: string;
    meta: MetaNotification;
    is_read: boolean;
    user_id: number;
    createdAt: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export interface Notifications {
    metadata: Notification[];
    pagination: Pagination
}

export const CURRENCIES = [
    { code: "USD", label: "United States Dollar", country: "United States" },
    { code: "EUR", label: "Euro", country: "European Union" },
    { code: "GBP", label: "British Pound", country: "United Kingdom" },
    { code: "AED", label: "UAE Dirham", country: "United Arab Emirates" },
    { code: "INR", label: "Indian Rupee", country: "India" },
    { code: "PKR", label: "Pakistani Rupee", country: "Pakistan" },
    { code: "SAR", label: "Saudi Riyal", country: "Saudi Arabia" },
    { code: "QAR", label: "Qatari Riyal", country: "Qatar" },
    { code: "KWD", label: "Kuwaiti Dinar", country: "Kuwait" },
    { code: "BHD", label: "Bahraini Dinar", country: "Bahrain" },
    { code: "OMR", label: "Omani Rial", country: "Oman" },
    { code: "JPY", label: "Japanese Yen", country: "Japan" },
    { code: "CNY", label: "Chinese Yuan", country: "China" },
    { code: "SGD", label: "Singapore Dollar", country: "Singapore" },
    { code: "CAD", label: "Canadian Dollar", country: "Canada" },
    { code: "AUD", label: "Australian Dollar", country: "Australia" },
    { code: "NZD", label: "New Zealand Dollar", country: "New Zealand" },
    { code: "CHF", label: "Swiss Franc", country: "Switzerland" },
    { code: "SEK", label: "Swedish Krona", country: "Sweden" },
    { code: "NOK", label: "Norwegian Krone", country: "Norway" },
    { code: "DKK", label: "Danish Krone", country: "Denmark" },
    { code: "MYR", label: "Malaysian Ringgit", country: "Malaysia" },
    { code: "THB", label: "Thai Baht", country: "Thailand" },
    { code: "IDR", label: "Indonesian Rupiah", country: "Indonesia" },
    { code: "VND", label: "Vietnamese Dong", country: "Vietnam" },
    { code: "PHP", label: "Philippine Peso", country: "Philippines" },
    { code: "KRW", label: "South Korean Won", country: "South Korea" },
    { code: "ZAR", label: "South African Rand", country: "South Africa" },
    { code: "TRY", label: "Turkish Lira", country: "Turkey" },
    { code: "RUB", label: "Russian Ruble", country: "Russia" },
    { code: "BRL", label: "Brazilian Real", country: "Brazil" },
    { code: "MXN", label: "Mexican Peso", country: "Mexico" },
];

export interface ApiError<T = any> {
    status: number;
    code: string;
    message: string;
    data: T;
}