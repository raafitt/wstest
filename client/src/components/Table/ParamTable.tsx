import { observer } from "mobx-react-lite";
import { AgGridReact } from "ag-grid-react";
import { ParamStore } from "../../store/ParamStore";
import { useMemo } from "react";
import { ModuleRegistry, AllCommunityModule, GridReadyEvent } from 'ag-grid-community';


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Props {
  store: ParamStore;
}

interface RowData {
  time: string;
  value: string;
}
ModuleRegistry.registerModules([AllCommunityModule]);
export const ParamTable = observer(({ store }: Props) => {
  const columnDefs = useMemo<import("ag-grid-community").ColDef<RowData>[]>(() => [
    {
      headerName: "Time",
      field: "time",
      sortable: true,
      filter: true,

    },
    {
      headerName: "Value",
      field: "value",
      sortable: true,
      filter: true,

    },
  ], []);

  let gridApi = null;
  const onGridReady = (params: GridReadyEvent) => {
    gridApi = params.api;
  }

  const rowData = useMemo<RowData[]>(
    () =>
      [...store.history].reverse().map((dp) => ({
        time: new Date(Number(dp.timestamp)).toLocaleTimeString(),
        value: dp.value.toFixed(2),
      })), [store.history]
      
      // const lastElem = store.history[store.history.length - 1]
      // gridApi!.applyTransaction({ add: lastElem });
      
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
      <AgGridReact<RowData>
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
      />
    </div>
  );
});
