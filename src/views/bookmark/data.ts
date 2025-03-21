// 书签数据类型定义
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  iconUrl: string;
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
      {
        id: "8",
        title: "Stack Overflow",
        url: "https://stackoverflow.com",
        iconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
      },
      {
        id: "21",
        title: "Twitter",
        url: "https://twitter.com",
        iconUrl: "https://twitter.com/favicon.ico"
      },
      {
        id: "7",
        title: "GitHub",
        url: "https://github.com",
        iconUrl: "https://github.com/favicon.ico"
      },
      {
        id: "23",
        title: "Facebook",
        url: "https://www.facebook.com",
        iconUrl: "https://www.facebook.com/favicon.ico"
      },
      {
        id: "24",
        title: "Instagram",
        url: "https://www.instagram.com",
        iconUrl: "https://www.instagram.com/favicon.ico"
      },
      {
        id: "50",
        title: "Bloomberg",
        url: "https://www.bloomberg.com",
        iconUrl: "https://www.bloomberg.com/favicon.ico"
      },
      {
        id: "25",
        title: "Reddit",
        url: "https://www.reddit.com",
        iconUrl: "https://www.reddit.com/favicon.ico"
      },
      {
        id: "43",
        title: "BBC News",
        url: "https://www.bbc.com/news",
        iconUrl: "https://www.bbc.com/favicon.ico"
      },
      {
        id: "45",
        title: "Reuters",
        url: "https://www.reuters.com",
        iconUrl: "https://www.reuters.com/favicon.ico"
      },
      {
        id: "48",
        title: "The New York Times",
        url: "https://www.nytimes.com",
        iconUrl: "https://www.nytimes.com/favicon.ico"
      },
      {
        id: "82",
        title: "金山文档",
        url: "https://www.kdocs.cn",
        iconUrl: "https://www.kdocs.cn/favicon.ico"
      },
      {
        id: "87",
        title: "印象笔记",
        url: "https://www.yinxiang.com",
        iconUrl: "https://www.yinxiang.com/favicon.ico"
      },
      {
        id: "91",
        title: "哔哩哔哩",
        url: "https://www.bilibili.com",
        iconUrl: "https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico"
      },
      {
        id: "49",
        title: "华尔街日报",
        url: "https://cn.wsj.com",
        iconUrl: "https://www.wsj.com/favicon.ico"
      },
      {
        id: "96",
        title: "Netflix",
        url: "https://www.netflix.com",
        iconUrl: "https://www.netflix.com/favicon.ico"
      },
      {
        id: "62",
        title: "Behance",
        url: "https://www.behance.net",
        iconUrl: "https://a5.behance.net/718f787161a752fd2a448afe3945a059b4eefc17/img/site/favicon.png?cb=264615658"
      },
      {
        id: "70",
        title: "Pinterest",
        url: "https://www.pinterest.com",
        iconUrl: "https://www.pinterest.com/favicon.ico"
      },
      {
        id: "74",
        title: "Google Cloud",
        url: "https://cloud.google.com",
        iconUrl: "https://cloud.google.com/favicon.ico"
      },
      {
        id: "85",
        title: "Google Docs",
        url: "https://docs.google.com",
        iconUrl: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
      },
      {
        id: "95",
        title: "YouTube",
        url: "https://www.youtube.com",
        iconUrl: "https://www.youtube.com/favicon.ico"
      },
      {
        id: "2",
        title: "Google",
        url: "https://www.google.com",
        iconUrl: "https://www.google.com/favicon.ico"
      },
      {
        id: "4",
        title: "DuckDuckGo",
        url: "https://duckduckgo.com",
        iconUrl: "https://duckduckgo.com/favicon.ico"
      },
      {
        id: "28",
        title: "微信公众平台",
        url: "https://mp.weixin.qq.com",
        iconUrl: "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico"
      },
      {
        id: "27",
        title: "QQ空间",
        url: "https://qzone.qq.com",
        iconUrl: "https://qzonestyle.gtimg.cn/aoi/img/logo/favicon.ico?max_age=31536000"
      },

      // 需要二次认证
      {
        id: "59",
        title: "CodePen",
        url: "https://codepen.io",
        iconUrl:
          "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico"
      }
    ]
  },
  {
    id: "2",
    name: "开发工具",
    bookmarks: [
      {
        id: "1",
        title: "百度",
        url: "https://www.baidu.com",
        iconUrl: "https://www.baidu.com/favicon.ico"
      },

      {
        id: "3",
        title: "Bing",
        url: "https://www.bing.com",
        iconUrl: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-png.png"
      },

      {
        id: "5",
        title: "搜狗搜索",
        url: "https://www.sogou.com",
        iconUrl: "https://www.sogou.com/images/logo/new/favicon.ico?v=4"
      },
      {
        id: "6",
        title: "360搜索",
        url: "https://www.so.com",
        iconUrl: "https://ss.360tres.com/static/121a1737750aa53d.ico"
      },
      {
        id: "9",
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        iconUrl: "https://developer.mozilla.org/favicon.ico"
      },
      {
        id: "10",
        title: "npm",
        url: "https://www.npmjs.com",
        iconUrl: "https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png"
      },
      {
        id: "11",
        title: "Vue.js",
        url: "https://vuejs.org",
        iconUrl: "https://vuejs.org/logo.svg"
      },
      {
        id: "12",
        title: "TypeScript",
        url: "https://www.typescriptlang.org",
        iconUrl: "https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae"
      },
      {
        id: "13",
        title: "React",
        url: "https://reactjs.org",
        iconUrl: "https://legacy.reactjs.org/favicon-32x32.png"
      },
      {
        id: "14",
        title: "Angular",
        url: "https://angular.io",
        iconUrl: "https://angular.dev/assets/icons/favicon-48x48.png"
      },
      {
        id: "15",
        title: "Node.js",
        url: "https://nodejs.org",
        iconUrl: "https://nodejs.org/static/images/favicons/favicon.png"
      },
      {
        id: "16",
        title: "VSCode",
        url: "https://code.visualstudio.com",
        iconUrl: "https://code.visualstudio.com/assets/favicon.ico"
      },
      {
        id: "17",
        title: "GitLab",
        url: "https://gitlab.com",
        iconUrl:
          "https://gitlab.com/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png"
      },
      {
        id: "18",
        title: "Bitbucket",
        url: "https://bitbucket.org",
        iconUrl: "https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon-32x32.png"
      }
    ]
  },
  {
    id: "3",
    name: "社交媒体",
    bookmarks: [
      {
        id: "19",
        title: "微博",
        url: "https://weibo.com",
        iconUrl: "https://weibo.com/favicon.ico"
      },
      {
        id: "20",
        title: "知乎",
        url: "https://www.zhihu.com",
        iconUrl: "https://static.zhihu.com/heifetz/favicon.ico"
      },
      {
        id: "22",
        title: "LinkedIn",
        url: "https://www.linkedin.com",
        iconUrl: "https://www.linkedin.com/favicon.ico"
      },
      {
        id: "26",
        title: "豆瓣",
        url: "https://www.douban.com",
        iconUrl: "https://www.douban.com/favicon.ico"
      }
    ]
  },
  {
    id: "4",
    name: "学习资源",
    bookmarks: [
      {
        id: "29",
        title: "掘金",
        url: "https://juejin.cn",
        iconUrl: "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png"
      },
      {
        id: "30",
        title: "CSDN",
        url: "https://www.csdn.net",
        iconUrl: "https://g.csdnimg.cn/static/logo/favicon32.ico"
      },
      {
        id: "31",
        title: "InfoQ",
        url: "https://www.infoq.cn",
        iconUrl: "https://www.infoq.cn/favicon.ico"
      },
      {
        id: "32",
        title: "Coursera",
        url: "https://www.coursera.org",
        iconUrl: "https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/favicon-v2-32x32.png"
      },
      {
        id: "33",
        title: "LeetCode",
        url: "https://leetcode.com",
        iconUrl: "https://assets.leetcode.com/static_assets/public/icons/favicon-32x32.png"
      },
      {
        id: "34",
        title: "Udemy",
        url: "https://www.udemy.com",
        iconUrl: "https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v8/favicon-32x32.png"
      },
      {
        id: "35",
        title: "edX",
        url: "https://www.edx.org",
        iconUrl: "https://www.edx.org/favicon.ico"
      },
      {
        id: "36",
        title: "慕课网",
        url: "https://www.imooc.com",
        iconUrl: "https://www.imooc.com/favicon.ico"
      },
      {
        id: "37",
        title: "极客时间",
        url: "https://time.geekbang.org",
        iconUrl: "https://static001.geekbang.org/static/time/icon/favicon-32x32.jpg"
      },
      {
        id: "38",
        title: "Codecademy",
        url: "https://www.codecademy.com",
        iconUrl: "https://www.codecademy.com/favicon.ico"
      },
      {
        id: "39",
        title: "FreeCodeCamp",
        url: "https://www.freecodecamp.org",
        iconUrl: "https://www.freecodecamp.org/favicon-32x32.png?v=6cba562cbd10e31af925a976f3db73f7"
      },
      {
        id: "40",
        title: "W3Schools",
        url: "https://www.w3schools.com",
        iconUrl: "https://www.w3schools.com/favicon-32x32.png"
      }
    ]
  },
  {
    id: "5",
    name: "新闻资讯",
    bookmarks: [
      {
        id: "41",
        title: "腾讯新闻",
        url: "https://news.qq.com",
        iconUrl: "https://mat1.gtimg.com/qqcdn/qqindex2021/favicon.ico"
      },
      {
        id: "42",
        title: "网易新闻",
        url: "https://news.163.com",
        iconUrl: "https://news.163.com/favicon.ico"
      },
      {
        id: "44",
        title: "CNN",
        url: "https://www.cnn.com",
        iconUrl: "https://edition.cnn.com/media/sites/cnn/favicon.ico"
      },
      {
        id: "46",
        title: "新浪新闻",
        url: "https://news.sina.com.cn",
        iconUrl: "https://news.sina.com.cn/favicon.ico"
      },
      {
        id: "47",
        title: "环球时报",
        url: "https://www.globaltimes.cn",
        iconUrl: "https://www.globaltimes.cn/favicon.ico"
      }
    ]
  },
  {
    id: "6",
    name: "工具网站",
    bookmarks: [
      {
        id: "51",
        title: "在线PS",
        url: "https://www.photopea.com",
        iconUrl: "https://www.photopea.com/promo/icon512.png"
      },
      {
        id: "52",
        title: "ProcessOn",
        url: "https://www.processon.com",
        iconUrl: "https://www.processon.com/favicon.ico"
      },
      {
        id: "53",
        title: "有道翻译",
        url: "https://fanyi.youdao.com",
        iconUrl: "https://ydlunacommon-cdn.nosdn.127.net/31cf4b56e6c0b3af668aa079de1a898c.png"
      },
      {
        id: "54",
        title: "站长工具",
        url: "https://tool.chinaz.com",
        iconUrl: "https://csstools.chinaz.com/favicon.ico"
      },
      {
        id: "55",
        title: "JSON在线",
        url: "https://www.json.cn",
        iconUrl: "https://static.json.cn/r/img/favicon/favicon.ico"
      },
      {
        id: "56",
        title: "Can I Use",
        url: "https://caniuse.com",
        iconUrl: "https://caniuse.com/img/favicon-128.png"
      },
      {
        id: "57",
        title: "TinyPNG",
        url: "https://tinypng.com",
        iconUrl: "https://tinypng.com/images/favicon.ico"
      },
      {
        id: "58",
        title: "Font Awesome",
        url: "https://fontawesome.com",
        iconUrl: "https://fontawesome.com/favicon.ico"
      },
      {
        id: "60",
        title: "JSFiddle",
        url: "https://jsfiddle.net",
        iconUrl: "https://jsfiddle.net/img/favicon.png"
      }
    ]
  },
  {
    id: "7",
    name: "设计资源",
    bookmarks: [
      {
        id: "61",
        title: "Dribbble",
        url: "https://dribbble.com",
        iconUrl:
          "https://cdn.dribbble.com/assets/favicon-452601365a822699d1d5db718ddf7499d036e8c2f7da69e85160a4d2f83534bd.ico"
      },
      {
        id: "63",
        title: "UI中国",
        url: "https://www.ui.cn",
        iconUrl: "https://www.ui.cn/Public/img/favicon.ico"
      },
      {
        id: "64",
        title: "花瓣网",
        url: "https://huaban.com",
        iconUrl: "https://huaban.com/favicon.ico"
      },
      {
        id: "65",
        title: "站酷",
        url: "https://www.zcool.com.cn",
        iconUrl: "https://static.zcool.cn/git_z/z/site/favicon.ico?version=1618914637608"
      },
      {
        id: "66",
        title: "Figma",
        url: "https://www.figma.com",
        iconUrl: "https://static.figma.com/app/icon/1/favicon.ico"
      },
      {
        id: "67",
        title: "Sketch",
        url: "https://www.sketch.com",
        iconUrl: "https://www.sketch.com/images/metadata/icon-32.png"
      },
      {
        id: "68",
        title: "IconFont",
        url: "https://www.iconfont.cn",
        iconUrl: "https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg"
      },
      {
        id: "69",
        title: "Unsplash",
        url: "https://unsplash.com",
        iconUrl: "https://unsplash.com/favicon-32x32.png"
      }
    ]
  },
  {
    id: "8",
    name: "云服务",
    bookmarks: [
      {
        id: "71",
        title: "阿里云",
        url: "https://www.aliyun.com",
        iconUrl: "https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico"
      },
      {
        id: "72",
        title: "腾讯云",
        url: "https://cloud.tencent.com",
        iconUrl: "https://cloudcache.tencent-cloud.com/qcloud/favicon.ico?t=201902181234"
      },
      {
        id: "73",
        title: "AWS",
        url: "https://aws.amazon.com",
        iconUrl: "https://aws.amazon.com/favicon.ico"
      },
      {
        id: "75",
        title: "Microsoft Azure",
        url: "https://azure.microsoft.com",
        iconUrl: "https://azure.microsoft.com/favicon.ico"
      },
      {
        id: "76",
        title: "华为云",
        url: "https://www.huaweicloud.com",
        iconUrl: "https://www.huaweicloud.com/favicon.ico"
      },
      {
        id: "77",
        title: "百度智能云",
        url: "https://cloud.baidu.com",
        iconUrl: "https://bce.bdstatic.com/img/favicon.ico"
      },
      {
        id: "78",
        title: "七牛云",
        url: "https://www.qiniu.com",
        iconUrl: "https://static.qiniu.com/favicon.ico"
      },
      {
        id: "79",
        title: "又拍云",
        url: "https://www.upyun.com",
        iconUrl: "https://www.upyun.com/static/favicon-32x32.png"
      },
      {
        id: "80",
        title: "Cloudflare",
        url: "https://www.cloudflare.com",
        iconUrl: "https://www.cloudflare.com/favicon.ico"
      }
    ]
  },
  {
    id: "9",
    name: "在线办公",
    bookmarks: [
      {
        id: "81",
        title: "腾讯文档",
        url: "https://docs.qq.com",
        iconUrl: "https://docs.gtimg.com/desktop/favicon2.ico"
      },
      {
        id: "83",
        title: "语雀",
        url: "https://www.yuque.com",
        iconUrl: "https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*vMxOQIh4KBMAAAAAAAAAAAAADvuFAQ/original"
      },
      {
        id: "84",
        title: "石墨文档",
        url: "https://shimo.im",
        iconUrl: "https://as.smgv.cn/from_qbox/favicon.ico"
      },
      {
        id: "86",
        title: "Microsoft Office",
        url: "https://www.office.com",
        iconUrl: "https://res.cdn.office.net/officehub/images/content/images/favicon_copilot-4370172aa6.ico"
      },
      {
        id: "88",
        title: "有道云笔记",
        url: "https://note.youdao.com",
        iconUrl: "https://note.youdao.com/favicon.ico"
      },
      {
        id: "89",
        title: "幕布",
        url: "https://mubu.com",
        iconUrl: "https://mubu.com/favicon.ico"
      },
      {
        id: "90",
        title: "Notion",
        url: "https://www.notion.so",
        iconUrl: "https://www.notion.so/images/favicon.ico"
      }
    ]
  },
  {
    id: "10",
    name: "影音娱乐",
    bookmarks: [
      {
        id: "92",
        title: "优酷",
        url: "https://www.youku.com",
        iconUrl: "https://www.youku.com/favicon.ico"
      },
      {
        id: "93",
        title: "爱奇艺",
        url: "https://www.iqiyi.com",
        iconUrl: "https://www.iqiyi.com/favicon.ico"
      },
      {
        id: "94",
        title: "腾讯视频",
        url: "https://v.qq.com",
        iconUrl: "https://v.qq.com/favicon.ico"
      },
      {
        id: "97",
        title: "Spotify",
        url: "https://www.spotify.com",
        iconUrl: "https://www.scdn.co/i/_global/favicon.ico"
      },
      {
        id: "98",
        title: "网易云音乐",
        url: "https://music.163.com",
        iconUrl: "https://s1.music.126.net/style/favicon.ico?v20180823"
      },
      {
        id: "99",
        title: "QQ音乐",
        url: "https://y.qq.com",
        iconUrl: "https://y.qq.com/favicon.ico?max_age=2592000"
      },
      {
        id: "100",
        title: "虾米音乐",
        url: "https://www.xiami.com",
        iconUrl: "https://www.xiami.com/favicon.ico"
      }
    ]
  }
];
