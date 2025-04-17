import React from "react";
import GenerateOrder from "./generate-order";
import LabOrderDetails from "./preview-order";

const Orders = () => (
	<div className="px-4 flex h-screen gap-4 flex-col md:flex-row">
		<div className="md:w-2/6">
			<GenerateOrder />
		</div>
		<div className="md:w-4/6">
			<LabOrderDetails />
		</div>
	</div>
);

export default Orders;
