import { getSessionProfile } from "@/hooks/getSessionProfile";
import HomeView from "@/view/dashboard/home";

export default async function Home() {
	const profile = await getSessionProfile();

	return <HomeView session={profile} />;
}
