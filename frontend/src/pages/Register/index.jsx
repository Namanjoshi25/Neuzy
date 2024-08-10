import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Input } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import axiosInstance from "axios/axios.config";
import { toast, ToastContainer ,Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  
 
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate()
 

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(passwordRef.current.value !== confirmPasswordRef.current.value){
      toast.error("Password does not match!"
      
      );}
      if(!nameRef.current.value || !passwordRef.current.value  || !emailRef.current.value){
        toast.error("Please Enter all the details!" );
   
    }
    const data  = {
     "name" : nameRef.current.value,
      "email" : emailRef.current.value,
      "password" : passwordRef.current.value
    }
  try {
    const res = await axiosInstance.post("/users/register",data)
    if(res) {
      toast.success("User registered successfully");
      navigate("/login");
    }

    
  } catch (error) {
    console.log("Error whiel registering the user " , error);
    
  }
  }
  return (
    <>
   <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />

      <Helmet>
        <title>Naman's Application1</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="w-full bg-white-A700">
        <div className="flex flex-col items-center">
          <Header className="self-stretch" />
          <div className="mt-[53px] flex w-[90%] flex-col items-center md:w-full md:p-5">
            <div className="flex w-[46%] flex-col gap-[29px] md:w-full">
              <Heading size="4xl" as="h1" className="tracking-[-0.50px]">
                Let&#39;s join as Neuzy friends
              </Heading>
              <Text
                size="3xl"
                as="p"
                className="w-[96%] text-center leading-[35px] tracking-[-0.50px] !text-black-900_7f md:w-full"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&#39;s standard dummy text ever since the 1500s, when an unknown
              </Text>
            </div>
            <div className="mt-[50px] flex w-[41%] flex-col items-center gap-[57px] border border-solid border-blue_gray-900 bg-white-A700 p-[54px] md:w-full md:p-5 sm:gap-7">
              <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
                Neuzy
              </Heading>
              <div className="flex flex-col items-start gap-[31px] self-stretch">
                <div className="flex flex-col gap-[30px] self-stretch">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-start gap-2.5">
                      <Text size="md" as="p" className="!font-poppins tracking-[0.07px] !text-black-900">
                        Name
                      </Text>
                      <Input
                        size="lg"
                        variant="outline"
                        shape="round"
                        color="undefined_undefined"
                        type="text"
                        name="name"
                        placeholder={`Enter your Name`}
                        className="self-stretch font-poppins tracking-[0.08px] sm:pr-5  border-black-900 border-2"
                        ref={nameRef}
                        
                      />
                    </div>
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
                        className="self-stretch font-poppins tracking-[0.08px] sm:pr-5 border-black-900 border-2"
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
                        className="self-stretch font-poppins tracking-[0.08px] sm:pr-5 border-black-900 border-2"
                        ref={passwordRef}
                    
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2.5">
                      <Text size="md" as="p" className="!font-poppins tracking-[0.07px] !text-black-900">
                        Confirm Password
                      </Text>
                      <Input
                        size="lg"
                        variant="outline"
                        shape="round"
                        color="undefined_undefined"
                        type="password"
                        name="confirmpassword"
                        placeholder={`Enter your password`}
                        className="self-stretch font-poppins tracking-[0.08px] sm:pr-5 border-black-900 border-2"
                        ref={confirmPasswordRef}
                     
                      />
                    </div>
                  </div>
                  <Button
                    size="7xl"
                    shape="round"
                    className="w-full !rounded-[10px] font-poppins font-medium tracking-[0.08px] sm:px-5   bg-dark_blue text-white-A700"
                    onClick = {handleSubmit}
                  >
                    Register
                  </Button>
                </div>
                <Link to="/login">
                  <Text size="md" as="p" className="ml-[50px] tracking-[-0.50px] !text-black-900 md:ml-0">
                    <span className="text-black-900">Do you already have an account??&nbsp;</span>
                    <span className="text-blue_gray-900">Login Now</span>
                  </Text>
                </Link>
              </div>
            </div>
            </div>
      
          <Footer className="mt-[120px]" />
        </div>
      </div>
    </>
  );
}
