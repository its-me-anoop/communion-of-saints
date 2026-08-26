import Link from "next/link";

type ChapelSection = "saints" | "meditation";

const sections: Array<{ href: string; id: ChapelSection; label: string }> = [
  { href: "/", id: "saints", label: "Saints" },
  { href: "/meditation", id: "meditation", label: "Meditation" },
];

export default function ChapelTabs({ active }: { active: ChapelSection }) {
  return (
    <nav className="chapel-tabs" aria-label="Chapel sections">
      {sections.map((section) => (
        <Link
          className="chapel-tab"
          href={section.href}
          key={section.id}
          aria-current={section.id === active ? "page" : undefined}
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
