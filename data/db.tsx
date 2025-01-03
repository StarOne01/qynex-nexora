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
import Aderine from "../public/Aderine.jpg";
import Sunil from "../public/Sunil.jpeg";
import Poorani from "../public/poorani.png";
import Srimathi from "../public/srimathi.jpeg";
import Vishanth from "../public/Vishanth.jpeg";
import Sinega from "../public/Sinega.jpeg";
import Sneka from "../public/Sneka.jpeg";
import Rithika from "../public/Rithika.jpeg";
import Agalya from "../public/Agalya.jpeg";
import Navdeep from "../public/navdeep.png";
import Sweatha from "../public/Sweatha.jpg";
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
    name: "Navdeep",
    image: Navdeep,
    roles: [
      "Mentor",
      "MERN + LAMP developer",
      "ML Modeler",
      "Unity Developer ",
    ],
    description:
      "I am Navdeep, A versatile Full Stack Developer with expertise beyond the MERN stack, Navdeep is an AI/ML advocate, game developer, and entrepreneur. With a flair for graphic design and proficiency in tools like Photoshop and Illustrator, Navdeep seamlessly blends technical innovation with creative artistry. They excel in designing and delivering scalable, future-ready applications while crafting visually stunning graphics and interfaces. Driven by an entrepreneurial mindset, Navdeep thrives at the intersection of technology, creativity, and impactful problem-solving.",
    links: [
      ["Portfolio", "https://navdeep.vercel.app/"],
      ["LinkedIn", "http://www.linkedin.com/in/navdeep-navdeep"],
    ],
  },
  {
    name: "Hariharan",
    image: Hariharan,
    roles: ["Mentor", "Mod", "Content Creation Manager", "Event Management"],
    description:
      "I'm a storyteller at heart, translating concepts into captivating visuals. With a deep understanding of video editing principles and a passion for pushing creative boundaries, I transform raw footage into polished, engaging productions. Whether it's a dynamic commercial, a thought-provoking documentary, or a captivating short film, I bring a unique blend of technical skill and artistic vision to every project.",
    links: [
      ["Instagram", "https://www.instagram.com/hariharanbs18"],
      ["LinkedIn", "https://www.linkedin.com/in/hariharan-b-mech"],
    ],
  },
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
      "I’m Raja Guru R, a software engineer passionate about app development, cybersecurity, and AI. I have experience with Flutter for app development, prompt engineering in fine tuning LLM, and skills in ethical hacking, including vulnerability analysis, penetration testing and programming malware",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/raja-guru-s-8a3b1b1b3/"],
      ["Github", "https://github.com/rajaguru2004"],
    ],
  },
  {
    name: "Saran",
    image: Saran,
    roles: ["Friendly-Neighbourhood", "Kotlin Developer"],
    description:
      "A creative soul with a passion for bringing unique ideas to life. Known for patience and adaptability, I thrive in any situation. Proficient in cryptocurrencies and Android app development, I enjoy working with diverse teams to turn ideas into impactful solutions. Let’s collaborate and make a difference!",
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
    name: "Sivasangkari",
    image: SivaSankari,
    roles: ["Mod", "Hackathon Manager"],
    description:
      "I'm a developer and designer who loves to create and design things. I'm a full-stack developer, and I love to work on projects that involve both design and development. I have experience in web development, mobile app development, and game development. I'm always looking for new opportunities to learn and grow as a developer and designer.",
    links: [
      ["Portfolio", "https://sivasankari.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/sivasangkari-k-aiml"],
    ],
  },
];

