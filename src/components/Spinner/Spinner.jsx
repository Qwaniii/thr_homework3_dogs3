import React from "react";
import { DotLoader } from "react-spinners";
import s from "./spinner.module.css"

const override = {
  margin: "100px auto",
};

export default function Spinner() {
  return (
    <div className={s.spinner}>
      <DotLoader color="rgba(255, 200, 0, 1)" size={45}  cssOverride={override}/>
    </div>
  );
}
