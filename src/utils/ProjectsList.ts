import {
    HtmlIcon, CssIcon, JsIcon, ReactIcon, NodeIcon, TsIcon, NextIcon, MysqlIcon, MongoIcon, GdriveIcon, SocketIoIcon, RestApiIcon, PhpIcon, ViteIcon, NextAuthIcon, ReduxIcon, TailwindIcon, ZustandIcon, AstroIcon, NanostoresIcon, D3JsIcon, ReactQueryIcon, EdgeStoreIcon, PythonIcon, DjangoIcon, RailwayIcon, VercelIcon, PostgresIcon, DockerIcon, NginxIcon, GunicornIcon, BootstrapIcon
} from "../assets/Icons"

import {
    NextmartLogo, ArmsLogo, ArmsPhpLogo, ClimateLogo, CovidtraxLogo, DaysbeyondLogo, FilmstackLogo, PikturesLogo, SrinivasLogo, XReconLogo, YoatubeLogo, VortexaLogo
} from "../assets/Logos"

import {
    NextmartShots, Armsv1Shots, Armsv2Shots, ClimateShots, CovidTraxShots, DaysbeyondShots, FilmstackShots, PikturesShots, SrinivasShots, XreconShots, YoatubeShots, VortexaShots, Armsv3Shots
} from "../assets/Shots"

import {
    ARMSv1Mockup, ARMSv2Mockup, ARMSv3Mockup, ClimateMockup, DaysbeyondMockup, SrinivasMockup, VortexaMockup, XreconMockup, YoatubeMockup
} from "../assets/Mockup"

// Importing User Images
import WatchImage from "../assets/watch.png";
import CrmImage from "../assets/crm.jpg";
import ChessImage from "../assets/chess.jpg";
import PythonImage from "../assets/python.jpg";
import DpmsImage from "../assets/DPMS.png";
import NotesAppImage from "../assets/notes_app.png";
import CourseHubImage from "../assets/CP.png";


type ProjectsListType = {
    Name: string,
    ShortDesc: string,
    Desc: string,
    Logo: ImageMetadata,
    Shot: ImageMetadata,
    Mockup: ImageMetadata,
    Theme: string,
    Status: string,
    Link: string,
    Source: string,
    Demo?: {
        email: string,
        password: string
    },
    Tech: {
        title: string,
        description: string,
        icon: ImageMetadata
    }[],
    features: {
        title: string,
        description: string
    }[],
    hideProject: boolean,
    LogoSize: number,
    versions: {
        title: string,
        version: string
    }[]
}[]

