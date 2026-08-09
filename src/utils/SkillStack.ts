import {
    HtmlIcon,
    CssIcon,
    JsIcon,
    TailwindIcon,
    ReactIcon,
    DjangoIcon,
    PostgresIcon,
    DockerIcon,
    NginxIcon,
    GunicornIcon,
    BootstrapIcon,
    PostmanIcon,
    GitlabIcon,
    DrfIcon,
    PythonIcon,
    CppIcon,
    MysqlIcon,
    MongoIcon,
    GitIcon,
    VsCodeIcon,
    FastApiIcon,
    UvicornIcon,
    RedisIcon,
    LinuxIcon,
    CachyosIcon,
    JwtIcon,
    PassportIcon,
    KeycloakIcon,
    CloudinaryIcon,
    CloudflareIcon,
    GithubActionsIcon,
    SystemDesignIcon,
    RestApiRealIcon,
    RestApiIcon,
    SocketIoIcon
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
    },
    {
        name: "React",
        icon: ReactIcon,
        link: "https://react.dev/",
    }
];

export const BackendStack = [
    { name: "Django", icon: DjangoIcon, link: "https://www.djangoproject.com/" },
    { name: "DRF", icon: DrfIcon, link: "https://www.django-rest-framework.org/" },
    { name: "PostgreSQL", icon: PostgresIcon, link: "https://www.postgresql.org/" },
    { name: "MySQL", icon: MysqlIcon, link: "https://www.mysql.com/" },
    { name: "SQL", icon: RestApiIcon, link: "https://en.wikipedia.org/wiki/SQL" },
    { name: "MongoDB", icon: MongoIcon, link: "https://www.mongodb.com/" },
    { name: "Redis", icon: RedisIcon, link: "https://redis.io/" },
    { name: "Nginx", icon: NginxIcon, link: "https://nginx.org/" },
    { name: "Gunicorn", icon: GunicornIcon, link: "https://gunicorn.org/" },
    { name: "Uvicorn", icon: UvicornIcon, link: "https://www.uvicorn.org/" },
    { name: "Docker", icon: DockerIcon, link: "https://www.docker.com/" },
    { name: "FastAPI", icon: FastApiIcon, link: "https://fastapi.tiangolo.com/" },
];

export const ArchitectureStack = [
    { name: "System Design", icon: SystemDesignIcon, link: "https://en.wikipedia.org/wiki/Systems_design" },
    { name: "Service Layer Architecture", icon: SystemDesignIcon, link: "https://martinfowler.com/eaaCatalog/serviceLayer.html" },
    { name: "RESTful APIs", icon: RestApiRealIcon, link: "https://restfulapi.net/" },
    { name: "Asynchronous Programming", icon: SocketIoIcon, link: "https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)" },
    { name: "Schema Design", icon: RestApiIcon, link: "https://en.wikipedia.org/wiki/Database_schema" },
    { name: "CI/CD", icon: GithubActionsIcon, link: "https://docs.github.com/en/actions" },
];

export const SecurityStack = [
    { name: "JWT / OAuth2", icon: JwtIcon, link: "https://jwt.io/" },
    { name: "Session-based Auth", icon: PassportIcon, link: "https://www.passportjs.org/" },
    { name: "RBAC", icon: KeycloakIcon, link: "https://en.wikipedia.org/wiki/Role-based_access_control" },
    { name: "CSRF/XSS Mitigation", icon: CloudflareIcon, link: "https://owasp.org/www-community/attacks/csrf" },
    { name: "Signed URLs / Cloudinary", icon: CloudinaryIcon, link: "https://cloudinary.com/" },
    { name: "Resource Hardening", icon: DockerIcon, link: "https://docs.docker.com/engine/hardening/" },
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
    { name: "GitLab", icon: GitlabIcon, link: "https://gitlab.com/" },
    { name: "Linux", icon: LinuxIcon, link: "https://www.linux.org/" },
    { name: "CachyOS", icon: CachyosIcon, link: "https://cachyos.org/" },
    { name: "Bash", icon: VsCodeIcon, link: "https://www.gnu.org/software/bash/" },
    { name: "Postman", icon: PostmanIcon, link: "https://www.postman.com/" },
    { name: "VS Code", icon: VsCodeIcon, link: "https://code.visualstudio.com/" },
];