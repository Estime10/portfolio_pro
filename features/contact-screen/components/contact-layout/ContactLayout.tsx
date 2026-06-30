import { ContactForm } from "@/features/contact-screen/components/contact-form/ContactForm";
import { ContactPageHeader } from "@/features/contact-screen/components/contact-page-header/ContactPageHeader";
import type { ContactPageContentViewModel } from "@/features/contact-screen/types/contactFormViewModel";

export type ContactLayoutProps = Readonly<{
  content: ContactPageContentViewModel;
}>;

export function ContactLayout({ content }: ContactLayoutProps) {
  return (
    <article className="ui-container ui-section ui-section-contact pb-20 md:pb-28">
      <ContactPageHeader introParagraphs={content.introParagraphs} title={content.title} />
      <div className="mt-8 max-w-2xl md:mt-8 lg:mt-6">
        <ContactForm form={content.form} />
      </div>
    </article>
  );
}
