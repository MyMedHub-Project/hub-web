"use server";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/form";
import CountryFormField from "@/view/auth/common/CountryFormField";
import { FormSubmitButton } from "@/view/auth/common/FormSubmitButton";
import PasswordFormField from "@/view/auth/common/PasswordFormField";
import PhoneFormField from "@/view/auth/common/PhoneFormField";
import RegionFormField from "@/view/auth/common/RegionFormField";
import SelectFormField from "@/view/auth/common/SelectFormField";
import TextFormField from "@/view/auth/common/TextFormField";
import { IInstitutionSchema, labTestOptions } from "@/view/auth/sign-up/helper";
import LaboratoryTestSection from "@/view/auth/sign-up/LaboratoryTestSection";
import { BtnStatus } from "@/types/types";

export const InstitutionForm = ({
	countryCode,
	form,
	institutionType,
	onSubmit,
	setCountryCode,
	setInstitutionType,
	submitBtnState
}: {
	form: UseFormReturn<IInstitutionSchema>;
	submitBtnState: BtnStatus;
	onSubmit: (values: IInstitutionSchema) => void;
	setCountryCode: (countryCode: string) => void;
	countryCode: string;
	setInstitutionType: (institutionType: string) => void;
	institutionType: string | null;
}) => {
	const [selectedTests, setSelectedTests] = useState<string[]>([]);
	const hasLabratory =
		institutionType === "hospital" || institutionType === "clinic";

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<SelectFormField
					form={form}
					name="type"
					label="Institution Type"
					options={[
						{ value: "hospital", label: "Hospital" },
						{ value: "clinic", label: "Clinic" },
						{
							value: "laboratory",
							label: "Laboratory"
						},
						{ value: "pharmacy", label: "Pharmacy" }
					]}
					placeholder="Select institution type"
					onChange={(value) => setInstitutionType(value)}
				/>

				{hasLabratory ? (
					<LaboratoryTestSection
						form={form}
						selectedTests={selectedTests}
						setSelectedTests={setSelectedTests}
						availableTests={labTestOptions}
					/>
				) : null}

				<div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
					<TextFormField
						form={form}
						name="name"
						label="Institution Name"
						placeholder="CareGem Clinic"
					/>

					<TextFormField
						form={form}
						name="license"
						label="Accreditation/License Number"
						placeholder="Enter your license number"
					/>

					<TextFormField
						form={form}
						name="email"
						label="Email Address"
						placeholder="caregem@clinic.com"
						type="email"
					/>
					<PhoneFormField form={form} />

					<CountryFormField
						form={form}
						setCountryCode={setCountryCode}
					/>

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
				</div>

				<PasswordFormField
					form={form}
					label="Password"
					existingPassword={false}
				/>

				<FormSubmitButton
					loadingState={submitBtnState}
					label="Sign Up"
				/>
			</form>
		</Form>
	);
};
