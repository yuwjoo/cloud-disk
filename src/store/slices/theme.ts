import { createSlice } from "@reduxjs/toolkit";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
}); // 字体

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
}); // 浅色主题

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
}); // 深色主题

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: ,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = lightTheme;
    },
  },
});

export default themeSlice.reducer;
