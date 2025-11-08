import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CodingNote",
  description: "lzx的前端笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Git", link: "/git/git常用命令" },
      { text: "CSS", link: "/css" },
      { text: "JavaScript", link: "/javascript/基础" },

      {
        text: "JavaScript高级程序设计",
        link: "/JavaScript高级程序设计/第3章 语言基础/变量",
      },
      { text: "TypeScript", link: "/typescript/基础类型" },
    ],

    sidebar: {
      "/git": [
        {
          text: "git基础",
          items: [{ text: "git常用命令", link: "/git/git常用命令" }],
        },
        {
          text: "ssh登录",
          items: [{ text: "ssh登录github", link: "/git/SSH免密登录github" }],
        },
      ],
      "/javascript": [
        {
          text: "javascript快速入门",
          items: [
            { text: "基础", link: "/javascript/基础" },
            { text: "高级", link: "/javascript/高级" },
            { text: "Web API", link: "/javascript/Web API" },
          ],
        },
      ],
      "/JavaScript高级程序设计": [
        {
          text: "第3章 语言基础",
          items: [
            {
              text: "变量",
              link: "/JavaScript高级程序设计/第3章 语言基础/变量",
            },
            {
              text: "数据类型",
              link: "/JavaScript高级程序设计/第3章 语言基础/数据类型",
            },
            {
              text: "操作符",
              link: "/JavaScript高级程序设计/第3章 语言基础/操作符",
            },
            {
              text: "语句",
              link: "/JavaScript高级程序设计/第3章 语言基础/语句",
            },
          ],
        },
        {
          text: "第4章 变量、作用域与内存",
          items: [
            {
              text: "第4章 变量、作用域与内存",
              link: "/JavaScript高级程序设计/第4章 变量、作用域与内存",
            },
          ],
        },
        {
          text: "JavaScript继承",
          items: [
            {
              text: "JavaScript继承",
              link: "/JavaScript高级程序设计/JavaScript继承",
            },
          ],
        },
        {
          text: "第8章 对象",
          items: [
            {
              text: "8.1 理解对象",
              link: "/JavaScript高级程序设计/第8章 对象/8.1 理解对象",
            },
            {
              text: "8.2 创建对象",
              link: "/JavaScript高级程序设计/第8章 对象/8.2 创建对象",
            },
            {
              text: "8.3 继承",
              link: "/JavaScript高级程序设计/第8章 对象/8.3 继承",
            },
            {
              text: "8.4 类",
              link: "/JavaScript高级程序设计/第8章 对象/8.4 类",
            },
          ],
        },
      ],
      "/typescript": [
        {
          text: "typescript基础",
          items: [
            { text: "基础", link: "/typescript/基础类型" },
            { text: "装饰器", link: "/typescript/装饰器" },
            {
              text: "declare关键字",
              link: "/typescript/declare关键字和.d.ts类型声明文件.md",
            },
            {
              text: "命名空间",
              link: "/typescript/命名空间.md",
            },
          ],
        },
        {
          text: "typescript进阶",
          items: [{ text: "4", link: "/typescript" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
