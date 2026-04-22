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