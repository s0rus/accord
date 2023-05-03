import { useRef, type ChangeEvent } from "react";

export const useInputResize = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const handleInputResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      console.log("xDDDDDDDDDDDDDDDD");
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return {
    inputRef: ref,
    handleInputResize,
  };
};
