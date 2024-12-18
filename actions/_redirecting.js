import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Redirecting = ({ path = "/" }) => {
  const [count, setCount] = useState(3);
  let router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && router.push(path);

    return () => clearInterval(interval);
  }, [count]);

  return <>Please wait for {count} second</>;
};

export default Redirecting;
