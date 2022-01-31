import React from "react";
import styles from "./AsideRight.module.css";

const Line: React.FC = ({ children }) => (
    <p className={styles.line}>{children}</p>
);

export const AsideRight = () => {
    return (
        <aside className="aside-right">
            <div className={styles.container}>
                <p>このブログのソースコード</p>
                <a href="https://github.com/kde15/techblog">
                    https://github.com/kde15/techblog
                </a>
            </div>
            <div className={styles.container}>
                <p>
                    <strong>自己紹介</strong>
                </p>
                <Line>エンジニア実務経験3年の26歳です。</Line>
                <Line>
                    Javaのバックエンドを2年程やった後、Reactを少し触ってから退職しました。
                </Line>
                <Line>現在は転職活動中です。</Line>
                <Line>
                    React.js、TypeScript、Go、Firebase、AWS Amplify、AWS
                    CDKに興味があります。
                </Line>
                <Line>中でもフロントエンドに一番興味があります。</Line>
                <Line>コンビニコーヒーと玄米茶が好きです。</Line>
            </div>
        </aside>
    );
};
