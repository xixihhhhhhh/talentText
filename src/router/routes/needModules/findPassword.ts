import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const reportManagementAdmin: AppRouteModule = {
  path: '/findPassword',
  name: 'findPassword',
  component: LAYOUT,
  redirect: '/findPassword/index',
  meta: {
    roles: [RoleEnum.SUPER],
    orderNo: 30,
    icon: 'ion:person',
    title: '找回密码',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'findPassword',
      component: () => import('@/views/dashboard/findPassword/index.vue'),
      meta: {
        title: '找回密码',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default reportManagementAdmin;
