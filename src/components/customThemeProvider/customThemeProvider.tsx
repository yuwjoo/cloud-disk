/*
 * @FileName: 自定义主题控制组件
 * @FilePath: \cloud-disk\src\components\customThemeProvider\customThemeProvider.tsx
 * @Date: 2024-04-18 16:04:30
 * @LastEditTime: 2024-04-18 16:41:54
 * @Description:
 */
"use client";

import { lightTheme, darkTheme } from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";

export default function CustomThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
