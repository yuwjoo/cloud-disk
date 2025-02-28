import { toFilePath } from "./common";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

/**
 * @description: 初始化函数自动导入功能
 */
export function initAutoImport() {
  return AutoImport({
    // 配置需要自动导入的库或模块
    imports: ["vue"],
    // 配置资源解析器
    resolvers: [
      ElementPlusResolver({
        importStyle: "sass"
      }),
      IconsResolver({
        prefix: "Icon"
      })
    ],
    // 类型声明文件路径
    dts: toFilePath("./autoImports.d.ts")
  });
}

/**
 * @description: 初始化组件自动导入功能
 */
export function initComponents() {
  return Components({
    // 组件根目录
    dirs: [toFilePath("./src/components")],
    // 需要自动注册为组件的文件扩展
    extensions: ["vue", "tsx"],
    // 引入第三方解析器
    resolvers: [
      ElementPlusResolver({
        importStyle: "sass"
      }),
      IconsResolver({
        prefix: "i",
        enabledCollections: ["ep", "tabler"],
        customCollections: ["icons"]
      })
    ],
    // 类型声明文件路径
    dts: toFilePath("./components.d.ts")
  });
}

/**
 * @description: 初始化图标自动导入功能
 */
export function initIcons() {
  return Icons({
    // 自定义图标集
    customCollections: {
      icons: FileSystemIconLoader(toFilePath("./src/assets/icons"), (svg) => {
        return svg.replace(/^<svg /, '<svg fill="currentColor" width="1em" height="1em" ');
      })
    },
    // 自定义图标属性
    iconCustomizer(_collection, _icon, props) {
      props.width = "1em";
      props.height = "1em";
    },
    // 当前使用未下载过的图标集时自动安装到本地
    autoInstall: true
  });
}
