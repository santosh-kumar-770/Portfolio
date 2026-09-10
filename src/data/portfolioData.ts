import type { PersonalInfo, Project, Experience, SkillGroup } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Itte Santosh Kumar',
  shortName: 'Santosh Kumar',
  badge: "CSE '28 (AI & ML) · PYTHON & DJANGO DEVELOPER · BUILDER",
  taglineHeadline: [
    'BUILDING THINGS.',
    'SOLVING PROBLEMS.',
    'EXPLORING WHAT\'S NEXT.'
  ],
  intro: "I'm Santosh — a Computer Science Engineering student (AI & ML) and developer focused on Python, backend systems, machine learning, and turning ideas into working software.",
  supportingStatement: "Passionate software enthusiast with expertise in AI/ML, Data Science, and Web Development. Constantly exploring innovative technologies and developing solutions to real-world problems.",
  detailedBio: [
    "I'm a Computer Science and Engineering (AI & ML) student at Krishna Chaitanya Institute of Technology and Sciences with a commitment to building real-world software, backend architectures, and machine learning models.",
    "My technical focus spans Python, Flask, Django, REST APIs, and fundamental Deep Learning. I've engineered neural networks from scratch using NumPy to understand forward/backpropagation mathematically and developed community-driven platforms like STUCET with Supabase and PostgreSQL.",
    "Beyond software implementation, I actively engage with student developer communities as a Campus Ambassador for NIMBLUX and contribute to national tech conferences."
  ],
  currentlyExploring: [
    'AI & Deep Learning Algorithms',
    'Python & Backend Architectures',
    'Data Structures & Algorithms (DSA)',
    'Practical Web Applications'
  ],
  statusText: 'Available for software engineering & AI/ML internships and projects',
  availableForOpportunities: true,
  email: 'santoshkumaritte7@gmail.com',
  githubUsername: 'santosh-kumar-770',
  socials: {
    github: 'https://github.com/santosh-kumar-770',
    linkedin: 'https://www.linkedin.com/in/santoshkumaritte/',
    email: 'mailto:santoshkumaritte7@gmail.com'
  },
  resumePdfPath: '/assets/resume/resume.pdf',
  profileImagePath: '/assets/images/profile.jpg',
  educationList: [
    {
      institution: 'Krishna Chaitanya Institute of Technology and Sciences',
      degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
      period: '2024 – Present',
      score: 'Currently Pursuing',
      highlights: [
        'Specialization in Artificial Intelligence & Machine Learning',
        'Active in campus developer activities and technical initiatives'
      ]
    },
    {
      institution: 'CLR Junior College',
      degree: 'Intermediate BIEAP',
      period: '2019 – 2021',
      score: 'Marks: 789 / 1000'
    },
    {
      institution: 'Krupaamrutha High School',
      degree: 'Class 10th BSEAP',
      period: '2018 – 2019',
      score: 'Marks: 552 / 600'
    }
  ],
  certifications: [
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/certification/Santosh714/responsive-web-design'
    },
    {
      title: 'Python (Basic)',
      issuer: 'HackerRank',
      url: 'https://www.hackerrank.com/certificates/b8a167d45b9b'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'Unstop',
      url: 'https://unstop.com/certificate-preview/f9331ba3-3589-4e53-9598-e383e1db772f?utm_campaign=site-emails'
    },
    {
      title: 'Digital Credential (2025H2S06AID)',
      issuer: 'Hack2skill',
      url: 'https://certificate.hack2skill.com/legacy/2025H2S06AID-I03900'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'Unstop',
      url: 'https://unstop.com/certificate-preview/e24c1a48-6f2b-4c1f-a45c-d95ec5ec2298?utm_campaign=site-emails'
    },
    {
      title: 'Certificate of Participation',
      issuer: 'Unstop',
      url: 'https://unstop.com/certificate-preview/972752a0-94e3-4a68-8a7f-4732d37491e9?utm_campaign=site-emails'
    }
  ]
};

