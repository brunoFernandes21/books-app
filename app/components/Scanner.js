import {Html5QrcodeScanner} from "html5-qrcode";
import { Main } from "next/document";

export const Scanner = () => {

 const bookScanner = () => {
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      if(decodedText.length === 10 || decodedText.length === 13){
        console.log(`Code matched = ${decodedText}`, decodedResult);
        document.getElementById("result").innerHTML = `
        <h2> Success!</h2>
        <p>${decodedText}</p>`
        scanner.clear()
        document.getElementById("reader").remove()
        getBookByIsbn(decodedText)
      }
    }
    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
    const scanner =  new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 10,
    })
    return scanner.render(onScanSuccess, onScanFailure);
  }
  return (
    <main>
        <div id="reader">
            </div>
        <div id="result">
            </div>
    </main>

  )
} 