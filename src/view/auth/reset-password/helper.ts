import * as z from "zod";

export const resetPasswordDefault = {
	password: ""
};

export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const resetPasswordSchema = z.object({
	password: z.string().min(8, {
		message: "Password must be at least 8 characters long."
	})
});
