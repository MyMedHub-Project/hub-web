import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion";
import { faqs } from "../FAQData";

const FAQs = () => (
	<Accordion type="single" collapsible className="w-full space-y-5">
		{faqs.map((faq, index) => (
			<AccordionItem
				value={`item-${index}`}
				key={index}
				className="bg-white/90 py-2 px-4 shadow-sm rounded-lg"
			>
				<AccordionTrigger className="font-semibold text-hub-black">
					{faq.question}?
				</AccordionTrigger>
				<AccordionContent>{faq.answer}</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);

export default FAQs;
