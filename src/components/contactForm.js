import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import { toast } from "react-toastify";

export const ContactUs = (doctor , consultation) => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      
      console.log(consultation);    
    const handleValidation = () => {
        const { subject, name, email , to_email, message } = formik.values;
        if (subject === "" || name === "" || email === ""  || to_email === "" || message === "") {
          toast.error("Fields cannot be empty.", toastOptions);
          return false;
        }
        return true;
      };

    const onSubmit = async (values, err) => {
        if (handleValidation()) {
            const { subject, name, email , to_email, message  } = values;
        }
    };
   
    const formik = useFormik({
        initialValues: {
          subject: "Arogyam Consulation Service for Your Query",
        //   name: doctor.doctor.fullname,
        //   email: doctor.doctor.email,
        name: "",
        email: "",
          to_email: "",
          message: "",

        },
        onSubmit,
      });

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('service_js0osnq', 'template_b510yqe', e.target, '_VBxc4nEfA5rz_PNP')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

            e.target.reset() 
    };
   
  return (
    
    <> 
        
        <form className="w-full max-w-lg " onSubmit={sendEmail }>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    Subject
                    </label>
                    <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    // {...formik.getFieldProps("subject")}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    Name
                    </label>
                    <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    type="text"
                    name="name"
                    placeholder="name"
                    // {...formik.getFieldProps("name")}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    Email
                    </label>
                    <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    type="text"
                    name="email"
                    placeholder="Email"
                    // {...formik.getFieldProps("email")}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    To Email
                    </label>
                    <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    type="text"
                    name="to_email"
                    placeholder="patient email"
                    // {...formik.getFieldProps("to_email")}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    Message
                    </label>
                    <textarea
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    
                    name="message"
                    
                    // {...formik.getFieldProps("message")}
                    />
                    
                </div>
            </div>
            <div className="flex flex-row mx-7 justify-center">
                <input type="submit" className="text-sm p-2 w-full font-medium bg-lightMode-btn dark:bg-darkMode-btn rounded-md m-5 text-white" value="Send" />
            </div>
            
            
        </form>
    </>
  );
};