import React from 'react'
import s from "./editproduct.module.css"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { asyncEditProduct, modalWindow, productInfo } from '../../storage/reducers/editProductReducer'

export default function EditProduct() {

  const dispatch = useDispatch()
  const { name, description, price, wight, pictures, discount } = useSelector(productInfo)
  const product = useSelector(productInfo)

  const { register, handleSubmit, watch, formState: {errors} } = useForm({mode: "onChange", defaultValues: {name: name, description: description, price: price, wight: wight, pictures: pictures, discount: discount }})

  const editProductSubmit = (data) => {
    // for (let key in data) {
    //   if (!data[key]) delete data[key]
    // }
    console.log(data)
    dispatch(asyncEditProduct(data, product._id))
  }


  return (
    <div className={s.container}>
      <h4 className={s.title}>Изменение продукта</h4>
      <form className={s.form} onSubmit={handleSubmit(editProductSubmit)}>
        <div className={s.imgWrapper}>
          <img className={s.image} src={watch("pictures")} alt="изображение" ></img>
        </div>
        <label> Изображение
          <input type="text" {...register("pictures")} placeholder="добавьте ссылку на изображение"></input>
        </label>
        <label className={errors?.name?.message && s.errors}> Название
          <input type="text" {...register("name", {
                required: "* Введите название",
              })}></input>
        </label>
        <label className={errors?.price?.message && s.errors}> Цена
          <input
              type="number"
              step={.1}
              min="0"
              {...register("price", {
                required: "* Укажите стоимость",
              })}
            ></input>
        </label>
        <label> Скидка
            <input 
                type="number" 
                min="0"
                max="100"
                step={.5}
                {...register("discount")}
              />
        </label>
        <label>Вес
            <input 
                type="text" {...register("wight")}
            ></input>
        </label>
        <label className={errors?.description?.message && s.errors}> Описание
            <textarea
              type="text"
              {...register("description", {
                required: "* введите описание товара",
              })}
            ></textarea>
        </label>
            <input className={s.submit} type="submit" value="Сохранить"></input>
      </form>
      <div className={s.close} onClick={() => dispatch(modalWindow(false))}>&#10006;</div>
    </div>
  )
}
