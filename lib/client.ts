import { createClient } from "microcms-js-sdk";
import type { Article, Tag } from "~/types/api";

export const client = (() => {
    const apiKey = process.env.API_KEY;
    if (apiKey == null) {
        throw new Error(
            "Error in client/client.ts client() : API_KEYが未定義です"
        );
    }
    return createClient({
        serviceDomain: "kde-techblog", // TODO: 定数化
        apiKey: apiKey,
    });
})();

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const createArticle = (response: any) => {
    return {
        id: response.id ?? "",
        pathId: response.pathId ?? "",
        title: response.title ?? "",
        content: response.content ?? "",
        publishedAt: response.publishedAt ?? "",
        revisedAt: response.revisedAt ?? "",
        tags: response.tags ?? [],
        categories: response.categories ?? [],
    } as Article;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const createTag = (response: any) => {
    return {
        id: response.id ?? "",
        name: response.name ?? "",
        color: response.color ?? "",
    } as Tag;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const toArticleArray = (response: any[]) => {
    const articles: Article[] = [];
    for (const res of response) {
        articles.push(createArticle(res));
    }
    return articles;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const toTagArray = (response: any[]) => {
    const tags: Tag[] = [];
    for (const res of response) {
        tags.push(createTag(res));
    }
    return tags;
};

// [id].tsxで記事のURLを動的に生成するために使う
export const getArticleIds = async () => {
    const res = await client.getList({
        endpoint: "posts",
        queries: {
            limit: 10000,
            fields: ["id", "pathId"], // 取得対象のフィールド
        },
    });
    return toArticleArray(res.contents);
};

// [id].tsxで記事を表示するために使う
export const getArticleContent = async (pathId: string) => {
    const res = await client.getObject({
        endpoint: "posts",
        queries: {
            fields: [
                "title",
                "content",
                "tags.id",
                "tags.name",
                "tags.color",
                "categories.id",
                "categories.name",
                "publishedAt",
                "revisedAt",
            ],
            filters: `pathId[equals]${pathId}`,
        },
    });
    // TODO: check length
    return createArticle(res.contents[0]);
};

// index.tsxで記事一覧を表示するために使う
export const getArticleInfos = async () => {
    const res = await client.getList({
        endpoint: "posts",
        queries: {
            limit: 10000, // OPTIMIZE: 記事が増えたら一応1000件ずつ取得にすべきか
            fields: [
                "pathId",
                "title",
                "tags.id",
                "tags.name",
                "tags.color",
                "categories.id",
                "categories.name",
                "publishedAt",
                "revisedAt",
            ],
            orders: "-publishedAt", // 新しい記事が前にくるようにする
        },
    });
    return toArticleArray(res.contents);
};

// [tag].tsxで記事のURLを動的に生成するために使う
export const getTags = async () => {
    const res = await client.getList({
        endpoint: "tags",
        queries: {
            limit: 10000,
            fields: ["id"],
        },
    });
    return toTagArray(res.contents);
};

// [tag].tsxで記事一覧を表示するために使う
export const getArticleInfosByTag = async (tag: string) => {
    const res = await client.getList({
        endpoint: "posts",
        queries: {
            limit: 10000, // OPTIMIZE: 記事が増えたら一応1000件ずつ取得にすべきか
            fields: [
                "pathId",
                "title",
                "tags.id",
                "tags.name",
                "tags.color",
                "categories.id",
                "categories.name",
                "publishedAt",
                "revisedAt",
            ],
            filters: `tags[contains]${tag}`,
            orders: "-publishedAt", // 新しい記事が前にくるようにする
        },
    });
    return toArticleArray(res.contents);
};
