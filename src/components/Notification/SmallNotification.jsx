import React from "react"
import s from "./smallnotification.module.css"
import cn from "classnames"
import { ReactComponent as Close} from "../LoginForm/img/close.svg"
import { ReactComponent as Done} from "./img/checkmark.svg"
import { ReactComponent as Error} from "./img/cancel.svg"


const SmallNotification = ({ title, message, children, close, error, onClick }) => {

    const closeNotific = () => {
        close(false)
    }
    if (!!message) {
        return (
            <div className={cn(s.wrapper, {[s.error]: error}, {[s.click]: onClick})} onClick={onClick}>
                <div>{error ? <Error style={{width: 80}}/> : <Done style={{width: 60}}/>}</div>
                <p>{message}</p>
                <p>{children}</p>
                {close && <Close className={s.close} onClick={closeNotific}/>}
            </div>
        )
    }
    else return null

}

export default SmallNotification