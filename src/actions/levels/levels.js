"use server";
import { getLevels } from "@/robtop/getLevel";

export const getLevelsFromGD = async ({ data }) => {
  let errorMessage = "La cuenta solicitada no existe en Geometry Dash";
  console.log("Buscando", data);
  const levels = await getLevels(data);
  console.log(levels);

  // return levels;

  return JSON.stringify({
    error: errorMessage,
    status: 500,
  });
};
