import Nithish from "../public/nithish.jpeg";
import Sachin from "../public/sachin.jpeg";
import Nandha from "../public/Nandha.jpg";
import Gurubaran from "../public/Gurubaran.jpeg";
import Hariharan from "../public/Hariharan.jpeg";
import Priya from "../public/Priya.jpeg";
import RajaGuru from "../public/RajaGuru.jpeg";
import Saran from "../public/Saran.jpeg";
import SivaSankari from "../public/SivaSankari.jpeg";
import Karthi from "../public/Karthi.jpg";
import PriyaDharshini from "../public/PriyaDharshini.jpeg";
import Kunguma from "../public/Kunguma.jpeg";
import Sujay from "../public/Sujay.jpeg";
import Abhi from "../public/Abhi.jpeg";
import Me from "../public/Me.jpeg";
import Sneka from "../public/Sneka.jpeg";
import Rithika from "../public/Rithika.jpeg";
import Agalya from "../public/Agalya.jpeg"; 
import { StaticImageData } from "next/image";

type dbSchema = {
  name: string;
  image: string | StaticImageData;
  roles: string[];
  description: string;
  links: [[string, string], [string, string]];
};

const mentors: dbSchema[] = [
  {
    name: "Nandha Krishnan",
    image: Nandha,
    roles: ["Mentor", "MERN Developer", "React Native Developer"],
    description:
      "I'm a tech guy who passionate on building Impactful products, I work on Web application and Mobile Application Development , I'm always looking for new opportunities to learn and grow as a developer .",
    links: [
      ["Portfolio", "https://nandhakrishnan.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/nandhakrishnanp/"],
    ],
  },
  {
    name: "Gurubaran",
    image: Gurubaran,
    roles: ["Mentor", "Mod", "ML Modeler", "CyberSec"],
    description:
      "I'm someone who’s deeply passionate about technology and science, always driven to explore, learn, and create. With good knowledge of Python, MySQL, MongoDB, C programming, networking,Rust, operating systems,  I love diving into challenges and turning them into impactful solutions. ",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/gurubaran-s-4b7b1b1b3/"],
      ["Reddit", "https://www.reddit.com/u/itx_gxru_7/s/NfvMVD2Mzv"],
    ],
  },
  {
    name: "Raja Guru",
    image: RajaGuru,
    roles: ["Mentor", "Flutter Developer", "CyberSec", "ML Modeler"],
    description:
      "I'm a developer and designer who loves to create and design things. I'm a full-stack developer, and I love to work on projects that involve both design and development. I have experience in web development, mobile app development, and game development. I'm always looking for new opportunities to learn and grow as a developer and designer.",
    links: [
      ["Portfolio", "https://rajaguru.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/raja-guru-s-8a3b1b1b3/"],
    ],
  },
  {
    name: "Saran",
    image: Saran,
    roles: ["Friendly-Neighbourhood", "Kotlin Developer"],
    description:
      "I'm a developer and designer who loves to create and design things. I'm a full-stack developer, and I love to work on projects that involve both design and development. I have experience in web development, mobile app development, and game development. I'm always looking for new opportunities to learn and grow as a developer and designer.",
    links: [
      ["Portfolio", "https://saran.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/saranraj-p/"],
    ],
  },
];

