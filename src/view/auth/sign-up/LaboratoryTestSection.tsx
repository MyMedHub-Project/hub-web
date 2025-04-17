"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface LaboratorySectionProps {
	form: UseFormReturn<any>;
	availableTests: string[];
	selectedTests: string[];
	setSelectedTests: (tests: string[]) => void;
}

const LaboratoryTestSection = ({
	availableTests,
	form,
	selectedTests,
	setSelectedTests
}: LaboratorySectionProps) => {
	const [hasLaboratory, setHasLaboratory] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredOptions, setFilteredOptions] = useState(availableTests);

	// Filter the tests based on search query
	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredOptions(availableTests);
			return;
		}

		const filtered = availableTests.filter((test) =>
			test.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredOptions(filtered);
	}, [searchQuery, availableTests]);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	// Toggle selection of a test
	const toggleTestSelection = (test: string) => {
		if (selectedTests.includes(test)) {
			setSelectedTests(selectedTests.filter((t) => t !== test));
		} else {
			setSelectedTests([...selectedTests, test]);
		}
	};

	// Separate selected and unselected options
	const filteredSelectedOptions = filteredOptions.filter((test) =>
		selectedTests.includes(test)
	);
	const filteredUnselectedOptions = filteredOptions.filter(
		(test) => !selectedTests.includes(test)
	);
	// Combine them with selected at the top
	const orderedFilteredOptions = [
		...filteredSelectedOptions,
		...filteredUnselectedOptions
	];

	form.setValue("services", selectedTests);

	return (
		<div className="text-sm px-2">
			<label
				className="flex items-center cursor-pointer"
				onClick={() => setHasLaboratory(!hasLaboratory)}
			>
				<div
					className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center mr-2 ${
						hasLaboratory ? "border-hubGreen" : "border-gray-400"
					} `}
				>
					{hasLaboratory ? (
						<div className="w-[10px] h-[10px] rounded-full bg-hubGreen"></div>
					) : null}
				</div>
				<span className="font-normal">
					Do you offer Laboratory Services?
				</span>
			</label>

			{hasLaboratory ? (
				<div className="">
					<p className="font-normal my-2 text-muted-foreground">
						Select the services you offer
					</p>

					<div className="mt-2">
						<div className="mb-2">
							<input
								type="text"
								placeholder="Search tests..."
								value={searchQuery}
								onChange={handleSearchChange}
								className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="border rounded-md p-2 h-60 overflow-y-auto">
							{orderedFilteredOptions.length > 0 ? (
								orderedFilteredOptions.map((test) => (
									<div key={test} className="mb-2">
										<div
											onClick={() =>
												toggleTestSelection(test)
											}
											className={`p-3 rounded w-full transition-colors cursor-pointer ${
												selectedTests.includes(test)
													? "bg-hubGreen text-white"
													: "bg-gray-100 text-gray-500"
											}`}
										>
											{test}
										</div>
									</div>
								))
							) : (
								<div className="p-3 text-gray-500">
									No tests found
								</div>
							)}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default LaboratoryTestSection;
