import * as z from "zod";

export const institutionAdminDefault = {
	firstName: "",
	lastName: "",
	language: ""
};

export type IInstitutionAdminSchema = z.infer<typeof institutionAdminSchema>;

export const institutionAdminSchema = z.object({
	firstName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/),
	lastName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/),
	language: z.string()
});
