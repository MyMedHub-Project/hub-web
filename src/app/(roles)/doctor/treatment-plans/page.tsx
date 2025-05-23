import React from "react";
import ActionSection from "./components/action-section";
import ViewSection from "./components/view-section";

const page = () => (
	<div className="flex-1 flex gap-x-1">
		<ActionSection />
		<ViewSection />
	</div>
);

export default page;
