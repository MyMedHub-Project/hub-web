"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { AppointmentCardData } from "@/types/types";
import { AppointmentCard } from "@/view/dashboard/common/AppointmentCard";

interface StackedAppointmentCardsProps {
	appointments: AppointmentCardData[];
}

export const StackedAppointmentCards = ({
	appointments
}: StackedAppointmentCardsProps) => {
	const [activeCardIndex, setActiveCardIndex] = useState(0);

	const handleCardClick = (index: number) => {
		if (index === activeCardIndex) {
			// If clicking current card, show next card
			const nextIndex = (index + 1) % appointments.length;
			setActiveCardIndex(nextIndex);
		} else {
			// If clicking a different card, make it active
			setActiveCardIndex(index);
		}
	};

	return (
		<CardContent className="relative px-4 py-2 overflow-hidden">
			<div
				className="relative"
				style={{
					height: appointments.length > 0 ? "220px" : "auto"
				}}
			>
				{appointments.map((appointment, index) => {
					// Show only the first 3 appointments in stack
					if (
						index >= activeCardIndex &&
						index < activeCardIndex + 3
					) {
						const relativeIndex = index - activeCardIndex;

						return (
							<div
								key={index}
								className="absolute w-full transition-all duration-300 cursor-pointer"
								style={{
									top: 0,
									right: 0,
									zIndex: appointments.length - relativeIndex,
									width: "100%",
									transform:
										relativeIndex === 0
											? "translateX(0)"
											: `translateX(-${100 - relativeIndex * 6}%)`,
									opacity: 1,
									boxShadow:
										relativeIndex > 0
											? "0 2px 5px rgba(0, 0, 0, 0.08)"
											: "none"
								}}
								onClick={() => handleCardClick(index)}
							>
								<AppointmentCard
									data={appointment}
									className="w-full"
								/>

								{/* Stack indicator on right side */}
								{relativeIndex === 0 &&
								index < appointments.length - 1 ? (
									<div className="absolute top-0 right-0 h-full flex flex-col justify-center">
										{[1, 2].map((stackIndex) => {
											if (
												index + stackIndex <
												appointments.length
											) {
												return (
													<div
														key={stackIndex}
														className="absolute top-0 right-0 h-full bg-white shadow-md"
														style={{
															width: "12px",
															right: `-${stackIndex * 6}px`,
															opacity:
																1 -
																stackIndex *
																	0.15,
															borderTopRightRadius:
																"8px",
															borderBottomRightRadius:
																"8px"
														}}
													/>
												);
											}
											return null;
										})}
									</div>
								) : null}
							</div>
						);
					}
					return null;
				})}
			</div>
		</CardContent>
	);
};
