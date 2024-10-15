import { useEffect, useState } from "react";
import type { ApiCallProps } from "../types/extraTypes";

//api call template

export default function ApiCall<T>({
  api,
  key,
  setData,
  setLoading,
}: ApiCallProps<T>) {
  useEffect(() => {
    fetch(`https://learn2veteran.moktor.com/api/${api}/${key}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
}
