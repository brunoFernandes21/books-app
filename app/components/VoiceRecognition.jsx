import React, { useEffect, useState } from 'react';


export const VoiceRecognition = ({setSearch}) => {
  useEffect(() => {
    let recognition;
    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.addEventListener('result', (e) => {
        const transcript = e.results[0][0].transcript;
        console.log(transcript)
        setSearch(transcript)
      });
      document.getElementById("start-button").addEventListener("click", () => {
        recognition.start();
        console.log("started")
      });
      document.getElementById("stop-button").addEventListener("click", () => {
        recognition.stop();
        console.log("stopped")
      });
    } 
    
    else {
      alert("Web Speech API is not supported");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  return (
    <div className="container">
      <form>
        <button type="button" id="start-button">Start</button>
        <button type="button" id="stop-button">Stop</button>
      </form>
    </div>
  );
};

