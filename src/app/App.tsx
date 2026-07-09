import { useEffect, useState, type ReactElement } from 'react';
import { Layout } from '../components/Layout';
import { AnalyticsPage } from '../features/analytics/AnalyticsPage';
import { ExamPage } from '../features/exam/ExamPage';
import { LearningPage } from '../features/learning/LearningPage';
import { PracticePage } from '../features/practice/PracticePage';
import { TermPracticePage } from '../features/practice/TermPracticePage';
import { UnitPracticePage } from '../features/practice/UnitPracticePage';

const routes: Record<string, { title: string; component: () => ReactElement }> = {
  '/learning': { title: '学习板块', component: LearningPage },
  '/practice': { title: '练习板块', component: PracticePage },
  '/exam': { title: '考试板块', component: ExamPage },
  '/unit-practice': { title: '单元练习', component: UnitPracticePage },
  '/term-practice': { title: '学期练习', component: TermPracticePage },
  '/analytics': { title: '学情评价', component: AnalyticsPage },
};

function getRoute() {
  return window.location.hash.replace('#', '') || '/learning';
}

export function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const ActivePage = routes[route]?.component ?? LearningPage;
  document.title = `${routes[route]?.title ?? '学习板块'} - 人教版数学学习平台`;

  return <Layout><ActivePage /></Layout>;
}
