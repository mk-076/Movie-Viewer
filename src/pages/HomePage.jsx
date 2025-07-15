import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const refs = useRef([]);

  useGSAP(() => {
    gsap.from(refs.current, {
      opacity: 0,
      stagger: 0.1,
      y: -1000,
    });
  });

  return (
    <div
      ref={(e) => (refs.current[0] = e)}
      className="text-center flex flex-col h-screen justify-center items-center"
    >
      <h1 className="text-4xl font-bold text-center">
        Welcome To Movie Viewer🍿
      </h1>
      <Link
        ref={(e) => (refs.current[1] = e)}
        className="text-center font-semibold text-3xl mt-3 p-2 rounded-xl bg-blue-400 hover:bg-blue-500 transition-colors duration-75 shadow-md"
        to="/movies"
      >
        Browse Movies
      </Link>
    </div>
  );
}

export default HomePage;
