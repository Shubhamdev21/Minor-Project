"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error && error.errors) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.errors.map((e) => ({ path: e.path ? e.path[0] : 'unknown', message: e.message }))
                });
            }
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
