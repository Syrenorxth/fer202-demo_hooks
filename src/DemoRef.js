// ============================================================
// DEMO useRef
// ------------------------------------------------------------
// useRef tạo ra một "cái hộp" có thuộc tính .current để chứa giá trị.
//
// Cú pháp:
//   const myRef = useRef(giaTriBanDau);
//   myRef.current  -> đọc / ghi giá trị
//
// 2 cách dùng phổ biến:
//   1. Truy cập trực tiếp một thẻ HTML (ví dụ: focus vào ô input)
//   2. Lưu một giá trị mà KHÔNG muốn giao diện vẽ lại khi nó thay đổi
//
// Khác với useState:
//   - Đổi state        -> component RE-RENDER
//   - Đổi ref.current  -> component KHÔNG re-render
// ============================================================

import { useState, useRef } from "react";

function DemoRef() {
  // ---------- Ví dụ 1: Truy cập thẻ input ----------
  const inputRef = useRef(null);

  const handleFocus = () => {
    // inputRef.current chính là thẻ <input> thật trên trang
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "lightyellow";
  };

  // ---------- Ví dụ 2: So sánh ref và state ----------
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const increaseRef = () => {
    refCount.current = refCount.current + 1;
    console.log("refCount.current =", refCount.current);
    // Giao diện KHÔNG cập nhật vì đổi ref không làm re-render
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useRef</h2>

      <h3>1. Focus vào ô input</h3>
      <input ref={inputRef} type="text" placeholder="Bấm nút để focus vào đây" />
      <button onClick={handleFocus}>Focus</button>

      <h3>2. So sánh useRef và useState</h3>
      <p>stateCount (useState): {stateCount}</p>
      <p>refCount (useRef): {refCount.current}</p>
      <button onClick={increaseRef}>Tăng refCount</button>
      <button onClick={() => setStateCount(stateCount + 1)}>
        Tăng stateCount
      </button>

      <p style={{ color: "gray" }}>
        👉 Bấm "Tăng refCount" vài lần: số trên màn hình KHÔNG đổi (nhưng
        Console vẫn thấy giá trị tăng).
        <br />
        👉 Sau đó bấm "Tăng stateCount": component re-render, lúc này refCount
        mới hiện đúng giá trị mới.
      </p>
    </div>
  );
}

export default DemoRef;
