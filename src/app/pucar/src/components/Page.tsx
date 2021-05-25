import React from "react";
import ActionBar from "./ActionBar";

const Page: React.FC = (props) => {
  return (
    <div className="bg-main">
      {props.children}
      <ActionBar />
    </div>
  );
};

export default Page;
