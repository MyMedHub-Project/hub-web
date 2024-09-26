import Image from "next/image";
import Logo from "../../../../public/images/Logo_light.svg";

const TermsAndCondition = () => {
	return (
		<>
			<header className="bg-[#0D1717] pt-10 pb-5 flex flex-col items-center gap-y-3">
				<Image src={Logo} alt="WebHub Logo" />
				<h1 className="text-3xl font-bold">Terms and Conditions</h1>
				<p className="text-sm font-light">
					By signing up as a patient, you agree to the following terms
					and conditions:
				</p>
			</header>
			<main className="text-[#0D1717] px-16 py-12">
				<ul className="space-y-5">
					<li className="leading-5">
						<strong>Compliance with Regulations:</strong> You agree
						to comply with all applicable laws, regulations, and
						standards governing healthcare delivery, patient
						privacy, and data security.
					</li>
					<li className="leading-5">
						<strong>Data Management:</strong> As a health
						institution, you are responsible for managing patient
						data securely and ensuring that access to patient
						records is restricted to authorized personnel only.
					</li>
					<li className="leading-5">
						<strong>
							Collaboration with Healthcare Providers:
						</strong>{" "}
						MyMedHub facilitates collaboration between health
						institutions and healthcare providers. You agree to
						engage in professional and collaborative communication
						with healthcare providers to deliver coordinated care to
						patients.
					</li>
					<li className="leading-5">
						<strong>Responsibility for Account:</strong> You are
						responsible for maintaining the security of your account
						credentials and for any activities that occur under your
						account. Notify us immediately if you suspect
						unauthorised access or use of your account.
					</li>
					<li className="leading-5">
						<strong>
							Collaboration with Healthcare Providers:
						</strong>{" "}
						MyMedHub facilitates communication and collaboration
						between patients and healthcare providers. By using our
						platform, you agree to engage in respectful and
						professional interactions with healthcare professionals.
					</li>
					<li className="leading-5">
						<strong>Feedback and Improvement:</strong> We value your
						feedback and suggestions for improving our platform.
						Your insights are essential in helping us enhance the
						user experience for both health institutions and
						patients.
					</li>
					<li className="leading-5">
						<strong>Termination of Account:</strong> MyMedHub
						reserves the right to terminate or suspend your account
						if you violate these terms and conditions or engage in
						any behaviour that compromises the security or integrity
						of our platform.
					</li>
					<li className="leading-5">
						<strong>
							By clicking "Agree" or by using MyMedHub, you
							acknowledge that you have read, understood, and
							agreed to these terms and conditions.
						</strong>
					</li>
				</ul>

				<div className="flex gap-x-1 mt-5">
					<input
						type="radio"
						name="agree"
						className="border-[#068513] ring-black"
					/>{" "}
					<p>I accept these Terms & Conditions</p>
				</div>

				<button className="bg-[#0685134D] text-white rounded-3xl w-full p-4 mt-6">
					Continue
				</button>
			</main>
		</>
	);
};

export default TermsAndCondition;
