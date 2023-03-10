import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "../../Api/Api";
import s from "./login.module.css";

export default function Login({ setIsToken, setModalLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data)
    api.signIn(data)
      .then((res) => {
        console.log(res)
        sessionStorage.setItem('token', res.token)
        api.setToken(res.token)
        setIsToken(res.token )
        navigate("/thr_homework3_dogs3")
        setModalLogin(false)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>Войти в аккаунт</h3>
        <form className={s.form}
              onSubmit={handleSubmit(onSubmit)}>
          <div className={s.item}>
            <input  id="email"
                    type="text"
                    className={s.input}
                    {...register("email", {
                      required: "введите E-mail",
                      
                    })}
            ></input>
            <label htmlFor="email" className={s.label}>e-mail </label>
          {errors?.email && <div className={s.error}>* {errors?.email?.message}</div>}
          </div>
          <div className={s.item}>
            <input  id="pass"
                    type="password"
                    className={s.input}
                    {...register("password", {
                      required: "введите пароль",
                      
                    })}
            ></input>
            <label htmlFor="pass" className={s.label}>пароль </label>
            {errors?.password && <div className={s.error}>* {errors?.password?.message}</div>}
          </div>
          <input type="submit" className={s.btn} value="Войти"></input>
        </form>
      </div>
    </div>
  );
}
