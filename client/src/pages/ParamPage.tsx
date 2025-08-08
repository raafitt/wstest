import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ParamStore } from "../store/ParamStore";
import { ParamControls } from "../components/Control/ParamControls";
import { ParamTable } from "../components/Table/ParamTable";
import { ParamChart } from "../components/Chart/ParamChart";
import styles from "./ParamPage.module.css";
import { TabPanel } from "../components/TabPanel/TabPanel";

interface Props {
  param: string;
  store: ParamStore;
}

export const ParamPage = observer(({ param, store }: Props) => {

  return (
    <div className={styles.dashboard}>
      <TabPanel />
      <div className={styles.topSection}>
        <div className={styles.controlsWrapper}>
          <div className={styles.currentValueBox}>
            <h2>Текущее значение {param}</h2>
            <p>{store.currentValue.toFixed(2)}</p>
          </div>
          <ParamControls
            store={store}
            param={param} />
        </div>
        <div className={styles.tableWrapper}>
          <ParamTable store={store} />
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <ParamChart store={store} />
      </div>
    </div>
  );

});
