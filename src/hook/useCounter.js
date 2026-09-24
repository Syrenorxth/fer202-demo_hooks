// ============================================================
// CUSTOM HOOK: useCounter
// ------------------------------------------------------------
// Custom hook = hàm do mình tự viết, bên trong dùng các hook có sẵn
// (useState, useEffect...). Giúp tái sử dụng logic ở nhiều component.
//
// Quy tắc: tên custom hook PHẢI bắt đầu bằng chữ "use".
// ============================================================

import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  // Trả ra những thứ component bên ngoài cần dùng
  return { count, increase, decrease, reset };
}

export default useCounter;
