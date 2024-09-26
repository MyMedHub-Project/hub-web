import Logo from "../../../../../public/images/Logo.svg";
import Bullet from "../../../../../public/images/password/Bullet.svg";
import Check from "../../../../../public/images/password/Check.svg";
import Image from "next/image";

const SignUp = () => {
	return (
		<div className="h-[1079px] w-[816px] m-auto py-10 flex flex-col items-center gap-y-5 text-[#0D1717]">
			<Image src={Logo} alt="Logo" width={305} />
			<div className="w-full h-1 bg-[#D4DFD5]"></div>
			<div className="w-full">
				<div className="flex flex-col items-center">
					<h2 className="text-3xl font-bold">Welcome to MyMedHub!</h2>
					<p className="text-sm font-">
						Let's get started by registering your health
						institution.
					</p>
				</div>
				<form
					action="#"
					className="grid grid-cols-2 gap-6 text-[#A0AEC0]"
				>
					<div className="flex flex-col gap-y-2 col-span-2">
						<label
							htmlFor="institution_type"
							className="text-sm text-[#808080]"
						>
							Institution Type
						</label>
						<select
							name="institution_type"
							id="institution_type"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] outline-none rounded-lg"
						>
							<option
								value="hospital"
								// className="text-[#0D1717]"
								selected
							>
								Hospital
							</option>
						</select>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="hospital_name"
							className="text-sm text-[#808080]"
						>
							Hospital Name
						</label>
						<input
							type="text"
							id="hospital_name"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="hospital_email_address"
							className="text-sm text-[#808080]"
						>
							Hospital Email Address
						</label>
						<input
							type="email"
							id="hospital_email_address"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="country"
							className="text-sm text-[#808080]"
						>
							Country
						</label>
						<input
							type="text"
							id="country"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="state"
							className="text-sm text-[#808080]"
						>
							State
						</label>
						<input
							type="text"
							id="state"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>

					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="city"
							className="text-sm text-[#808080]"
						>
							City
						</label>
						<input
							type="text"
							id="city"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="street"
							className="text-sm text-[#808080]"
						>
							Street
						</label>
						<input
							type="text"
							id="street"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="accreditation_license_number"
							className="text-sm text-[#808080]"
						>
							Accreditation/License Number
						</label>
						<input
							type="number"
							id="accreditation_license_number"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>
					<div className="flex flex-col gap-y-2">
						<label
							htmlFor="phone_number"
							className="text-sm text-[#808080]"
						>
							Phone number
						</label>
						<input
							type="number"
							id="phone_number"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
					</div>

					<div className="flex flex-col gap-y-2 col-span-2">
						<label
							htmlFor="password"
							className="text-sm text-[#808080]"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="h-12 px-6 bg-[#ECEFF2] text-[#0D1717] border-b border-[#A0AEC0] focus:border-[#068513] outline-none rounded-lg"
						/>
						<div className="mt-2 px-4">
							<div className="w-full h-0.5 bg-[#D9DFE6] mb-2 relative before:absolute before:bg-[#FFC542] before:top-0 before:left-0 before:w-1/4 before:h-0.5"></div>
							<ul className="grid gap-y-2">
								<li className="flex gap-x-1">
									<Image src={Bullet} alt="bullet" />
									<p className="text-sm text-[#808080]">
										At least 8 characters
									</p>
								</li>

								<li className="flex gap-x-1">
									<Image src={Check} alt="check" />
									<p className="text-sm text-[#068513]">
										Least one number (0-9) or symbol
									</p>
								</li>
								<li className="flex gap-x-1">
									<Image src={Check} alt="check" />
									<p className="text-sm text-[#068513]">
										Lowercase (a-z) and uppercase (A-Z)
									</p>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-span-2">
						<button className="w-full bg-[#068513] hover:bg-opacity-90 text-white py-4 rounded-lg transition">
							Continue
						</button>
						<p className="font-medium text-sm text-[#0D1717] text-center mt-2">
							Already have an account?{" "}
							<a className="text-[#0853C2] hover:underline cursor-pointer">
								Login
							</a>{" "}
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
