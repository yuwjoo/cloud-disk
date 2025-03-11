// 书签数据类型定义
export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export interface BookmarkGroup {
  id: string;
  name: string;
  bookmarks: Bookmark[];
}

// 默认书签数据
export const defaultBookmarkGroups: BookmarkGroup[] = [
  {
    id: "1",
    name: "常用搜索",
    bookmarks: [
      { id: "1", title: "百度", url: "https://www.baidu.com" },
      { id: "2", title: "Google", url: "https://www.google.com" },
      { id: "3", title: "Bing", url: "https://www.bing.com" },
      { id: "4", title: "DuckDuckGo", url: "https://duckduckgo.com" }
    ]
  },
  {
    id: "2",
    name: "开发工具",
    bookmarks: [
      { id: "5", title: "GitHub", url: "https://github.com" },
      { id: "6", title: "Stack Overflow", url: "https://stackoverflow.com" },
      { id: "7", title: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { id: "8", title: "npm", url: "https://www.npmjs.com" },
      { id: "9", title: "Vue.js", url: "https://vuejs.org" },
      { id: "10", title: "TypeScript", url: "https://www.typescriptlang.org" }
    ]
  },
  {
    id: "3",
    name: "社交媒体",
    bookmarks: [
      { id: "11", title: "微博", url: "https://weibo.com" },
      { id: "12", title: "知乎", url: "https://www.zhihu.com" },
      { id: "13", title: "Twitter", url: "https://twitter.com" },
      { id: "14", title: "LinkedIn", url: "https://www.linkedin.com" },
      { id: "15", title: "Facebook", url: "https://www.facebook.com" }
    ]
  },
  {
    id: "4",
    name: "学习资源",
    bookmarks: [
      { id: "16", title: "掘金", url: "https://juejin.cn" },
      { id: "17", title: "CSDN", url: "https://www.csdn.net" },
      { id: "18", title: "InfoQ", url: "https://www.infoq.cn" },
      { id: "19", title: "Coursera", url: "https://www.coursera.org" },
      { id: "20", title: "LeetCode", url: "https://leetcode.com" }
    ]
  },
  {
    id: "5",
    name: "新闻资讯",
    bookmarks: [
      { id: "21", title: "腾讯新闻", url: "https://news.qq.com" },
      { id: "22", title: "网易新闻", url: "https://news.163.com" },
      { id: "23", title: "BBC News", url: "https://www.bbc.com/news" },
      { id: "24", title: "CNN", url: "https://www.cnn.com" },
      { id: "25", title: "Reuters", url: "https://www.reuters.com" }
    ]
  },
  {
    id: "6",
    name: "工具网站",
    bookmarks: [
      { id: "26", title: "在线PS", url: "https://www.photopea.com" },
      { id: "27", title: "ProcessOn", url: "https://www.processon.com" },
      { id: "28", title: "有道翻译", url: "https://fanyi.youdao.com" },
      { id: "29", title: "站长工具", url: "https://tool.chinaz.com" },
      { id: "30", title: "JSON在线", url: "https://www.json.cn" }
    ]
  }
];