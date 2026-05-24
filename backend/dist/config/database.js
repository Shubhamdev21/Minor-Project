"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
dotenv_1.default.config();
const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
            console.log('Starting MongoDB Memory Server...');
            const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create({
                instance: {
                    dbPath: './.mongodb_data',
                    storageEngine: 'ephemeralForTest',
                }
            });
            uri = mongoServer.getUri();
        }
        const conn = await mongoose_1.default.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
};
exports.default = connectDB;
