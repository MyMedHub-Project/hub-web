"use client";

import { Label } from "@/components/form";
import { Input } from "@/components/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Plus, Search, Trash2, User, UserRound } from "lucide-react";
import React, { experimental_taintObjectReference, useState } from "react";

interface FamilyMember {
	id: string;
	name: string;
	image: string;
	email: string;
	phone: string;
	relationship: string;
	gender: string;
	healthCondition: string;
	note: string;
}

interface Request {
	id: string;
	name: string;
	image: string;
	relationship: string;
	status: "pending" | "accepted" | "declined";
}

interface MemberFieldConfig {
	key: keyof FamilyMember;
	label: string;
}

const memberFieldConfig: MemberFieldConfig[] = [
	{ key: "email", label: "Email" },
	{ key: "phone", label: "Phone No." },
	{ key: "relationship", label: "Relationship" },
	{ key: "gender", label: "Gender" },
	{ key: "healthCondition", label: "Health Condition" },
	{ key: "note", label: "Note" }
];

export default function Family() {
	const [showAddMember, setShowAddMember] = useState(false);
	const [showMemberDetails, setShowMemberDetails] = useState(false);
	const [showInvite, setShowInvite] = useState(false);
	const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
		null
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const familyMembers: FamilyMember[] = [
		{
			id: "1",
			name: "John Doe",
			image: "/",
			email: "john@example.com",
			phone: "+1234567890",
			relationship: "Father",
			gender: "Male",
			healthCondition: "None",
			note: "Lorem ipsum dolor sit amett"
		},
		{
			id: "2",
			name: "Jane Doe",
			image: "",
			email: "jane@example.com",
			phone: "+1234567890",
			relationship: "Father",
			gender: "Female",
			healthCondition: "None",
			note: "Lorem ipsum dolor sit amett"
		}
	];

	const familyRequests: Request[] = [
		{
			id: "1",
			name: "Stella Anderson",
			image: "",
			relationship: "Sister",
			status: "pending"
		}
	];

	const searchResults = [
		{
			id: "1",
			name: "Samuel Anderson",
			email: "samuel@example.com",
			image: "",
			location: "Lagos, Nigeria"
		}
	];

	return (
		<div className="flex h-screen gap-4 p-4 flex-col md:flex-row">
			<div className="md:w-3/4 rounded-lg border p-4">
				<h2 className="mb-4 text-xl font-semibold">Family Members</h2>
				<div className="relative mb-4 bg-gray-200">
					<Search className="absolute left-2 top-2.5 h-4 w-4 items-center text-muted-foreground" />
					<Input
						placeholder="Search"
						className="pl-8 placeholder:text-xs placeholder:font-bold items-center"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="flex">
					<div className="grid grid-cols-1 mx-auto sm:grid-cols-3 lg:grid-cols-4 gap-10 sm:mx-10">
						<div className="flex flex-col">
							<Button
								variant="outline"
								className="flex h-24 flex-col items-center justify-center gap-2 rounded-full border-hubGreen border-2"
								onClick={() => setShowAddMember(true)}
							>
								<Plus className="h-8 w-8" />
							</Button>
							<div className="text-center mt-2 justify-center">
								<span className="text-xs text-center mt-2">
									Add Family Members
								</span>
							</div>
						</div>
						{familyMembers.map((member) => (
							<div className="flex flex-col" key={member.id}>
								<Button
									key={member.id}
									variant="outline"
									className="flex h-24 flex-col items-center justify-center gap-2 rounded-full"
									onClick={() => {
										setSelectedMember(member);
										setShowMemberDetails(true);
									}}
								>
									<Avatar className="h-12 w-12">
										<AvatarImage
											src={member.image}
											alt={member.name}
										/>
										<AvatarFallback>
											<UserRound className="h-6 w-6" />
										</AvatarFallback>
									</Avatar>
								</Button>
								<div className="flex flex-col justify-center mt-2 text-center">
									<span className="text-xs font-bold">
										{member.name}
									</span>
									<span className="text-xs text-muted-foreground">
										{member.relationship}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* R.H.S - Family Request */}
			<div className="md:w-1/4 rounded-lg border p-4">
				<h2 className="mb-4 text-xl font-semibold">Family Request</h2>
				<Separator className="mb-2" />
				{familyRequests.length === 0 ? (
					<div className="flex h-[400px] flex-col items-center justify-center gap-2 text-center">
						<UserRound className="h-12 w-12 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">
							No family requests at the moment.
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{familyRequests.map((request) => (
							<div key={request.id}>
								<div className="flex items-center justify-between rounded-lg p-4 md:hidden">
									<div className="flex items-center gap-4">
										<Avatar>
											<AvatarImage
												src={request.image}
												alt={request.name}
											/>
											<AvatarFallback>
												<UserRound className="h-4 w-4" />
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-bold text-lg">
												{request.name}
											</p>
											<p className="text-xs text-muted-foreground">
												Wants to add you as their{" "}
												{request.relationship}
											</p>
										</div>
									</div>
									<div className="flex gap-2">
										<Button
											variant="default"
											size="lg"
											className="bg-hubGreen"
										>
											Accept
										</Button>
										<Button
											variant="outline"
											className="bg-gray-200 hover:bg-destructive hover:text-white"
											size="lg"
										>
											Decline
										</Button>
									</div>
								</div>
								<div className="hidden md:flex">
									<div className="flext items-center gap-4">
										<Avatar>
											<AvatarImage
												src={request.image}
												alt={request.name}
											/>
											<AvatarFallback>
												<UserRound className="h-4 w-4" />
											</AvatarFallback>
										</Avatar>
									</div>
									<div className="flex flex-col space-y-2">
										<div className="flex items-center gap-4">
											<div>
												<p className="font-bold text-lg">
													{request.name}
												</p>
												<p className="text-xs text-muted-foreground">
													Wants to add you as their{" "}
													{request.relationship}
												</p>
											</div>
										</div>
										<div className="flex gap-2">
											<Button
												variant="default"
												size="lg"
												className="bg-hubGreen"
											>
												Accept
											</Button>
											<Button
												variant="outline"
												className="bg-gray-200 hover:bg-destructive hover:text-white"
												size="lg"
											>
												Decline
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			{/* R.H.S Ends */}

			<Dialog open={showAddMember} onOpenChange={setShowAddMember}>
				<DialogContent className="bg-white text-hubBlack">
					<DialogHeader>
						<DialogTitle>Add a Family Member</DialogTitle>
						<DialogDescription>
							Type the user&apos;s name or email address below.
							<br></br>You can send an invite to the provided
							email if user is not already registered.
						</DialogDescription>
					</DialogHeader>
					<div className=" space-y-6 ">
						<div className="relative">
							<Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground items-center" />
							<Input
								placeholder="Anderson"
								className="pl-4 bg-gray-200 p-5 items-center"
							/>
						</div>
						<div className="space-y-2">
							{searchResults.map((result) => (
								<div
									key={result.id}
									className="flex items-center justify-between rounded-lg p-2"
								>
									<div className="flex items-center gap-4">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={result.image}
												alt={result.name}
											/>
											<AvatarFallback>
												<UserRound className="h-4 w-4" />
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col leading-normal">
											<span className="text-md font-bold">
												{result.name}
											</span>
											<span className="text-xs text-muted-foreground">
												{result.email}
											</span>
											<span className="text-xs text-muted-foreground">
												{result.location}
											</span>
										</div>
									</div>
									<Button
										size="icon"
										variant="ghost"
										className="h-7 w-7 bg-hubGreenLight"
										onClick={() => setShowInvite(true)}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog
				open={showMemberDetails}
				onOpenChange={setShowMemberDetails}
			>
				<DialogContent className="bg-white text-hubBlack">
					<DialogHeader>
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center gap-4">
								<Avatar className="h-12 w-12">
									<AvatarImage
										src={selectedMember?.image}
										alt={selectedMember?.name}
									/>
									<AvatarFallback>
										<UserRound className="h-6 w-6" />
									</AvatarFallback>
								</Avatar>
								<DialogTitle>
									{selectedMember?.name}
								</DialogTitle>
							</div>
							<div className="flex">
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => setShowDeleteConfirm(true)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</DialogHeader>
					<div className="grid gap-4 bg-gray-100 text-xs px-5 py-2 rounded-lg">
						{memberFieldConfig.map((member) => (
							<div
								key={member.key}
								className="grid grid-cols-4 items-center gap-4"
							>
								<Label className="text-left">
									{member.label}:
								</Label>
								<div className="col-span-3 font-bold">
									{selectedMember?.[member.key]}
								</div>
							</div>
						))}
					</div>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={showDeleteConfirm}
				onOpenChange={setShowDeleteConfirm}
			>
				<DialogContent className="max-w-[425px] bg-white text-hubBlack">
					<DialogHeader className="p-5 space-y-4 leading-normal">
						<DialogTitle className="text-center text-md font-extrabold">
							Remove {selectedMember?.name}
						</DialogTitle>
						<DialogDescription className="text-center text-sm">
							Are you sure you want to remove{" "}
							{selectedMember?.name} as a family member?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="w-full">
						<div className="w-full">
							<Button
								variant="outline"
								onClick={() => setShowDeleteConfirm(false)}
								className="w-full bg-gray-200"
							>
								Cancel
							</Button>
						</div>
						<div className="w-full">
							<Button
								variant="destructive"
								onClick={() => {
									setShowDeleteConfirm(false);
									setShowMemberDetails(false);
								}}
								className="w-full"
							>
								Remove
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{/* Delete Confirmation Dialog ends */}

			<Dialog open={showInvite} onOpenChange={setShowInvite}>
				<DialogContent className="bg-white text-hubBlack w-[450px] mx-auto">
					<DialogHeader>
						<DialogTitle>Send invitation</DialogTitle>
						<DialogDescription className="text-[13px]">
							Invite <strong>samuel@example.com</strong> to
							download and use MyMedHub.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 my-5">
						<div className="grid gap-2">
							<Label
								htmlFor="relationship"
								className="text-sm text-gray-500"
							>
								Select Relationship
							</Label>
							<Select>
								<SelectTrigger className="bg-gray-200 shadow-md">
									<SelectValue placeholder="Wife" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="wife">Wife</SelectItem>
									<SelectItem value="husband">
										Husband
									</SelectItem>
									<SelectItem value="father">
										Father
									</SelectItem>
									<SelectItem value="mother">
										Mother
									</SelectItem>
									<SelectItem value="sister">
										Sister
									</SelectItem>
									<SelectItem value="brother">
										Brother
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid  gap-2">
							<Label
								htmlFor="note"
								className="text-gray-500 text-sm"
							>
								Note
							</Label>
							<Textarea
								className="resize-none bg-gray-200 shadow-md"
								placeholder="Add a message"
							/>
						</div>
					</div>

					<div className="w-full flex gap-2 justify-between">
						<div className="w-full">
							<Button
								className="bg-hubGreen w-full"
								onClick={() => setShowInvite(false)}
							>
								Send Invite
							</Button>
						</div>
						<div className="w-full">
							<Button
								variant="outline"
								className="bg-gray-200 w-full"
								onClick={() => setShowInvite(false)}
							>
								Cancel
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
