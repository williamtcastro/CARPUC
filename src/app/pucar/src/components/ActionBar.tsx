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
import { getActionIndex, setActionIndex } from "../reducers/actionIndex.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store.hooks";

const ActionBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const actionIndex = useSelector(getActionIndex);
  const history = useHistory();

  const handleStatus = (i: number) => {
    dispatch(setActionIndex({ index: i }));
    switch (i) {
      case 0:
        history.push("/");
        break;

      case 1:
        history.push("/rides/new");
        break;

      case 2:
        history.push("/rides/list");
        break;

      case 3:
        history.push("/profile");
        break;

      default:
        break;
    }
  };

  return (
    <div className="actionbar">
      <div className="action" onClick={() => handleStatus(0)}>
        {actionIndex.index === 0 ? (
          <RiHome6Fill size={30} />
        ) : (
          <RiHome6Line size={30} />
        )}
      </div>
      <div className="action" onClick={() => handleStatus(1)}>
        {actionIndex.index === 1 ? (
          <RiMapPinAddFill size={30} />
        ) : (
          <RiMapPinAddLine size={30} />
        )}
      </div>
      <div className="action" onClick={() => handleStatus(2)}>
        {actionIndex.index === 2 ? (
          <RiFileList3Fill size={30} />
        ) : (
          <RiFileList3Line size={30} />
        )}
      </div>
      <div className="action" onClick={() => handleStatus(3)}>
        {actionIndex.index === 3 ? (
          <RiSettings3Fill size={30} />
        ) : (
          <RiSettings3Line size={30} />
        )}
      </div>
    </div>
  );
};

export default ActionBar;
