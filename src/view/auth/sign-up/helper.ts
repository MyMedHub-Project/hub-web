import { format } from "date-fns/format";
import * as z from "zod";
import { VerificationRole } from "@/app/auth/onboarding/context";

export const userDefault = {
	firstName: "",
	lastName: "",
	otherName: "",
	email: "",
	tel: "",
	street: "",
	city: "",
	state: "",
	country: "",
	gender: "",
	language: "",
	dob: "" as unknown as Date,
	password: ""
};

export type IUserSchema = z.infer<typeof userSchema>;

export const userSchema = z.object({
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
	otherName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/)
		.or(z.literal(""))
		.optional(),
	email: z.string().trim().email().toLowerCase(),
	tel: z.string(),
	street: z.string(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	gender: z.string(),
	genotype: z.string(),
	bloodType: z.string(),
	language: z.string(),
	dob: z.date({
		required_error: "A date of birth is required",
		invalid_type_error: "Select a valid date of birth"
	}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(
			/(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])/,
			{
				message:
					"Password must include at least one number or symbol, one lowercase letter, and one uppercase letter."
			}
		)
});

export const institutionDefault = {
	email: "",
	password: "",
	type: "",
	name: "",
	street: "",
	city: "",
	state: "",
	country: "",
	tel: "",
	license: "",
	services: []
};

export type IInstitutionSchema = z.infer<typeof institutionSchema>;

export const institutionSchema = z.object({
	type: z.string(),
	name: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/),
	email: z.string().trim().email().toLowerCase(),
	street: z.string(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	tel: z.string().trim(),
	license: z.string(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.regex(
			/(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])/,
			{
				message:
					"Password must include at least one number or symbol, one lowercase letter, and one uppercase letter."
			}
		),
	services: z.array(z.string())
});

export const extractDataFromForm = (data: {
	type: VerificationRole;
	values: IUserSchema | IInstitutionSchema;
	termsAgreed: boolean;
}) => {
	const { countryName, countryShortCode } = JSON.parse(data.values.country);

	if (data.type === "patient") {
		const values = data.values as IUserSchema;

		return {
			category: data.type,
			type: data.type,
			email: values.email,
			countryCode: countryShortCode,
			phone: values.tel,
			firstname: values.firstName,
			lastname: values.lastName,
			otherNames: values.otherName,
			password: values.password,
			acceptedTerms: data.termsAgreed,
			language: values.language,
			institutionName: null,
			gender: values.gender.toLowerCase(),
			genotype: values.genotype,
			bloodType: values.bloodType,
			dob: format(values.dob, "yyyy-MM-dd"),
			address: {
				street: values.street,
				city: values.city,
				state: values.state,
				country: countryName
			}
		};
	}

	if (data.type === "institution") {
		const values = data.values as IInstitutionSchema;

		return {
			category: data.type,
			type: values.type,
			name: values.name,
			license: values.license,
			email: values.email,
			countryCode: countryShortCode,
			phone: values.tel,
			acceptedTerms: data.termsAgreed,
			password: values.password,
			address: {
				street: values.street,
				city: values.city,
				state: values.state,
				country: countryName
			},
			services: values.services
		};
	}

	return null;
};

enum MedicalTest {
	// Hematology Tests
	CBC = "Complete Blood Count",
	HEMOGLOBIN = "Hemoglobin",
	HEMATOCRIT = "Hematocrit",
	WBC_COUNT = "White Blood Cell Count",
	PLATELET_COUNT = "Platelet Count",
	HEMOGLOBIN_ELECTROPHORESIS = "Hemoglobin Electrophoresis",
	BLOOD_TYPE = "Blood Type",
	RH_FACTOR = "Rh Factor",
	ESR = "Erythrocyte Sedimentation Rate",
	PT_INR = "Prothrombin Time / INR",
	PTT = "Partial Thromboplastin Time",

	// Chemistry Tests
	BASIC_METABOLIC_PANEL = "Basic Metabolic Panel",
	COMPREHENSIVE_METABOLIC_PANEL = "Comprehensive Metabolic Panel",
	ELECTROLYTES = "Electrolytes",
	BUN = "Blood Urea Nitrogen",
	CREATININE = "Creatinine",
	BUN_CREATININE_RATIO = "BUN/Creatinine Ratio",
	GLUCOSE = "Glucose",
	HBA1C = "Hemoglobin A1C",
	CALCIUM = "Calcium",
	PHOSPHORUS = "Phosphorus",
	MAGNESIUM = "Magnesium",
	ALBUMIN = "Albumin",
	TOTAL_PROTEIN = "Total Protein",

	// Liver Function Tests
	ALT = "Alanine Aminotransferase",
	AST = "Aspartate Aminotransferase",
	ALP = "Alkaline Phosphatase",
	GGT = "Gamma-Glutamyl Transferase",
	BILIRUBIN_TOTAL = "Total Bilirubin",
	BILIRUBIN_DIRECT = "Direct Bilirubin",

	// Lipid Tests
	LIPID_PROFILE = "Lipid Profile",
	TOTAL_CHOLESTEROL = "Total Cholesterol",
	HDL = "HDL Cholesterol",
	LDL = "LDL Cholesterol",
	TRIGLYCERIDES = "Triglycerides",
	VLDL = "VLDL Cholesterol",

	// Endocrine Tests
	TSH = "Thyroid Stimulating Hormone",
	T3 = "Triiodothyronine",
	T4 = "Thyroxine",
	FREE_T3 = "Free T3",
	FREE_T4 = "Free T4",
	CORTISOL = "Cortisol",
	INSULIN = "Insulin",
	TESTOSTERONE = "Testosterone",
	ESTROGEN = "Estrogen",
	PROGESTERONE = "Progesterone",
	FSH = "Follicle Stimulating Hormone",
	LH = "Luteinizing Hormone",
	PROLACTIN = "Prolactin",

