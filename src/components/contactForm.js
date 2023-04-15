import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
// const serviceID = process.env.SERVICE_KEY_ID;
// const templateID = process.env.TEMPLATE_KEY_ID;
// const userID = process.env.USER_KEY_ID;


export const ContactUs = (doctor ) => {
    
    
    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm("service_js0osnq", "template_rxsxcuf", e.target, "_VBxc4nEfA5rz_PNP")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

            e.target.reset() 
    };
    console.log(doctor);
    
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
                    defaultValue= "Arogyam Consultation Service for Your Query"
                    placeholder="Subject"
                    
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    Patient Name
                    </label>
                    <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    type="text"
                    name="to_name"
                    defaultValue={doctor.consultations.postId.patientId.fullname}
                    placeholder="Patient name"
                   
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                    className="block uppercase tracking-wide text-xs font-semibold mb-2"
                    htmlFor="grid-first-name"
                    >
                    Doctor Name
                    </label>
                    <input
                    className="appearance-none block w-full bg-neutral-200 dark:bg-darkMode-componentHead rounded py-3 px-4 leading-tight placeholder:text-neutral-500 focus:outline-none focus:bg-neutral-300 focus:text-black dark:focus:bg-neutral-800 dark:focus:text-white"
                    id="grid-first-name"
                    type="text"
                    name="doctor_name"
                    placeholder="Doctor name"
                    defaultValue={doctor.doctor.fullname}
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
                    defaultValue={doctor.doctor.email}
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
                    defaultValue={doctor.consultations.postId.patientId.email}
                    placeholder="patient email"
                   
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
                    defaultValue= {`
                    Thank you for your Trusting us with your Health! We're excited to have you on board and will be happy to help you to Get Fit and Healthy again.
                    
                    Please Find below the Google Meet link for Consultation Session for your Given time Slot of : 
                    Start Time : ${doctor.consultations.timeSlot.startTime}
                    End Time : ${doctor.consultations.timeSlot.endTime}
                    
                    Google Meet Link = "https://meet.google.com/_meet/chd-rpar-tsy?hs=187&authuser=0&ijlm=1681544653867&adhoc=1"

                    I would be glad to extend the Consultaion period if any further issue is noticed in your Health on our behalf.`}
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