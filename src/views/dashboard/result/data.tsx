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

export const coreAreas = {
  pioneering:
    '领域能更好地发挥其优势，TA比较具备沟通和影响他人的能力，能够有效地表达自己的观点并影响他人的思维，敢于面对挑战和风险，勇于尝试新的方法和理念并付诸行动，不畏惧失败，始终保持积极向前的态度',
  transaction:
    '领域能更好地发挥其优势，TA比较具备明确目标和贯彻落实能力，能够设定清晰的目标并采取有效的行动，不仅懂得理论，更能将理念转化为切实可行的行动方案，以确保目标的实现，也善于遵循指示，能够理解并执行领导或团队的指示，确保向正确的方向前进，高效地完成任务',
  service:
    '领域能更好地发挥其优势，TA比较具备协调和关系维护的能力，与人建立良好的关系，在与人交流时能够将自己的意愿传达到位，也乐干接受他人的意见，希望大家能够达成一定共识',
  research:
    '领域能更好地发挥其优势，TA比较具备创新思维和出谋划策的能力，能够提出新颖的想法和策略，为团队的发展注入新的活力也能够敏锐地捕捉外部趋势，并据此做出合理的决策',
};

export const competencyDefinition = {
  flexible: '面对突发情况与困难处境时能够保持沉着冷静，并调整自身状态，灵活应对',
  message: '能够通过多种渠道与方法获取更多信息，并构建具有实际价值的信息库',
  policy: '能够解读、传达并应用行业政策，制定相应的应对策略',
  writing: '能够攥写各类文件、报告等材料，以清晰、准确和恰当的方式传达信息',
  holistic: '能够从组织全局利益的角度上看待问题，思考影响组织长远发展的关键因素',
  risk: '能够根据直觉及信息对未来发展的趋势进行预判，对于未来有清晰的画面感',
  study: '能够持续保持浓厚的学习兴趣，主动并能够长时间学习新技能，新知识',
  find: '在思考问题时能够关联不同的知识领域和信息，从不同层次与角度进行思考',
  create: '能够跳出固化的思维定势，提出未知和全新的理念，以及突破性的创新方法',
  dedication: '能够在工作中做到亲力亲为，信守承诺，努力保证任务的完成',
  confidentiality: '确保公司的敏感信息、机密文件及其他重要资料不被未经授权的人员获取或泄露',
  unimpressed: '在面对风险、困难和混乱的情况下能够果敢迅速地进行决策判断',
  norms: '能够在工作中严格要求自身遵守既定的工作规范与流程，不违反规定',
  law: '理解相关的政策与法规，自觉遵守国家、行业的法律条例及规章制度',
  dataAnalysis: '能够科学分析信息和数据，识别并归纳信息和数据的内在规律',
  logicalAnalysis: '对问题进行分析、归纳、推理、判断，理清问题的原因、影响和解决方案',
  implementation: '能够将策略、计划或决策转化为实际行动并有效地推动实施',
  patience: '能够持续关注工作和生活中的各项细节，且对于重复性强的事务性工作能够保持耐心',
  hard: '精力旺盛，能够长时间保持勤恳工作的状态，驱使自身不断地完成更多任务',
  time: '能够建立时间表来制定计划表和规定项目任务的实施次序，并按照计划行事',
  plan: '对于完成任务所需要的人力物力等资源能够进行统筹和调配，做出科学合理的目标分解和实施方案',
  firm: '在工作中秉持高尚的道德标准，坚决抵制任何形式的利益诱惑，确保自己的行为合法、规范、公正、公平',
  safe: '对工作环境中可能存在的危险有清晰的认识，能够采取预防措施，以保障自己和他人的安全',
  intimidate: '通过自己的语言和行动，向他人传递一种积极的影响力，以维护企业的规章制度和秩序',
  leadingOthers: '在与人沟通中能够使用有感染力的语言来表达自身的观点，有较强的说服力',
  political: '具备政治敏感性等方面的素养和能力，维护企业的合法权益，促进企业的稳定发展',
  organizational: '能够积极投入工作，维护企业的声誉和形象，愿意长期为企业服务',
  coordination: '能够运用人际交往技巧主动与他人建立人际关系，扩展关系网络',
  rallying: '能够鼓励团队彼此接纳，通过沟通或者发起活动等方式，增强团队的凝聚力',
  aggressive: '在做事过程中能够强调结果的重要性，关注实际成果并渴望有所建树，不断拼搏',
  underPressure: '面对压力时能够积极地进行自我的正向激励，并做出实际行动有效应对压力',
  serviceMinded: '能够细心留意他人的需求，乐于为他人提供真诚的帮助和鼓励',
  selfControl: '能够有效管理和调节自己的情绪，工作中保持冷静、理性和稳定的心态',
  approachable: '能够表现出一种和蔼可亲和平易近人的态度，从而使他人愿意与其亲近',
  teamwork: '能够与团队成员积极合作，共同完成任务和实现目标',
  employPeople: '能够发现并挖掘每个人的特点，引导他们在合适的位置上发挥价值',
};

