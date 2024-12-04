export default function FilterTitle({ title }: { title: string }) {
  return (
    <h2 className="py-2 px-6 font-medium text-launchingBlue-5 dark:text-fg-white tracking-wide text-text-md">
      {title}
    </h2>
  );
}
