import { useEffect, useState } from "react";
import { TabPanel } from "./components/TabPanel";
import { ParamPage } from "./pages/ParamPage";
import { ParamStore } from "./store/ParamStore";



const stores = {
  "param1": new ParamStore(),
  "param2": new ParamStore(),
};

export default function App() {

  const [currentParam, setCurrentParam] = useState<keyof typeof stores>("param1");

  return (
    <div>
      <TabPanel currentParam={currentParam} setParam={setCurrentParam} paramNames={Object.keys(stores)} />
      <ParamPage param={currentParam} store={stores[currentParam]} />
    </div>
  );
}
