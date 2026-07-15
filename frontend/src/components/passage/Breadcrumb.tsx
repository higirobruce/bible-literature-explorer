import Link from "next/link";

interface BreadcrumbProps {
  book: string;
  chapter: string;
}

export function Breadcrumb({ book, chapter }: BreadcrumbProps) {
  return (
    <nav className="mb-1 flex items-center gap-1.5 text-xs text-muted">
      <Link href="/library" className="transition-colors hover:text-accent">
        Library
      </Link>
      <span>/</span>
      <Link href={`/passage/${book.toLowerCase()}/1`} className="transition-colors hover:text-accent">
        {book}
      </Link>
      <span>/</span>
      <span className="text-secondary">{chapter}</span>
    </nav>
  );
}
