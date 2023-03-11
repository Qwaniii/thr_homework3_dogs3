import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import api from "../../Api/Api";
import s from "./login.module.css";
import { ReactComponent as Close} from "./img/close.svg"
import { ReactComponent as EyeOpen} from "./img/eye-open.svg"
import { ReactComponent as EyeClose} from "./img/eye-close.svg"

export default function Login({ isToken, setIsToken, setModalLogin }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState("")
  const [anchorSuccess, setAnchorSuccess] = useState(true)
  const [eyeOpen, setEyeOpen] = useState(false)

  useEffect(() => {
    setAnchorSuccess(true)
    setEyeOpen(false)
  }, [setAnchorSuccess, setEyeOpen])


  const onSubmit = (data) => {
    api.signIn(data)
      .then((res) => {
        console.log(res)
        sessionStorage.setItem('token', res.token)
        api.setToken(res.token)
        setIsToken(res.token)
        setName(res.data.name)
        setAnchorSuccess(false)          
        navigate("/thr_homework3_dogs3")
        setTimeout(() => {
          setModalLogin(false)
        }, 2000)
        reset()
        setAnchorSuccess(true)
      })
      .catch((res) => console.log(res))
  }

  useEffect(() => {
      if ((!isToken && !sessionStorage.getItem('token')) && location.pathname === "/thr_homework3_dogs3/login") {
        setModalLogin(true)
    }
  }, [setModalLogin, location, isToken])

  const moveRegistr = () => {
    setModalLogin(false)
    setTimeout(() => {
        navigate("/thr_homework3_dogs3/registration")
  }, 500)
}

  return (
    <div className={s.container}>
      {anchorSuccess 
      ?
      <div className={s.wrapper}>
        <h3>Войти в аккаунт</h3>
        <form className={s.form}
              onSubmit={handleSubmit(onSubmit)}>
          <div className={s.item}>
            <input  id="email"
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
          <div className={s.item}>
            <input  id="pass"
                    type={!eyeOpen ? "password" : "text"}
                    className={s.input}
                    placeholder=" "
                    {...register("password", {
                      required: "введите пароль",
                      
                    })}
            ></input>
            <label htmlFor="pass" className={s.label}>пароль </label>
            {errors?.password && <div className={s.error}>* {errors?.password?.message}</div>}
            <div onClick={() => setEyeOpen(!eyeOpen)}>
                {eyeOpen && <EyeOpen className={s.eye}/>}
                {!eyeOpen && <EyeClose className={s.eye}/>}
            </div>
          </div>
          <input type="submit" className={s.btn} value="Войти"></input>
          <div className={s.registr}>
            <p>или</p>
            <div className={s.secondregistr} onClick={moveRegistr}>Зарегистрироваться</div>
          </div>
        </form>
        <div onClick={() => setModalLogin(false)}>
          <Close className={s.close}/>
        </div>
      </div>
      :
      <div className={s.success}>
        <p>Добро пожаловать, </p>
        <h4>{name || "Гость"}!</h4>
      </div>}
    </div>
  );
}