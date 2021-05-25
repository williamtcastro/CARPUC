import React from "react";

import "./styles/ActionBar.css";
import {
  RiFileList3Fill,
  RiSettings3Fill,
  RiHome6Fill,
  RiMapPinAddFill,
  RiFileList3Line,
  RiSettings3Line,
  RiHome6Line,
  RiMapPinAddLine,
} from "react-icons/ri";
import { useHistory } from "react-router-dom";

const ActionBar: React.FC = () => {
  const [actionStatus, setActionStatus] = React.useState<number>(0);
  const history = useHistory();

  const handleStatus = (i: number) => {
    setActionStatus(i);
    switch (i) {
      case 0:
        history.push("/");
        break;

      default:
        break;
    }
  };

  return (
    <div className="actionbar">
      <div className="action" onClick={() => handleStatus(0)}>
        {actionStatus === 0 ? (
          <RiHome6Fill size={30} />
        ) : (
          <RiHome6Line size={30} />
        )}
      </div>
      <div className="action" onClick={() => handleStatus(1)}>
        {actionStatus === 1 ? (
          <RiMapPinAddFill size={30} />
        ) : (
          <RiMapPinAddLine size={30} />
        )}
      </div>
      <div className="action" onClick={() => handleStatus(2)}>
        {actionStatus === 2 ? (
          <RiFileList3Fill size={30} />
        ) : (
          <RiFileList3Line size={30} />
        )}
      </div>
      <div className="action" onClick={() => handleStatus(3)}>
        {actionStatus === 3 ? (
          <RiSettings3Fill size={30} />
        ) : (
          <RiSettings3Line size={30} />
        )}
      </div>
    </div>
  );
};

export default ActionBar;
