import { getRenderableSections } from "@/lib/content/accessors";
import type { PageKey, SiteContent } from "@/lib/content/schema";
import { renderSectionBlock } from "./blocks";

export function PageSections({
  content,
  page,
}: {
  content: SiteContent;
  page: PageKey;
}) {
  const sections = getRenderableSections(content, page);

  return (
    <>
      {sections.map((section, index) => (
        <div key={section.id}>
          {renderSectionBlock(content, section, index === 0 ? 1 : 2)}
        </div>
      ))}
    </>
  );
}
