import React from "react"
import s from "./notification.module.css"
import { ReactComponent as Close} from "../LoginForm/img/close.svg"

const Notification = ({ title, message, children, close }) => {

    const closeNotific = () => {
        close(false)
    }

    return (
        <div className={s.wrapper}>
            <h3>{title}</h3>
            <p>{message}</p>
            <p>{children}</p>
            <Close className={s.close} onClick={closeNotific}/>
        </div>
    )
}

export default Notification