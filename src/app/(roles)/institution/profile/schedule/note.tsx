import { AlertCircleIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Note = () => (
	<Card className="bg-hubBlue/10 text-hubBlue px-5 py-3">
		<CardTitle className="flex items-center gap-x-2 mb-2">
			<AlertCircleIcon className="fill-hubBlue text-hubGrey" />
			Note
		</CardTitle>
		<CardContent className="p-0">
			<ul className="list-disc list-inside pl-2">
				<li>
					Ensure that your availability is up-to-date to avoid
					scheduling conflicts.
				</li>
				<li>
					Patients can book appointments based on the availability you
					set here.
				</li>
				<li>You can modify your availability anytime.</li>
			</ul>
		</CardContent>
	</Card>
);

export default Note;
