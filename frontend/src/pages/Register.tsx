import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

type FormFields = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Send registration request to backend
      const response = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
          const errMsg = result.error || "registration failed"
          setError("root", {message: errMsg})
         };

      console.log("Registration successful:", result);
      navigate("/tasks")
    } catch (error: any) {
      setError("root", { message: error.message });
    }
  };

  return (
    <>
      <Navbar />
      <main className="grid items-center mx-auto w-1/4 my-11">
        <p className="text-5xl font-bold letter p-2">Register</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              className="m-2 text-black"
              {...register("firstname", {
                required: "First name is required",
              })}
              type="text"
              placeholder="John"
            />
          </div>
          {errors.firstname && (
            <p className="text-red-500 text-sm ml-2">{errors.firstname.message}</p>
          )}

          <div>
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              className="m-2 text-black"
              {...register("lastname", {
                required: "Last name is required",
              })}
              type="text"
              placeholder="Doe"
            />
          </div>
          {errors.lastname && (
            <p className="text-red-500 text-sm ml-2">{errors.lastname.message}</p>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="m-2 text-black"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email must include @";
                  }
                  return true;
                },
              })}
              type="text"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm ml-2">{errors.email.message}</p>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              className="m-2 text-black"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              type="password"
              placeholder="12345678"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm ml-2">{errors.password.message}</p>
          )}

          {errors.root && (
            <p className="text-red-500 text-sm ml-2">{errors.root.message}</p>
          )}

          <div className="flex gap-2">
            <p className="text-sm ml-2">Already have an account?</p>
            <a  href="/login" className="text-blue-500 text-sm">
              Login here
            </a>
          </div>

          <Button
            disabled={isSubmitting}
            className="m-2 bg-white text-black hover:text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </main>
    </>
  );
};

export default Register;