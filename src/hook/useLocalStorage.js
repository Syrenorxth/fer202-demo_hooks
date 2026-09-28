// ============================================================
// CUSTOM HOOK: useLocalStorage
// ------------------------------------------------------------
// Dùng giống useState, nhưng giá trị được LƯU vào localStorage
// -> F5 (tải lại trang) dữ liệu vẫn còn.
//
// Cú pháp:
//   const [giaTri, setGiaTri] = useLocalStorage("tenKey", giaTriBanDau);
//
// Bên trong dùng:
//   - useState  : giữ giá trị hiện tại
//   - useEffect : mỗi khi giá trị đổi -> ghi vào localStorage
//
// Viết thành hook riêng để TÁI SỬ DỤNG: ở app này dùng cho cả
// danh sách công việc (key "todos") và giao diện sáng/tối (key "theme").
// ============================================================

import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Truyền 1 HÀM vào useState -> chỉ đọc localStorage 1 lần lúc đầu
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    // Chưa có dữ liệu thì dùng giá trị ban đầu
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // Mỗi khi value (hoặc key) thay đổi -> lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