const managers: dbSchema[] = [
  {
    name: "Sachin PJ",
    image: Sachin,
    roles: ["Mod", "Events Manager"],
    description:
      "I am Sachin, an active member of the Rotaract Club with a strong passion for management and event conduction. Through my involvement in the club, I’ve had the opportunity to lead and participate in a variety of community service projects, honing my skills in teamwork, leadership, and event coordination. I have taken on roles where I organized and managed events, ensuring they ran smoothly from start to finish. Whether it’s managing logistics, communicating with team members, or handling unexpected challenges, I’m confident in my ability to lead and deliver successful outcomes. My experiences in the Rotaract Club have not only strengthened my management skills but also deepened my commitment to making a positive impact in my community.",
    links: [
      ["Linkedin", "https://www.linkedin.com/in/sachin-pj-2baba6325/"],
      ["Github", "https://github.com/Nitish-Rajendran"],
    ],
  },
  {
    name: "Hariharan",
    image: Hariharan,
    roles: ["Mod", "Content Creation Manager", "Event Management"],
    description:
      "I'm a storyteller at heart, translating concepts into captivating visuals. With a deep understanding of video editing principles and a passion for pushing creative boundaries, I transform raw footage into polished, engaging productions. Whether it's a dynamic commercial, a thought-provoking documentary, or a captivating short film, I bring a unique blend of technical skill and artistic vision to every project.",
    links: [
      ["Instagram", "https://www.instagram.com/hariharanbs18"],
      ["LinkedIn", "https://www.linkedin.com/in/hariharan-b-mech"],
    ],
  },
  {
    name: "Karthikeyan C",
    image: Karthi,
    roles: ["Mod", "Head Co-ordinator"],
    description:
      "I am Karthikeyan, a student with a strong passion for management and leadership. Academically, I excel in subjects that require critical thinking and problem-solving, and I enjoy applying these skills to real-world situations. Outside the classroom, I have taken on various leadership roles, where I've organized events, managed projects, and worked with diverse teams. I’m known for my ability to delegate tasks effectively, prioritize responsibilities, and keep teams motivated and focused on goals. My strong communication and organizational skills, along with my strategic thinking, make me confident in my ability to lead and manage successfully in any setting.",
    links: [
      ["Portfolio", "https://nandhakrishnan.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/nandhakrishnanp/"],
    ],
  },
  {
    name: "Sivasangkari",
    image: SivaSankari,
    roles: ["Mod", "Hackathon Management"],
    description:
      "I'm a developer and designer who loves to create and design things. I'm a full-stack developer, and I love to work on projects that involve both design and development. I have experience in web development, mobile app development, and game development. I'm always looking for new opportunities to learn and grow as a developer and designer.",
    links: [
      ["Portfolio", "https://sivasankari.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/sivasangkari-k-aiml"],
    ],
  },
  {
    name: "Sneka",
    image: Sneka,
    roles: ["Mod", "Content Creation Manager", "Head Co-ordinator"],
    description:
      "I'm a storyteller at heart, translating concepts into captivating visuals. With a deep understanding of video editing principles and a passion for pushing creative boundaries, I transform raw footage into polished, engaging productions. Whether it's a dynamic commercial, a thought-provoking documentary, or a captivating short film, I bring a unique blend of technical skill and artistic vision to every project.",
    links: [
      ["Instagram", "https://www.instagram.com/hariharanbs18"],
      ["LinkedIn", "https://www.linkedin.com/in/hariharan-b-mech"],
    ],
  },
];

