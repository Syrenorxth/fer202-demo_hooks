// ============================================================
// TodoForm: ô nhập + nút "Thêm"
// ------------------------------------------------------------
//   - useState : quản lý nội dung ô input
//   - useRef   : focus vào ô input (lúc mở trang và sau khi thêm)
//   - memo     : chỉ re-render khi props (onAdd) thay đổi.
//                onAdd được App bọc bằng useCallback nên giữ nguyên
//                -> tick/xoá công việc KHÔNG làm TodoForm render lại.
//
// => Mở Console (F12) để xem khi nào TodoForm được render.
// ============================================================

import { useState, useRef, useEffect, useContext, memo } from "react";
import { ThemeContext } from "../context/ThemeContext";

const TodoForm = memo(function TodoForm({ onAdd }) {
  console.log("🔄 TodoForm được render");

  const { colors } = useContext(ThemeContext);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // Focus vào ô input ngay khi component xuất hiện
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // không cho form tải lại trang
    if (text.trim() === "") return; // không cho thêm chuỗi rỗng
    onAdd(text.trim());
    setText(""); // xoá ô input sau khi thêm
    inputRef.current.focus(); // focus lại để nhập tiếp
  };

  return (
    <section style={{ borderTop: `1px solid ${colors.border}`, padding: 16 }}>
      <h2>Thêm công việc</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập công việc..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: 300,
            padding: 8,
            marginRight: 16,
            fontSize: 16,
            backgroundColor: colors.itemBackground,
            color: colors.color,
          }}
        />
        <button type="submit" style={{ padding: 8, fontSize: 16 }}>
          Thêm
        </button>
      </form>
    </section>
  );
});

export default TodoForm;
