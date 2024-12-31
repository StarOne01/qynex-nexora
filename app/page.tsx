"use client";

import Image from "next/image";
import { Do_Hyeon,Bungee_Hairline     } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import Nithish from "../public/nithish.jpeg";
import Sachin from "../public/sachin.jpeg";
import { useEffect } from "react";
import { StaticImageData } from "next/image";


const hyeon = Do_Hyeon({ subsets: ["latin"], weight: "400" });
const foldit = Bungee_Hairline({ subsets: ["latin"], weight: "400" });

type dbSchema = {
  name: string;
  image: string | StaticImageData;
  roles: string[];
  description: string;
  links: [[string, string], [string, string]];
};

const db: dbSchema[] = [
  {
    name: "Sachin PJ",
    image: Sachin,
    roles: ["Mod", "Events Manager"],
    description:
      "A typical tech nerd, but with curiosity to prompt out any topic and understand it patiently. Tech enthusiast with a knack for deep dives into niche topics. Skilled in system design, management, and maintenance. Always open for discussions—let's connect and brainstorm!",
    links: [
      ["Linkedin", "https://www.linkedin.com/in/nitish--rajendran"],
      ["Github", "https://github.com/Nitish-Rajendran"],
    ],
  },
  {
    name: "Nithish",
    image: Nithish,
    roles: ["Mod"],
    description:
      "A typical tech nerd, but with curiosity to prompt out any topic and understand it patiently. Tech enthusiast with a knack for deep dives into niche topics. Skilled in system design, management, and maintenance. Always open for discussions—let's connect and brainstorm!",
    links: [
      ["Linkedin", "https://www.linkedin.com/in/nitish--rajendran"],
      ["Github", "https://github.com/Nitish-Rajendran"],
    ],
  },
  {
    name: "Prashanth (StarOne01)",
    image:
      "https://i.cdn.newsbytesapp.com/images/28755281716927168.jpeg?tr=w-720",
    roles: ["Mentor", "Mod", "Founder"],
    description:
      "I'm a developer and designer who loves to create and design things. I'm a full-stack developer, and I love to work on projects that involve both design and development. I have experience in web development, mobile app development, and game development. I'm always looking for new opportunities to learn and grow as a developer and designer.",
    links: [
      ["Portfolio", "https://starone01.github.io/"],
      ["Github", "https://github.com/StarOne01/"],
    ],
  },
];
function cards(data: dbSchema) {
  return (
    <div
      key={data.name}
      className={
        "grid grid-cols-1 justify-items-center min-h-svh p-8 pb-20 sm:p-20 snap-start " +
        hyeon.className
      }
    >
      <div className="flex flex-col max-w-[600px] gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="rounded-lg"
          src={data.image}
          alt="StarOne01"
          data-aos="fade-in"
          width={180}
          height={38}
          priority
        />
        <div className="text-4xl text-center sm:text-left">{data.name}</div>

        <ul className="flex gap-2 text-sm font-black flex-row">
          {data.roles.map((role) => (
            <li key={role + data.name} data-aos="fade-in">
              <span className="border-2 border-[#9b9b9b] px-3 py-2 rounded-lg">
                {role}
              </span>
            </li>
          ))}
        </ul>
        <p
          data-aos="fade-in"
          className="list-inside list-disc  text-sm sm:text-left text-center font-[family-name:var(--font-geist-mono)]"
        >
          {data.description}
        </p>
        <div className="flex gap-4 items-center flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href={data.links[0][1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.links[0][0]}
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href={data.links[1][1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.links[1][0]}
          </a>
        </div>
      </div>
    </div>
  );
}

function Cards({ props }: { props: dbSchema[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-16">
      {props.map((db: dbSchema) => cards(db))}
    </div>
  );
}

function Hero() {
  return (
    <div
      className={
        "bg-cover bg-fixed bg-[url(https://wallpapershome.com/images/pages/pic_h/26430.jpg)] text-white sm:text-[200px] text-center snap-start " + foldit.className      }
    >
      <div className="dark:bg-[#0000002f] bg-[#ffffff10]  items-center min-h-svh flex justify-center min-w-full ">
      <h1 className=" text-white " data-aos='fade-in'>
        <span className="text-8xl">Qynex</span> <br />
        <span className="text-5xl">Nexora</span>
      </h1>
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <>
      <Hero />
      <Cards props={db} />
    </>
  );
}
