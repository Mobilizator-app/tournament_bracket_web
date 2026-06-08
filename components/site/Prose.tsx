/** Legal-document layout (privacy / terms): title, effective date, sections. */
export function LegalArticle({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-3xl font-bold text-text-primary md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Effective date: {effectiveDate}
      </p>
      <div className="mt-8">{children}</div>
    </article>
  );
}

/** One section of a legal document. Omit `title` for an untitled intro block. */
export function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      {title ? (
        <h2 className="text-lg font-bold text-text-primary md:text-xl">
          {title}
        </h2>
      ) : null}
      <div
        className={`${
          title ? 'mt-3' : ''
        } space-y-3 leading-relaxed text-text-secondary [&_a]:text-accent-green [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5`}
      >
        {children}
      </div>
    </section>
  );
}
