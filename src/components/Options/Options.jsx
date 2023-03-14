import React, { useContext } from "react";
import tabs from "../../Array/tabs";
import s from "./options.module.css";
import cn from "classnames";
import { UserContext } from "../../Context/UserContext";

export default function Options({ setAnchorPaginate }) {
  const { selectTab, setSelectTab } = useContext(UserContext);

  const handleClick = (e, tab) => {
    e.preventDefault();
    setSelectTab(tab.id);
    // логика для изменения пагинации - с сервера или на клиенте
    if (tab.id === "all") {
      setAnchorPaginate(true)
    } else setAnchorPaginate(false)
  };

  return (
    <>
      {tabs.map((tab) => (
        <span
          className={cn(s.option, { [s.select]: selectTab === tab.id })}
          key={tab.id}
          onClick={(e) => handleClick(e, tab)}
        >
          {tab.title}
        </span>
      ))}
    </>
  );
}
