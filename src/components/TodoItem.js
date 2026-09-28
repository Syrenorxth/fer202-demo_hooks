// ============================================================
// TodoItem: hiển thị 1 công việc
//   - Bấm vào chữ  -> đánh dấu hoàn thành / chưa hoàn thành
//   - Bấm "Xóa"    -> xoá công việc
// ============================================================

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function TodoItem({ todo, onToggle, onDelete }) {
  const { colors } = useContext(ThemeContext);

  return (
    <li
      style={{
        backgroundColor: colors.itemBackground,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        padding: 16,
        marginBottom: 16,
        fontSize: 18,
      }}
    >
      <span
        onClick={() => onToggle(todo.id)}
        title="Bấm để đánh dấu hoàn thành"
        style={{
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.5 : 1,
        }}
      >
        {todo.text}
      </span>{" "}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 8 }}>
        Xóa
      </button>
    </li>
  );
}

export default TodoItem;
