"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRef, useState } from "react";
import config from "../../../../config";
import { apiRequest } from "@/libs/serverRequest";

export default () => {
  const [historial, setHistorial] = useState([]);
  const [inputText, setInputText] = useState("");
  const input = useRef();
  const handleButton = async () => {
    const query = input.current.value;
    console.log(query);

    const data = await apiRequest(config.apiURL + "dev/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tipo de contenido del cuerpo (en este caso, JSON)
      },
      body: JSON.stringify({ query }),
    });

    data.show();
    setHistorial(prev => [...prev, query]);
  };
  return (
    <>
      <Input
        ref={input}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button onClick={handleButton}>Send</Button>
      <h2>Historial</h2>
      <div className="historial_container">
        <ul>
          {historial.map((h, key) => (
            <li onClick={() => setInputText(h)} key={key}>{h}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
