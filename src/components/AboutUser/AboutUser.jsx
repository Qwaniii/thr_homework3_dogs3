import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { asyncEditUserAvatar, asyncEditUserInfo, avatarAnchor, editAnchor, editAvatar, editState, messageEdit, setMessage, userAbout, userAvatar, userEmail, userName } from '../../storage/reducers/userReduce'
import SmallNotification from '../Notification/SmallNotification'
import PopupNotific from '../PopupNotific/PopupNotific'
import s from "./aboutuser.module.css"

export default function AboutUser() {

  const [enableEditAva, setEnableEditAva] = useState(false)
 
  const name = useSelector(userName)
  const about = useSelector(userAbout)
  const avatar = useSelector(userAvatar)
  const email = useSelector(userEmail)
  const editUser = useSelector(editAnchor)
  const avatarUser = useSelector(avatarAnchor)
  const message = useSelector(messageEdit)

  const dispatch = useDispatch()

  const background = 'https://талисман-ростов.рф/wp-content/uploads/woocommerce-placeholder.png'

  const { register, watch, handleSubmit, reset, formState: {errors}} = useForm({mode: "onSubmit", defaultValues: {name: name, about: about, avatar: avatar}})

  const close = () => {
    dispatch(setMessage(""))
  }

  const onSubmitUser = (data) => {
    dispatch(asyncEditUserInfo({name: data.name, about: data.about}))
    setTimeout(() => {
      close()
    }, 2500)
  }

  const onSubmitAvatar = (data) => {
    dispatch(asyncEditUserAvatar({avatar: data.avatar}))
    setTimeout(() => {
      close()
    }, 2500)
  }

  const mouseEnter = () => {
    setEnableEditAva(true)
  }

  const mouseLeave = () => {
    setEnableEditAva(false)
  }

  useEffect(() => {
    if(!avatarUser && !editUser) reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarUser, editUser])

  return (
    <div className='container'>
      <h3 className={s.title}>Информация о пользователе
        <div className={s.editWrapper} title={editUser ? "Отмена" : "Редактировать"} onClick={() => dispatch(editState(!editUser))}><img className={s.edit} src={editUser ? "https://img.icons8.com/ios-filled/50/null/cancel-2.png" : "https://img.icons8.com/ios/50/null/pencil-tip.png"} alt='edit'/></div>
      </h3>
      {name &&
      <div className={s.wrapper}>
        <div className={s.data}>
          <div className={s.photo}>
            <img onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={() => dispatch(editAvatar(!avatarUser))} src={avatarUser ? (watch("avatar") || background) : avatar} alt={name} className={`${s.avatar} ${enableEditAva && s.active}`}></img>
            <div onClick={() => dispatch(editAvatar(!avatarUser))} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={`${s.editAvatar} ${enableEditAva && s.active}`}>{avatarUser ? "Оставить этот" : "Изменить аватар"}</div>
            {avatarUser && <form className={s.blockAvatar} onSubmit={handleSubmit(onSubmitAvatar)}>
              <input className={`${s.inputValue} ${errors.avatar && s.errors}`} type="text" placeholder='Ссылка на автар' defaultValue={avatar} {...register("avatar", {required: "Заполните пароль"})}></input>
              <button type="submit" className={s.submitAva} title="Сохранить аватар"><img className={s.submitImg} src="https://img.icons8.com/ios-filled/50/null/save--v1.png" alt="Сохранить"/></button>
            </form>}
          </div>
          <form className={s.info} onSubmit={handleSubmit(onSubmitUser)}>
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
            {editUser && <button type="submit" className={s.submitWrap} title="Сохранить"><img className={s.submit} src="https://img.icons8.com/ios-filled/50/null/save--v1.png" alt="Сохранить"/></button>}
          </form>
        </div>
      </div>}
      {message && <PopupNotific popup={message}>
        <SmallNotification message={message} error={(editUser || avatarUser) && message ? true : false}/>
      </PopupNotific>}
    </div>
  )
}
