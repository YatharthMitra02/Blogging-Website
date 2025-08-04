import React from "react";
import { useState } from "react";
import { login } from "./store/authSlice";
import { useForm } from "react-hook-form";
import authservice from "./appwrite/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from "./components";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const { register, handleSubmit } = useForm();

  const handlerlogin = async (data) => {
    seterror("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const user = await authservice.getcurrentUser();
        if (user) {
          dispatch(login(user)); // ✅ Correct here
          navigate("/");
        }
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handlerlogin)} className="mt-8">
          <div className="spaces-y-5">
            <Input
              label="email:  "
              placeholder="enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => {
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Enter a valid Email ID";
                  },
                },
              })}
            />

            <Input
              label="password:  "
              type="password"
              placeholder="enter your Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button className="w-full" type="submit">
              Sign In{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
