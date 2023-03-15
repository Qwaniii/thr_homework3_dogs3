import React from "react";
import s from "./paginate.module.css";
import cn from "classnames"

export default function Paginate({ page, setPage, paginateNum, curPaginate }) {

  const toUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
  }

  return (
    <div>
        <div onClick={()=>{curPaginate(paginateNum); toUp()}} className={s.linkPage}>
          <div className={cn(s.wrapper, {[s.current]: paginateNum === page})}>
              {paginateNum}
          </div>
        </div>
    </div>
  );
}
