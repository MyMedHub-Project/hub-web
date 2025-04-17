"use client";

import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/form";
import CountryFormField from "@/view/auth/common/CountryFormField";
import { FormSubmitButton } from "@/view/auth/common/FormSubmitButton";
import PasswordFormField from "@/view/auth/common/PasswordFormField";
import PhoneFormField from "@/view/auth/common/PhoneFormField";
import RegionFormField from "@/view/auth/common/RegionFormField";
import SelectFormField from "@/view/auth/common/SelectFormField";
import TextFormField from "@/view/auth/common/TextFormField";
import DateFormField from "@/view/auth/common/DateFormField";
import { IUserSchema } from "@/view/auth/sign-up/helper";
import { BtnStatus } from "@/types/types";

export const PatientForm = ({
	countryCode,
	form,
	onSubmit,
	setCountryCode,
	submitBtnState
}: {
	countryCode: string;
	form: UseFormReturn<IUserSchema>;
	onSubmit: (values: IUserSchema) => void;
	setCountryCode: (countryCode: string) => void;
	submitBtnState: BtnStatus;
}) => (
	<Form {...form}>
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-6"
		>
			<div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
				<TextFormField
					form={form}
					name="firstName"
					label="First Name"
					placeholder="John"
				/>

				<TextFormField
					form={form}
					name="lastName"
					label="Last Name"
					placeholder="Doe"
				/>

				<TextFormField
					form={form}
					name="otherName"
					label="Other Names (optional)"
					placeholder="Ogbeni"
				/>

				<TextFormField
					form={form}
					name="email"
					label="Email Address"
					placeholder="john@doe.com"
					type="email"
				/>

				<PhoneFormField form={form} />

				<DateFormField form={form} name="dob" label="Date of Birth" />

				<CountryFormField form={form} setCountryCode={setCountryCode} />

				<RegionFormField form={form} countryCode={countryCode} />

				<TextFormField
					form={form}
					name="city"
					label="City"
					placeholder="Enter your city"
				/>

				<TextFormField
					form={form}
					name="street"
					label="Street"
					placeholder="Enter your street"
				/>

				<SelectFormField
					form={form}
					name="bloodType"
					label="Blood Type"
					options={[
						{ value: "A", label: "A" },
						{ value: "B", label: "B" },
						{ value: "AB", label: "AB" },
						{ value: "O", label: "O" }
					]}
					placeholder="Select blood type"
				/>

				<SelectFormField
					form={form}
					name="genotype"
					label="Genotype"
					options={[
						{ value: "AA", label: "AA" },
						{ value: "AS", label: "AS" },
						{ value: "SS", label: "SS" },
						{ value: "AC", label: "AC" },
						{ value: "SC", label: "SC" },
						{ value: "CC", label: "CC" }
					]}
					placeholder="Select genotype"
				/>

				<SelectFormField
					form={form}
					name="gender"
					label="Gender"
					options={[
						{ value: "Male", label: "Male" },
						{ value: "Female", label: "Female" }
					]}
					placeholder="Select gender"
				/>

				<SelectFormField
					form={form}
					name="language"
					label="Language"
					options={[{ value: "en-US", label: "English (US)" }]}
					placeholder="Select language"
				/>
			</div>

			<PasswordFormField
				form={form}
				label="Password"
				existingPassword={false}
			/>

			<FormSubmitButton loadingState={submitBtnState} label="Sign Up" />
		</form>
	</Form>
);
