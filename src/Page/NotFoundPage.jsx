import React from "react";
import { Link } from "react-router-dom";
import s from "./notfoundpage.module.css"

export default function NotFoundPage() {
  return <div>
    <div className="container">
      <div className={s.page}>
        <div >
          Страница не найдена
        </div>
        <Link to="/" className={s.link}>На главную</Link>
      </div>
    </div>
  </div>;
}
