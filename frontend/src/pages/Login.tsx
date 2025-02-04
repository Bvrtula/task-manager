import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { redirect } from "react-router-dom";
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
      // Send login request to backend
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        const errMsg = result.error || "login failed"
        setError("root", {message: errMsg})
      }
  
      console.log("Login successful:", result);
      redirect("/tasks")
    } catch (error: any) {
      setError("root", { message: error.message });
    }
  }

return (
  <>
  <Navbar />
  <main className="grid items-center mx-auto w-1/4 my-11">
    <p className="text-5xl font-bold letter p-2">Login</p>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          className='m-2 text-black' 
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
                if(!value.includes("@")) {
                    return "Email must include @"
                }
                return true
            }
        })} type="text" placeholder='you@example.com' />
      </div>
        {errors.email && (
            <p className='text-red-500 text-sm ml-2'>{errors.email.message}</p>
        )}

      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          className='m-2 text-black' 
          {...register("password", {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
            },
          })} 
          type="password" 
          placeholder='1234' 
          />
      </div>
        {errors.password && (
            <p className='text-red-500 text-sm ml-2'>{errors.password.message}</p>
        )}
        {errors.root && (
            <p className='text-red-500 text-sm ml-2'>{errors.root.message}</p>
        )}
        <div className="flex gap-2">
            <p className="text-sm ml-2">You don't have an account?</p>
            <a  href="/register" className="text-blue-500 text-sm">
              Create one here
            </a>
          </div>
        <Button disabled={isSubmitting} className='m-2 bg-white text-black hover:text-white'>
            {isSubmitting ? "Submiting..." : "Submit"}
        </Button>
    </form>
  </main>
  </>

)
}

export default Login