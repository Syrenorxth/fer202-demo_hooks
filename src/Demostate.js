// ============================================================
// DEMO useState
// ------------------------------------------------------------
// useState dùng để tạo "state" (dữ liệu có thể thay đổi) trong component.
// Mỗi khi state thay đổi -> React sẽ vẽ lại (re-render) giao diện.
//
// Cú pháp:
//   const [giaTri, setGiaTri] = useState(giaTriBanDau);
//   - giaTri    : giá trị hiện tại của state
//   - setGiaTri : hàm dùng để thay đổi state
//   - giaTriBanDau : giá trị lúc mới chạy
// ============================================================

import { useState } from "react";

function DemoState() {
  // Ví dụ 1: state kiểu số (bộ đếm)
  const [count, setCount] = useState(0);

  // Ví dụ 2: state kiểu chuỗi (ô nhập tên)
  const [name, setName] = useState("");

  // Ví dụ 3: state kiểu true/false (ẩn / hiện)
  const [show, setShow] = useState(true);

  // Ví dụ 4: state kiểu mảng (danh sách công việc)
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = () => {
    if (todo.trim() === "") return; // không cho thêm chuỗi rỗng
    // Không sửa trực tiếp mảng cũ, mà tạo mảng mới = mảng cũ + phần tử mới
    setTodoList([...todoList, todo]);
    setTodo(""); // xoá ô input sau khi thêm
  };

  const handleDeleteTodo = (index) => {
    // filter tạo ra mảng mới, bỏ đi phần tử ở vị trí index
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useState</h2>

      {/* ---------- Ví dụ 1: Bộ đếm ---------- */}
      <h3>1. Bộ đếm</h3>
      <p>Giá trị count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
      <button onClick={() => setCount(count - 1)}>Giảm</button>
      <button onClick={() => setCount(0)}>Reset</button>

      {/* ---------- Ví dụ 2: Ô nhập tên ---------- */}
      <h3>2. Nhập tên</h3>
      <input
        type="text"
        placeholder="Nhập tên của bạn"
        value={name}
        onChange={(e) => setName(e.target.value)} // gõ phím -> cập nhật state
      />
      <p>Xin chào: {name}</p>

      {/* ---------- Ví dụ 3: Ẩn / hiện ---------- */}
      <h3>3. Ẩn / hiện nội dung</h3>
      <button onClick={() => setShow(!show)}>{show ? "Ẩn" : "Hiện"}</button>
      {show && <p>Đoạn văn bản này có thể ẩn hoặc hiện.</p>}

      {/* ---------- Ví dụ 4: Danh sách ---------- */}
      <h3>4. Danh sách công việc</h3>
      <input
        type="text"
        placeholder="Nhập công việc"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Thêm</button>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => handleDeleteTodo(index)}>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DemoState;