const TechInfo = {
    HTML: {
        title: "HTML",
        description: "HyperText Markup Language for creating the structure of web pages.",
        icon: HtmlIcon
    },
    CSS: {
        title: "CSS",
        description: "Cascading Style Sheets for styling the presentation of HTML documents.",
        icon: CssIcon
    },
    JavaScript: {
        title: "JavaScript",
        description: "High-level scripting language for adding interactivity to web pages.",
        icon: JsIcon
    },
    React: {
        title: "React",
        description: "JavaScript library for building user interfaces with reusable components.",
        icon: ReactIcon
    },
    Node: {
        title: "Node.js",
        description: "JavaScript runtime for server-side applications, enabling scalable and event-driven architecture.",
        icon: NodeIcon
    },
    TypeScript: {
        title: "TypeScript",
        description: "A superset of JavaScript adding static typing for building large-scale applications with enhanced maintainability and tooling support.",
        icon: TsIcon
    },
    Next: {
        title: "Next.js",
        description: "A React framework for server-side rendering, static site generation, and routing, offering improved performance and SEO optimization.",
        icon: NextIcon
    },
    MySQL: {
        title: "MySQL",
        description: "Open-source relational database management system for storing and managing structured data.",
        icon: MysqlIcon
    },
    MongoDB: {
        title: "MongoDB",
        description: "NoSQL database offering flexibility and scalability for storing and managing data efficiently.",
        icon: MongoIcon
    },
    GDrive: {
        title: "Google Drive API",
        description: "RESTful API for integrating Google Drive functionalities such as file storage and synchronization into applications.",
        icon: GdriveIcon
    },
    SocketIO: {
        title: "Socket.IO",
        description: "Real-time bidirectional communication library for building interactive web applications.",
        icon: SocketIoIcon
    },
    RESTAPI: {
        title: "REST API",
        description: "Architectural style for designing networked applications with standardized HTTP operations.",
        icon: RestApiIcon
    },
    PHP: {
        title: "PHP",
        description: "Server-side scripting language for building dynamic web applications.",
        icon: PhpIcon
    },
    Vite: {
        title: "Vite",
        description: "Modern build tooling for web development with rapid startup and hot module replacement.",
        icon: ViteIcon
    },
    NextAuth: {
        title: "NextAuth.js",
        description: "Authentication library designed specifically for Next.js applications, providing robust authentication features and seamless integration.",
        icon: NextAuthIcon
    },
    Redux: {
        title: "Redux",
        description: "Predictable state management library for JavaScript applications, enabling developers to write consistent, scalable code with ease.",
        icon: ReduxIcon
    },
    TailwindCSS: {
        title: "Tailwind CSS",
        description: "A utility-first CSS framework providing pre-designed, atomic-level utility classes for rapid UI development with minimal CSS code.",
        icon: TailwindIcon
    },
    Zustand: {
        title: "Zustand",
        description: "Tiny, fast, and scalable state management for React applications, providing a simple and intuitive API.",
        icon: ZustandIcon
    },
    Astro: {
        title: "Astro",
        description: "Frontend framework for streamlined development, integrating seamlessly with popular tools to create fast and modern websites with minimal configuration overhead.",
        icon: AstroIcon
    },
    NanoStores: {
        title: "NanoStores",
        description: "Lightweight state management library for JavaScript applications, designed for simplicity and performance to simplify state management and improve application responsiveness.",
        icon: NanostoresIcon
    },
    D3: {
        title: "D3.js",
        description: "Versatile JavaScript library for data visualization, enabling developers to create dynamic, interactive graphics and charts by binding data to DOM elements.",
        icon: D3JsIcon
    },
    ReactQuery: {
        title: "React Query",
        description: "React library for managing, caching, and synchronizing server state in web applications, providing a powerful and intuitive API for fetching and updating data.",
        icon: ReactQueryIcon
    },
    EdgeStore: {
        title: "EdgeStore",
        description: "EdgeStore is an open-source file storage service, designed for scalability and performance, with efficient updates and minimal API.",
        icon: EdgeStoreIcon
    },
    Python: {
        title: "Python",
        description: "A high-level, general-purpose programming language.",
        icon: PythonIcon
    },
    Bootstrap: {
        title: "Bootstrap",
        description: "The most popular HTML, CSS, and JS library in the world.",
        icon: BootstrapIcon
    },
    Django: {
        title: "Django",
        description: "High-level Python web framework that encourages rapid development and clean, pragmatic design.",
        icon: DjangoIcon
    },
    Railway: {
        title: "Railway",
        description: "Infrastructure platform that enables instant deployments.",
        icon: RailwayIcon
    },
    Vercel: {
        title: "Vercel",
        description: "Platform for frontend frameworks and static sites.",
        icon: VercelIcon
    },
    PostgreSQL: {
        title: "PostgreSQL",
        description: "Powerful, open source object-relational database system.",
        icon: PostgresIcon
    },
    Docker: {
        title: "Docker",
        description: "Platform for developing, shipping, and running applications in containers.",
        icon: DockerIcon
    },
    Nginx: {
        title: "Nginx",
        description: "High-performance web server, reverse proxy, and load balancer.",
        icon: NginxIcon
    },
    Gunicorn: {
        title: "Gunicorn",
        description: "Python WSGI HTTP Server for UNIX.",
        icon: GunicornIcon
    }
};

// Common Features List
const FeatureList = {
    Responsive: {
        title: "Responsive Design",
        description: "Enjoy a seamless experience across devices with a responsive design that adapts to various screen sizes and orientations."
    },
    SEO: {
        title: "SEO Optimization",
        description: "Crafted with SEO best practices, ensuring optimal visibility on search engines. From keyword-rich content to streamlined meta tags and efficient site architecture."
    }
}

