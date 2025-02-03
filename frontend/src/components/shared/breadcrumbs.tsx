// components/shared/Breadcrumbs.tsx
interface BreadcrumbsProps {
  items: string[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mx-auto mt-[64px] flex items-center justify-center">
      <ul className="flex items-center gap-x-3">
        {items.map((item, index) => (
          <li key={index}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
