import rateLimit from "express-rate-limit";

export const rateLimiter = (requests: number) => rateLimit({
    windowMs: 1000 * 60,
    limit: requests,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.'
    },
});
