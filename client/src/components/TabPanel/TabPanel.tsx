import { observer } from "mobx-react-lite";
import styles from "./TabPanel.module.css";
import { sendMessage } from "../../service/ws";
import { Link } from "react-router-dom";
import { storeManager } from "../../store/storeManager";
import { useNavigate } from "react-router-dom";

export const TabPanel = observer(() => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {storeManager.allStores.map(store => {
        const isActive = storeManager.activeParam === store.param;
  
        return (
          <div
            key={store.param}
            className={styles.tabButtonWrapper}
          >
            <Link to={`/${store.param}`} className={styles.tabLink}>
              <button
                className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
                onClick={() => storeManager.setActiveParam(store.param)}
              >
                {store.param}
              </button>
            </Link>
            <span
              className={styles.removeButton}
              onClick={() => {
                storeManager.removeStore(store.param, navigate);
                sendMessage({ type: "stop", param: store.param });
                console.log(storeManager.allStores)
                // сбросываем активную вкладку если удаляем ее  
                if (storeManager.activeParam === store.param) {
                  storeManager.setActiveParam(null);
                }
              }}
            >
              ❌
            </span>
          </div>
        );
      })}
      <span
        className={styles.removeButton}
        onClick={() => storeManager.addStore()}
      >
        ➕
      </span>
    </div>
  );
});
