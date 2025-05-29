import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { faqs } from "@/constants";

export const FAQs = () => {
	return (
		<div className="text-white bg-gradient-to-r from-[#1B1D37] via-[#2d3748] to-[#1a202c] py-16">
			<div className="container">
				<h4 className="font-medium text-2xl md:text-3xl lg:text-4xl">
					Frequently Asked{" "}
					<span className="text-secondary">Questions</span>
				</h4>
				<div className="mt-8">
					<Accordion
						type="single"
						collapsible
						className="w-full grid gap-4"
					>
						{faqs.map(({ question, answer }, index) => (
							<AccordionItem value={`${index}`} key={index}>
								<AccordionTrigger>{question}</AccordionTrigger>
								<AccordionContent>{answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};
