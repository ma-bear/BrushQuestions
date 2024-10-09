"use client";
import {
    GithubFilled,
    LogoutOutlined,
} from "@ant-design/icons";
import {
    ProLayout,
} from "@ant-design/pro-components";
import {Dropdown, Input, message, theme} from "antd";
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFooter from "@/components/GlobarFooter";
import {menus} from "../../../config/menus";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import {DEFAULT_USER} from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

interface Props {
    children: React.ReactNode;
}

export default function BasicLayout({children}: Props) {
    const pathname = usePathname();
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    /**
     * 用户注销
     */
    const userLogout = async () => {
        try {
            await userLogoutUsingPost();
            message.success("已退出登录");
            dispatch(setLoginUser(DEFAULT_USER));
            router.push("/user/login");
        } catch (e) {
            message.error("操作失败，" + e.message);
        }
        return;
    }

    return (
        <div
            id="basiclayout"
            style={{
                height: "100vh",
                overflow: "auto",
            }}
        >
            getTargetContainer={() => {
            return document.getElementById("test-pro-layout") || document.body;
        }}
            >
            <ProLayout
                title="码熊刷题平台"
                layout="top"
                logo={
                    <Image src="/assets/logo.png" width={32} height={32} alt="码熊刷题平台"></Image>
                }
                location={{
                    pathname,
                }}
                token={{
                    header: {
                        colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
                    },
                }}
                siderMenuType="group"
                menu={{
                    collapsedShowGroupTitle: true,
                }}
                avatarProps={{
                    src: loginUser.userAvatar || "/assets/logo.png",
                    size: "small",
                    title: loginUser.userName || "码熊",
                    render: (props, dom) => {
                        return loginUser.id ? (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "userCenter",
                                            icon: <UserOutlined />,
                                            label: "个人中心",
                                        },
                                        {
                                            key: "logout",
                                            icon: <LogoutOutlined />,
                                            label: "退出登录",
                                        },
                                    ],
                                    onClick: async (event: { key: React.Key }) => {
                                        const { key } = event;
                                        if (key === "logout") {
                                            userLogout();
                                        } else if (key === "userCenter") {
                                            router.push("/user/center");
                                        }
                                    },
                                }}
                            >
                                {dom}
                            </Dropdown>
                        ) : (
                        <div onClick={() => router.push("/user/login")}>{dom}</div>
                        );
                    },
                }}
                // 操作渲染
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <SearchInput key="serch"/>,
                        <a key="Github" href="https://github.com/xqboot/BrushQuestions" target="_blank">
                            <GithubFilled key="GithubFilled"/>
                        </a>
                    ]
                }}
                // 标题渲染
                headerTitleRender={(logo, title, _) => {
                    return (
                        <a href="https://www.mianshiya.com" target="_blank">
                            {logo}
                            {title}
                        </a>
                    );
                }}

                // 底部栏
                footerRender={() => <GlobalFooter />}

                onMenuHeaderClick={(e) => console.log(e)}
                // 菜单项数据
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menus);
                }}
                // 菜单渲染
                menuItemRender={(item, dom) => (
                    <Link href={item.path || "/"} target={item.target}>
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );
}
