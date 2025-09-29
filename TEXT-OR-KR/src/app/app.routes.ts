import {Routes} from '@angular/router';
import {Home} from './home/home';
import {NotFound} from './not-found/not-found';
import {Post} from './post/post';
import {Chat} from './chat/chat';
import {Document} from './document/document';
import {Lab} from './lab/lab';
import {Membership} from './membership/membership';
import {PostRead} from './post/post-read/post-read';
import {SignUp} from './membership/sign-up/sign-up';
import {SignIn} from './membership/sign-in/sign-in';
import {SignOut} from './membership/sign-out/sign-out';
import {Profile} from './membership/profile/profile';
import {MyData} from './membership/profile/my-data/my-data';
import {Badge} from './lab/badge/badge';
import {Angular} from "@app/document/angular/angular";

export const routes: Routes = [
    {path: '', redirectTo: '/Home', pathMatch: 'full', title: 'Home Page'},
    {path: 'Home', component: Home, title: 'TEXT.OR.KR'},
    {
        path: 'Post', component: Post, title: '글', children: [
            {path: 'PostRead/:id', component: PostRead, title: '글 내용'}
        ]
    },
    {
        path: 'Blog',
        loadComponent: () => import('./blog/blog').then(m => m.Blog),
        title: '블러그'
    },
    {path: 'Chat', component: Chat, title: '대화방'},
    {
        path: 'Document', component: Document, title: '문서', children: [
            {
                path: 'CSharp',
                loadComponent: () => import('./document/c-sharp/c-sharp').then(m => m.CSharp),
                title: 'C# Document'
            },
            {
                path: 'Angular',
                component: Angular,
                title: 'Angular Document'
            },
            {
                path: 'NextJS',
                loadComponent: () => import('./document/next-js/next-js').then(m => m.NextJs),
                title: 'NextJS Document'
            }
        ]
    },
    {
        path: 'Lab', component: Lab, title: '연구소', children: [
            {
                path: 'AddressForm',
                loadComponent: () => import('./lab/address-form/address-form.component').then(m => m.AddressFormComponent),
                title: 'Address Form'
            },
            {
                path: 'Autocomplet',
                loadComponent: () => import('./lab/autocomplet/autocomplet').then(m => m.Autocomplet),
                title: 'Autocomplet'
            },
            {path: 'Badge', component: Badge, title: 'Badge'},
            {
                path: 'BottomSheet',
                loadComponent: () => import('./lab/bottom-sheet/bottom-sheet').then(m => m.BottomSheet),
                title: 'Bottom Sheet'
            },
            {
                path: 'Button',
                loadComponent: () => import('./lab/button/button').then(m => m.Button),
                title: 'Button'
            },
            {
                path: 'Card',
                loadComponent: () => import('./lab/card/card').then(m => m.Card),
                title: 'Card'
            },
            {
                path: 'Checkbox',
                loadComponent: () => import('./lab/checkbox/checkbox').then(m => m.Checkbox),
                title: 'Checkbox'
            },
            {
                path: 'Chips',
                loadComponent: () => import('./lab/chips/chips').then(m => m.Chips),
                title: 'Chips'
            },
            {
                path: 'Datepicker',
                loadComponent: () => import('./lab/date-picker/date-picker').then(m => m.DatePicker),
                title: 'Date Picker'
            },
            {
                path: 'Dialog',
                loadComponent: () => import('./lab/dialog/dialog').then(m => m.Dialog),
                title: 'Dialog'
            },
            {
                path: 'Form',
                loadComponent: () => import('./lab/form/form').then(m => m.Form),
                title: 'Form'
            },
            {
                path: 'List',
                loadComponent: () => import('./lab/list/list').then(m => m.List),
                title: 'List'
            },
            {
                path: 'ProgressBar',
                loadComponent: () => import('./lab/progress-bar/progress-bar').then(m => m.ProgressBar),
                title: 'Progress Bar'
            },
            {
                path: 'Select',
                loadComponent: () => import('./lab/select/select').then(m => m.Select),
                title: 'Select'
            },
            {
                path: 'Sidenav',
                loadComponent: () => import('./lab/side-nav/side-nav').then(m => m.SideNav),

                title: 'Side Nav'
            },
            {
                path: 'Slider',
                loadComponent: () => import('./lab/slider/slider').then(m => m.Slider),
                title: 'Slider'
            },
            {
                path: 'Snackbar',
                loadComponent: () => import('./lab/snackbar/snackbar').then(m => m.Snackbar),
                title: 'Snackbar'
            },
            {
                path: 'Table',
                loadComponent: () => import('./lab/table/table').then(m => m.Table),
                title: 'Table'
            },
            {
                path: 'Tabs',
                loadComponent: () => import('./lab/tabs/tabs').then(m => m.Tabs),
                title: 'Tabs'
            },
            {
                path: 'Tooltip',
                loadComponent: () => import('./lab/tooltip/tooltip').then(m => m.Tooltip),
                title: 'Tooltip'
            },
            {
                path: 'TimePicker',
                loadComponent: () => import('./lab/time-picker/time-picker').then(m => m.TimePicker),
                title: 'Time Picker'
            },
            {
                path: 'Tree',
                loadComponent: () => import('./lab/tree/tree').then(m => m.Tree),
                title: 'Tree'
            },
            {
                path: 'Expansion',
                loadComponent: () => import('./lab/expansion/expansion').then(m => m.Expansion),
            }
        ]
    },
    {path: 'Membership', component: Membership, title: '회원'},
    {path: 'SignUp', component: SignUp, title: '회원가입'},
    {path: 'SignIn', component: SignIn, title: '로그인'},
    {path: 'SignOut', component: SignOut, title: '로그아웃'},
    {
        path: 'Profile', component: Profile, title: '나의정보', children: [
            {path: 'MyData', component: MyData, title: '나의정보 관리'}
        ]
    },

    {path: '**', component: NotFound, title: 'Not Found'}
];
