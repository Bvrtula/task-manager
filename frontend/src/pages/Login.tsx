import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"  
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"

type FormFields = {
    firstname: string
    lastname: string
    email: string
    password: string
}

const Login = () => {
    const {register, handleSubmit, setError, formState: { errors, isSubmitting }} = useForm<FormFields>();
    // FORM DEFAULT VALUES EXAMPLE 

    // useForm<FormFields>({
    //    defaultValues: {
    //        email: "romek@so"
    //    }
    //});
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new  Promise((resolve) => setTimeout(resolve, 1000))
            console.log(data)
        } catch (error) {
            setError("root", {
                message: "Something went wrong"
            })
        }
    }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //     <input className='m-2 text-black' {...register("email", {
    //         required: "Email is required",
    //         validate: (value) => {
    //             if(!value.includes("@")) {
    //                 return "Email must include @"
    //             }
    //             return true
    //         }
    //     })} type="text" placeholder='email' /> <br />
    //     {errors.email && (
    //         <div className='text-red-500'>{errors.email.message}</div>
    //     )}
    //     <input className='m-2 text-black' {...register("password", {
    //         required: "Password is required",
    //         minLength: {
    //             value: 8,
    //             message: "Password must have at least 8 characters",
    //         },
    //     })} type="password" placeholder='password' /> <br />
    //     {errors.password && (
    //         <div className='text-red-500'>{errors.password.message}</div>
    //     )}
    //     <button disabled={isSubmitting} className='m-2 bg-white text-black'>
    //         {isSubmitting ? "Submiting..." : "Submit"}
    //     </button>
    // </form>
    
    <Form>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
            <Button type="submit">Submit</Button>

        />
      </form>
    </Form>
  )
}

export default Login