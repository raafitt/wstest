import { useNavigate } from "react-router-dom";



export const TabPanel = () => {
const navigate = useNavigate();

  return(
  <div className="p-4">
    <button onClick={()=> navigate("/param1")}>Param 1</button>
    <button onClick={()=> navigate("/param2")}>Param 2</button>
  </div>
  )
}

