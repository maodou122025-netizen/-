import type { PracticeQuestion } from './types';

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'linear-equation-01',
    title: '一元一次方程',
    prompt: '解方程：2x + 6 = 14。请填写 x 的值。',
    knowledgePoint: '等式性质与移项',
    reviewTopics: ['等式两边同时加减同一个数', '等式两边同时乘除同一个非零数'],
    acceptedAnswers: ['4', 'x=4', 'x = 4'],
    hintLevel1: '相关知识点：等式两边做相同运算，等式仍然成立。',
    hintLevel2: '解题方向：先把常数项 6 从左边消去，再处理 x 前面的系数 2。',
    hintLevel3: '关键步骤：两边先减 6，得到 2x = 8；接下来两边除以 2。',
  },
  {
    id: 'fraction-addition-01',
    title: '分数加法',
    prompt: '计算：1/3 + 1/6。请填写最简结果。',
    knowledgePoint: '异分母分数通分',
    reviewTopics: ['最小公倍数', '通分', '分数约分'],
    acceptedAnswers: ['1/2', '0.5', '2/4'],
    hintLevel1: '相关知识点：异分母分数相加，需要先通分。',
    hintLevel2: '解题方向：3 和 6 的公分母可以取 6。',
    hintLevel3: '关键步骤：把 1/3 化成 2/6，再与 1/6 相加，最后检查是否为最简分数。',
  },
  {
    id: 'area-rectangle-01',
    title: '长方形面积',
    prompt: '一个长方形长 8 cm、宽 5 cm，它的面积是多少平方厘米？',
    knowledgePoint: '长方形面积公式',
    reviewTopics: ['面积单位', '长方形面积 = 长 × 宽'],
    acceptedAnswers: ['40', '40cm²', '40 cm²', '40平方厘米'],
    hintLevel1: '相关知识点：长方形面积由长和宽相乘得到。',
    hintLevel2: '解题方向：找出题目中的长和宽，然后代入面积公式。',
    hintLevel3: '关键步骤：将 8 和 5 相乘，并保留平方厘米作为面积单位。',
  },
];
