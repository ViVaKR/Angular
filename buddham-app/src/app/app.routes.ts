import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuddhistScriptureListComponent } from './buddha/buddhist-scripture-list/buddhist-scripture-list.component';
import { BuddhistScriptureCreateComponent } from './buddha/buddhist-scripture-create/buddhist-scripture-create.component';
import { BuddhistScriptureReadComponent } from './buddha/buddhist-scripture-read/buddhist-scripture-read.component';
import { BuddhistScriptureUpdateComponent } from './buddha/buddhist-scripture-update/buddhist-scripture-update.component';
import { BuddhistScriptureDeleteComponent } from './buddha/buddhist-scripture-delete/buddhist-scripture-delete.component';
import { BuddhaComponent } from './buddha/buddha.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { CancelMembershipComponent } from './membership/cancel-membership/cancel-membership.component';
import { FindMembershipComponent } from './membership/find-membership/find-membership.component';
import { ProfileComponent } from './membership/profile.component';
import { MyInfoComponent } from './membership/my-info/my-info.component';
import { ChangePasswordComponent } from './membership/change-password/change-password.component';
import { SignOutComponent } from './membership/sign-out/sign-out.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { authGuard as guards } from '@app/guards/auth.guard';
import { AccountComponent } from './membership/account/account.component';
import { MySutraComponent } from './membership/my-sutra/my-sutra.component';
import { UsersComponent } from './membership/users/users.component';
import { roleGuard } from './guards/role.guard';
import { RoleComponent } from './membership/role/role.component';
import { ForgetPasswordComponent } from './membership/forget-password/forget-password.component';
import { ResetPasswordComponent } from './membership/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './membership/confirm-email/confirm-email.component';
import { ConfirmReplayEmailComponent } from './membership/confirm-replay-email/confirm-replay-email.component';
import { devEnvGuardGuard } from './guards/dev-env-guard.guard';
import { SigninMicrosoftComponent } from './membership/signin-microsoft/signin-microsoft.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    {
        path: 'Buddha', component: BuddhaComponent, children: [
            { path: '', redirectTo: 'BuddhistScriptureList', pathMatch: 'full' },
            { path: 'BuddhistScriptureList', component: BuddhistScriptureListComponent },
            { path: 'BuddhistScriptureCreate', component: BuddhistScriptureCreateComponent, canActivate: [AuthGuard] },
            { path: 'BuddhistScriptureRead', component: BuddhistScriptureReadComponent },
            { path: 'BuddhistScriptureRead/:id', component: BuddhistScriptureReadComponent },
            { path: 'BuddhistScriptureUpdate', component: BuddhistScriptureUpdateComponent, canActivate: [AuthGuard] },
            { path: 'BuddhistScriptureUpdate/:id', component: BuddhistScriptureUpdateComponent },
            { path: 'BuddhistScriptureDelete', component: BuddhistScriptureDeleteComponent, canActivate: [AuthGuard] },
            { path: 'BuddhistScriptureDelete/:id', component: BuddhistScriptureDeleteComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: 'BuddhistScriptureList' }
        ],
    },
    {
        path: 'Profile', component: ProfileComponent,
        children: [
            { path: 'MySutra', component: MySutraComponent },
            { path: 'MySutra/:id', component: MySutraComponent },
            { path: 'Account', component: AccountComponent },
            { path: 'Account/:id', component: AccountComponent },
            { path: 'MyInfo', component: MyInfoComponent },
            { path: 'MyInfo/:id', component: MyInfoComponent },
            { path: 'ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
            { path: 'ChangePassword/:id', component: ChangePasswordComponent },
            { path: 'ConfirmEmail', component: ConfirmEmailComponent },
            { path: 'ConfirmEmail/:id', component: ConfirmEmailComponent },
            { path: 'Cancel', component: CancelMembershipComponent },
            { path: 'Cancel/:id', component: CancelMembershipComponent },
            { path: 'FindPassword', component: FindMembershipComponent },
            { path: 'FindPassword/:id', component: FindMembershipComponent },
            { path: 'ResetPassword', component: ResetPasswordComponent },
            { path: 'ResetPassword/:id', component: ResetPasswordComponent },
            { path: 'SignOut', component: SignOutComponent },
            { path: '**', redirectTo: 'Account' }
        ], canActivate: [guards]
    },
    {
        path: 'Users',
        component: UsersComponent,
        canActivate: [roleGuard],
        data: {
            roles: ['Admin']
        },
    },
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
        path: 'confirm-replay-email',
        component: ConfirmReplayEmailComponent
    },
    {
        path: 'signin-microsoft',
        component: SigninMicrosoftComponent
    },
    { path: 'SignUp', component: SignUpComponent, canActivate: [devEnvGuardGuard] },
    { path: 'SignIn', component: SignInComponent, canActivate: [devEnvGuardGuard] },
    { path: '**', redirectTo: 'Home' }
];
