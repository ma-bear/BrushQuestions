import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 *
 * @author xq
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="global-footer">
            <div>© {currentYear} 面试刷题平台</div>
            <div>
                <a href="https://www.mabear.cn" target="_blank">
                    作者：码熊
                </a>
            </div>
        </div>
    );
}
