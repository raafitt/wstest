// App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { initWebSocket, sendMessage } from "./service/ws";
import { ParamPage } from "./pages/ParamPage";
import { observer } from "mobx-react-lite";
import { storeManager } from "./store/storeManager";
import { TabPanel } from "./components/TabPanel/TabPanel";




const App = observer(() => {

  useEffect(() => {
    initWebSocket((msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "data") {
        //console.log(data)
        storeManager.updateParamData(data);
      }
    });
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TabPanel />} />
        <Route path="/:param" element={<ParamPage />} />
        <Route path="/home" element={<TabPanel />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
