import {
    HtmlIcon,
    CssIcon,
    JsIcon,
    TailwindIcon,
    DjangoIcon,
    PostgresIcon,
    DockerIcon,
    NginxIcon,
    GunicornIcon,
    BootstrapIcon,
    PostmanIcon,
    LinuxMintIcon,
    DrfIcon,
    PythonIcon,
    CppIcon,
    MysqlIcon,
    MongoIcon,
    GitIcon,
    VsCodeIcon
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
        name: "Tailwind CSS",
        icon: TailwindIcon,
        link: "https://tailwindcss.com/",
    },
    {
        name: "Bootstrap",
        icon: BootstrapIcon,
        link: "https://getbootstrap.com/",
    }
];

export const BackendStack = [
    { name: "Django", icon: DjangoIcon, link: "https://www.djangoproject.com/" },
    { name: "DRF", icon: DrfIcon, link: "https://www.django-rest-framework.org/" },
    { name: "PostgreSQL", icon: PostgresIcon, link: "https://www.postgresql.org/" },
    { name: "MySQL", icon: MysqlIcon, link: "https://www.mysql.com/" },
    { name: "MongoDB", icon: MongoIcon, link: "https://www.mongodb.com/" },
    { name: "Nginx", icon: NginxIcon, link: "https://nginx.org/" },
    { name: "Gunicorn", icon: GunicornIcon, link: "https://gunicorn.org/" },
    { name: "Docker", icon: DockerIcon, link: "https://www.docker.com/" },
];

export const ProgrammingStack = [
    { name: "Python", icon: PythonIcon, link: "https://www.python.org/" },
    { name: "JavaScript", icon: JsIcon, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "C++", icon: CppIcon, link: "https://isocpp.org/" },
    { name: "OpenCV", icon: PythonIcon, link: "https://opencv.org/" },
    { name: "NumPy", icon: PythonIcon, link: "https://numpy.org/" },
];

export const ToolsStack = [
    { name: "Git", icon: GitIcon, link: "https://git-scm.com/" },
    { name: "GitHub", icon: GithubIcon, link: "https://github.com/" },
    { name: "Linux Mint Cinnamon", icon: LinuxMintIcon, link: "https://www.linuxmint.com/" },
    { name: "Bash", icon: VsCodeIcon, link: "https://www.gnu.org/software/bash/" },
    { name: "Postman", icon: PostmanIcon, link: "https://www.postman.com/" },
    { name: "VS Code", icon: VsCodeIcon, link: "https://code.visualstudio.com/" },
];