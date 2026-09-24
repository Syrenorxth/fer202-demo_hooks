// ============================================================
// DEMO Custom Hook (hook tự viết)
// ------------------------------------------------------------
// Hook useCounter được viết ở file: src/hook/useCounter.js
// Ở đây ta dùng nó 2 lần -> 2 bộ đếm hoạt động ĐỘC LẬP với nhau,
// mà không phải viết lại code useState + các hàm tăng/giảm.
// ============================================================

import useCounter from "./hook/useCounter";

function DemoCustomHook() {
  // Mỗi lần gọi useCounter sẽ tạo ra một state riêng
  const counterA = useCounter(0);
  const counterB = useCounter(100);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo Custom Hook (useCounter)</h2>

      <h3>Bộ đếm A (bắt đầu từ 0)</h3>
      <p>count: {counterA.count}</p>
      <button onClick={counterA.increase}>Tăng</button>
      <button onClick={counterA.decrease}>Giảm</button>
      <button onClick={counterA.reset}>Reset</button>

      <h3>Bộ đếm B (bắt đầu từ 100)</h3>
      <p>count: {counterB.count}</p>
      <button onClick={counterB.increase}>Tăng</button>
      <button onClick={counterB.decrease}>Giảm</button>
      <button onClick={counterB.reset}>Reset</button>

      <p style={{ color: "gray" }}>
        👉 Bấm nút ở bộ đếm A không ảnh hưởng bộ đếm B.
      </p>
    </div>
  );
}

export default DemoCustomHook;
