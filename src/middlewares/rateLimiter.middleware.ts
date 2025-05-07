import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15m
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many requests, please try again later.'
    }
});
