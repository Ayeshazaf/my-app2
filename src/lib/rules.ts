import { z } from "zod";

export const RegisterFormSchema = z.object({
    email : z.string()
        .email("Invalid email address").trim(),
    password : z.string()
        .min(1, "Password must not be empty")
        .min(5, "Password must be at most 5 characters long")
        .regex(/[a-zA-Z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character")
        .trim(),
    confirmPassword : z.string().trim()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
});