export const careerAdvantageMap = {
  skill: '动手实践能力强，灵活多变，运用不同的方法来解决难题和提高技能，在自己的专业领域里精益求精',
  hatched: '统筹规划能力强，把握重点，追求高效，分析项目的系统性和可行性，善于制定战略、策划项目',
  invent:
    '创新思维能力强，奇思妙想，见解新颖，热衷于新兴科学技术，在未知的领域中不断地寻求创新突破',
  operable:
    '技术操作能力强，注重实用，动作协调，在操作工具、器械方面有优势，耐心、独立地完成常规工作',
  affairs:
    '事务落实能力强，有条理次序，讲究有始有终，处理事务耐心严谨，在工作上一般按照具体计划办事',
  controlled: '开拓进取能力强，愿意冒险，保持乐观，热衷于追求并挑战具体目标，擅长抓住新机遇',
  impact: '管控督导能力强，看重权力，通常会对人员、资源进行严格掌控，结果导向强烈，不为人情所动',
  communicative: '破冰和人际互动能力强，不断扩大人际圈子，结交新朋友，擅长与他人保持良好的关系',
  pioneer: '开拓进取能力强，愿意冒险，保持乐观，热衷于追求并挑战具体目标，擅长抓住新机遇',
  serve: '换位思考能力强，协调矛盾、避免冲突、促进人与人之间的和谐共处，有意识地为他人服务',
  humanistic:
    '人文感知能力强，关注人的精神生活和个人修炼，尊重人的主体地位和个性差异，对人性较为敏感',
};

export const gongzuofangmian = {
  skill: '技术改进、专业技能要求高',
  hatched: '远景规划与体系构建',
  invent: '研究及创新开发',
  operable: '工具操作与流程化执行',
  affairs: '事务统筹与落实',
  controlled: '管控督导与沟通谈判',
  impact: '快速销售及培训发展',
  communicative: '关系社交及关系拓展',
  pioneer: '业务开拓及挑战性',
  serve: '关系维护与服务支持',
  humanistic: '人文哲学及社会公益',
};

export const gongzuogangwei = {
  skill: '技术改良、体育运动、信息传输服务、网络工程等',
  hatched: '架构规划、平台运营、标准体系、品牌管理、活动策划等',
  invent: '学术研究、科技研发、产品创新、创意企划、自然科学等',
  operable: '软件平台操作、机械操控、流程制定、产品检验等',
  affairs: '制度执行、行政总务、文档管理、财务与税务、物流仓储等',
  controlled: '绩效督导、商务谈判、进度把控、检查督导等',
  impact: '培训指导、播音主持、公众宣讲、会议营销、导购等',
  communicative: '外联公关、活动协调、员工关系、渠道开发、企业文化建设等',
  pioneer: '面对面销售、市场开拓、极限运动、应急救援等',
  serve: '健康护理、客户服务、后勤服务、情感咨询、儿童教育等',
  humanistic: '人文哲学、心理研究、生涯规划、教育咨询、公益事业等',
};

export const dapeijianyi = {
  skill: '技能',
  hatched: '规划',
  invent: '发明',
  operable: '操作',
  affairs: '事务',
  controlled: '管控',
  impact: '影响',
  communicative: '交际',
  pioneer: '开拓',
  serve: '服务',
  humanistic: '人文',
};
