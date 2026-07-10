import type { ReactNode } from 'react';

const navItems = [
  { path: '#/learning', label: '学习板块', icon: '📘' },
  { path: '#/practice', label: '练习板块', icon: '✍️' },
  { path: '#/exam', label: '考试板块', icon: '📝' },
  { path: '#/unit-practice', label: '单元练习', icon: '🧩' },
  { path: '#/term-practice', label: '学期练习', icon: '🎓' },
  { path: '#/analytics', label: '学情评价', icon: '📊' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside>
        <h1>人教版数学学习平台</h1>
        <nav>{navItems.map(({ path, label, icon }) => <a key={path} href={path}><span>{icon}</span>{label}</a>)}</nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
