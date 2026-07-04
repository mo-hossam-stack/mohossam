import {
    HtmlIcon, CssIcon, JsIcon, ReactIcon, NodeIcon, TsIcon, NextIcon, MysqlIcon, MongoIcon, GdriveIcon, SocketIoIcon, RestApiIcon, PhpIcon, ViteIcon, NextAuthIcon, ReduxIcon, TailwindIcon, ZustandIcon, AstroIcon, NanostoresIcon, D3JsIcon, ReactQueryIcon, EdgeStoreIcon, PythonIcon, DjangoIcon, RailwayIcon, VercelIcon, PostgresIcon, DockerIcon, NginxIcon, GunicornIcon, BootstrapIcon, FastApiIcon, TesseractIcon, PydanticIcon, NetlifyIcon, GroqIcon
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
import OcrImage from "../assets/ocr.png";
import UniHelpImage from "../assets/university_ai.png";
import DsaStudioImage from "../assets/dsa_studio.png";


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
    },
    FastAPI: {
        title: "FastAPI",
        description: "Modern, high-performance web framework for building APIs with Python.",
        icon: FastApiIcon
    },
    Tesseract: {
        title: "Tesseract OCR",
        description: "Open-source optical character recognition engine for text extraction.",
        icon: TesseractIcon
    },
    Pydantic: {
        title: "Pydantic",
        description: "Data validation and settings management using Python type hints.",
        icon: PydanticIcon
    }
};

const TechGroq = {
    title: "Groq Cloud",
    description: "Ultra-fast LLM inference API powering Llama 3.3 70B with sub-second latency for real-time AI responses.",
    icon: GroqIcon
};

