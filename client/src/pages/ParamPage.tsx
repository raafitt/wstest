import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ParamControls } from "../components/Control/ParamControls";
import { ParamTable } from "../components/Table/ParamTable";
import { ParamChart } from "../components/Chart/ParamChart";
import styles from "./ParamPage.module.css";
import { TabPanel } from "../components/TabPanel/TabPanel";
import { useNavigate, useParams } from "react-router-dom";
import { storeManager } from "../store/storeManager";



export const ParamPage = observer(() => {

  const { param } = useParams<{ param: string }>();
  const navigate = useNavigate();

  const store = param ? storeManager.getStore(param) : undefined;

  useEffect(() => {
    if (!store) {
      navigate("/home", { replace: true });
    } else {
      storeManager.setActiveParam(param!);
    }
  }, [store, param, navigate]);

  if (!store) return null; // пока редирект не сработал

  return (
    <div className={styles.dashboard}>
      <TabPanel />
      <div className={styles.topSection}>
        <div className={styles.controlsWrapper}>
          <div className={styles.currentValueBox}>
            <h2>Текущее значение {param}</h2>
            <p>{store.currentValue.toFixed(2)}</p>
          </div>
          <ParamControls store={store} param={param!} />
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
