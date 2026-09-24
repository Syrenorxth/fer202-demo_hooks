// ============================================================
// DEMO useContext
// ------------------------------------------------------------
// Vấn đề: muốn truyền dữ liệu từ component cha xuống component cháu, chắt...
// thì phải truyền props qua TỪNG tầng (gọi là "props drilling") -> rất rườm rà.
//
// Context giống như một "kho chung": component nào cần thì lấy ra dùng,
// không cần truyền props qua từng tầng.
//
// 3 bước:
//   1. Tạo context     : const MyContext = createContext(giaTriMacDinh);
//   2. Bọc Provider    : <MyContext.Provider value={duLieu}> ... </MyContext.Provider>
//   3. Lấy ra dùng     : const duLieu = useContext(MyContext);
// ============================================================

import { useState, useContext, createContext } from "react";

// ---------- Bước 1: Tạo context ----------
const ThemeContext = createContext();

// ------------------------------------------------------------
// Component cháu: lấy dữ liệu trực tiếp từ context
// (KHÔNG nhận props nào cả)
// ------------------------------------------------------------
function ThemeButton() {
  // ---------- Bước 3: Lấy dữ liệu ra dùng ----------
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Đổi sang {theme === "light" ? "tối" : "sáng"}
    </button>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);

  const style = {
    padding: 16,
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
  };

  return (
    <div style={style}>
      <p>Giao diện hiện tại: {theme}</p>
      <ThemeButton />
    </div>
  );
}

// ------------------------------------------------------------
// Component ở giữa: KHÔNG cần biết gì về theme,
// không phải nhận rồi truyền tiếp props
// ------------------------------------------------------------
function Layout() {
  return (
    <div>
      <p>(Đây là component Layout ở giữa, không nhận props theme)</p>
      <Content />
    </div>
  );
}

// ------------------------------------------------------------
// Component cha: giữ state và cung cấp cho context
// ------------------------------------------------------------
function DemoContext() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useContext</h2>

      {/* ---------- Bước 2: Bọc Provider và truyền dữ liệu vào value ---------- */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Layout />
      </ThemeContext.Provider>

      <p style={{ color: "gray" }}>
        👉 Cấu trúc: DemoContext → Layout → Content → ThemeButton.
        <br />
        👉 Content và ThemeButton lấy được theme mà Layout không phải truyền
        props.
      </p>
    </div>
  );
}

export default DemoContext;
