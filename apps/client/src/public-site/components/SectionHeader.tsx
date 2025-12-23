import { Paragraphe } from '@/shared/components/Paragraphe';

export function SectionHeader({
  title,
  subtext,
}: {
  title?: string;
  subtext?: string;
}) {
  return (
    <header>
      <h2 className="text-3xl font-semibold tracking-tight text-center scroll-m-20 first:mt-0">
        {title}
      </h2>
      <Paragraphe className="text-sm text-center  text-muted-foreground">
        {subtext}
      </Paragraphe>
    </header>
  );
}
