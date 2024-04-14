interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
  route: string;
}

export interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  content: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
    route: '/dashboard/index',
  },
  {
    title: '分析页',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
    route: '/dashboard/analysis',
  },
  {
    title: '填报问卷',
    icon: 'ion:layers-outline',
    color: '#e18525',
    route: '/questionnaire/writequestionnaire',
  },
  {
    title: '评测页',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
    route: '/questionnaire/evaluation',
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
    route: '/questionnaire/quesList',
  },
  {
    title: '个人页',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
    route: '/questionnaire/quesList',
  },
];

export const dynamicInfoItems = [
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '刚刚',
    content: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
  },
  {
    avatar: 'dynamic-avatar-2|svg',
    name: '艾文',
    date: '1个小时前',
    desc: `关注了 <a>威廉</a> `,
  },
  {
    avatar: 'dynamic-avatar-3|svg',
    name: '克里斯',
    date: '1天前',
    desc: `发布了 <a>个人动态</a> `,
  },
  {
    avatar: 'dynamic-avatar-4|svg',
    name: 'Vben',
    date: '2天前',
    desc: `发表文章 <a>如何编写一个Vite插件</a> `,
  },
  {
    avatar: 'dynamic-avatar-5|svg',
    name: '皮特',
    date: '3天前',
    desc: `回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>`,
  },
  {
    avatar: 'dynamic-avatar-6|svg',
    name: '杰克',
    date: '1周前',
    desc: `关闭了问题 <a>如何运行项目</a> `,
  },
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '1周前',
    desc: `发布了 <a>个人动态</a> `,
  },
  {
    avatar: 'dynamic-avatar-1|svg',
    name: '威廉',
    date: '2021-04-01 20:00',
    desc: `推送了代码到 <a>Github</a>`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: '营销管理',
    icon: 'nimbus:marketing',
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '营销管理',
    date: '2024-04-01',
  },
  {
    title: '物流管理',
    icon: 'la:car-side',
    color: '#3fb27f',
    desc: '现在的你决定将来的你。',
    group: '物流管理',
    date: '2024-04-01',
  },
  {
    title: '整顿规范',
    icon: 'icon-park:ruler',
    color: '#e18525',
    desc: '没有什么才能比努力更重要。',
    group: '整顿规范',
    date: '2024-04-01',
  },
  {
    title: 'Angular',
    icon: 'ion:logo-angular',
    color: '#bf0c2c',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '2024-04-01',
  },
  {
    title: 'React',
    icon: 'bx:bxl-react',
    color: '#00d8ff',
    desc: '健康的身体是实现目标的基石。',
    group: '技术牛',
    date: '2024-04-01',
  },
  {
    title: 'Js',
    icon: 'ion:logo-javascript',
    color: '#EBD94E',
    desc: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    date: '2024-04-01',
  },
];
