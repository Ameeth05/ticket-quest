import { Separator } from "./ui/separator";

type HeadingPageProps = {
  title: string;
  description?: string;
  tabs?: React.ReactNode;
};

export default function Heading({
  title,
  description,
  tabs,
}: HeadingPageProps) {
  return (
    <>
      {tabs}
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Separator />
    </>
  );
}
