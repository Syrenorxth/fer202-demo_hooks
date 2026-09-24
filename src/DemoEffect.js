// ============================================================
// DEMO useEffect
// ------------------------------------------------------------
// useEffect dùng để chạy một đoạn code SAU KHI component hiển thị ra màn hình.
// Thường dùng để: gọi API lấy dữ liệu, hẹn giờ (setInterval), đổi tiêu đề trang...
//
// Cú pháp:
//   useEffect(() => {
//     // code muốn chạy
//
//     return () => {
//       // (không bắt buộc) code "dọn dẹp", chạy khi component bị gỡ bỏ
//     };
//   }, [giaTriPhuThuoc]);
//
// Mảng phụ thuộc [ ] quyết định KHI NÀO effect chạy:
//   - Không có mảng       : chạy sau MỖI lần render (ít dùng)
//   - Mảng rỗng []        : chỉ chạy 1 LẦN khi component xuất hiện
//   - [a, b]              : chạy lần đầu + mỗi khi a hoặc b thay đổi
// ============================================================

import { useState, useEffect } from "react";

// ------------------------------------------------------------
// Ví dụ 1: Mảng phụ thuộc [count] -> đổi tiêu đề tab mỗi khi count đổi
// ------------------------------------------------------------
function ExampleTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect chạy vì count =", count);
    document.title = `Bạn đã bấm ${count} lần`;
  }, [count]);

  return (
    <div>
      <h3>1. Đổi tiêu đề tab trình duyệt (phụ thuộc [count])</h3>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
      <p style={{ color: "gray" }}>👉 Nhìn lên tiêu đề tab trình duyệt.</p>
    </div>
  );
}

// ------------------------------------------------------------
// Ví dụ 2: Mảng rỗng [] -> gọi API 1 lần khi component xuất hiện
// ------------------------------------------------------------
function ExampleFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Gọi API lấy danh sách user...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Lỗi:", err);
        setLoading(false);
      });
  }, []); // [] -> chỉ chạy 1 lần

  return (
    <div>
      <h3>2. Gọi API khi mở trang (mảng rỗng [])</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ------------------------------------------------------------
// Ví dụ 3: Cleanup (dọn dẹp) -> đồng hồ dùng setInterval
// ------------------------------------------------------------
function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("⏰ Bắt đầu hẹn giờ");
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Hàm dọn dẹp: chạy khi Clock bị ẩn đi (gỡ khỏi màn hình)
    // Nếu không clearInterval, hẹn giờ vẫn chạy ngầm -> tốn tài nguyên
    return () => {
      console.log("🧹 Dọn dẹp: huỷ hẹn giờ");
      clearInterval(timer);
    };
  }, []);

  return <p>Bây giờ là: {time}</p>;
}

function ExampleCleanup() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div>
      <h3>3. Hàm dọn dẹp (cleanup)</h3>
      <button onClick={() => setShowClock(!showClock)}>
        {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
      </button>
      {showClock && <Clock />}
      <p style={{ color: "gray" }}>
        👉 Bấm "Ẩn đồng hồ" rồi xem Console: hàm dọn dẹp được gọi.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
function DemoEffect() {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useEffect</h2>
      <ExampleTitle />
      <ExampleCleanup />
      <ExampleFetch />
    </div>
  );
}

export default DemoEffect;