const team: dbSchema[] = [
  {
    name: "Abhishek",
    image: Abhi,
    roles: ["Mod", "Event Management"],
    description:
      "Aspiring Electrical and electronics engineer with a passion to explore diverse fields. I find joy in automation, embedded systems, designing, and editing, and I am currently a  member of the eKart team.",
    links: [
      ["Linkedin", "https://www.linkedin.com/in/abhishek-v-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"],
      ["Instagram", "https://www.instagram.com/_abhishek._3?igsh=MWVoN2owYnMwNzZ4dw=="],
    ],
  },
  {
    name: "Agalyaa",
    image: Agalya,
    roles: ["Mod", "Hackathon Management"],
    description:
      "Enthusiastic coding enthusiast with a solid foundation in programming and a keen interest in software development. Proficient in languages like Python, Java and C , with basic knowledge of web technologies such as HTML, CSS, and JavaScript. Passionate about learning new technologies, solving problems and building projects that enhance my experience.",
    links: [
      ["Instagram", "https://www.instagram.com/"],
      ["LinkedIn", "https://www.linkedin.com/in/agalyaa-k-i-06a8a830a"],
    ],
  },
  {
    name: "Rithika",
    image: Rithika,
    roles: ["Mod", "Event Management"],
    description:
      "I am a designer who loves to create something new and innovation and I always learn new things  I am a hard and smart working person and spotive person I am looking for a new opportunities to learn and grow as  designer.",
    links: [
      ["Portfolio", "https://sivasankari.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/siva-sankari-s-8a3b1b1b3/"],
    ],
  },
  {
    name: "Priya",
    image: Priya,
    roles: ["Mod"],
    description:
      "Passionate about crafting seamless user experiences, I'm a front-end developer skilled in HTML, CSS, JavaScript, and Kotlin, Java. I have an experience in SQL and AWS. I'm currently expanding my skills in mobile app development to create innovative and engaging applications.",
    links: [
      ["Portfolio", "https://priya.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/priya-s-8a3b1b1b3/"],
    ],
  },
  {
    name: "Nitish",
    image: Nithish,
    roles: ["Mod", "Hackathon Management"],
    description:
      "A typical tech nerd, but with curiosity to prompt out any topic and understand it patiently. Tech enthusiast with a knack for deep dives into niche topics. Skilled in system design, management, and maintenance. Always open for discussions—let's connect and brainstorm!",
    links: [
      ["Linkedin", "https://www.linkedin.com/in/nitish--rajendran"],
      ["Github", "https://github.com/Nitish-Rajendran"],
    ],
  },

  {
    name: "Sujay Krishna RP",
    image: Sujay,
    roles: ["Mod", "Event Management"],
    description:
      "A dynamic and creative Teenager with a passion for Innovation, Event Management, and Culinary Arts, currently pursuing a Bachelor's Degree in Food Technology. Driven by the motto, Being Happy is by Making Others Happy, they excel at blending their love for Creating New Things with Organizing Memorable Events. With Cooking as a cherished hobby, they find joy in crafting unique Culinary Experiences that bring smiles to those around them, reflecting their Compassionate and Enterprising Spirit.",
    links: [
      ["LinkedIn", " https://www.linkedin.com/in/sujay-krishna"],
      ["Mail", "mailto:sujayb2w@gmail.com"],
    ],
  },
  {
    name: "Priya Dharshini",
    image: PriyaDharshini,
    roles: ["Mod", "Content Creation Team"],
    description:
      "I am a designer who loves to create something new and innovation and I always learn new things  I am a hard and smart working person and spotive person I am looking for a new opportunities to learn and grow as  designer.",
    links: [
      ["Portfolio", "https://sivasankari.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/siva-sankari-s-8a3b1b1b3/"],
    ],
  },
  {
    name: "Kunguma Sri Varthini",
    image: Kunguma,
    roles: ["Mod", "Content Creation Team"],
    description:
      "As a highly enthusiastic and passionate individual, I approach every challenge with dedication and excellence. With my natural leadership skills and guidance, I empower high-performing teams to achieve exceptional results and drive success.",
    links: [
      ["Portfolio", "https://sivasankari.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/siva-sankari-s-8a3b1b1b3/"],
    ],
  },
  {
    name: "Prashanth (StarOne01)",
    image: Me,
      // "https://i.cdn.newsbytesapp.com/images/28755281716927168.jpeg?tr=w-720",
    roles: ["Mentor", "Mod", "Founder"],
    description:
      "I’m someone who loves diving deep into how things work, whether it’s technology like cybersecurity, operating systems, and networks, or broader topics like cosmology and human psychology. I enjoy hands-on learning and exploring areas like electronics, cryptography, and even racing. I’m also passionate about open-source projects and finding creative ways to solve real-world problems. For me, it’s all about learning, growing, and making a meaningful impact through the things I’m passionate about.",
    links: [
      ["Portfolio", "https://starone01.github.io/"],
      ["Github", "https://github.com/StarOne01/"],
    ],
  },

];

export type { dbSchema };
export default managers;
export { mentors, team };
