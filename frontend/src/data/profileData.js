export const profileData = {
  hero: {
    name: "John Doe",
    title: "Software Engineer & UI/UX Designer",
    tagline: "Building digital experiences that make an impact.",
    image: "https://via.placeholder.com/400x400?text=Avatar", // User can replace this easily
    cta: [
      { label: "View Projects", link: "#projects", primary: true },
      { label: "Contact Me", link: "#contact", primary: false },
    ],
  },
  about: {
    bio: "I am a passionate software engineer with a knack for creating clean, efficient, and user-friendly web applications. I love solving complex problems and learning new technologies.",
    interests: ["Artificial Intelligence", "Open Source", "Human-Computer Interaction"],
    strengths: ["Problem-Solving", "Adaptability", "Collaboration"],
    goals: ["Contribute to meaningful OS projects", "Bridge the gap between design and development"],
    unique: "My ability to blend technical skill with design thinking allows me to create products that are both functional and beautiful.",
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript (ES6+)", "Python", "Java", "C++"],
    },
    {
      category: "Web Development",
      items: ["React", "HTML5", "CSS3", "Node.js", "Express"],
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "Docker", "VS Code", "Figma", "MongoDB"],
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      problem: "Needed a way to showcase skills and projects in a professional manner.",
      solution: "Built a fully responsive, data-driven portfolio using React and Vite.",
      techStack: ["React", "CSS3", "Framer Motion"],
      githubLink: "https://github.com/johndoe/portfolio",
      liveLink: "https://johndoe.dev",
      image: "https://via.placeholder.com/600x400?text=Portfolio+Screenshot",
      tags: ["Web", "Design"],
    },
    {
      title: "AI Chatbot",
      problem: "Businesses often struggle with customer support response times.",
      solution: "Developed an AI-powered chatbot using OpenAI API to automate common queries.",
      techStack: ["Python", "Node.js", "OpenAI"],
      githubLink: "https://github.com/johndoe/ai-chatbot",
      liveLink: "",
      image: "https://via.placeholder.com/600x400?text=Project+2+Screenshot",
      tags: ["AI", "Data"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      specialization: "Software Engineering",
      college: "University of Technology",
      year: "2019 - 2023",
      coursework: ["Data Structures", "Algorithms", "Database Systems", "Web Security"],
    },
  ],
  codingProfiles: {
    github: "johndoe",
    leetcode: "https://leetcode.com/johndoe",
    codechef: "https://codechef.com/users/johndoe",
  },
  contact: {
    email: "john.doe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
};
