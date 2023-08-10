"use client";
import React, { useEffect, useState } from "react";
import { IoMicCircleSharp } from "react-icons/io5";

export const VoiceRecognition = ({ setSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [error,setError] = useState(false)
  useEffect(() => {
    setError(false)
    let recognition;
    if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.addEventListener("result", (e) => {
        const transcript = e.results[0][0].transcript;
        setSearch(transcript);
      });

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

    } else {
      setError(true)
      alert("Web Speech API is not supported");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const toggleVoice = () => {
    setIsListening((current) => !current);
  };
  
  
    // <div className="container flex justify-center items-center  ">
      {return !error ? 
      (<button 
        onClick={toggleVoice}
        className={` text-6xl  ${isListening ? "text-slate-800" : "text-white"}`}
        type="button"
        id="start-button"
      >
        <IoMicCircleSharp className=" text-6xl rounded-full bg-slate-800 hover:bg-blue-500 p-2 " />
      </button>
    // </div>
  ) : (alert('Browser does not support microphone input.'))
}
};
