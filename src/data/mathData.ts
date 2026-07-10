export type Term = '上学期' | '下学期';

export type Exercise = {
  id: string;
  prompt: string;
  choices?: string[];
  answer: string;
  hint: string;
  explanation: string;
};

export type KnowledgePoint = {
  id: string;
  title: string;
  objective: string;
  example: {
    problem: string;
    steps: string[];
    diagram: string;
  };
  practice: Exercise[];
  exam: Exercise[];
};

export type Unit = {
  id: string;
  grade: string;
  term: Term;
  title: string;
  overview: string;
  points: KnowledgePoint[];
};

export const units: Unit[] = [
  {
    id: 'g3-t1-u1',
    grade: '三年级',
    term: '上学期',
    title: '时、分、秒',
    overview: '认识时间单位，理解单位换算，并解决与经过时间有关的生活问题。',
    points: [
      {
        id: 'time-conversion',
        title: '时间单位换算',
        objective: '能说出 1 分 = 60 秒，1 时 = 60 分，并进行简单换算。',
        example: {
          problem: '3 分 20 秒等于多少秒？',
          steps: ['先把 3 分换算成秒：3 × 60 = 180 秒。', '再加上剩下的 20 秒：180 + 20 = 200 秒。', '所以 3 分 20 秒 = 200 秒。'],
          diagram: '3 分 → 180 秒；180 秒 + 20 秒 = 200 秒',
        },
        practice: [
          { id: 'p-time-1', prompt: '2 分 15 秒等于多少秒？', answer: '135', hint: '先把 2 分换成秒，再加 15 秒。', explanation: '2 × 60 + 15 = 135 秒。' },
          { id: 'p-time-2', prompt: '150 秒等于几分几秒？', answer: '2分30秒', hint: '想一想 150 里面有几个完整的 60。', explanation: '150 = 2 × 60 + 30，所以是 2 分 30 秒。' },
        ],
        exam: [
          { id: 'e-time-1', prompt: '小明读书用了 4 分 5 秒，一共是多少秒？', answer: '245', hint: '1 分 = 60 秒。', explanation: '4 × 60 + 5 = 245 秒。' },
        ],
      },
      {
        id: 'elapsed-time',
        title: '经过时间',
        objective: '能根据开始时间和结束时间计算经过了多久。',
        example: {
          problem: '从 8:10 到 8:45 经过了多少分钟？',
          steps: ['两个时间都在 8 时这一小时内。', '用结束分钟数减开始分钟数：45 - 10 = 35。', '所以经过了 35 分钟。'],
          diagram: '8:10 ───────── 35 分钟 ───────── 8:45',
        },
        practice: [
          { id: 'p-elapsed-1', prompt: '从 9:20 到 9:55 经过多少分钟？', answer: '35', hint: '同一小时内，用分钟数相减。', explanation: '55 - 20 = 35 分钟。' },
        ],
        exam: [
          { id: 'e-elapsed-1', prompt: '电影 14:30 开始，15:10 结束，放映了多少分钟？', answer: '40', hint: '可以先算到 15:00，再算剩下的时间。', explanation: '14:30 到 15:00 是 30 分钟，再到 15:10 是 10 分钟，共 40 分钟。' },
        ],
      },
    ],
  },
  {
    id: 'g4-t2-u3',
    grade: '四年级',
    term: '下学期',
    title: '小数的意义和性质',
    overview: '理解小数的意义，掌握小数大小比较和小数性质。',
    points: [
      {
        id: 'decimal-meaning',
        title: '小数的意义',
        objective: '能把十分之几、百分之几写成一位或两位小数。',
        example: {
          problem: '把 7/10 写成小数。',
          steps: ['分母是 10，表示把整体平均分成 10 份。', '取其中 7 份，就是十分之七。', '十分之七写作 0.7。'],
          diagram: '■■■■■■■□□□ = 7/10 = 0.7',
        },
        practice: [
          { id: 'p-decimal-1', prompt: '把 35/100 写成小数。', answer: '0.35', hint: '分母是 100，要写成两位小数。', explanation: '35/100 表示百分之三十五，写作 0.35。' },
        ],
        exam: [
          { id: 'e-decimal-1', prompt: '0.6 表示十分之几？', answer: '十分之六', hint: '一位小数表示十分之几。', explanation: '0.6 表示 6 个 0.1，也就是十分之六。' },
        ],
      },
      {
        id: 'decimal-compare',
        title: '小数大小比较',
        objective: '能按整数部分、十分位、百分位的顺序比较小数大小。',
        example: {
          problem: '比较 2.45 和 2.5 的大小。',
          steps: ['先看整数部分，都是 2。', '再看十分位，4 < 5。', '所以 2.45 < 2.5。'],
          diagram: '2.45：十分位 4；2.5：十分位 5',
        },
        practice: [
          { id: 'p-compare-1', prompt: '比较大小：3.08 和 3.8，哪个大？', answer: '3.8', hint: '整数部分相同，比较十分位。', explanation: '3.08 的十分位是 0，3.8 的十分位是 8，所以 3.8 大。' },
        ],
        exam: [
          { id: 'e-compare-1', prompt: '按从小到大排列：1.2、1.09、1.19。', answer: '1.09,1.19,1.2', hint: '可以把 1.2 看成 1.20。', explanation: '1.09 < 1.19 < 1.20，所以顺序是 1.09、1.19、1.2。' },
        ],
      },
    ],
  },
];

export const allKnowledgePoints = units.flatMap((unit) => unit.points.map((point) => ({ ...point, unit })));
export const allExercises = units.flatMap((unit) => unit.points.flatMap((point) => [...point.practice, ...point.exam].map((exercise) => ({ ...exercise, unit, point }))));
