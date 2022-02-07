import { Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Card } from "~/components/article/Card";
import { AsideRight } from "~/components/AsideRight";
import { getArticleInfosByTag, getTags } from "~/lib/client";
import { toFormatString } from "~/lib/date";
import { isBrowser } from "~/lib/utils";
import styles from "~/styles/index.module.css";
import { Article } from "~/types/api";

interface Props {
    articles: Article[];
}

interface Params extends ParsedUrlQuery {
    tag: string;
}

const ArticlesByTag: NextPage<Props> = ({ articles }) => {
    const initialMaxContents = 10;
    const maxContents = articles.length;
    const onePageContents = 5;

    // 現在表示中の記事数
    const [showCount, setShowCount] = useState(
        Math.min(initialMaxContents, maxContents)
    );

    // 別のタグを選択した場合に表示を更新する
    const pathname = isBrowser() ? location.pathname : "";
    useEffect(() => {
        setShowCount(Math.min(initialMaxContents, maxContents));
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [pathname]);

    // まだ表示していない記事があるかどうかのフラグ
    const [hasMore, setHasMore] = useState(
        !(maxContents <= initialMaxContents)
    );

    const [isFetching, setIsFetching] = useState(false);

    const loadMore = async () => {
        setIsFetching(true);
        // ローディングスピナーを表示するためのsleep
        await new Promise((resolve) => setTimeout(resolve, 100));
        // 表示する記事数を更新
        if (showCount + onePageContents < maxContents) {
            setShowCount(showCount + onePageContents);
        } else if (showCount < maxContents) {
            setShowCount(maxContents);
            // これ以上は記事がない
            setHasMore(false);
        }
        setIsFetching(false);
    };

    return (
        <main>
            <aside className="aside-left"></aside>
            <section className="main-content">
                <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={!isFetching && hasMore}
                    className={styles.articles}
                >
                    {/* 現在の表示数のみ表示 */}
                    {articles.slice(0, showCount).map((v, i) => (
                        <Card
                            key={i + 1}
                            link={`/posts/${v.pathId}`}
                            title={v.title}
                            tags={v.tags}
                            publishedAt={toFormatString(v.publishedAt, "kanji")}
                            revisedAt={toFormatString(v.revisedAt, "kanji")}
                        />
                    ))}
                </InfiniteScroll>
                {/* 無限スクロール時のローディングスピナー */}
                {hasMore ? (
                    <div className={styles.loading}>
                        {isFetching ? (
                            <Spinner
                                thickness="4px" // spinnerの厚み
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                width="60px"
                                height="60px"
                            />
                        ) : null}
                    </div>
                ) : null}
            </section>
            <AsideRight />
        </main>
    );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    // タグ一覧を取得
    const tags = await getTags();
    const paths = tags.map((tag) => ({
        params: {
            tag: `${tag.id}`,
        } as Params,
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
    params,
}) => {
    if (params == null) {
        throw new Error(
            "Error in pages/posts/[tag].tsx getStaticProps() : paramsが空です"
        );
    }
    const tag = params.tag;
    // 記事一覧を取得
    const articles = await getArticleInfosByTag(tag);
    return {
        props: {
            articles,
        },
    };
};

export default ArticlesByTag;
