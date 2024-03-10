"use server";
import { getLevels } from "@/robtop/getLevel";

export const getLevelsFromGD = async ({ data }) => {
  
  console.log("Buscando", data);
  const levels = await getLevels(data);
  return JSON.stringify(levels);
};