export const ProjectsList: ProjectsListType = [
    {
        Name: "CourseHub",
        ShortDesc: "Scalable video course platform serving 10,000+ students.",
        Desc: "CourseHub is a high-performance educational platform engineered to handle 10,000+ concurrent students with sub-second latency. Built on a Django & HTMX layered monolith, it leverages advanced database optimizations including partial indexes and query planning to ensure scalability. The infrastructure is containerized with Docker and orchestrated via Nginx and Gunicorn for robust production deployment.",
        Logo: CourseHubImage,
        Shot: CourseHubImage,
        Mockup: CourseHubImage,
        Theme: "#1e293b",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/coursehub-django",
        Source: "https://github.com/mo-hossam-stack/coursehub-django",
        Tech: [TechInfo.Django, TechInfo.Python, TechInfo.Docker, TechInfo.Nginx, TechInfo.Gunicorn, TechInfo.PostgreSQL, TechInfo.TailwindCSS],
        features: [
            {
                title: "High Scalability",
                description: "Optimized for 10k+ users with advanced caching strategies and separate media delivery networks."
            },
            {
                title: "Advanced Database Architecture",
                description: "Utilizes PostgreSQL advanced features, compound indexes, and query optimizations for maximum throughput."
            },
            {
                title: "Secure Video Streaming",
                description: "Private video delivery via Cloudinary with signed URLs and adaptive bitrate."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "DPMS",
        ShortDesc: "Dental Patient Management System desktop application.",
        Desc: "Dental Patient Management System is a full-featured desktop application designed for dental clinics. Powered by a Django backend and wrapped with Electron, it delivers the convenience of a desktop app with the scalability of a modern web stack.",
        Logo: DpmsImage,
        Shot: DpmsImage,
        Mockup: DpmsImage,
        Theme: "#007bff",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/orthodontic_patient_portal",
        Source: "https://github.com/mo-hossam-stack/orthodontic_patient_portal",
        Tech: [TechInfo.Python, TechInfo.Bootstrap, TechInfo.MySQL],
        features: [
            {
                title: "Patient Management",
                description: "Manage patients, appointments, and records."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "Full-Stack Notes App",
        ShortDesc: "Production-ready full-stack notes app with JWT auth.",
        Desc: "A production-ready full‑stack application that provides a JWT‑secured Django REST API for personal notes and a modern React (Vite) frontend. It includes user registration, token-based authentication, and complete note CRUD operations.",
        Logo: NotesAppImage,
        Shot: NotesAppImage,
        Mockup: NotesAppImage,
        Theme: "#092E20",
        Status: "completed",
        Link: "https://fullstack-jwt-notes.vercel.app",
        Source: "https://github.com/mo-hossam-stack/fullstack-jwt-notes",
        Tech: [TechInfo.Django, TechInfo.React, TechInfo.Vite, TechInfo.Railway, TechInfo.Vercel],
        features: [
            {
                title: "JWT Authentication",
                description: "Secure token-based authentication with automatic refresh."
            },
            {
                title: "Real-time Updates",
                description: "Automatic refresh after create/delete operations."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "LeetCode Python Journey",
        ShortDesc: "Collection of Python solutions to +200 LeetCode problems.",
        Desc: "A curated collection of Python solutions to +180 LeetCode problems, covering arrays, hashing, sliding window, two pointers, binary search, and more. Each file includes the problem statement, difficulty level, and a clean, well-commented solution.",
        Logo: PythonImage,
        Shot: PythonImage,
        Mockup: PythonImage,
        Theme: "#3776AB",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/leetcode-python-journey",
        Source: "https://github.com/mo-hossam-stack/leetcode-python-journey",
        Tech: [TechInfo.Python],
        features: [
            {
                title: "Algorithms",
                description: "Solutions for various algorithmic problems."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "Django CRM",
        ShortDesc: "Customer Relationship Management web app powered by Django.",
        Desc: "A visually stunning and fully functional Customer Relationship Management web app powered by Django. It supports secure user authentication, full CRUD operations for customer records, and a responsive Bootstrap 5 interface with a custom dark 'starfield' theme.",
        Logo: CrmImage,
        Shot: CrmImage,
        Mockup: CrmImage,
        Theme: "#000000",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/django-crm",
        Source: "https://github.com/mo-hossam-stack/django-crm",
        Tech: [TechInfo.Python, TechInfo.Bootstrap, TechInfo.MySQL],
        features: [
            FeatureList.Responsive,
            {
                title: "User Authentication",
                description: "Secure login and registration."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "Chess Game",
        ShortDesc: "Complete chess game implementation with Python and Pygame.",
        Desc: "A complete chess game implementation featuring all official rules, check/checkmate detection, stalemate conditions, and pawn promotion. Built with Python and Pygame, it offers a sleek graphical interface with move highlighting.",
        Logo: ChessImage,
        Shot: ChessImage,
        Mockup: ChessImage,
        Theme: "#333333",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/python-pygame-chess",
        Source: "https://github.com/mo-hossam-stack/python-pygame-chess",
        Tech: [TechInfo.Python],
        features: [
            {
                title: "Game Logic",
                description: "Complete chess rules implementation."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "Chronograph",
        ShortDesc: "Elegant e-commerce platform dedicated to luxury watches.",
        Desc: "Chronograph is an elegant e-commerce platform dedicated to luxury watches, combining premium design with smooth interactivity. Built with HTML, CSS, and JavaScript, it features responsive layouts, GSAP animations, AOS scroll effects, and real-time cart management.",
        Logo: WatchImage, // Placeholder
        Shot: WatchImage,
        Mockup: WatchImage, // Placeholder
        Theme: "#DAA520",
        Status: "completed",
        Link: "https://mo-hossam-stack.github.io/golden-time-shop/",
        Source: "https://github.com/mo-hossam-stack/golden-time-shop",
        Tech: [TechInfo.HTML, TechInfo.CSS, TechInfo.JavaScript],
        features: [
            FeatureList.Responsive,
            {
                title: "GSAP Animations",
                description: "Smooth animations for a premium feel."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    }
]