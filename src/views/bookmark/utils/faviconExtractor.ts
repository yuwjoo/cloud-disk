import axios from "axios";

// 从HTML中提取图标URL
export const extractFaviconFromHtml = async (url: string): Promise<string> => {
  try {
    const response = await axios({
      url: "http://localhost:30003/proxy-server?target=" + url,
      method: "get"
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");

    // 按优先级查找图标
    const selectors = [
      'link[rel="icon"][sizes="32x32"]',
      'link[rel="icon"][sizes="16x16"]',
      'link[rel="shortcut icon"]',
      'link[rel="icon"]'
    ];

    for (const selector of selectors) {
      const link = doc.querySelector(selector);
      if (link?.getAttribute("href")) {
        const iconUrl = link.getAttribute("href")!;
        // 处理相对路径
        return new URL(iconUrl, url).href;
      }
    }

    // 如果没有找到图标，返回默认的favicon.ico路径
    return new URL("/favicon.ico", url).href;
  } catch {
    return new URL("/favicon.ico", url).href;
  }
};

// 加载网站图标
export const loadFavicon = async (url: string): Promise<string> => {
  try {
    const response = await axios({
      url: "http://localhost:30003/proxy-server?target=" + url,
      method: "get",
      responseType: "blob"
    });

    return URL.createObjectURL(response.data);
  } catch {
    return "";
  }
};
