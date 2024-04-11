export default function Template({ children }: { children: React.ReactNode }) {
  console.log("渲染模板");
  return (
    <div>
      <div>我是模板</div>
      <input />
      {children}
    </div>
  );
}
