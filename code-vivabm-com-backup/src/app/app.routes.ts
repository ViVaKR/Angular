import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { CodeComponent } from './code/code.component';
import { CodeListComponent } from './code/code-list/code-list.component';
import { CodeReadComponent } from './code/code-read/code-read.component';
import { CodeCreateComponent } from './code/code-create/code-create.component';
import { CodeUpdateComponent } from './code/code-update/code-update.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { SignOutComponent } from './membership/sign-out/sign-out.component';
import { ProfileComponent } from './membership/profile.component';
import { RoleComponent } from './membership/role/role.component';
import { MyCodeComponent } from './membership/my-code/my-code.component';
import { AccountComponent } from './membership/account/account.component';
import { MyInfoComponent } from './membership/my-info/my-info.component';
import { ChangePasswordComponent } from './membership/change-password/change-password.component';
import { ConfirmEmailComponent } from './membership/confirm-email/confirm-email.component';
import { FindMembershipComponent } from './membership/find-membership/find-membership.component';
import { ResetPasswordComponent } from './membership/reset-password/reset-password.component';
import { UserListComponent } from './membership/user-list/user-list.component';
import { authGuard, authGuard as guard } from '@app/guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { ForgetPasswordComponent } from './membership/forget-password/forget-password.component';
import { ConfirmEmailReplayComponent } from './membership/confirm-email-replay/confirm-email-replay.component';
import { CancelMembershipComponent } from './membership/cancel-membership/cancel-membership.component';
import { DemoListComponent } from './common/demo-list/demo-list.component';
import { CodesComponent } from './code/codes/codes.component';
import { DemoSignalsComponent } from './demo-signals/demo-signals.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Category', component: CategoryComponent },
    {
        path: 'Code', component: CodeComponent, children: [
            { path: '', redirectTo: 'CodeList', pathMatch: 'full' },
            { path: 'CodeList', component: CodeListComponent },
            { path: 'Codes', component: CodesComponent },
            { path: 'CodeCreate', component: CodeCreateComponent, canActivate: [authGuard] },
            { path: 'CodeRead', component: CodeReadComponent },
            { path: 'CodeRead/:id', component: CodeReadComponent },
            { path: 'CodeUpdate', component: CodeUpdateComponent, canActivate: [authGuard] },
            { path: 'CodeUpdate/:id', component: CodeUpdateComponent, canActivate: [authGuard] },
            { path: '**', redirectTo: 'Codes' }
        ]
    },
    {
        path: 'Profile', component: ProfileComponent, children: [
            { path: '', redirectTo: 'Account', pathMatch: 'full' },
            { path: 'Account', component: AccountComponent },
            { path: 'Account/:id', component: AccountComponent },
            { path: 'MyInfo', component: MyInfoComponent },
            { path: 'MyInfo/:id', component: MyInfoComponent },
            { path: 'MyCode', component: MyCodeComponent },
            { path: 'MyCode/:id', component: MyCodeComponent },
            { path: 'ChangePassword', component: ChangePasswordComponent },
            { path: 'ChangePassword/:id', component: ChangePasswordComponent },
            { path: 'ConfirmEmail', component: ConfirmEmailComponent },
            { path: 'ConfirmEmail/:id', component: ConfirmEmailComponent },
            { path: 'Cancel', component: CancelMembershipComponent },
            { path: 'Cancel/:id', component: CancelMembershipComponent },
            { path: 'FindPassword', component: FindMembershipComponent },
            { path: 'FindPassword/:id', component: FindMembershipComponent },
            { path: 'ResetPassword', component: ResetPasswordComponent },
            { path: 'ResetPassword/:id', component: ResetPasswordComponent },
            { path: '**', redirectTo: 'Account' }
        ], canActivate: [guard]
    },
    { path: 'DemoList', component: DemoListComponent },
    { path: 'DemoSignals', component: DemoSignalsComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },
    { path: 'SignOut', component: SignOutComponent },
    {
        path: 'Role', component: RoleComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        }
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'confirm-reply-email',
        component: ConfirmEmailReplayComponent
    },
    { path: 'UserList', component: UserListComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
    { path: '**', redirectTo: 'Home' }
];
