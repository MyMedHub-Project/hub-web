import About from "./about";
import Bio from "./bio";
import Contact from "./contact";
import Edit from "./edit";
import Health from "./health";

const ProfilePage = () => {
	return (
		<div className="w-[90%] mx-auto space-y-5">
			<About />
			<Edit />
			<Bio />
			<Health />
			<Contact />
		</div>
	);
};

export default ProfilePage;
