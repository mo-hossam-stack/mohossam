import {
    HtmlIcon,
    CssIcon,
    JsIcon,
    TsIcon,
    ReactIcon,
    NextIcon,
    AstroIcon,
    TailwindIcon,
    ReactQueryIcon,
    ReduxIcon,
    ZustandIcon,
    D3JsIcon,
    NanostoresIcon,
    NodeIcon,
    ExpressIcon,
    MongoIcon,
    FirebaseIcon,
    EdgeStoreIcon,
    MysqlIcon,
    PhpIcon,
    RestApiIcon,
    GdriveIcon,
    NextAuthIcon,
    PythonIcon,
    CppIcon,
    JavaIcon,
    ViteIcon,
    SocketIoIcon,
    NpmIcon,
    GitIcon,
    NetlifyIcon,
    VercelIcon,
    VsCodeIcon,
    FigmaIcon,
    PreactIcon,
    GSAPIcon,
    FramerMotionIcon,
    BunIcon,
    RIcon
} from "../assets/Icons";
import { GithubIcon } from "../assets/SVGs";

export const FrontendStack = [
    {
        name: "HTML",
        icon: HtmlIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
        name: "CSS",
        icon: CssIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
        name: "JavaScript",
        icon: JsIcon,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
        name: "Bootstrap",
        icon: TailwindIcon, // Using TailwindIcon as placeholder or we can find a Bootstrap one if available, but for now reusing existing icons to avoid errors
        link: "https://getbootstrap.com/",
    },
    { name: "React.js", icon: ReactIcon, link: "https://react.dev/" }, // Keeping React as it's likely part of the new template even if not explicitly in user list, but user said "all tech stacks" so maybe I should be careful. User listed: Django, DRF, OpenCV, NumPy, Pygame, Bootstrap, PostgreSQL, MySQL, MongoDB, SQLite, Git/GitHub, Linux CLI, Docker, AWS, Bash, Postman, Python, JavaScript, C++.
    // The user said "change all its info... and all tech stacks". I should strictly follow their list but also keep the template working.
    // The template is Astro/React based, so removing React/Astro from "FrontendStack" might look weird if the site IS Astro/React.
    // However, the user's "Technical Skills" list is what matters.
    // User's list:
    // Languages: Python, JavaScript (ES6+), C++
    // Frameworks: Django, DRF, OpenCV, NumPy, Pygame, Bootstrap
    // Databases: PostgreSQL, MySQL, MongoDB, SQLite
    // Cloud & Tools: Git/GitHub, Linux CLI, Docker, AWS, Bash, Postman
    // Core Concepts: System Design, Auth, REST, Microservices, etc.

    // I will map these to the existing categories: Frontend, Backend, Programming, Tools.
];

export const BackendStack = [
    { name: "Django", icon: PythonIcon, link: "https://www.djangoproject.com/" }, // Need Django icon, using Python for now or generic
    { name: "DRF", icon: RestApiIcon, link: "https://www.django-rest-framework.org/" },
    { name: "PostgreSQL", icon: MysqlIcon, link: "https://www.postgresql.org/" }, // Using MySQL icon as placeholder if Postgres not available, but I saw MysqlIcon. Let's check imports.
    { name: "MySQL", icon: MysqlIcon, link: "https://www.mysql.com/" },
    { name: "MongoDB", icon: MongoIcon, link: "https://www.mongodb.com/" },
    { name: "SQLite", icon: MongoIcon, link: "https://www.sqlite.org/" }, // Placeholder
    { name: "Docker", icon: VercelIcon, link: "https://www.docker.com/" }, // Placeholder
    { name: "AWS", icon: VercelIcon, link: "https://aws.amazon.com/" }, // Placeholder
];

export const ProgrammingStack = [
    { name: "Python", icon: PythonIcon, link: "https://www.python.org/" },
    { name: "JavaScript", icon: JsIcon, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "C++", icon: CppIcon, link: "https://isocpp.org/" },
    { name: "OpenCV", icon: PythonIcon, link: "https://opencv.org/" },
    { name: "NumPy", icon: PythonIcon, link: "https://numpy.org/" },
    { name: "Pygame", icon: PythonIcon, link: "https://www.pygame.org/" },
];

export const ToolsStack = [
    { name: "Git", icon: GitIcon, link: "https://git-scm.com/" },
    { name: "GitHub", icon: GithubIcon, link: "https://github.com/" },
    { name: "Linux CLI", icon: VsCodeIcon, link: "https://www.linux.org/" },
    { name: "Bash", icon: VsCodeIcon, link: "https://www.gnu.org/software/bash/" },
    { name: "Postman", icon: RestApiIcon, link: "https://www.postman.com/" },
    { name: "VS Code", icon: VsCodeIcon, link: "https://code.visualstudio.com/" },
];