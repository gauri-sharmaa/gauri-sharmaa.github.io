import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    // If navigating from home page to a hash on /projects, do not scroll to top
    if (hash && prevPath.current === "/") {
      prevPath.current = pathname;
      return;
    }
    window.scrollTo(0, 0);
    prevPath.current = pathname;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop; 