import React from "react";
import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { rehype } from "rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { JSDOM } from "jsdom";
import { TagList } from "components/utils/tag";
import { getArticleIds, getArticleContent } from "lib/client";
import { toFormatString } from "lib/date";
import type { Article } from "types/api";
import styles from "styles/article.module.css";

interface Props {
    article: Article;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

const ArticleComponent: NextPage<Props> = ({ article }) => {
    return (
        <main>
            <aside className="left-aside"></aside>
            <section className="main-content">
                <div className={styles.titleArea}>
                    <p className={styles.title}>{article.title}</p>
                    <p>
                        <span className={styles.publishDate}>
                            公開 {toFormatString(article.publishedAt, "kanji")}
                        </span>
                        <span className={styles.updateDate}>
                            更新 {toFormatString(article.revisedAt, "kanji")}
                        </span>
                    </p>
                    <TagList tags={article.tags} />
                </div>
                <section
                    className={styles.article}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                ></section>
            </section>
            <aside className="right-aside"></aside>
        </main>
    );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const articleIds: Article[] = await getArticleIds();

    const paths = articleIds.map((article) => ({
        params: {
            id: `${article.pathId}`, // これが"/posts/[id]"というパスに使われる
        } as Params,
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
    params,
}) => {
    if (params == null) {
        throw new Error(
            "Error in pages/posts/[id].tsx getStaticProps() : paramsが空です"
        );
    }
    const pathId = params.id;

    // TODO: null check
    const articleData = await getArticleContent(pathId);

    // parse markdown to html
    const content = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(articleData.content);

    // add heading anchor link elems
    await rehype()
        .data("settings", { fragment: true })
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .process(content);

    // html string to Document Object
    const document = new JSDOM(String(content)).window.document;

    // add syntax highlight
    document.querySelectorAll<HTMLElement>("pre code").forEach((el) => {
        hljs.highlightElement(el);
    });

    // add heading anchor link background
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        const divElem = document.createElement("div");
        divElem.className = "heading-background";
        el.insertBefore(divElem, el.firstChild);
        const anchorElem = el.querySelector("a");
        if (divElem !== null && anchorElem !== null) {
            divElem.appendChild(anchorElem);
        }
    });
    document.querySelectorAll("a span.icon-link").forEach((el) => {
        el.textContent = "#";
    });

    articleData.content = document.body.innerHTML;
    return {
        props: {
            article: articleData,
        },
    };
};

export default ArticleComponent;
