import * as z from "zod";

export const forgotPasswordDefault = {
	email: ""
};

export type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." })
});
