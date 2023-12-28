"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRef, useState } from "react";
import { degQuery } from "@/actions/admin/devQuery";
import GDSpinner from "@/components/GDIcons/GDSpinner";

export default () => {
  const [historial, setHistorial] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resultado, setResultado] = useState([]);
  const [loading, setLoading] = useState(false);
  const input = useRef();
  const handleButton = async () => {
    setLoading(true);
    const query = input.current.value;
    const data = JSON.parse(await degQuery({ query }));
    if (!data.error) {
      setResultado(data.result.rows);
      console.log(data.result.rows);
    } else setResultado(data.error);
    console.log("data", data);
    setLoading(false);
    // TODO hacer que esto funcione

    // const data = await apiRequest(config.apiURL + "dev/query", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // Tipo de contenido del cuerpo (en este caso, JSON)
    //   },
    //   body: JSON.stringify({ query }),
    // });

    // data.show();
    // setResultado(data.getRows())
    // console.log(data.getRows())
    setHistorial((prev) => [...prev, query]);
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
      {loading && <GDSpinner className={"w-[60px] h-[60px]"} />}

      <h2 className="text-3xl pb-2">Respuesta</h2>
      {JSON.stringify(resultado)}
      <h2 className="text-3xl pt-4 pb-2">Historial</h2>
      <div className="historial_container">
        <ul>
          {historial.map((h, key) => (
            <li onClick={() => setInputText(h)} key={key}>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
