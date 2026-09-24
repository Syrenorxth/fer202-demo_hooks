// ============================================================
// DEMO useMemo
// ------------------------------------------------------------
// Vấn đề: mỗi lần component re-render, TẤT CẢ code trong hàm đều chạy lại.
// Nếu có một phép tính nặng (tính toán lâu), nó cũng bị chạy lại
// dù dữ liệu liên quan không hề thay đổi -> lãng phí.
//
// useMemo giúp "ghi nhớ" KẾT QUẢ của phép tính.
// Chỉ tính lại khi các giá trị trong mảng phụ thuộc [ ] thay đổi.
//
// Cú pháp:
//   const ketQua = useMemo(() => {
//     return phepTinh;
//   }, [giaTriPhuThuoc]);
//
// => Mở Console (F12) để xem khi nào hàm tính toán được chạy.
// ============================================================

import { useState, useMemo } from "react";

// Hàm tính toán "nặng": tính tổng từ 1 đến n
// (cố tình dùng vòng lặp lớn cho chậm để thấy sự khác biệt)
function tinhTong(n) {
  console.log("Đang tính tổng từ 1 đến", n, "...");
  let tong = 0;
  for (let i = 1; i <= n; i++) {
    tong += i;
  }
  // vòng lặp giả cho chậm
  for (let i = 0; i < 100000000; i++) {}
  return tong;
}

function DemoMemo() {
  const [number, setNumber] = useState(10);
  const [count, setCount] = useState(0);

  // ❌ KHÔNG dùng useMemo:
  //   const tong = tinhTong(number);
  //   -> Bấm nút "Tăng count" cũng bị tính lại -> giao diện bị lag.

  // ✅ CÓ dùng useMemo:
  //   Chỉ tính lại khi "number" thay đổi.
  //   Bấm "Tăng count" -> KHÔNG tính lại -> nhanh.
  const tong = useMemo(() => {
    return tinhTong(number);
  }, [number]);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useMemo</h2>

      <h3>1. Phép tính nặng (phụ thuộc vào number)</h3>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>
        Tổng từ 1 đến {number} = <b>{tong}</b>
      </p>

      <h3>2. State khác không liên quan (count)</h3>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng count</button>

      <p style={{ color: "gray" }}>
        👉 Thử bấm "Tăng count": giao diện cập nhật ngay, Console KHÔNG in ra
        "Đang tính tổng..." vì number không đổi.
        <br />
        👉 Thử đổi số trong ô input: Console in ra "Đang tính tổng..." vì number
        thay đổi.
      </p>
    </div>
  );
}

export default DemoMemo;
