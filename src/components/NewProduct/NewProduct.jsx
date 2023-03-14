import { useForm } from "react-hook-form";
import s from "./newproduct.module.css"

const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    console.log(e)
  }

  return (
    <div className="container">
      <h3>Добавление нового продукта</h3>
      <div >
        <form className={s.newproduct} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name", {
              required: "Введите название",
            })}
          ></input>
          <input type="text" {...register("pictures")}></input>
          <input
            type="number"
            {...register("price", {
              required: "Стоимость",
            })}
          ></input>
          <input type="number" {...register("discount")}></input>
          <input type="number" {...register("wight")}></input>
          <input
            type="text"
            {...register("description", {
              required: "Описание",
            })}
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