const coOrds: dbSchema[] = [
  {
    name: "Aderine Perez",
    image: Aderine,
    roles: ["Mod", "Overall Co-ordinator"],
    description:
      "Hi, I’m Aderine, a CSE undergraduate from SNS College of Engineering, passionate about coding, UI/UX design, and building impactful projects. I’ve completed a masterclass in UI/UX design, gained experience in frontend development. I aim to innovate continuously, solve real-world problems, and eventually become a billionaire while inspiring others through my journey.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/aderine-perez"],
      [
        "Instagram",
        "https://www.instagram.com/aderine_2487/profilecard/?igsh=cW1kbzFwcG43amdn",
      ],
    ],
  },
  {
    name: "Karthikeyan C",
    image: Karthi,
    roles: ["Mod", "Overall Co-ordinator"],
    description:
      "I am Karthikeyan, a student with a strong passion for management and leadership. Academically, I excel in subjects that require critical thinking and problem-solving, and I enjoy applying these skills to real-world situations. Outside the classroom, I have taken on various leadership roles, where I've organized events, managed projects, and worked with diverse teams. I’m known for my ability to delegate tasks effectively, prioritize responsibilities, and keep teams motivated and focused on goals. My strong communication and organizational skills, along with my strategic thinking, make me confident in my ability to lead and manage successfully in any setting.",
    links: [
      ["Portfolio", "https://nandhakrishnan.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/nandhakrishnanp/"],
    ],
  },
  {
    name: "Sneka",
    image: Sneka,
    roles: ["Mod", "Event Management", "Overall Co-ordinator"],
    description:
      "I am a passionate learner and I have participated in  hackathons and worked on innovative ideas and solutions. I have a Good academic background and focus on building practical skills and programming knowledge. I actively take part in internships and projects to improve myself and gain hands-on experience. With curiosity and a proactive approach, I aim to grow and make a positive impact in my field.",
    links: [
      ["Instagram", "https://www.instagram.com"],
      ["LinkedIn", "https://www.linkedin.com/in/sneka-rt"],
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
      [
        "Linkedin",
        "https://www.linkedin.com/in/abhishek-v-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      ],
      [
        "Instagram",
        "https://www.instagram.com/_abhishek._3?igsh=MWVoN2owYnMwNzZ4dw==",
      ],
    ],
  },
  {
    name: "Agalyaa",
    image: Agalya,
    roles: ["Mod", "Hackathon Management"],
    description:
      "Enthusiastic coding enthusiast with a solid foundation in programming and a keen interest in software development. Proficient in languages like Python, Java and C , with basic knowledge of web technologies such as HTML, CSS, and JavaScript. Passionate about learning new technologies, solving problems and building projects that enhance my experience.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/agalyaa-k-i-06a8a830a"],
      ["Github", "https://github.com/snsctagalyaa"],
    ],
  },
  {
    name: "Rithika",
    image: Rithika,
    roles: ["Mod", "Event Management"],
    description:
      "I am a passionate and enthusiastic coder who is strong with C, C++, Python and Java. My recent focus has been on machine learning and data science, fields in which I have already undertaken hands-on projects and hackathons. Apart from academics, I have a deep interest in event management and volunteering. As Master of Ceremonies,  I excel in organizing and hosting events. I am also an active member of international clubs like the IMUN Club and Youth Parliament, where I enjoy discussing and presenting ideas. I believe in continuous growth, both personally and professionally, and I am eager to contribute my skills and enthusiasm to impactful projects.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/rithikavijay21"],
      [
        "Instagram",
        "https://www.instagram.com/itz._rithu/profilecard/?igsh=aTA1dDZyeTU5NG82",
      ],
    ],
  },
  {
    name: "Sinega",
    image: Sinega,
    roles: ["Event Management"],
    description:
      "I am Sinega Selvakumar, an enthusiastic learner and active member of Regex Club and Xenix Association at SNSCT, with a keen interest in cloud computing and DevOps. I possess foundational skills in data analytics and cybersecurity, complemented by certifications in Python, Google Cloud Computing (NPTEL),linux and participation in events like SIH Hackathon and Qubits. I have attended multiple workshops and even a webinar to enhance my technical expertise. As an active Rotaract member, I have hosted events, engaged in volunteering activities, and developed strong leadership, collaborative, and design-thinking skills. Passionate about networking and hosting events, I am eager to explore new opportunities!",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/sinegaselvakumar"],
      ["Github", "https://github.com/Sinex23/Sinex23"],
      //
    ],
  },
  {
    name: "Sooraj S Sunil",
    image: Sunil,
    roles: ["Content Creation Team"],
    description:
      "Hello, my name is Sooraj S Sunil. I am currently pursuing a degree in Computer Science and Engineering at SNS College of Technology, Coimbatore. Alongside my studies, I am a passionate video editor, creating engaging and innovative content that revolves around the art of video editing",
    links: [
      [
        "Instagram",
        "https://www.instagram.com/x_.iuss_/profilecard/?igsh=YnN2c3gzangxank4",
      ],
      ["LinkedIn", "https://www.linkedin.com/in/soorajssunil"],
    ],
  },
  {
    name: "Priya",
    image: Priya,
    roles: ["Mod", "Content Creation Team"],
    description:
      "Passionate about crafting seamless user experiences, I'm a front-end developer skilled in HTML, CSS, JavaScript, and Kotlin, Java. I have an experience in SQL and AWS. I'm currently expanding my skills in mobile app development to create innovative and engaging applications.",
    links: [
      ["Portfolio", "https://priya.vercel.app/"],
      ["LinkedIn", "https://www.linkedin.com/in/priya-s-8a3b1b1b3/"],
    ],
  },
  {
    name: "Sweatha",
    image: Sweatha,
    roles: ["Event Management"],
    description:
      "I  am an editor and designer who love to create new  innovative ideas and contents and also willing to learn more about designing,web development and also I am a hard-working and sportive person.I have a good leadership quality which I more important in team work.I am looking for new opportunities to learn and work with the experts and learners about designing.",
    links: [
      [
        "LinkedIn",
        "https://www.linkedin.com/in/sweatha-s-sudha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      ],
      [
        "Instagram",
        "https://www.instagram.com/swea_diaries/profilecard/?igsh=NmhhYzZ3cXVqOHdu",
      ],
    ],
  },
  {
    name: "Poorani",
    image: Poorani,
    roles: ["Event Management"],
    description:
      "I am an designer and developer with an innovative new ideas and creative ideas and willing to learn about new things which include web development and app development and also I am a enthusiastic learner with engaging personality.I am very punctual and I have a good leadership quality. And I am looking for good new opportunities to work with expertise and also looking for learn new things.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/poorani-ramesh"],
      [
        "Instagram",
        "https://www.instagram.com/lil_._blossom/profilecard/?igsh=MTNwaW5zNGJocGVoeg==",
      ],
    ],
  },
  {
    name: "Srimathi",
    image: Srimathi,
    roles: ["Event Management"],
    description:
      "I'm a designer and developer with restyling ideas. My leadership quality makes me even more confident. I have coding skills in C, C++ and Java.  I am an enthusiastic person looking forward to new opportunities that expose my designing and developing skills.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/srimathi-s-8a3b1b1b3/"],
      ["Instagram", "https://www.instagram.com/srimathi_18/"],
    ],
  },

  {
    name: "Vishanth",
    image: Vishanth,
    roles: ["Content Creation Team"],
    description:
      "I specialize in video editing using CapCut, where I create polished, visually engaging content with ease. Additionally, I am an intermediate user of Adobe Premiere Pro and After Effects, leveraging these tools for more advanced projects involving transitions, effects, and storytelling.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/vishanthviswanathan"],
      [
        "Instagram",
        "https://www.instagram.com/vishanth._.03?igsh=Y2p2aGVxdG9kOGZv",
      ],
    ],
  },
  {
    name: "Sujay Krishna RP",
    image: Sujay,
    roles: ["Event Management"],
    description:
      "A dynamic and creative Teenager with a passion for Innovation, Event Management, and Culinary Arts, currently pursuing a Bachelor's Degree in Food Technology. Driven by the motto, Being Happy is by Making Others Happy, they excel at blending their love for Creating New Things with Organizing Memorable Events. With Cooking as a cherished hobby, they find joy in crafting unique Culinary Experiences that bring smiles to those around them, reflecting their Compassionate and Enterprising Spirit.",
    links: [
      ["LinkedIn", " https://www.linkedin.com/in/sujay-krishna"],
      ["Instagram", "https://www.instagram.com/sujaykrishna.rp"],
    ],
  },
  {
    name: "Priyadharshini",
    image: PriyaDharshini,
    roles: ["Mod", "Content Creation Team"],
    description:
      "I am a designer who loves to create something new and innovation and I always learn new things  I am a hard and smart working person and spotive person I am looking for a new opportunities to learn and grow as  designer.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/priyadharshini-g---"],
      ["Instagram", "https://www.linkedin.com/in/priyadharshini-g---"],
    ],
  },
  {
    name: "Kunguma Sri Varthini",
    image: Kunguma,
    roles: ["Mod", "Content Creation Team"],
    description:
      "As a highly enthusiastic and passionate individual, I approach every challenge with dedication and excellence. With my natural leadership skills and guidance, I empower high-performing teams to achieve exceptional results and drive success.",
    links: [
      ["LinkedIn", "https://www.linkedin.com/in/kunguma-sri-vardhini-m"],
      [
        "Instagram",
        "https://www.instagram.com/classy_girl_0318?igsh=YzljYTk1ODg3Zg==",
      ],
    ],
  },
  {
    name: "Nitish",
    image: Nithish,
    roles: ["Hackathon Management"],
    description:
      "A typical tech nerd, but with curiosity to prompt out any topic and understand it patiently. Tech enthusiast with a knack for deep dives into niche topics. Skilled in system design, management, and maintenance. Always open for discussions—let's connect and brainstorm!",
    links: [
      ["Linkedin", "https://www.linkedin.com/in/nitish--rajendran"],
      ["Github", "https://github.com/Nitish-Rajendran"],
    ],
  },
  {
    name: "Prashanth (StarOne01)",
    image: Me,
    // "https://i.cdn.newsbytesapp.com/images/28755281716927168.jpeg?tr=w-720",
    roles: [
      "Mentor",
      "Mod",
      "MERN Developer",
      "ML Modeler",
      "CyberSec",
      "Compiler + Kernel Cook",
      "Flutter Developer",
      "Founder",
    ],
    description:
      "Heya! Welcome, I’m someone who loves diving deep into how things work, whether it’s technology like cybersecurity, operating systems, and networks, or broader topics like cosmology and human psychology. I enjoy hands-on learning and exploring areas like electronics, cryptography, and even racing. I’m also passionate about open-source projects and finding creative ways to solve real-world problems. For me, it’s all about learning, growing, and making a meaningful impact through the things I’m passionate about.",
    links: [
      ["Portfolio", "https://starone01.github.io/"],
      ["Github", "https://github.com/StarOne01/"],
    ],
  },
];

export type { dbSchema };
export default managers;
export { mentors, team, coOrds };
