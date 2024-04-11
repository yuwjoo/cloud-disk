export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("渲染布局");
  return (
    <div>
      <div>我是home布局</div>
      <input />
      <div>{children}</div>
    </div>
  );
}
