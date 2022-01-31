import React, { useState } from "react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "@chakra-ui/react";
import { getArticleInfos } from "lib/client";
import { toFormatString } from "lib/date";
import type { Article } from "types/api";
import { AsideRight } from "components/AsideRight";
import { Card } from "components/home/Card";
import styles from "styles/index.module.css";

interface Props {
    articles: Article[];
}

const Home: NextPage<Props> = ({ articles }) => {
    const initialMaxContents = 10;
    const maxContents = articles.length;
    const onePageContents = 5;

    // 現在表示中の記事数
    const [showCount, setShowCount] = useState(
        Math.min(initialMaxContents, maxContents)
    );

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

export const getStaticProps: GetStaticProps<
    Props,
    ParsedUrlQuery
> = async () => {
    // 記事一覧を取得
    const articles = await getArticleInfos();
    return {
        props: {
            articles,
        },
    };
};

export default Home;
