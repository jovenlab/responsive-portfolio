'use client'
import { assets } from '@/assets/assets'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from "motion/react"
import HCaptcha from '@hcaptcha/react-hcaptcha'

const Contact = () => {
  const [result, setResult] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef();

  const onSubmit = async (event) => {
      event.preventDefault();

      if (!captchaToken) {
          setResult("Please verify you're human!");
          return;
      }

      setResult("Sending....");
      const formData = new FormData(event.target);
      formData.append("access_key", "a3c1018b-f6fa-46a2-83e1-1cf098b94a49");
      formData.append("h-captcha-response", captchaToken); // This is important

      const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
      });

      const data = await response.json();

      if (data.success) {
          setResult("Form Submitted Successfully");
          event.target.reset();
          setCaptchaToken(null);
          captchaRef.current.resetCaptcha();
      } else {
          console.log("Error", data);
          setResult(data.message);
      }
  };


  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    id="contact" className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'>
        <motion.h4 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0,opacity: 1}}
        transition={{delay: 0.3, duration: 0.5}}
        className='text-center mb-2 text-lg font-ovo'>
            Connect with me
        </motion.h4>
        <motion.h2 
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0,opacity: 1}}
        transition={{delay: 0.5, duration: 0.5}}
        className='text-center text-5xl font-ovo'>
            Get in touch
        </motion.h2>

        <motion.p 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{delay: 0.7, duration: 0.5}}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
            I would love to hear from you! If you have any questions, comments, or feedback, please use the form below.
        </motion.p>

        <motion.form 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{delay: 0.9, duration: 0.5}}
        onSubmit={onSubmit} className='max-w-2xl mx-auto'>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6 mt-10 mb-8'>
                <motion.input 
                initial={{x: -50, opacity: 0}}
                whileInView={{x: 0,opacity: 1}}
                transition={{delay: 1.1, duration: 0.6}}
                type="text" placeholder='Enter your name' required 
                className='flex-1 p-3 outlin-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90' name="name"/>
                
                <motion.input 
                initial={{x: 50, opacity: 0}}
                whileInView={{x: 0,opacity: 1}}
                transition={{delay: 1.2, duration: 0.6}}
                type="email" placeholder='Enter your email' required
                className='flex-1 p-3 outlin-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90' name="email"/>
            </div>
            <motion.textarea 
            initial={{y: 100, opacity: 0}}
            whileInView={{y: 0,opacity: 1}}
            transition={{delay: 1.3, duration: 0.6}}
            rows="6" placeholder='Enter your message' required
            className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 dark:bg-darkHover/30 dark:border-white/90' name="message">

            </motion.textarea>

            {/* hCaptcha Widget */}
            <div className="mb-4 flex justify-center">
              <HCaptcha
              sitekey="4d869f06-4c4e-451e-b196-104abe16b156"
              onVerify={token => setCaptchaToken(token)}
              ref={captchaRef}
              />
            </div>

            <motion.button 
            whileHover={{scale: 1.05}}
            transition={{duration: 0.3}}
            type="submit"
            className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 cursor-pointer dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover'>
                Submit now <Image src={assets.right_arrow_white} alt="" className="w-4"/>
            </motion.button>
            <p className='mt-4'>{result}</p>
        </motion.form>
    </motion.div>
  )
}

export default Contact