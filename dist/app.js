"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const instractorRoutes_1 = __importDefault(require("./routes/instractorRoutes"));
const departmentRoutes_1 = __importDefault(require("./routes/departmentRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const prismaInstance_1 = __importDefault(require("./utils/prismaInstance"));
const cookieParser = require("cookie-parser");
dotenv_1.default.config();
const PORT = process.env.PORT ? Number(process.env.PORT) || 8080 : 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express_1.default.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/student", studentRoutes_1.default);
app.use("/api/instractor", instractorRoutes_1.default);
app.use("/api/department", departmentRoutes_1.default);
app.use("/api/course", courseRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use(errorHandler_middleware_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.default.$connect();
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`server is running at ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
});
startServer();
