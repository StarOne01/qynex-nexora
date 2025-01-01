"use client";

import Image from "next/image";
import { Do_Hyeon, Bungee_Hairline } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import managers, { mentors, team } from "../data/db";
import type { dbSchema } from "../data/db";

const hyeon = Do_Hyeon({ subsets: ["latin"], weight: "400" });
const bungee = Bungee_Hairline({ subsets: ["latin"], weight: "400" });

export default function Home() {

  const [currentSection, setCurrentSection] = useState("Intro");

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    let foundSection = currentSection;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        foundSection = section.id.charAt(0).toUpperCase() + section.id.slice(1);;
      }
    });

    if (foundSection !== currentSection) {
      setCurrentSection(foundSection);
    }

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

function cards(data: dbSchema) {
  return (
    <div
      key={data.name}
      className={
        "grid grid-cols-1 justify-items-center min-h-svh p-8 pb-20 sm:p-20 snap-start " +
        hyeon.className
      }
    >
      <div className="flex mt-8 flex-col max-w-[600px] gap-8 row-start-2 items-center sm:items-start">
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

        <ul className="flex gap-2 text-sm font-black flex-row flex-wrap justify-center sm:justify-start">
          {data.roles.map((role) => (
            <li
              key={role + data.name}
              data-aos="fade-in"
              className="border-2 border-[#9b9b9b] px-3 py-2 rounded-lg"
            >
              {role}
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

function Cards({ props, role }: { props: dbSchema[]; role: string }) {
 return (
    <section
    id={role}
      className="grid grid-cols-1 z-0 section gap-8 sm:gap-16"
    >
      {props.map((db: dbSchema) => cards(db))}
    </section>
  );
}
function Hero() {
  return (
    <section id="hello"
      className={
        "bg-cover bg-fixed bg-[url(https://wallpapershome.com/images/pages/pic_h/26430.jpg)] text-white text-center z-50  snap-start  " +
        bungee.className
      }
    >
      <div className="dark:bg-[#0000002f] bg-[#ffffff10] items-center min-h-svh flex justify-center backdrop-blur-md min-w-full ">
        <h1
          className={" text-white max-h-28 " + bungee.className}
          data-aos="fade-in"
        >
          <span className="text-8xl">Qynex</span> <br />
          <span className="text-5xl">Nexora</span>
        </h1>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="intro"
      className={
        "max-w-[800px] flex flex-col justify-evenly min-h-svh mx-auto p-8 sm:p-20 snap-start " +
        hyeon.className
      }
    >
      <div className="dark:bg-[#0000002f] text-center bg-[#ffffff10]  items-center flex justify-center min-w-full ">
        <h1 className={" text-white " + bungee.className}>
          <span className="text-8xl">Qynex</span> <br />
          <span className="text-5xl">Nexora</span>
        </h1>
      </div>
      <p className="text-md text-center mt-4 font-[family-name:var(--font-geist-mono)]">
        We are a team of passionate developers, designers, and creators who love
        to build and design things. We are always looking for new opportunities
        to learn and grow as developers and designers. We love to work on
        projects that involve both design and development. We have experience in
        web development, mobile app development, and game development. We are
        always looking for new opportunities to learn and grow as developers and
        designers.
      </p>
    </section>
  );
}

function Tag() {
  return (
    <div className="max-w-[800px] bottom-5 bg-black right-5 mx-auto flex justify-end fixed">
      <div
        className={
          "border-2 border-[#9b9b9b] px-3 py-2 rounded-lg font-black bottom-4 right-5 border-solid transition-colors flex items-center justify-center gap-2 text-xs " +
          hyeon.className
        }
      >
      {currentSection}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="flex z-10 fixed justify-around backdrop-blur-sm min-w-full items-center p-4">
      <div  className={"text-xl font-bold " + hyeon.className}>
        Qynex Nexora
      </div>
      <div className="flex gap-4 text-[13px] font-[family-name:var(--font-geist-mono)]">
        <a href="#mentors">Mentors</a>
        <a href="#managers">Managers</a>
        <a href="#team">Team</a>
      </div>
    </nav>
  );
}

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <>
      <Nav />
      <Hero />
      <Intro />
      <Cards props={mentors} role="mentors" />
      <Cards props={managers} role="managers" />
      <Cards props={team} role="team" />
      <Tag />
    </>
  );
}
