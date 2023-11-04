import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapCountainer">map</div>
    </div>
  );
}
