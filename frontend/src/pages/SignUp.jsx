import React, { useState} from "react";
import cloud from '../assets/cloud.svg'
import round_think from '../assets/round_think.svg'
import bulb from '../assets/bulb.svg'
import book from '../assets/book.svg'
import scenario from '../assets/scenario.svg'
import eyeIcon from '../assets/eye.svg'
import emailIcon from '../assets/email.svg'
import profileIcon from '../assets/profile.svg'

const SignUp = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSignUp = async(e) => {

        e.prevenDefault()

        const signup = (name, email, password)
        setLoading(true)
        const response = await('', {
            method: POST,
            body: JSON.stringify(signup),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setLoading(false)
    }

    return (
      <div className="flex">
        <div className=" flex-1 w-[600px] h-[630px] bg-gradient-to-b
    from-[#2A6F97] via-[#2C7DA0] to-[#61A5C2] text-transparent rounded-[10px]">
            {/* first section */}
        <div className="flex flex-col items-center justify-start mt-6">
        <img
          src={cloud}
          alt="cloud"
          className="w-27 h-24 rotate-[10deg] opacity-60"
        />
        <div className="w-[537px] h-20 text-black text-6xl font-normal font-'Poor_Story' text-center">
          Welcome to Blogify
        </div>

        {/* second section */}
        <div className="w-100 h-14 justify-start text-black text-2xl font-normal font-'Poor_Story'">Every writer starts somewhere. <br/>Why not here?
        </div>
        
        {/* cloud */}
        <div className="relative w-full mt-6 flex justify-end ml-18">
        <img
        src={round_think}
        alt="roundT"
        className="w-23 h-23 rotate-[10deg] opacity-60 absolute left-12 top-0 ml-[-10px]"
        />
      
      {/* book Image*/}
      <img
        src={book}
        alt="book"
        className="w-27 h-27 rotate-[10deg] opacity-60 justify-center items-center mr-15"
      />
      
      {/* Bulb Image - center and slightly lower */}
      <img
        src={bulb}
        alt="bulb"
        className="w-24 h-27 rotate-[10deg] opacity-60 justify-center items-center mr-30"
      />
        </div>

        {/* landscape */}
        <div className="">
        <img
        src={scenario}
        alt="scene"
        className="w-[546px] h-43 opacity-70 rotate-[-1deg] justify-center items-center mr-2 mt-10"
      /> 
        </div>
        </div>
      </div>

        {/* right section */}
        <div className="flex-1 flex-col items-center justify-center mt-30">
          <div className="w-full h-20 justify-start text-black text-5xl font-normal font-'Poor_Story' [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)] items-center"> Create new account
          </div>
        
        <div className="flex w-full h-11 justify-center text-center "><div class="text-black text-xl text-center font-normal font-'Poor_Story' [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Already a Member?</div>
        <div class="bg-gradient-to-b from-[#2A6F97] via-[#2C7DA0] to-[#61A5C2] text-transparent bg-clip-text text-center text-xl font-normal font-'Poor_Story' [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)] ml-3">
        <a href="/" target="_blank">Login</a>
        </div>
        </div>

        {/* form */}
        <div className="flex flex-col items-center justify-center gap-6 mt-5">
        <div className="flex w-[400px] rounded-[18px] outline-1 outline-offset-[-1px] outline-black/100 items-center">
          <input className="w-[400px] h-11 p-3 justify-center rounded-[20px] text-black text-base font-bold font-'Poor_Story' focus:outline-none" placeholder="Name" type="text"/>
          <img
          src={profileIcon}
          alt="icon"
          className="w-5 h-5 opacity-70 mr-2"/>
        </div>
        <div className="flex w-[400px] rounded-[18px] outline-1 outline-offset-[-1px] outline-black/100 items-center">
          <input className="w-[400px] h-11 p-3 justify-center rounded-[20px] text-black text-base font-bold font-'Poor_Story' focus:outline-none" placeholder="Email" type="email"/>
          <img
          src={emailIcon}
          alt="icon"
          className="w-5 h-5 opacity-70 mr-2"/>
        </div>
        <div className="flex w-[400px] rounded-[18px] outline-1 outline-offset-[-1px] outline-black/100 items-center">
          <input className="w-[400px] h-11 p-3 justify-center rounded-[20px] text-black text-base font-bold font-'Poor_Story' focus:outline-none" placeholder="Password" type="password"/>
          <img
          src={eyeIcon}
          alt="icon"
          className="w-5 h-5 opacity-70 mr-2"/>
        </div>

        {/* sign up button */}
        <div className="flex w-[400px] rounded-[18px] outline-1 outline-offset-[-1px] h-16 relative cursor-pointer bg-black justify-center items-center mt-10 [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
        <button className="flex justify-center items-center w-20 h-10 opacity-80 text-center text-white text-md font-normal font-'Poor_Story' [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)] cursor-pointer">
        Sign Up
        </button>
        </div>

        
        </div>
        
        </div>
    </div>
      

    )
}

export default SignUp