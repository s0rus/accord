import { useEffect, useRef } from "react";

const useChatScroll = <T>(dependency: T) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const container = ref.current.childNodes[1] as HTMLDivElement;
      const { scrollHeight } = container;
      container.scrollTo(0, scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const container = ref.current.childNodes[1] as HTMLDivElement;
      const { offsetHeight, scrollHeight, scrollTop } = container;

      if (scrollHeight <= scrollTop + offsetHeight + 100) {
        container.scrollTo(0, scrollHeight);
      }
    }
  }, [dependency]);

  return ref;
};

export { useChatScroll };
