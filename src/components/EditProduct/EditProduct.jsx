import React from 'react'
import { useForm } from 'react-hook-form'

export default function EditProduct() {

  const { register, handleSubmit, reset, watch, formState: {errors} } = useForm({mode: "onChange", defaultValues: {name: ""}})

  return (
    <div>
      
    </div>
  )
}
