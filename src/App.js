// ============================================================
// TODO APP - tổng hợp các Hook phổ biến
// ------------------------------------------------------------
//   - useState       : ô input (TodoForm), theme (qua useLocalStorage)
//   - useEffect      : lưu dữ liệu vào localStorage (trong useLocalStorage + ở dưới)
//   - useRef         : focus vào ô input (TodoForm)
//   - useMemo        : đếm số công việc chưa hoàn thành (TodoList)
//   - useCallback    : tối ưu hàm thêm công việc (addTodo ở dưới)
//   - useContext     : Dark / Light Mode (context/ThemeContext.js)
//   - useReducer     : thay thế useState để quản lý danh sách todo
//   - useLocalStorage: custom hook tái sử dụng logic lưu dữ liệu
// ============================================================

import { useReducer, useEffect, useCallback, useContext } from "react";
import "./App.css";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import useLocalStorage from "./hook/useLocalStorage";
import initialTodos from "./datas/todos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// ---------- Reducer: gom mọi cách thay đổi danh sách todo ----------
function todoReducer(todos, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...todos,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE":
      return todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE":
      return todos.filter((todo) => todo.id !== action.payload);
    default:
      return todos;
  }
}

function TodoApp() {
  const { theme, colors, toggleTheme } = useContext(ThemeContext);

  // Đọc danh sách đã lưu (lần đầu chưa có thì dùng initialTodos)
  const [savedTodos, setSavedTodos] = useLocalStorage("todos", initialTodos);

  // useReducer thay cho useState: giá trị ban đầu lấy từ localStorage
  const [todos, dispatch] = useReducer(todoReducer, savedTodos);

  // Mỗi khi todos thay đổi -> đưa vào useLocalStorage để lưu lại
  useEffect(() => {
    setSavedTodos(todos);
  }, [todos, setSavedTodos]);

  // useCallback: giữ nguyên hàm addTodo giữa các lần render
  // (dispatch không bao giờ đổi nên mảng phụ thuộc để rỗng)
  const addTodo = useCallback((text) => {
    dispatch({ type: "ADD", payload: text });
  }, []);

  const toggleTodo = (id) => dispatch({ type: "TOGGLE", payload: id });
  const deleteTodo = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        color: colors.color,
        paddingBottom: 16,
      }}
    >
      <header style={{ padding: 16 }}>
        <h1 style={{ fontSize: 48, margin: "0 0 16px" }}>React Hooks Demo</h1>
        <button onClick={toggleTheme} style={{ padding: "4px 16px", fontSize: 16 }}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

// Bọc Provider ở ngoài cùng để mọi component bên trong dùng được ThemeContext
function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;
