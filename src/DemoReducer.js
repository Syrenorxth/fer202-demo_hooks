// ============================================================
// DEMO useReducer
// ------------------------------------------------------------
// useReducer cũng dùng để quản lý state giống useState,
// nhưng phù hợp khi state có NHIỀU CÁCH THAY ĐỔI khác nhau.
// Mọi logic thay đổi state được gom vào 1 hàm tên là "reducer".
//
// Cú pháp:
//   const [state, dispatch] = useReducer(reducer, giaTriBanDau);
//   - state    : giá trị hiện tại
//   - dispatch : hàm dùng để "gửi yêu cầu" (action) thay đổi state
//   - reducer  : hàm nhận (state cũ, action) -> trả về state mới
//
// Action thường là một object: { type: "TEN_HANH_DONG", payload: duLieuKemTheo }
// ============================================================

import { useReducer } from "react";

// ---------- Giá trị ban đầu ----------
const initialState = 0;

// ---------- Hàm reducer ----------
// Nhận state cũ + action, dựa vào action.type để trả về state mới
function counterReducer(state, action) {
  switch (action.type) {
    case "TANG":
      return state + 1;
    case "GIAM":
      return state - 1;
    case "TANG_THEO_SO":
      return state + action.payload; // payload là số muốn cộng thêm
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function DemoReducer() {
  const [count, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
      <h2>Demo useReducer</h2>

      <p>count: {count}</p>

      {/* Mỗi nút chỉ việc "gửi" action, còn xử lý thế nào là việc của reducer */}
      <button onClick={() => dispatch({ type: "TANG" })}>+1</button>
      <button onClick={() => dispatch({ type: "GIAM" })}>-1</button>
      <button onClick={() => dispatch({ type: "TANG_THEO_SO", payload: 5 })}>
        +5
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      <p style={{ color: "gray" }}>
        👉 So với useState: thay vì viết setCount(count + 1) rải rác khắp nơi,
        mọi cách thay đổi count đều nằm gọn trong hàm counterReducer.
      </p>
    </div>
  );
}

export default DemoReducer;
