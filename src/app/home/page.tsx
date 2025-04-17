import { getSessionProfile } from "@/hooks/getSessionProfile";

export default async function Home() {
	const profile = await getSessionProfile();

	return (
		<h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
			{`Welcome ${profile.profile?.firstname} ${profile.profile?.lastname}`}
		</h1>
	);
}
