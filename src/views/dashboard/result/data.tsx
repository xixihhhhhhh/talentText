import type { TableColumnsType } from 'ant-design-vue';

export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 6; i++) {
    result.push({
      id: i,
      title: 'Vben Admin',
      description: '基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统',
      datetime: '2020-11-26 17:39',
      extra: '编辑',
      icon: 'logos:vue',
      color: '#1890ff',
      author: 'Vben',
      percent: 20 * (i + 1),
    });
  }
  return result;
})();

export const careerAdvantagesMap = {
  affairs: '事务型',
  skill: '技能型',
  hatched: '规划型',
  invent: '发明型',
  operable: '操作型',
  controlled: '管控型',
  impact: '影响型',
  communicative: '交际型',
  pioneer: '开拓型',
  serve: '服务型',
  humanistic: '人文型',
};

export const dataSource = [
  {
    key: '1',
    ability: 'Mike',
    pronounced: 32,
    define: '10 Downing Street',
  },
  {
    key: '2',
    ability: 'John',
    pronounced: 42,
    define: '10 Downing Street',
  },
  {
    key: '3',
    ability: 'Mike',
    pronounced: 32,
    define: '10 Downing Street',
  },
  {
    key: '4',
    ability: 'John',
    pronounced: 42,
    define: '10 Downing Street',
  },
  {
    key: '5',
    ability: 'Mike',
    pronounced: 32,
    define: '10 Downing Street',
  },
  {
    key: '6',
    ability: 'John',
    pronounced: 42,
    define: '10 Downing Street',
  },
  {
    key: '7',
    ability: 'Mike',
    pronounced: 32,
    define: '10 Downing Street',
  },
  {
    key: '8',
    ability: 'John',
    pronounced: 42,
    define: '10 Downing Street',
  },
];

export const columns: TableColumnsType = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
    width: 50,
  },
  {
    title: '内在能力',
    dataIndex: 'ability',
    key: 'ability',
    width: 100,
  },
  {
    title: '倾向明显程度',
    dataIndex: 'pronounced',
    key: 'pronounced',
    width: 200,
  },
  {
    title: '定义',
    dataIndex: 'define',
    key: 'define',
    width: 150,
  },
];

export function sortObject(obj) {
  const sortedObj = Object.entries(obj).sort(
    // @ts-ignore
    (a, b) => parseFloat(b[1]) - parseFloat(a[1]),
  );
  // 将排序后的数组转换回对象

  return sortedObj;
}

export const advantageMap = {
  flexible: ['灵活应变', '技能型'],
  message: ['信息管理', '技能型'],
  policy: ['政策解读', '规划型'],
  writing: ['书面表达', '规划型'],
  holistic: ['全局观念', '规划型'],
  risk: ['规划型', '规划型'],
  study: ['主动学习', '发明型'],
  find: ['洞察发现', '发明型'],
  create: ['创新创造', '发明型'],
  dedication: ['敬业尽责', '操作型'],
  confidentiality: ['保密意识', '操作型'],
  unimpressed: ['独立自主', '操作型'],
  norms: ['遵守规范', '操作型'],
  law: ['法律法规', '操作型'],
  dataAnalysis: ['数据分析', '操作型'],
  logicalAnalysis: ['逻辑分析', '操作型'],
  implementation: ['执行落实', '事务型'],
  patience: ['严谨耐心', '事务型'],
  hard: ['吃苦耐劳', '事务型'],
  time: ['时间管理', '事务型'],
  plan: ['统筹规划', '管控型'],
  firm: ['立场坚定', '管控型'],
  safe: ['安全意识', '管控型'],
  intimidate: ['威慑他人', '管控型'],
  leadingOthers: ['领导他人', '影响型'],
  political: ['政治素养', '影响型'],
  organizational: ['组织认同', '影响型'],
  coordination: ['沟通协调', '交际型'],
  rallying: ['凝聚他人', '交际型'],
  aggressive: ['积极进取', '开拓型'],
  underPressure: ['抗压能力', '交际型'],
  serviceMinded: ['服务意识', '服务型'],
  selfControl: ['情绪自控', '服务型'],
  approachable: ['平易近人', '服务型'],
  teamwork: ['平易近人', '人文型'],
  employPeople: ['识人用人', '人文型'],
};
