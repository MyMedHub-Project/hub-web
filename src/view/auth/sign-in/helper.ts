import * as z from "zod";

export const loginDefault = {
	email: "",
	password: ""
};

export type ILoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
	email: z.string().email({ message: "Please enter an email address." }),
	password: z
		.string()
		.regex(/^\S(?:.*\S)?$/, { message: "Please enter a password." })
});
