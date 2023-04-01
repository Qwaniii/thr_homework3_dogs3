import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { asyncEditUserAvatar, asyncEditUserInfo, editAncor, editState, userAbout, userAvatar, userEmail, userName } from '../../storage/reducers/userReduce'
import s from "./aboutuser.module.css"

export default function AboutUser() {
 
  const name = useSelector(userName)
  const about = useSelector(userAbout)
  const avatar = useSelector(userAvatar)
  const email = useSelector(userEmail)
  const editUser = useSelector(editAncor)

  const dispatch = useDispatch()

  const { register, watch, handleSubmit, reset, formState: {errors}} = useForm({mode: "onSubmit", defaultValues: {name: name, about: about, avatar: avatar}})

  const onSubmit = (data) => {
    console.log({name: data.name, about: data.about})
        dispatch(asyncEditUserInfo({name: data.name, about: data.about}))
        dispatch(asyncEditUserAvatar({avatar: data.avatar}))
  }

  return (
    <div className='container'>
      <h3 className={s.title}>Информация о пользователе
        <div className={s.editWrapper} title={editUser ? "Отмена" : "Редактировать"} onClick={() => dispatch(editState(!editUser))}><img className={s.edit} src={editUser ? "https://img.icons8.com/ios-filled/50/null/cancel-2.png" : "https://img.icons8.com/ios/50/null/pencil-tip.png"} alt='edit'/></div>
      </h3>
      {name &&
      <div className={s.wrapper}>
        <div className={s.data}>
          <div className={s.photo}>
            <img src={editUser && watch("avatar") ? watch("avatar") : avatar} alt={name} className={s.avatar}></img>
          </div>
          <form className={s.info} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.block}>
              <div className={s.key}>Имя:</div>
              {editUser ? <input className={s.value} type="text" placeholder='Введите новое имя' defaultValue={name} {...register("name")}></input>
              : <div className={s.value}>{name}</div>}
            </div>
            <div className={s.block}>
              <div className={s.key}>О пользователе:</div>
              {editUser ? <input className={s.value} type="text" placeholder='Введите описание' defaultValue={about} {...register("about")}></input>
              :<div className={s.value}>{about}</div>}
            </div>
            <div className={s.block}>
              <div className={s.key}>E-mail:</div>
              <div className={`${s.value} ${editUser && s.disable}`}>{email}</div>
            </div>
            {editUser &&
            <div className={s.blockAvatar}>
              <div className={s.key}>Аватар:</div>
              <input className={s.value} type="text" placeholder='Ссылка на автар' defaultValue={avatar} {...register("avatar")}></input>
            </div>}
            {editUser && <button type="submit" className={s.submitWrap} title="Сохранить"><img className={s.submit} src="https://img.icons8.com/ios-filled/50/null/save--v1.png" alt="Сохранить"/></button>}
          </form>
        </div>
      </div>}
    </div>
  )
}
