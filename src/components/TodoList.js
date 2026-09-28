// ============================================================
// TodoList: đếm số việc chưa hoàn thành + hiển thị danh sách
// ------------------------------------------------------------
//   - useMemo : chỉ đếm lại khi mảng todos thay đổi
//               (đổi Dark/Light Mode thì KHÔNG đếm lại).
//
// => Mở Console (F12) để xem khi nào việc đếm được chạy.
// ============================================================

import { useMemo, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
  const { colors } = useContext(ThemeContext);

  const remaining = useMemo(() => {
    console.log("🧮 Đếm số công việc chưa hoàn thành...");
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return (
    <section style={{ borderTop: `1px solid ${colors.border}` }}>
      <h2>Chưa hoàn thành: {remaining}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
