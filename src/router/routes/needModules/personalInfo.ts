import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const info: AppRouteModule = {
  path: '/info',
  name: 'info',
  component: LAYOUT,
  redirect: '/info/personalInfo',
  meta: {
    roles: [RoleEnum.User],
    orderNo: 10,
    icon: 'ion:person',
    title: '个人信息',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'personalInfo',
      name: 'personalInfo',
      component: () => import('@/views/dashboard/info/index.vue'),
      meta: {
        title: '个人信息',
        roles: [RoleEnum.User],
      },
    },
  ],
};

export default info;
