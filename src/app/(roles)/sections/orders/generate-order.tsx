"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { Plus, Search, UserRound } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import LabOrderForm from "./lab-order-form";

const GenerateOrder = () => {
	const [activeTab, setActiveTab] = useState("all");
	const [
		orders
		// setOrders
	] = useState([
		{
			id: 1,
			title: "Complete Blood Count (CBC)",
			institution: "MedLife Diagnostics",
			type: "lab test order",
			status: "processing",
			iconBg: "bg-blue-100"
		},
		{
			id: 2,
			title: "Blood Pressure Medication",
			institution: "MedLife Pharmacy",
			type: "medication order",
			status: "completed",
			iconBg: "bg-pink-100"
		}
	]);
	const [orderType, setOrderType] = useState<"lab" | "medication">("lab");

	const filteredOrders = orders.filter((order) => {
		if (activeTab === "all") return order.status === activeTab;
	});

	const [searchQuery, setSearchQuery] = useState("");

	const orderClick = (orderId: any) => {
		console.log(`Order ${orderId} clicked`);
	};

	const tabs = [
		{ id: "all", label: "All" },
		{ id: "processing", label: "Processing" },
		{ id: "completed", label: "Completed" }
	];

	const handleNewOrder = () => {
		console.log("New Order");
	};

	return (
		<>
			<Card>
				<CardContent className="space-y-3 p-2">
					<div className="flex justify-between items-center">
						<span className="text-lg font-bold items-center">
							Orders
						</span>

						<Dialog>
							<DialogTrigger>
								<div
									className="bg-hub-green rounded-lg items-center p-1 cursor-pointer hover:bg-green-700 transition-colors"
									onClick={handleNewOrder}
								>
									<Plus className="text-white" />
								</div>
							</DialogTrigger>
							<DialogContent className="bg-white text-hub-black space-y-2 w-[400px]">
								<DialogHeader>
									<DialogTitle>Select Order Type</DialogTitle>
									<span className="text-sm font-normal">
										Choose a type of order you would like to
										place.
									</span>
								</DialogHeader>

								<div
									className={cn(
										"flex gap-3 items-center bg-hub-grey rounded-lg p-2 border hover:border-hub-blue  cursor-pointer",
										orderType === "lab" && "border-hub-blue"
									)}
									onClick={() => setOrderType("lab")}
								>
									<div className="flex">
										<Avatar>
											<AvatarImage />
											<AvatarFallback>
												<UserRound />
											</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex flex-col text-left space-y-2">
										<p className="font-bold text-sm">
											Lab Test Order
										</p>
										<span className="text-xs font-thin">
											Submit a prescripttion for lab tests
											and view results online
										</span>
									</div>
									<div className="flex items-center">
										<CaretRightIcon />
									</div>
								</div>
								<div
									className={cn(
										"flex gap-3 items-center bg-hub-grey rounded-lg p-2 border hover:border-hub-purple cursor-pointer",
										orderType === "medication" &&
											"border-hub-purple"
									)}
									onClick={() => setOrderType("medication")}
								>
									<div className="flex">
										<Avatar>
											<AvatarImage />
											<AvatarFallback>
												<UserRound />
											</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex flex-col text-left space-y-2">
										<p className="font-bold text-sm">
											Medication Order
										</p>
										<span className="text-xs font-thin">
											Order medications from our
											registered pharmacies using your
											doctor&apos;s prescripttion.
										</span>
									</div>
									<div className="flex items-center">
										<CaretRightIcon />
									</div>
								</div>

								<DialogFooter className="w-full">
									<Dialog>
										<DialogTrigger>
											<Button className="w-full text-xs bg-hub-green">
												Continue
											</Button>
										</DialogTrigger>
										<DialogTitle hidden>
											{orderType === "lab"
												? "Lab Order"
												: "Medication Order"}
										</DialogTitle>
										<DialogContent className="border-0 shadow-none">
											{orderType === "lab" ? (
												<LabOrderForm />
											) : (
												<LabOrderForm />
											)}
										</DialogContent>
									</Dialog>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					<div className="relative">
						<Search className="absolute top-2 left-3 w-4 h-4 text-gray-500 z-0" />
						<Input
							className="bg-gray-100 pl-9 rounded-lg "
							placeholder=""
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* Tabs */}
					<div className="bg-hub-grey grid grid-cols-3 mt-5 py-1 px-0.5 rounded-full">
						{tabs.map((tab) => (
							<div
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"w-full py-1 text-sm cursor-pointer transition-colors flex items-center justify-center",
									activeTab === tab.id
										? "bg-hub-green text-white rounded-full"
										: "text-gray-600 bg-transparent"
								)}
							>
								{tab.label}
							</div>
						))}
					</div>

					<div className="space-y-3 mt-1">
						{filteredOrders
							.filter(
								(order) =>
									order.title
										.toLowerCase()
										.includes(searchQuery.toLowerCase()) ||
									order.institution
										.toLowerCase()
										.includes(searchQuery.toLowerCase())
							)
							.map((order) => (
								<div
									key={order.id}
									onClick={() => orderClick(order.id)}
									className="border rounded-lg p-3 space-y-2 cursor-pointer hover:border-hub-green transition-colors"
								>
									<div className="flex items-center space-x-2">
										<div
											className={`w-8 h-8 ${order.iconBg} rounded-lg flex items-center justify-center`}
										>
											<span className="">icon</span>
										</div>
										<div className="grow">
											<h3 className="font-medium">
												{order.title}
											</h3>
											<p className="text-sm text-gray-500">
												{order.institution}
											</p>
										</div>
										{order.status === "processing" ? (
											<div className="w-2 h-2 bg-hub-orange rounded-full"></div>
										) : null}
									</div>
								</div>
							))}
						{filteredOrders.length === 0 ? (
							<div className="text-center py-4 text-gray-500">
								No orders found.
							</div>
						) : null}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default GenerateOrder;
