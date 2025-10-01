import { RenderMode, ServerRoute } from '@angular/ssr';
import { postIDs } from './shared/mocks/routes-ids';

export const serverRoutes: ServerRoute[] = [
    {
        path: 'Post/PostRead/:id',
        renderMode: RenderMode.Prerender,
        async getPrerenderParams() {
            const ids = postIDs;
            return ids.map(id => ({ id }));
        },
    },

    // 서버 측 렌더링 (SSR) 경로
    // 명시적으로 SSR로 처리할 모든 경로를 정의
    { path: 'Home', renderMode: RenderMode.Server },
    { path: 'Post', renderMode: RenderMode.Server },
    { path: 'Blog', renderMode: RenderMode.Server },
    { path: 'Chat', renderMode: RenderMode.Server },
    { path: 'Document', renderMode: RenderMode.Server },
    { path: 'Document/CSharp', renderMode: RenderMode.Server },
    { path: 'Document/Angular', renderMode: RenderMode.Server },
    { path: 'Document/NextJS', renderMode: RenderMode.Server },
    { path: 'Demo', renderMode: RenderMode.Server },


    { path: 'Lab', renderMode: RenderMode.Server },
    { path: 'Lab/AddressForm', renderMode: RenderMode.Server },
    { path: 'Lab/Autocomplet', renderMode: RenderMode.Server },
    { path: 'Lab/Badge', renderMode: RenderMode.Server },
    { path: 'Lab/BottomSheet', renderMode: RenderMode.Server },
    { path: 'Lab/Button', renderMode: RenderMode.Server },
    { path: 'Lab/Card', renderMode: RenderMode.Server },
    { path: 'Lab/Checkbox', renderMode: RenderMode.Server },
    { path: 'Lab/Chips', renderMode: RenderMode.Server },
    { path: 'Lab/Datepicker', renderMode: RenderMode.Server },
    { path: 'Lab/Dialog', renderMode: RenderMode.Server },
    { path: 'Lab/Form', renderMode: RenderMode.Server },
    { path: 'Lab/List', renderMode: RenderMode.Server },
    { path: 'Lab/ProgressBar', renderMode: RenderMode.Server },
    { path: 'Lab/Select', renderMode: RenderMode.Server },
    { path: 'Lab/Sidenav', renderMode: RenderMode.Server },
    { path: 'Lab/Snackbar', renderMode: RenderMode.Server },
    { path: 'Lab/Table', renderMode: RenderMode.Server },
    { path: 'Lab/Tabs', renderMode: RenderMode.Server },
    { path: 'Lab/TimePicker', renderMode: RenderMode.Server },
    { path: 'Lab/Tooltip', renderMode: RenderMode.Server },
    { path: 'Lab/Tree', renderMode: RenderMode.Server },
    { path: 'Lab/Expansion', renderMode: RenderMode.Server },

    { path: 'Membership', renderMode: RenderMode.Server },
    { path: 'SignUp', renderMode: RenderMode.Server },
    { path: 'SignIn', renderMode: RenderMode.Server },
    { path: 'SignOut', renderMode: RenderMode.Server },
    { path: 'Profile', renderMode: RenderMode.Server },
    { path: 'Profile/MyData', renderMode: RenderMode.Server },
    { path: '**', renderMode: RenderMode.Server } // 모든 나머지 경로에 대한 폴백
];
