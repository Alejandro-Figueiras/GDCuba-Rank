"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRef, useState } from "react";
import config from "../../../../../config";
import { apiRequest } from "@/libs/serverRequest";
import { NextResponse } from "next/server";

export default () => {
  const [historial, setHistorial] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resultado, setResultado] = useState([]);
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
    setResultado(data.getRows())
    console.log(data.getRows())
    setHistorial(prev => [...prev, query]);
  };
  return (
    <div className="px-8 pt-4">
      <h1 className="text-4xl pb-4">Send Query</h1>
      <div className="flex gap-4 pb-6">
        <Input
          ref={input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button onClick={handleButton}>Send</Button>

      </div>
      <h2 class="text-3xl pb-2">Respuesta</h2>
      {
        JSON.stringify(resultado)
      }
      <h2 class="text-3xl pt-4 pb-2">Historial</h2>
      <div className="historial_container">
        <ul>
          {historial.map((h, key) => (
            <li onClick={() => setInputText(h)} key={key}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
