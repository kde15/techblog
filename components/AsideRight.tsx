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
                <Line>エンジニア歴3年、フリーランス1年目の26歳男です。</Line>
                <Line>今はAngularでフロントエンドをやってます。</Line>
                <Line>今まではJavaとReactをやってました。</Line>
            </div>
        </aside>
    );
};
