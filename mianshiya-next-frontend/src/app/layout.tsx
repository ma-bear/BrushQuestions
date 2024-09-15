"use client";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { useCallback, useEffect } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import store, { AppDispatch } from "@/stores";
import { Provider, useDispatch } from "react-redux";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/accessLayout";
import { getLoginUserUsingGet } from "@/api/userController";

/**
 * 初始化布局（多封装一层，使得能调用 useDispatch）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    // 获取用户信息
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data));
    }
  }, []);

  useEffect(() => {
    doInitLoginUser();
  }, []);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