	// Immune System Tests
	CRP = "C-Reactive Protein",
	ANA = "Antinuclear Antibody",
	RF = "Rheumatoid Factor",
	IMMUNOGLOBULINS = "Immunoglobulins",
	HIV_TEST = "HIV Test",
	HLA_B27 = "HLA-B27",

	// Urine Tests
	URINALYSIS = "Urinalysis",
	URINE_CULTURE = "Urine Culture",
	URINE_PROTEIN = "Urine Protein",
	MICROALBUMIN = "Microalbumin",
	URINARY_CALCIUM = "Urinary Calcium",
	URINE_24HR = "24-Hour Urine Collection",

	// Microbiology Tests
	BLOOD_CULTURE = "Blood Culture",
	THROAT_CULTURE = "Throat Culture",
	WOUND_CULTURE = "Wound Culture",
	STOOL_CULTURE = "Stool Culture",
	TB_TEST = "Tuberculosis Test",
	RAPID_STREP = "Rapid Strep Test",
	COVID_TEST = "COVID-19 Test",
	MALARIA_SMEAR = "Malaria Blood Smear",

	// Genetic Tests
	KARYOTYPE = "Karyotyping",
	CARRIER_SCREENING = "Genetic Carrier Screening",
	PRENATAL_GENETIC = "Prenatal Genetic Testing",
	BRCA = "BRCA Gene Test",
	PHARMACOGENETICS = "Pharmacogenetic Testing",

	// Specialized Tests
	PSA = "Prostate Specific Antigen",
	CEA = "Carcinoembryonic Antigen",
	CA_125 = "Cancer Antigen 125",
	CA_19_9 = "Cancer Antigen 19-9",
	AFP = "Alpha-Fetoprotein",
	TROPONIN = "Troponin",
	CK_MB = "Creatine Kinase-MB",
	BNP = "B-type Natriuretic Peptide",
	D_DIMER = "D-dimer",
	FERRITIN = "Ferritin",
	VITAMIN_B12 = "Vitamin B12",
	FOLATE = "Folate",
	VITAMIN_D = "Vitamin D",
	IRON_STUDIES = "Iron Studies",
	DRUG_SCREEN = "Drug Screening",
	HEAVY_METALS = "Heavy Metal Testing",

	// Imaging Studies
	CHEST_XRAY = "Chest X-Ray",
	BONE_XRAY = "Bone X-Ray",
	ABDOMINAL_XRAY = "Abdominal X-Ray",
	DENTAL_XRAY = "Dental X-Ray",
	CT_SCAN = "CT Scan",
	CT_HEAD = "CT Scan - Head",
	CT_CHEST = "CT Scan - Chest",
	CT_ABDOMEN = "CT Scan - Abdomen",
	CT_PELVIS = "CT Scan - Pelvis",
	MRI = "MRI",
	MRI_BRAIN = "MRI - Brain",
	MRI_SPINE = "MRI - Spine",
	MRI_KNEE = "MRI - Knee",
	MRI_SHOULDER = "MRI - Shoulder",
	ULTRASOUND = "Ultrasound",
	ULTRASOUND_ABDOMEN = "Ultrasound - Abdomen",
	ULTRASOUND_PELVIS = "Ultrasound - Pelvis",
	ULTRASOUND_THYROID = "Ultrasound - Thyroid",
	ULTRASOUND_BREAST = "Ultrasound - Breast",
	DOPPLER_ULTRASOUND = "Doppler Ultrasound",
	ECHOCARDIOGRAM = "Echocardiogram",
	MAMMOGRAM = "Mammography",
	DEXA_SCAN = "Bone Density Scan",
	PET_SCAN = "PET Scan",
	ANGIOGRAM = "Angiography",
	FLUOROSCOPY = "Fluoroscopy",
	NUCLEAR_MEDICINE = "Nuclear Medicine Scan",

	// Diagnostic Procedures
	ECG = "Electrocardiogram (ECG)",
	EKG = "Electrocardiogram (EKG)", // Alternate name
	STRESS_TEST = "Cardiac Stress Test",
	HOLTER_MONITOR = "Holter Monitor",
	EEG = "Electroencephalogram (EEG)",
	EMG = "Electromyography (EMG)",
	NERVE_CONDUCTION = "Nerve Conduction Study",
	ENDOSCOPY = "Endoscopy",
	COLONOSCOPY = "Colonoscopy",
	BRONCHOSCOPY = "Bronchoscopy",
	CYSTOSCOPY = "Cystoscopy",
	COLPOSCOPY = "Colposcopy",
	SIGMOIDOSCOPY = "Sigmoidoscopy",
	ERCP = "ERCP",
	SPIROMETRY = "Spirometry",
	PULMONARY_FUNCTION = "Pulmonary Function Test",
	SLEEP_STUDY = "Sleep Study",
	BIOPSY = "Biopsy",
	BONE_MARROW_BIOPSY = "Bone Marrow Biopsy",
	LIVER_BIOPSY = "Liver Biopsy",
	SKIN_BIOPSY = "Skin Biopsy",
	LUMBAR_PUNCTURE = "Lumbar Puncture",
	PAP_SMEAR = "Pap Smear",
	AUDIOMETRY = "Audiometry",
	VISION_TEST = "Vision Testing",
	ALLERGY_SKIN_TEST = "Allergy Skin Test",
	URODYNAMICS = "Urodynamic Testing",
	TILT_TABLE = "Tilt Table Test"
}

export const labTestOptions = Object.values(MedicalTest);
