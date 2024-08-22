import React, { useReducer, useRef } from "react";
import { Helmet } from "react-helmet";
import { Text, Button, CheckBox, Input, Heading } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoginContent from "../../components/LoginContent";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer ,Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "axios/axios.config";
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { persistor } from "store/store";



export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault();

  try {
    if(!emailRef.current.value || !passwordRef.current.value) toast.error("Please enter email and password");

    const data = {
      "email" : emailRef.current.value,
      "password" : passwordRef.current.value
    }

    const res  = await axiosInstance.post("/users/login" , data);

    if(!res) toast.error("Login error")
      

       dispatch(login({ userData : res.data.data.accessToken}))
      localStorage.setItem("accessToken" , res.data.data.accessToken);


      toast.success("Login successfull... Redirecting")
      setTimeout(() => {
        navigate('/');
      }, 2000);
 

  }

    
   catch (error) {
    console.log(error , "Error while login");
    toast.error("Failed to login please try again")
    
  }
}
  return (
    <>
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />

      <Helmet>
        <title>Neuzy</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="w-full bg-white-A700">
        <div className="flex flex-col gap-[50px]">
          <Header />
          <div className="flex flex-col items-center gap-[124px] md:gap-[93px] sm:gap-[62px]">
            <div className="container-sm flex justify-center md:p-5">
              <div className="flex w-full items-start justify-between gap-5 md:flex-col">
                <div className="flex w-[49%] flex-col gap-[77px] md:w-full md:gap-[57px] sm:gap-[38px]">
                  <Heading size="4xl" as="h1" className="leading-[58px] tracking-[-0.50px]">
                    Welcome back, there is the latest news today !!
                  </Heading>
                  <div className="flex gap-5 md:flex-col">
                    {[...Array(2)].map((d, index) => (
                      <LoginContent
                        datetext="Ukraine, 24 april 2022"
                        headlinetext="Zelensky accuses Russia of worst crimes since WW2 "
                        descriptiontext="The Ukrainian leader says Russia must face an international trial as he calls for the country to be thrown off the UN Security Council. Lorem ipsom dolor"
                        readMore="Read More"
                        key={"login" + index}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex w-[41%] flex-col items-center gap-14 border border-solid border-blue_gray-900 bg-white-A700 p-12 md:w-full md:p-5 sm:gap-7">
                  <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
                    Neuzy
                  </Heading>
                  <div className="flex w-[92%] flex-col items-center gap-[29px] md:w-full">
                    <div className="flex flex-col gap-5 self-stretch">
                      <div className="flex flex-col items-start gap-2.5">
                        <Text size="md" as="p" className="!font-poppins tracking-[0.07px] !text-black-900">
                          Email
                        </Text>
                        <Input
                          size="lg"
                          variant="outline"
                          shape="round"
                          color="undefined_undefined"
                          type="email"
                          name="email"
                          placeholder={`Enter your email`}
                          className="self-stretch font-poppins tracking-[0.08px] sm:pr-5  border-black-900 border-2"
                          ref={emailRef}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-2.5">
                        <Text size="md" as="p" className="!font-poppins tracking-[0.07px] !text-black-900">
                          Password
                        </Text>
                        <Input
                          size="lg"
                          variant="outline"
                          shape="round"
                          color="undefined_undefined"
                          type="password"
                          name="password"
                          placeholder={`Enter your password`}
                          className="self-stretch font-poppins tracking-[0.08px] sm:pr-5  border-black-900 border-2"
                          ref={passwordRef}
                        />
                      </div>
                     {/*  <div className="flex justify-between gap-5">
                        <CheckBox
                          name="rememberme"
                          label="Remember me?"
                          id="rememberme"
                          className="gap-2 self-start p-px font-poppins text-base font-medium tracking-[0.08px] text-black-900"
                        />
                         <a href="#" className="self-end">
                          <Text
                            size="xl"
                            as="p"
                            className="!font-poppins !font-medium tracking-[0.08px] !text-black-900"
                          >
                            Forgot password
                          </Text>
                        </a> 
                      </div> */}
                    </div>
                    <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                      <Button
                        size="7xl"
                        shape="round"
                        className="w-full bg-dark_blue text-white-A700 !rounded-[10px] font-poppins font-medium tracking-[0.08px] sm:px-5 "
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </a>
                    <Link to="/register" >
                      <Text size="md" as="p" className="tracking-[-0.50px] !text-black-900">
                        <span className="text-black-900">Don&#39;t have an account?&nbsp;</span>
                        <span className="text-blue_gray-900">Register here</span>
                      </Text>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
