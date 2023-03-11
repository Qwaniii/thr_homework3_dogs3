import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import api from "../../Api/Api";
import s from "./login.module.css";
import { ReactComponent as Close} from "./img/close.svg"
import { ReactComponent as EyeOpen} from "./img/eye-open.svg"
import { ReactComponent as EyeClose} from "./img/eye-close.svg"

export default function Registration({ isToken, setIsToken, setModalRegistr }) {
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
  const [anchorSuccess, setAnchorSuccess] = useState(true)
  const [eyeOpen, setEyeOpen] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    setAnchorSuccess(true)
    setEyeOpen(false)
  }, [setEyeOpen, setAnchorSuccess])

  const onSubmit = (data) => {
    // console.log({...data, group: "group-10"})
    api.signUp({...data, group: "group-10"})
      .then((res) => {
        console.log(res)
        setName(res.name) 
        setAnchorSuccess(false)
        setTimeout(() => {
          setModalRegistr(false)
          reset()
          navigate("/thr_homework3_dogs3/login")
          setAnchorSuccess(true)
        }, 5000) 
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
      if ((!isToken && !sessionStorage.getItem('token')) && location.pathname === "/thr_homework3_dogs3/registration") {
        setModalRegistr(true)
    }
  }, [setModalRegistr, location, isToken])

  const moveEnter = () => {
    setModalRegistr(false)
    setTimeout(() => {
        navigate("/thr_homework3_dogs3/login")
  }, 500)
    
  }


  return (
    <div className={s.registrcontainer}>
      {anchorSuccess 
      ?
      <div className={s.wrapper}>
        <h3>Регистрация</h3>
        <form className={s.form}
              onSubmit={handleSubmit(onSubmit)}>
          <div className={s.item}>
            <input  id="regemail"
                    type="text"
                    className={`${s.input} ${s.reginp}`}
                    placeholder=" "
                    {...register("email", {
                      required: "введите E-mail", 
                    })}
            ></input>
            <label htmlFor="regemail" className={s.label}>e-mail </label>
          {errors?.email && <div className={s.error}>* {errors?.email?.message}</div>}
          </div>
          <div className={s.item}>
            <input  id="regpass"
                    type={!eyeOpen ? "password" : "text"}
                    className={`${s.input} ${s.reginp}`}
                    placeholder=" "
                    {...register("password", {
                      required: "введите пароль",
                      
                    })}
            ></input>
            <label htmlFor="regpass" className={s.label}>пароль </label>
            {errors?.password && <div className={s.error}>* {errors?.password?.message}</div>}
            <div onClick={() => setEyeOpen(!eyeOpen)}>
                {eyeOpen && <EyeOpen className={s.eye}/>}
                {!eyeOpen && <EyeClose className={s.eye}/>}
            </div>
          </div>
          <input type="submit" className={`${s.btn} ${s.reg}`} value="Зарегистрироваться"></input>
          <div className={s.registr}>
            <p>уже зарегистрированы?</p>
            <div className={s.secondregistr} onClick={moveEnter}>Войти</div>
          </div>
        </form>
        <div onClick={() => setModalRegistr(false)}>
          <Close className={s.close}/>
        </div>
      </div>
      :
      <div className={s.success}>
        <p>Успешная регистрация!</p>
        <h4>{name || "Гость"}!</h4>
        <p>Теперь необходимо <b>войти</b> на сайт</p>
      </div>}
    </div>
  );
}