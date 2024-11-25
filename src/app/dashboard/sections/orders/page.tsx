import React from "react";
import GenerateOrder from "./generate-order";
import LabOrderDetails from "./preview-order";

const Orders = () => {
	return (
		<div className="flex h-screen gap-4 flex-col md:flex-row">
			<div className="md:w-1/4">
				<GenerateOrder />
			</div>
			<div className="md:w-3/4">
				<LabOrderDetails />
			</div>
		</div>
	);
};

export default Orders;
