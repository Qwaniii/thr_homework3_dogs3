import React from "react";
import s from "./paginate.module.css";
import cn from "classnames"

export default function Paginate({ page, setPage, paginateNum, curPaginate }) {

  return (
    <div>
        <div onClick={()=>curPaginate(paginateNum)} className={s.linkPage}>
          <div className={cn(s.wrapper, {[s.current]: paginateNum === page})}>
              {paginateNum}
          </div>
        </div>
    </div>
  );
}
