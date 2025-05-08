type Task={
    id: number;
    title: string;
    content: string | null;
    done: boolean;
    priority: number;
    createdAt: Date;
    updatedAt: Date;
}

type PaginationType={
    page: number;
    limit: number;
}

export type {Task, PaginationType}