const TechNetlify = {
    title: "Netlify",
    description: "Global CDN platform for deploying the React SPA with automatic HTTPS and edge delivery.",
    icon: NetlifyIcon
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
        Name: "DSA Studio",
        ShortDesc: "Interactive data structures & algorithms visualizer with step-by-step animation.",
        Desc: "DSA Studio is an educational web app that visualizes classic sorting and searching algorithms in a clean, responsive interface. Instead of only showing the final result, it breaks each algorithm into snapshots so users can follow how the array changes, which values are being compared, and which line of code is currently active. Built with React 18, Vite, and Tailwind CSS, it features metadata-driven routing, reusable visualization state management, active code-line highlighting, and a production-ready deployment setup with Vercel, Docker, and Nginx.",
        Logo: DsaStudioImage,
        Shot: DsaStudioImage,
        Mockup: DsaStudioImage,
        Theme: "#3B82F6",
        Status: "completed",
        Link: "https://dsa-studio-henna.vercel.app/",
        Source: "https://github.com/mo-hossam-stack/DSA-Studio",
        Tech: [TechInfo.React, TechInfo.Vite, TechInfo.TailwindCSS, TechInfo.TypeScript, TechInfo.Docker, TechInfo.Nginx, TechInfo.Vercel],
        features: [
            {
                title: "Step-by-Step Visualization",
                description: "Each algorithm is broken into array-state snapshots with highlighted comparison indices, human-readable explanations, and active code-line highlighting — all updating in sync."
            },
            {
                title: "Metadata-Driven Algorithm Catalog",
                description: "All algorithm content (names, slugs, pseudocode, C++ code, complexity data) lives in a single metadata file, making it trivial to add new algorithms without rewriting the page layout."
            },
            {
                title: "Reusable Playback Hook",
                description: "A custom useVisualizer hook manages step index, play/pause state, adjustable speed, navigation, and auto-stop — completely decoupled from presentation components."
            },
            {
                title: "Dual Code Views",
                description: "The code panel offers three switchable views: pseudocode, standard C++, and a compact C++ alternative — with active-line highlighting during playback."
            },
            {
                title: "Custom Array Input & Random Generation",
                description: "Users can enter a custom array with validation or generate a random dataset for quick demos. Binary search auto-detects unsorted input and notifies the user."
            },
            {
                title: "Persistent Dark Mode & Responsive UI",
                description: "Theme preference is stored in localStorage and restored on reload. Navigation adapts to desktop tabs or a mobile selector for a usable experience on any screen size."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
    {
        Name: "UniHelp AI",
        ShortDesc: "Bilingual AI assistant serving university students 24/7 with hallucination-free answers.",
        Desc: "UniHelp AI is a bilingual (Arabic/English) conversational assistant purpose-built for Nahda University — Faculty of Computers and Information. It delivers instant, grounded answers to student queries across 6 knowledge domains: Course Registration, Academic Calendar, Fees & Payments, Results & GPA, Exams & Timetables, and Portal Help. The system constrains the LLM to verified institutional JSON data — eliminating hallucination at the architectural level. The backend is a Django 6 + DRF API deployed on Railway, with a React 18 frontend on Netlify CDN.",
        Logo: UniHelpImage,
        Shot: UniHelpImage,
        Mockup: UniHelpImage,
        Theme: "#10B981",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/university-ai-assistant",
        Source: "https://github.com/mo-hossam-stack/university-ai-assistant",
        Tech: [TechInfo.React, TechInfo.TailwindCSS, TechInfo.Django, TechInfo.Python, TechGroq, TechNetlify, TechInfo.Railway, TechInfo.PostgreSQL],
        features: [
            {
                title: "Grounded Generation",
                description: "The LLM is constrained exclusively to verified institutional JSON data — refusing to answer anything outside its knowledge base, eliminating hallucination at the architectural level."
            },
            {
                title: "Bilingual Arabic/English Support",
                description: "Handles mixed-language queries natively, with explicit code-switching detection rules in the system prompt. Students can ask in Arabic, English, or a mix and receive coherent responses."
            },
            {
                title: "6 Knowledge Domains",
                description: "Covers Course Registration, Academic Calendar, Fees & Payments, Results & GPA, Exams & Timetables, and Portal Help — each backed by structured JSON data loaded per-intent."
            },
            {
                title: "Ultra-Fast AI Inference",
                description: "Groq Cloud's Llama 3.3 70B delivers sub-second response latency, enabling a genuinely real-time conversational experience at scale."
            },
            {
                title: "Progressive Multi-Agent Architecture",
                description: "Designed with a layered architecture — Intent Classifier routes queries to domain-specific handlers, injecting the relevant JSON context into the LLM prompt without any API contract changes."
            },
            {
                title: "Security in Depth",
                description: "Client-side XSS sanitization, CORS whitelisting, CSRF protection, Django security middleware, HSTS, and prompt-level guardrails work together across every layer."
            }
        ],
        hideProject: false,
        LogoSize: 50,
        versions: []
    },
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
        Name: "FastAPI OCR Microservice",
        ShortDesc: "Production-grade OCR microservice with FastAPI and React.",
        Desc: "A production-grade, high-performance microservice designed for extracting text from images using Tesseract OCR. Built with FastAPI and React, this service offers a robust, stateless architecture with strict resource safety, non-blocking execution, and modern observability via structured JSON logging.",
        Logo: OcrImage,
        Shot: OcrImage,
        Mockup: OcrImage,
        Theme: "#005571",
        Status: "completed",
        Link: "https://github.com/mo-hossam-stack/fastapi-ocr-microservice",
        Source: "https://github.com/mo-hossam-stack/fastapi-ocr-microservice",
        Tech: [TechInfo.FastAPI, TechInfo.React, TechInfo.Python, TechInfo.Docker, TechInfo.Tesseract, TechInfo.Pydantic, TechInfo.TailwindCSS, TechInfo.Vite, TechInfo.Nginx],
        features: [
            {
                title: "Non-Blocking OCR",
                description: "Tesseract execution is offloaded to a thread pool to keep the event loop responsive."
            },
            {
                title: "Resource Hardening",
                description: "Implements 10MB content limits and 30s hard timeouts for CPU-intensive OCR tasks."
            },
            {
                title: "Production Observability",
                description: "Includes structured JSON logging and built-in health/readiness probes for orchestration."
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
        ShortDesc: "Collection of Python solutions to +500 LeetCode problems.",
        Desc: "A curated collection of Python solutions to +500 LeetCode problems, covering arrays, hashing, sliding window, two pointers, binary search, and more. Each file includes the problem statement, difficulty level, and a clean, well-commented solution.",
        Logo: PythonImage,
        Shot: PythonImage,
        Mockup: PythonImage,
        Theme: "#3776AB",
        Status: "completed",
        Link: "https://leetcode-solution-pipeline.vercel.app/",
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
        Link: "https://github.com/mo-hossam-stack/djangoCRM",
        Source: "https://github.com/mo-hossam-stack/djangoCRM",
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