import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const findPasswordUser: AppRouteModule = {
  path: '/findPasswordUser',
  name: 'findPasswordUser',
  component: LAYOUT,
  redirect: '/findPasswordUser/findPasswordUser',
  meta: {
    roles: [RoleEnum.User],
    orderNo: 30,
    icon: 'ion:person',
    title: '找回密码',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'findPasswordUser',
      name: 'findPasswordUser',
      component: () => import('@/views/dashboard/findPasswordUser/index.vue'),
      meta: {
        title: '找回密码',
        roles: [RoleEnum.User],
      },
    },
  ],
};

export default findPasswordUser;
