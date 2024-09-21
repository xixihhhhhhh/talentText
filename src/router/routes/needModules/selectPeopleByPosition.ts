import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const selectPeopleByPosition: AppRouteModule = {
  path: '/select',
  name: 'select',
  component: LAYOUT,
  redirect: '/select/selectPeopleByPosition',
  meta: {
    roles: [RoleEnum.SUPER],
    orderNo: 14,
    icon: 'ion:key-outline',
    title: '以岗选人',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'selectPeopleByPosition',
      name: 'selectPeopleByPosition',
      component: () => import('@/views/dashboard/selectPeopleByPosition/index.vue'),
      meta: {
        title: '以岗选人',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default selectPeopleByPosition;
