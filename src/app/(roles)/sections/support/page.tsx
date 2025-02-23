"use client";

import { Separator } from "@radix-ui/react-select";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/button";

const Support = () => {
	const [isActive, setIsActive] = useState("");

	const faqItems = [
		{
			question: "What is MyMedHub?",
			answer: "MyMedHub is a secure healthcare platform that allows you to manage your medical records, communicate with healthcare providers, and access health-related services online.",
			id: 1
		},
		{
			question:
				"Can i request my complete medical records or specific documents electronically?",
			id: 2
		}
	];

	const termsContent = [
		{
			title: "Terms & Conditions",
			content: "This is your Terms & Condition"
		}
	];

	const privacyContent = [
		{
			title: "Privacy & Policies",
			content: "This is MedHub Policy"
		}
	];

	const renderContent = () => {
		switch (isActive) {
			case "faqs":
				return faqItems.map((item) => (
					<Button
						key={item.id}
						className="w-full flex items-center justify-between p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors"
					>
						<span className="text-gray-700">{item.question}</span>
						<ChevronRight className="w-5 h-5 text-gray-400" />
					</Button>
				));
			case "terms":
				return termsContent.map((item) => (
					<div className="flex flex-col" key={item.title}>
						<h2 className="text-gray-700">{item.title}</h2>
						<p>{item.content}</p>
					</div>
				));
			case "privacy":
				return privacyContent.map((item) => (
					<div className="flex flex-col" key={item.title}>
						<h2 className="text-gray-700">{item.title}</h2>
						<p>{item.content}</p>
					</div>
				));
			default:
				return null;
		}
	};
	return (
		<div className="max-w-2xl p-4">
			<nav className="flex items-center gap-2 mb-8 text-sm text-hubGreys">
				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "contact" ? "bg-hubGreen text-white" : "hover:text-gray-900"}`}
					onClick={() => setIsActive("contact")}
				>
					Contact Us
				</Button>
				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "faqs" ? "bg-hubGreen text-white" : "hover;text-gray-900"}`}
					onClick={() => setIsActive("faqs")}
				>
					FAQs
				</Button>

				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "terms" ? "bg-hubGreen text-white" : "hover:text-gray-900"}`}
					onClick={() => setIsActive("terms")}
				>
					Terms & Conditions
				</Button>
				<Button
					variant="ghost"
					className={`transition-colors px-4 py-2 rounded-md ${isActive === "privacy" ? "bg-hubGreen text-white" : "hover:text-gray-900"}`}
					onClick={() => setIsActive("privacy")}
				>
					Privacy Policy
				</Button>
			</nav>
			<Separator className="w-full" />
			<div className="space-y-4 lg:max-w-2xl mx-auto">
				{renderContent()}
			</div>
		</div>
	);
};

export default Support;
