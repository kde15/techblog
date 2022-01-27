export interface Article {
    id: string;
    pathId: string;
    title: string;
    content: string;
    revisedAt: string;
    publishedAt: string;
    tags: Tag[];
    categories: Category[];
}

export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface Category {
    id: string;
    name: string;
}
