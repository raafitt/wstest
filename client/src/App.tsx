// App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initWebSocket } from "./service/ws";
import { ParamPage } from "./pages/ParamPage";
import {param1Store, param2Store} from "./store/ParamStore"

function App() {
  useEffect(() => {
    initWebSocket((msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "data") {
        const param = data.param;
        if (param === "param1") {
          param1Store.updateValue(data);
        } else if (param === "param2") {
          param2Store.updateValue(data);
        }
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/param1" element={<ParamPage store={param1Store} param="param1" />} />
        <Route path="/param2" element={<ParamPage store={param2Store} param="param2" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
