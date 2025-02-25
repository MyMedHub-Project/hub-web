"use client";

import React, { useState } from "react";
import { Building2, Calendar, Download, FileText, User } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RescheduleModal } from "./reschedule-modal";
import { StatusBadge } from "./order-status-badge";

type OrderStatus = "pending" | "processing" | "completed" | "declined";

interface LabOrderDetailsProps {
	initialStatus?: OrderStatus;
}

export default function LabOrderDetails({
	initialStatus = "declined"
}: LabOrderDetailsProps) {
	const [
		status
		// setStatus
	] = useState<OrderStatus>(initialStatus);
	const [showReschedule, setShowReschedule] = useState(false);

	const handleReschedule = () => {
		setShowReschedule(false);
	};

	return (
		<>
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<CardTitle className="text-xl font-bold">
						Complete Blood Count (CBC)
					</CardTitle>
					{status === "pending" ? (
						<Button variant="destructive" size="sm">
							Cancel Order
						</Button>
					) : null}
					{status === "processing" ? (
						<Button
							variant="secondary"
							className="bg-muted-foreground"
							size="sm"
							disabled
						>
							View Results
						</Button>
					) : null}
					{status === "completed" ? (
						<Button
							variant="default"
							size="sm"
							className="bg-hubGreen"
						>
							View Results
						</Button>
					) : null}
					{status === "declined" ? (
						<div className="flex gap-2">
							<Button
								variant="default"
								size="sm"
								onClick={() => setShowReschedule(true)}
								className="bg-hubGreen text-sm"
							>
								Reschedule
							</Button>
							<Button
								size="sm"
								className="text-sm bg-gray-100 hover:bg-destructive text-hubBlack hover:text-white"
							>
								Cancel Order
							</Button>
						</div>
					) : null}
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="space-y-4 bg-hubGrey rounded-md p-2">
						<div className="flex items-start justify-between">
							<div className="flex flex-col">
								<h2 className="font-semibold text-base">
									Complete Blood Count (CBC)
								</h2>
								<div className="mt-1 flex items-start gap-4 text-sm text-muted-foreground flex-col">
									<div className="flex items-center gap-1">
										<User className="h-4 w-4" />
										<span>Samuel Anderson</span>
									</div>
									<div className="flex items-center gap-1">
										<Building2 className="h-4 w-4" />
										<span>MediLife Diagnostics</span>
									</div>
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										<span>13 June, 2024</span>
									</div>
								</div>

								<div className="text-sm text-muted-foreground flex flex-col mt-5">
									<span>Created By</span>
									<span className="font-medium text-xs text-foreground bg-gray-300 p-1 max-w-fit rounded-md">
										{" "}
										Dr. Omar Marchi
									</span>
								</div>
							</div>
							<StatusBadge status={status} />
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-bold text-muted-foreground">
							Prescription Details
						</h3>
						<div className="flex gap-2 rounded-lg border bg-gray-100 p-3 flex-col space-y-2">
							<span className="text-xs text-muted-foreground">
								Prescription
							</span>
							<div className="flex gap-2 items-center">
								<div className="bg-hubGrey p-2 flex gap-2 justify-between items-center rounded-lg w-full">
									<div className="flex gap-2 items-center">
										<FileText className="h-4 w-4 text-muted-foreground" />
										<div className="flex flex-col">
											<span className="text-sm">
												Doctor&apos;s Prescription
											</span>
											<span className="text-xs text-muted-foreground">
												3 MB • PDF
											</span>
										</div>
									</div>
									<Button
										size="icon"
										className="flex items-center bg-blue-300 rounded-lg"
									>
										<Download width="12" height="12" />
									</Button>
								</div>
							</div>
							<div className="space-y-4">
								<div className="flex flex-col">
									<span className="text-muted-foreground text-sm">
										Note{" "}
									</span>
									<span className="bg-hubGrey text-sm p-2 rounded-lg">
										Give me your note here{" "}
									</span>
								</div>
							</div>
						</div>
					</div>

					{status === "processing" ? (
						<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
							<p className="text-sm text-blue-700 dark:text-blue-400">
								Lab Order Accepted
							</p>
							<p className="mt-1 text-xs text-blue-600 dark:text-blue-500">
								Your appointment is confirmed for 13 June, 2024
								at 10:00 AM
							</p>
						</div>
					) : null}

					{status === "completed" ? (
						<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
							<p className="text-sm text-blue-700 dark:text-blue-400">
								Lab Test Results Ready
							</p>
							<p className="mt-1 text-xs text-blue-600 dark:text-blue-500">
								Your lab test results are now available. You can
								view the results directly in the app.
							</p>
						</div>
					) : null}

					{status === "declined" ? (
						<div className="flex flex-col space-y-2">
							<div className="rounded-lg bg-destructive/10 p-4">
								<p className="text-sm text-destructive">
									Your Order Was Declined
								</p>
								<p className="mt-1 text-xs text-destructive/90">
									Unfortunately we cannot accommodate your
									selected date. But don&apos;t worry, you can
									easily reschedule your order for a different
									date.
								</p>
							</div>

							<div className="flex flex-col">
								<span className="text-muted-foreground text-sm">
									Reason for order decline
								</span>
								<span className="bg-hubGrey text-sm p-2 rounded-lg">
									Invalid File Format!
								</span>
							</div>
						</div>
					) : null}
				</CardContent>
			</Card>

			<RescheduleModal
				open={showReschedule}
				onOpenChange={setShowReschedule}
				onReschedule={handleReschedule}
			/>
		</>
	);
}