export const curatedProjects: Project[] = [
  {
    id: 'mnist-scratch',
    title: 'MNIST Digit Classification',
    subtitle: 'Neural Networks | NumPy',
    tagline: 'Deep learning mechanics without high-level frameworks: pure mathematical implementation of backprop and gradient descent.',
    description: 'Developed a two-layer neural network from scratch using NumPy to classify handwritten digits from the MNIST dataset without using deep learning frameworks. Implemented the complete forward and backward propagation pipeline, ReLU activation, Softmax classification, one-hot encoding, and gradient descent optimization.',
    technologies: ['Python', 'NumPy', 'Matplotlib', 'Neural Networks'],
    highlights: [
      'Implemented forward and backward propagation from first principles',
      'ReLU activation, Softmax probability distribution, one-hot encoding & gradient descent',
      'Custom training/prediction workflow, validation split, accuracy evaluation & Matplotlib visualization'
    ],
    githubUrl: 'https://github.com/santosh-kumar-770',
    image: '/assets/images/projects/mnist.svg',
    featured: true,
    status: 'Open Source',
    category: 'AI / Machine Learning'
  },
  {
    id: 'stucet',
    title: 'STUCET – EAPCET Papers Hub',
    subtitle: 'Web Development | Supabase',
    tagline: 'Streamlining exam prep by organizing past question papers in a unified, community-driven interface.',
    description: 'Developed a community-driven platform for organizing EAPCET question papers by state, year, date, and shift, with direct access to Google Drive resources. Integrated Supabase (PostgreSQL) for persistent storage and deployed a responsive web app via Vercel.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    highlights: [
      'Organized question papers by state, year, date, and shift with Google Drive access',
      'Integrated Supabase (PostgreSQL) for structured storage & dynamic paper retrieval',
      'Responsive study platform built with Vanilla JavaScript and deployed on Vercel'
    ],
    liveUrl: 'https://stucet.vercel.app/',
    githubUrl: 'https://github.com/santosh-kumar-770',
    image: '/assets/images/projects/stucet.svg',
    featured: true,
    status: 'Live',
    category: 'Web Platform'
  },
  {
    id: 'eventloop',
    title: 'EventLoop',
    subtitle: 'Smart Event Networking & Attendee Connect',
    tagline: 'Bridging the cold-start gap for tech conferences, meetups, and hackathon networking.',
    description: 'A networking platform concept designed to enable meaningful connections between event attendees before, during, and after tech gatherings. Tackles the cold-start problem in professional networking through interest matching and shared agendas.',
    technologies: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'System Design'],
    highlights: [
      'Attendee discovery engine based on shared tracks and engineering interests',
      'Modular RESTful API schema designed for real-time agenda syncing',
      'Contextual 1-on-1 meetup scheduling designed for conference environments'
    ],
    githubUrl: 'https://github.com/santosh-kumar-770',
    image: '/assets/images/projects/eventloop.svg',
    featured: true,
    status: 'In Progress',
    category: 'Systems & APIs'
  }
];

export const experiences: Experience[] = [
  {
    id: 'hack-culprit',
    role: 'Web Development Intern',
    organization: 'Hack Culprit Technologies',
    period: 'July 2026 – Present',
    type: 'Internship',
    description: 'Contributing to web development projects as a Web Development Intern, applying practical development skills to build and improve web-based applications. Collaborating on real-world development tasks with modern web workflows.',
    skills: ['Web Development', 'JavaScript', 'HTML/CSS', 'Git', 'API Integration']
  },
  {
    id: 'nimblux',
    role: 'Campus Ambassador',
    organization: 'NIMBLUX',
    period: 'August 2026 – Present',
    type: 'Leadership',
    description: 'Representing NIMBLUX on campus, promoting its initiatives, and connecting students with relevant opportunities and activities. Supporting student outreach and community engagement.',
    skills: ['Community Leadership', 'Technical Outreach', 'Communication', 'Event Coordination']
  },
  {
    id: 'volunteer-datahack',
    role: 'Student Volunteer / Event Support',
    organization: 'DataHack Summit',
    period: '2026',
    type: 'Volunteering',
    description: 'Supported conference operations, session facilitation, attendee assistance, and developer community engagement at DataHack Summit.',
    skills: ['Conference Operations', 'Community Engagement', 'Networking']
  },
  {
    id: 'mentiby',
    role: 'Learner',
    organization: 'MentiBY',
    period: 'January 2025 – July 2025',
    type: 'Education & Learning',
    description: 'Structured intensive learning in foundational software development, algorithmic problem solving, and modern developer tooling.',
    skills: ['Software Fundamentals', 'Problem Solving', 'Python', 'Web Basics']
  }
];

export const skillGroups: SkillGroup[] = [
  {
    group: 'LANGUAGES',
    skills: ['JavaScript', 'Python', 'HTML', 'CSS', 'SQL']
  },
  {
    group: 'FRAMEWORKS / TOOLS',
    skills: ['Flask', 'Tailwind CSS', 'Vite', 'Django', 'Supabase', 'PostgreSQL', 'Vercel', 'Git', 'GitHub']
  },
  {
    group: 'AREAS',
    skills: ['Machine Learning', 'Deep Learning', 'NumPy', 'DSA', 'Problem Solving', 'Debugging', 'REST APIs', 'Strategic Thinking', 'Communication']
  }
];
