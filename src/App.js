import { useState } from "react";
import "./App.css";
import DemoState from "./Demostate";
import DemoEffect from "./DemoEffect";
import DemoRef from "./DemoRef";
import DemoContext from "./DemoContext";
import DemoReducer from "./DemoReducer";
import DemoMemo from "./DemoMemo";
import DemoCallback from "./DemoCallback";
import DemoCustomHook from "./DemoCustomHook";

// Danh sách các demo: tên nút + component tương ứng
const demos = [
  { name: "useState", component: <DemoState /> },
  { name: "useEffect", component: <DemoEffect /> },
  { name: "useRef", component: <DemoRef /> },
  { name: "useContext", component: <DemoContext /> },
  { name: "useReducer", component: <DemoReducer /> },
  { name: "useMemo", component: <DemoMemo /> },
  { name: "useCallback", component: <DemoCallback /> },
  { name: "Custom Hook", component: <DemoCustomHook /> },
];

function App() {
  // Lưu vị trí demo đang được chọn
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ textAlign: "left" }}>
      <h1 style={{ marginLeft: 16 }}>Demo React Hooks</h1>

      {/* Các nút chọn demo */}
      <div style={{ marginLeft: 16 }}>
        {demos.map((demo, index) => (
          <button
            key={demo.name}
            onClick={() => setSelected(index)}
            style={{
              marginRight: 8,
              marginBottom: 8,
              fontWeight: selected === index ? "bold" : "normal",
            }}
          >
            {demo.name}
          </button>
        ))}
      </div>

      {/* Hiển thị demo đang chọn */}
      {demos[selected].component}
    </div>
  );
}

export default App;
