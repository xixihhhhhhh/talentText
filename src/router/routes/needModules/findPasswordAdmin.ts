import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const findPasswordAdmin: AppRouteModule = {
  path: '/findPasswordAdmin',
  name: 'findPasswordAdmin',
  component: LAYOUT,
  redirect: '/findPasswordAdmin/findPasswordAdmin',
  meta: {
    roles: [RoleEnum.SUPER],
    orderNo: 30,
    icon: 'ion:person',
    title: '找回密码',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'findPasswordAdmin',
      name: 'findPasswordAdmin',
      component: () => import('@/views/dashboard/findPasswordAdmin/index.vue'),
      meta: {
        title: '找回密码',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default findPasswordAdmin;
