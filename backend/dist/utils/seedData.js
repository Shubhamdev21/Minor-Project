"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdminUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const seedAdminUser = async () => {
    try {
        const adminEmail = 'admin@system.local';
        const adminPassword = 'password';
        const userExists = await User_1.default.findOne({ email: adminEmail });
        if (userExists) {
            console.log('Admin user already exists');
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(adminPassword, salt);
        await User_1.default.create({
            name: 'Shubham Dev Behera',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });
        console.log('Admin user seeded successfully');
    }
    catch (error) {
        console.error('Error seeding admin user:', error);
    }
};
exports.seedAdminUser = seedAdminUser;
