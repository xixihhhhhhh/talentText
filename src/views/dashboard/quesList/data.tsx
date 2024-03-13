export interface ListItem {
  title: string;
  icon: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  component: string;
}

export const tags: string[] = [
  '很有想法的',
  '专注设计',
  '创意无限',
  '专注创新',
  '海纳百川',
  '前端开发',
  'vue3',
  '问卷调查',
  '人才测评',
  '博学多才',
  '客观专业',
  '高效准确',
];

export const teams: ListItem[] = [
  {
    icon: 'ri:alipay-fill',
    title: '伯乐团队',
    color: '#ff4000',
  },
  {
    icon: 'emojione-monotone:letter-a',
    title: '测评精英队',
    color: '#7c51b8',
  },
  {
    icon: 'ri:alipay-fill',
    title: '潜力挖掘组',
    color: '#00adf7',
  },
  {
    icon: 'jam:codepen-circle',
    title: '明日之星',
    color: '#00adf7',
  },
  {
    icon: 'fa:behance-square',
    title: '人才导航者',
    color: '#7c51b8',
  },
  {
    icon: 'jam:codepen-circle',
    title: '精英评估团',
    color: '#ff4000',
  },
];

export const details: ListItem[] = [
  {
    icon: 'ic:outline-contacts',
    title: '人才评估大师',
  },
  {
    icon: 'grommet-icons:cluster',
    title: '潜力发掘者',
  },
  {
    icon: 'bx:bx-home-circle',
    title: '职场指南者',
  },
  {
    icon: 'ant-design:one-to-one-outlined',
    title: '人力资源顾问',
  },
];

export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '文章',
    component: 'Article',
  },
  {
    key: '2',
    name: '应用',
    component: 'Application',
  },
  {
    key: '3',
    name: '项目',
    component: 'Project',
  },
];

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];

export const articleList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 4; i++) {
    result.push({
      title: 'Vben Admin',
      description: ['Vben', '设计语言', 'Typescript'],
      content: '基于Vue Next, TypeScript, Ant Design实现的一套完整的企业级后台管理系统。',
      time: '2020-11-14 11:20',
    });
  }
  return result;
})();

export const applicationList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Vben Admin',
      icon: 'emojione-monotone:letter-a',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();

export const projectList = [
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
  {
    title: '物流管理',
    content: '组织仓库操作，包括货物接收、存储、拣选和发货，确保仓库的高效运作和库存的准确记录。',
  },
  {
    title: '整顿规范',
    content: '对现有业务流程、制度和实践进行全面评估，确定需要整顿和规范的领域。',
  },
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
  {
    title: '营销管理',
    content:
      '负责制定创新且有效的营销策略，并确保其顺利执行,积极拓展市场，扩大业务覆盖范围，提升市场份额。',
  },
];
