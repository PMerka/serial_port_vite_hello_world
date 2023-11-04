import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function App() {
  const [light, setLight] = useState(false);

  const getPort = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    window.reader = await port.readable.getReader();
    window.writer = await port.writable.getWriter();
  };

  const sendString = async (string) => {
    const dataArrayBuffer = encoder.encode(string);
    setLight(!light);
    await window.writer.write(dataArrayBuffer);
    const readerData = await window.reader.read();
    const data = decoder.decode(readerData.value);
    console.log(data);
  };

  return (
    <>
      <h1>Hello world - serial port</h1>

      <p>Project for turning on/of led diode</p>

      <p>
        App sends string to serial port ("on" / "off" ) and console logs device
        response.
      </p>

      <div>
        <button onClick={() => getPort()}>Connect</button>
      </div>
      <div>
        <button onClick={() => sendString(light ? "off" : "on")}>
          {light ? (
            <img src="/bulbOn.png" width={100} alt="" />
          ) : (
            <img src="/bulbOff.png" width={100} alt="" />
          )}
        </button>
      </div>
    </>
  );
}

export default App;
