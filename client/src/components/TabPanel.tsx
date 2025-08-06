import { Tabs, Tab} from "./ui/tabs";

interface TabPanelProps {
  currentParam: string;
  setParam: (p: 'param1' | 'param2') => void;
  paramNames: string[];
}
const tabList: Tab[] = [
    { label: "Param 1", value: "param1" },
    { label: "Param 2", value: "param2" },
  ];
export const TabPanel = ({ currentParam, setParam, paramNames }: TabPanelProps) => (
  <div className="p-4">
      <Tabs tabs={tabList} selected={currentParam} onChange={setParam} />

      <div className="mt-4">
        {currentParam === "param1" && <div>Контент для Param 1</div>}
        {currentParam === "param2" && <div>Контент для Param 2</div>}
      </div>
    </div>
  );

