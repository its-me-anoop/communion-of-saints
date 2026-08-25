export default function SaintTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="route-transition">{children}</div>;
}
