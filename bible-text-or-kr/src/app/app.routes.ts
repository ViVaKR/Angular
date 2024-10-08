import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BibleComponent } from './bible/bible.component';
import { CategoryComponent } from './category/category.component';
import { BibleListComponent } from './bible/bible-list/bible-list.component';
import { BibleWriteUpdateComponent } from './bible/bible-write-update/bible-write-update.component';
import { NavMenuBarComponent } from './nav-menu-bar/nav-menu-bar.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';
import { ProfileComponent } from './membership/profile.component';
import { ResetPasswordComponent } from './membership/reset-password/reset-password.component';
import { FindMembershipComponent } from './membership/find-membership/find-membership.component';
import { CancelMembershipComponent } from './membership/cancel-membership/cancel-membership.component';
import { ConfirmEmailComponent } from './membership/confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './membership/change-password/change-password.component';
import { MyBibleComponent } from './membership/my-bible/my-bible.component';
import { AccountComponent } from './membership/account/account.component';
import { roleGuard } from './guards/role.guard';
import { SignOutComponent } from './membership/sign-out/sign-out.component';
import { RoleComponent } from './membership/role/role.component';
import { ForgetPasswordComponent } from './membership/forget-password/forget-password.component';
import { UserListComponent } from './membership/user-list/user-list.component';
import { authGuard, authGuard as guard } from '@app/guards/auth.guard';
import { DemoSignalsComponent } from './demo-signals/demo-signals.component';
import { ConfirmEmailReplyComponent } from './membership/confirm-email-reply/confirm-email-reply.component';
import { MyBibleListComponent } from './membership/my-bible-list/my-bible-list.component';
import { BibleReadComponent } from './bible/bible-read/bible-read.component';
import { PlaygroundComponent } from './playground/playground.component';
import { UpdateUserComponent } from './membership/update-user/update-user.component';
import { SignalStoreComponent } from './signal-store/signal-store.component';
import { TodoManagerComponent } from './todo-manager/todo-manager.component';
import { SignInEnComponent } from './membership/sign-in-en/sign-in-en.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'BibleList', component: BibleListComponent },
    { path: 'BibleRead', component: BibleReadComponent },
    { path: 'Category', component: CategoryComponent },
    { path: 'ExportData', component: ExportDataComponent },
    {
        path: 'Bible', component: BibleComponent, children: [
            { path: '', redirectTo: 'BibleList', pathMatch: 'full' },
            { path: 'BibleList', component: BibleListComponent },
            { path: 'BibleList/:id', component: BibleListComponent },
            { path: 'BibleRead', component: BibleReadComponent },
            { path: 'BibleRead/:id', component: BibleReadComponent },
            { path: 'BibleWriteUpdate', component: BibleWriteUpdateComponent, canActivate: [authGuard] },
            { path: 'BibleWriteUpdate/:id', component: BibleWriteUpdateComponent, canActivate: [authGuard] },
            { path: '**', redirectTo: 'BibleList' }
        ]
    },
    {
        path: 'Profile', component: ProfileComponent, children: [
            { path: '', redirectTo: 'Account', pathMatch: 'full' },
            { path: 'Account', component: AccountComponent },
            { path: 'Account/:id', component: AccountComponent },
            { path: 'MyBible', component: MyBibleComponent },
            { path: 'MyBible/:id', component: MyBibleComponent },
            { path: 'MyBibleList', component: MyBibleListComponent },
            { path: 'MyBibleList/:id', component: MyBibleListComponent },
            { path: 'ChangePassword', component: ChangePasswordComponent },
            { path: 'ChangePassword/:id', component: ChangePasswordComponent },
            { path: 'ConfirmEmail', component: ConfirmEmailComponent },
            { path: 'ConfirmEmail/:id', component: ConfirmEmailComponent },
            { path: 'Cancel', component: CancelMembershipComponent },
            { path: 'Cancel/:id', component: CancelMembershipComponent },
            { path: 'FindPassword', component: FindMembershipComponent },
            { path: 'FindPassword/:id', component: FindMembershipComponent },
            { path: 'UpdateUser', component: UpdateUserComponent },
            { path: 'ResetPassword', component: ResetPasswordComponent },
            { path: 'ResetPassword/:id', component: ResetPasswordComponent },
            { path: '**', redirectTo: 'Account' }
        ], canActivate: [guard]
    },
    { path: 'MenuBar', component: NavMenuBarComponent },
    { path: 'BibleWrite', component: BibleWriteUpdateComponent },
    { path: 'MyBibleList', component: MyBibleListComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },
    { path: 'SignInEn', component: SignInEnComponent },
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
        component: ConfirmEmailReplyComponent
    },
    { path: 'UserList', component: UserListComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
    { path: 'DemoSignals', component: DemoSignalsComponent },
    { path: 'PlayGround', component: PlaygroundComponent },
    { path: 'SignalStore', component: SignalStoreComponent },
    { path: 'Todo', component: TodoManagerComponent },
    { path: 'ImageUploader', component: ImageUploaderComponent },
    { path: "**", redirectTo: 'Home' }
];
