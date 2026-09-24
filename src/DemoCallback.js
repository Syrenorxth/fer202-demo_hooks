// ============================================================
// DEMO useCallback
// ------------------------------------------------------------
// Vấn đề: mỗi lần component re-render, các hàm khai báo bên trong
// (ví dụ: const handleClick = () => {...}) sẽ bị TẠO MỚI.
// Nếu truyền hàm đó xuống component con qua props, component con sẽ
// nghĩ rằng "props đã thay đổi" -> con cũng bị re-render theo.
//
// useCallback giúp "ghi nhớ" CHÍNH HÀM đó (không tạo mới).
// Chỉ tạo hàm mới khi các giá trị trong mảng phụ thuộc [ ] thay đổi.
//
// Cú pháp:
//   const hamCuaToi = useCallback(() => {
//     // làm gì đó
//   }, [giaTriPhuThuoc]);
//
// So sánh nhanh:
//   - useMemo     : ghi nhớ KẾT QUẢ của hàm (một giá trị)
//   - useCallback : ghi nhớ CHÍNH HÀM
//
// Lưu ý: useCallback thường đi kèm với React.memo ở component con.
//   React.memo = "chỉ re-render component con khi props thay đổi".
//
// => Mở Console (F12) để xem khi nào component con được render.
// ============================================================

import { useState, useCallback, memo } from "react";

// ------------------------------------------------------------
// Component con: được bọc bằng memo
// -> chỉ re-render khi props (onIncrease) thay đổi
// ------------------------------------------------------------
const ChildButton = memo(function ChildButton({ onIncrease }) {
  console.log("🔄 ChildButton được render");
  return <button onClick={onIncrease}>Tăng count (nút ở component con)</button>;
});

// ------------------------------------------------------------
// Component cha
// ------------------------------------------------------------
function DemoCallback() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ KHÔNG dùng useCallback:
  //   const handleIncrease = () => setCount(count + 1);
  //   -> Mỗi lần gõ vào ô input, cha re-render, hàm bị tạo mới,
  //      ChildButton cũng bị render lại (xem Console).

  // ✅ CÓ dùng useCallback:
  //   Hàm được giữ nguyên giữa các lần render,
  //   nên gõ vào ô input -> ChildButton KHÔNG bị render lại.
  const handleIncrease = useCallback(() => {
    // Dùng dạng setCount(prev => prev + 1) để luôn lấy giá trị mới nhất,
    // nhờ vậy mảng phụ thuộc có thể để rỗng [].
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useCallback</h2>

      <p>count: {count}</p>
      <ChildButton onIncrease={handleIncrease} />

      <h3>Ô nhập (state không liên quan đến component con)</h3>
      <input
        type="text"
        placeholder="Gõ gì đó..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Bạn đã gõ: {text}</p>

      <p style={{ color: "gray" }}>
        👉 Gõ vào ô input: Console KHÔNG in "ChildButton được render" vì hàm
        handleIncrease được useCallback giữ nguyên.
        <br />
        👉 Thử xoá useCallback (dùng hàm thường) rồi gõ lại để thấy sự khác
        biệt.
      </p>
    </div>
  );
}

export default DemoCallback;
