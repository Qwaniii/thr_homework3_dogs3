import React, { useEffect } from 'react'
import s from "./login.module.css"
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { ReactComponent as Close} from "./img/close.svg"
import { useState } from 'react';
import { ReactComponent as EyeOpen} from "./img/eye-open.svg"
import { ReactComponent as EyeClose} from "./img/eye-close.svg"
import api from '../../Api/Api';



export default function ForgotPass({ isToken, setModalForgotPass }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        mode: "onSubmit",
        defaultValues: {
          email: "",
        }
      });

      const location = useLocation()
      const navigate = useNavigate()
      const [sentEmail, setSentEmail] = useState(false)
      const [eyeOpen, setEyeOpen] = useState(false)


      useEffect(() => {
        if ((!isToken && !sessionStorage.getItem('token')) && location.pathname === "/thr_homework3_dogs3/forgot-password") {
            setModalForgotPass(true)
            setSentEmail(false)
      }
    }, [location, isToken, setModalForgotPass])

      const onSubmit = (data) => {
        console.log(data)
        const email = {email: data.email}
        api.forgotPassword(email)
            .then(res => {
                setSentEmail(true)
                reset()
            })
            .catch(err => err.json()
                .then(data => console.log(data)))
      }

      const onSubmitNewPass = (data) => {
        const pass = {password: data.password}
        api.resetPassword(pass, data.token)
            .then(res => {
                console.log(res)
                setModalForgotPass(false)
                navigate("/thr_homework3_dogs3/login")
            })
            .catch(err => err.json()
                .then(data => console.log(data)))
      }

      const cancelSend = () => {
          setModalForgotPass(false)
      }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>Напомнить пароль</h3>
        {!sentEmail 
        ?
        <form className={s.form}
              onSubmit={handleSubmit(onSubmit)}>
          <div className={s.item}>
            <input  id="forgotEmail"
                    type="text"
                    className={s.input}
                    placeholder=" "
                    {...register("email", {
                      required: "введите E-mail", 
                    })}
            ></input>
            <label htmlFor="email" className={s.label}>e-mail </label>
          {errors?.email && <div className={s.error}>* {errors?.email?.message}</div>}
          </div>
          <div className={s.registr}>Введите Email адрес для восстановления доступа</div>
          <input type="submit" className={s.btn} value="Отправить код"></input>
        </form>
        :
        <form className={s.form}
        onSubmit={handleSubmit(onSubmitNewPass)}>
            <div className={s.item}>
                <input  id="token"
                        type="text"
                        className={s.input}
                        placeholder=" "
                        {...register("token", {
                            required: "введите код из письма", 
                        })}
                ></input>
                <label htmlFor="token" className={s.label}>Код из письма </label>
                {errors?.token && <div className={s.error}>* {errors?.token?.message}</div>}
            </div>
            <div className={s.item}>
            <input  id="newPass"
                    type={!eyeOpen ? "password" : "text"}
                    className={s.input}
                    placeholder=" "
                    {...register("password", {
                      required: "введите пароль",
                      
                    })}
            ></input>
            <label htmlFor="pass" className={s.label}>Новый пароль </label>
            {errors?.password && <div className={s.error}>* {errors?.password?.message}</div>}
            <div onClick={() => setEyeOpen(!eyeOpen)}>
                {eyeOpen && <EyeOpen className={s.eye}/>}
                {!eyeOpen && <EyeClose className={s.eye}/>}
            </div>
          </div>
            <input type="submit" className={s.btn} value="Восстановить доступ"></input>
            <input type="button" className={s.btn} onClick={() => cancelSend()} value="Отмена"></input>
        </form>     
        }
        <div onClick={() => setModalForgotPass(false)}>
          <Close className={s.close}/>
        </div>
      </div>
    </div>
  )
}
