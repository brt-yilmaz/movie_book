"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
//For env File 
dotenv_1.default.config();
const app = (0, express_1.default)();
// MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URI || '';
mongoose_1.default
    .connect(uri)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
