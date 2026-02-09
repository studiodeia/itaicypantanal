import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    number: "01",
    question: "A pousada é destinada apenas para pesca?",
    answer:
      "Elegância essencial em harmonia com o bioma. Uma experiência de imersão autêntica, sem excessos e sem concessões.",
  },
  {
    id: "item-2",
    number: "02",
    question: "A pousada é destinada apenas para pesca?",
    answer: "",
  },
  {
    id: "item-3",
    number: "03",
    question: "A pousada é destinada apenas para pesca?",
    answer: "",
  },
  {
    id: "item-4",
    number: "04",
    question: "A pousada é destinada apenas para pesca?",
    answer: "",
  },
  {
    id: "item-5",
    number: "05",
    question: "A pousada é destinada apenas para pesca?",
    answer: "",
  },
];

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-end w-full bg-[#344e41]">
      <div className="flex flex-col max-w-[1440px] items-center justify-end gap-[100px] px-16 py-[100px] w-full">
        <header className="flex flex-col items-start gap-8 w-full">
          <div className="flex items-center justify-center w-fit font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] whitespace-nowrap [font-style:var(--lead-md-font-style)]">
            PERGUNTAS FREQUENTES
          </div>

          <div className="flex items-center gap-[100px] w-full">
            <h2 className="w-[664px] font-heading-lg font-[number:var(--heading-lg-font-weight)] text-[#e3f7ec] text-[length:var(--heading-lg-font-size)] leading-[var(--heading-lg-line-height)] flex items-center justify-center tracking-[var(--heading-lg-letter-spacing)] [font-style:var(--heading-lg-font-style)]">
              Ainda possuí alguma dúvida?
            </h2>

            <p className="flex-1 font-body-md font-[number:var(--body-md-font-weight)] text-[#a8cab9] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] flex items-center justify-center tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
              Respondemos às principais dúvidas para que sua única preocupação
              seja aproveitar a imersão na natureza selvagem.
            </p>
          </div>
        </header>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-[#f2fcf7] data-[state=open]:bg-[#263a30] data-[state=open]:rounded-t-lg"
            >
              <AccordionTrigger className="px-8 py-10 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-12 w-full">
                  <span className="w-fit font-body-md font-[number:var(--body-md-font-weight)] text-[#6c927f] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] whitespace-nowrap tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)]">
                    {faq.number}
                  </span>

                  <span className="flex-1 text-left font-heading-md font-[number:var(--heading-md-font-weight)] text-[#e3f7ec] text-[length:var(--heading-md-font-size)] leading-[var(--heading-md-line-height)] tracking-[var(--heading-md-letter-spacing)] [font-style:var(--heading-md-font-style)]">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              {faq.answer && (
                <AccordionContent className="px-8 pb-10">
                  <div className="pl-[69px]">
                    <p className="font-body-lg font-[number:var(--body-lg-font-weight)] text-[#a8cab9] text-[length:var(--body-lg-font-size)] tracking-[var(--body-lg-letter-spacing)] leading-[var(--body-lg-line-height)] [font-style:var(--body-lg-font-style)]">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
