import { useForm } from "react-hook-form";
import s from "./newproduct.module.css"
import cn from "classnames"
import api from "../../Api/Api";
import { useEffect } from "react";

const NewProduct = ({ isToken, setIsToken, setCards, anchor, setAnchor }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      description: "",
      discount: null,
      name: "",
      pictures: "",
      price: null,
      wight: "",
      stock: null
    }
  });

  useEffect(() => {
    const tokenStor = sessionStorage.getItem('token')
    if(tokenStor) {
      api.setToken(tokenStor)
      setIsToken(tokenStor)
    }
  }, [isToken, setIsToken])

  const onSubmit = (data) => {
    for (let key in data) {
      if (!data[key]) delete data[key]
    }
    console.log({...data, available: true})
    api.addNewProduct({...data, available: true})
      .then((res) => {
        console.log(res)
        setCards((prevState) => ([...prevState, res]))
        setAnchor(!anchor)
      })
      .catch((err) => console.log(err))

    reset()
  }

  return (
    <div className="container">
      {/* <h3>Добавление нового продукта</h3> */}
      <div className={s.wrapper}>
        <form className={s.newproduct} onSubmit={handleSubmit(onSubmit)}>
          <img className={s.image} src={watch("pictures") || "https://талисман-ростов.рф/wp-content/uploads/woocommerce-placeholder.png"} alt="изображение" ></img>
          <label htmlFor="pictures">Изображение</label>
          <input id="pictures" type="text" {...register("pictures")} placeholder="добавьте ссылку на изображение"></input>
          <label className={cn({[s.active]: errors?.name })} htmlFor="name">Название *
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "* Введите название",
            })}
            placeholder="название продукта"
          ></input>
          <label className={cn({[s.active]: errors?.price})} htmlFor="price">
            Стоимость *
          </label>
          <input
            id="price"
            type="number"
            min="0"
            {...register("price", {
              required: "* Укажите стоимость",
            })}
            placeholder="укажите цену"
          ></input>
          <label htmlFor="discount">Скидка</label>
          <input 
              id="discount"
              type="number" 
              min="0"
              max="100"
              {...register("discount")}
              placeholder="скидка"
            />
          <label htmlFor="wight">Вес (количество) </label>
          <input 
              id="wight"  
              type="text" {...register("wight")}
              placeholder="укажите вес или кол-во"
          ></input>
          <label htmlFor="stock">В наличии</label>
          <input 
              id="stock"  
              type="number" {...register("stock")}
              placeholder="укажите сколько осталось"
          ></input>
          <label className={cn({[s.active]: errors?.description})} htmlFor="description">Описание *
          </label>
          <textarea
            id="description"
            type="text"
            {...register("description", {
              required: "* введите описание товара",
            })}
            placeholder="добавьте описание"
          ></textarea>
          <input className={s.submit} type="submit" value="Добавить продукт"></input>
        </form>
        <div className={cn(s.required, {[s.active]: (errors?.name || errors?.price || errors?.description)})}><b>*</b> обязательное поле</div>
      </div>
    </div>
  );
};

export default NewProduct;
