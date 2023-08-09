"use client";
import React, { useEffect, useState } from "react";
import { IoMicCircleSharp } from "react-icons/io5";

export const VoiceRecognition = ({ setSearch }) => {
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {
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
  return (
    <div className="container flex justify-center items-center ">
      <button
        onClick={toggleVoice}
        className=" text-6xl  p-2"
        type="button"
        id="start-button"
      >
        <IoMicCircleSharp />
      </button>
      {/* <button type="button" id="stop-button">Stop</button> */}
    </div>
  );
};
