// ============================================================
// THEME CONTEXT (Dark / Light Mode)
// ------------------------------------------------------------
// 3 bước dùng context:
//   1. Tạo context     : createContext()
//   2. Bọc Provider    : <ThemeProvider> ... </ThemeProvider> (trong App.js)
//   3. Lấy ra dùng     : const { theme, colors, toggleTheme } = useContext(ThemeContext);
// ============================================================

import { createContext } from "react";
import useLocalStorage from "../hook/useLocalStorage";

// Bảng màu cho từng chế độ
export const themes = {
  light: {
    background: "#f4f4f4",
    color: "#000000",
    itemBackground: "#ffffff",
    border: "#cccccc",
  },
  dark: {
    background: "#222222",
    color: "#ffffff",
    itemBackground: "#333333",
    border: "#555555",
  },
};

// ---------- Bước 1: Tạo context ----------
export const ThemeContext = createContext();

// ---------- Bước 2: Component Provider giữ state theme ----------
export function ThemeProvider({ children }) {
  // Tái sử dụng custom hook -> theme được nhớ sau khi F5
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
