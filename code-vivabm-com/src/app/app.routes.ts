import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { CodeComponent } from './code/code.component';
import { CodeReadComponent } from './code/code-read/code-read.component';
import { CodeCreateComponent } from './code/code-create/code-create.component';
import { CodeUpdateComponent } from './code/code-update/code-update.component';
import { SignUpComponent } from './membership/sign-up/sign-up.component';
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
import { LoadingCircleComponent } from './common/loading-circle/loading-circle.component';
import { UpdateUserComponent } from './membership/update-user/update-user.component';
import { ImageManagerComponent } from './image-manager/image-manager.component';
import { DownloadComponent } from './image-manager/download/download.component';
import { UploadComponent } from './image-manager/upload/upload.component';
import { CircleProgressComponent } from './common/circle-progress/circle-progress.component';
import { DataListComponent } from './common/data-list/data-list.component';
import { QnAComponent } from './qn-a/qn-a.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { CodeBackupComponent } from './membership/code-backup/code-backup.component';
import { SignInEnComponent } from './membership/sign-in-en/sign-in-en.component';
import { dataResolver } from './services/data-resolver.service';
import { DataComponent } from './data/data.component';
import { categoryResolver } from './services/category-resolver.service';
import { VivChatComponent } from './viv-chat/viv-chat.component';
import { SignalRChatComponent } from './signal-r-chat/signal-r-chat.component';
import { ChatClientComponent } from './chat-client/chat-client.component';
import { BallTransformComponent } from './games/ball-transform/ball-transform.component';
import { DocComponent } from './doc/doc.component';
import { BootCampComponent } from './doc/boot-camp/boot-camp.component';
import { MermaidCampComponent } from './doc/mermaid-camp/mermaid-camp.component';
import { MarkdownCampComponent } from './doc/markdown-camp/markdown-camp.component';
import { ViCampComponent } from './doc/vi-camp/vi-camp.component';
import { DockerCampComponent } from './doc/docker-camp/docker-camp.component';
import { GitCampComponent } from './doc/git-camp/git-camp.component';
import { AngularCampComponent } from './doc/angular-camp/angular-camp.component';
import { AspNetCoreCampComponent } from './doc/asp-net-core-camp/asp-net-core-camp.component';
import { BlazorCampComponent } from './doc/blazor-camp/blazor-camp.component';
import { CsharpCampComponent } from './doc/csharp-camp/csharp-camp.component';
import { GoCampComponent } from './doc/go-camp/go-camp.component';
import { HtmlCssCampComponent } from './doc/html-css-camp/html-css-camp.component';
import { JavaScriptCampComponent } from './doc/java-script-camp/java-script-camp.component';
import { NginXCampComponent } from './doc/ngin-x-camp/ngin-x-camp.component';
import { NodeJsCampComponent } from './doc/node-js-camp/node-js-camp.component';
import { PowerShellCampComponent } from './doc/power-shell-camp/power-shell-camp.component';
import { ShellScriptCampComponent } from './doc/shell-script-camp/shell-script-camp.component';
import { SqlCampComponent } from './doc/sql-camp/sql-camp.component';
import { RustCampComponent } from './doc/rust-camp/rust-camp.component';
import { SolutionComponent } from './solution/solution.component';
import { KatexLatexCampComponent } from './doc/katex-latex-camp/katex-latex-camp.component';
import { VivEditorComponent } from './viv-editor/viv-editor.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Category', component: CategoryComponent },
    {
        path: 'Code', component: CodeComponent, children: [
            { path: '', redirectTo: 'DataList', pathMatch: 'full' },
            { path: 'DataList', component: DataListComponent },
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
            { path: 'UpdateUser', component: UpdateUserComponent },
            { path: 'UpdateUser/:id', component: UpdateUserComponent },
            { path: 'ResetPassword', component: ResetPasswordComponent },
            { path: 'ResetPassword/:id', component: ResetPasswordComponent },
            { path: 'ImageManager', component: ImageManagerComponent },
            { path: 'ImageManager/:id', component: ImageManagerComponent },
            { path: 'ImageDownload', component: DownloadComponent },
            { path: 'ImageDownload/:id', component: DownloadComponent },
            { path: 'FileUpload', component: UploadComponent },
            { path: 'FileUpload/:id', component: UploadComponent },
            { path: 'CodeBackup', component: CodeBackupComponent },
            { path: 'CodeBackup/:id', component: CodeBackupComponent },
            { path: 'CodeRead', component: CodeReadComponent },
            { path: 'CodeRead/:id', component: CodeReadComponent },
            { path: '**', redirectTo: 'Account' }
        ], canActivate: [guard]
    },
    {
        path: 'Doc', component: DocComponent, children: [
            { path: '', redirectTo: 'BootCamp', pathMatch: 'full' },
            { path: 'BootCamp', component: BootCampComponent },
            { path: 'MarkDownCamp', component: MarkdownCampComponent },
            { path: 'MermaidCamp', component: MermaidCampComponent },
            { path: 'KatexLatexCamp', component: KatexLatexCampComponent },
            { path: 'VimCamp', component: ViCampComponent },
            { path: 'GitCamp', component: GitCampComponent },
            { path: 'DockerCamp', component: DockerCampComponent },

            { path: 'AngularCamp', component: AngularCampComponent },
            { path: 'AspNetCoreCamp', component: AspNetCoreCampComponent },
            { path: 'BlazorCamp', component: BlazorCampComponent },
            { path: 'CsharpCamp', component: CsharpCampComponent },
            { path: 'RustCamp', component: RustCampComponent },
            { path: 'GoCamp', component: GoCampComponent },
            { path: 'HtmlCssCamp', component: HtmlCssCampComponent },
            { path: 'JavaScriptCamp', component: JavaScriptCampComponent },
            { path: 'NginXCamp', component: NginXCampComponent },
            { path: 'NodeJsCamp', component: NodeJsCampComponent },

            { path: 'PowerShellCamp', component: PowerShellCampComponent },
            { path: 'ShellScriptCamp', component: ShellScriptCampComponent },
            { path: 'SqlCamp', component: SqlCampComponent },
            { path: 'Solution', component: SolutionComponent },

            { path: '**', redirectTo: 'BootCamp' }
        ]
    },
    { path: 'LoadingCircle', component: LoadingCircleComponent },
    { path: 'PlayGround', component: PlayGroundComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInEnComponent },
    { path: 'SignOut', component: SignOutComponent },
    {
        path: 'Role', component: RoleComponent,
        canActivate: [roleGuard],
        data: { roles: ['Admin'] }
    },
    { path: 'forget-password', component: ForgetPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: 'Data', component: DataComponent,
        resolve: {
            resolvedData: dataResolver,
            resolvedCategory: categoryResolver
        }
    },
    { path: 'confirm-reply-email', component: ConfirmEmailReplayComponent },
    { path: 'VivChat', component: VivChatComponent },
    { path: 'SignalRChat', component: SignalRChatComponent },
    { path: 'ChatClient', component: ChatClientComponent },
    { path: 'QnA', component: QnAComponent },
    { path: 'UserList', component: UserListComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
    { path: 'ImageDrop', component: ImageManagerComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
    { path: 'BallTransForm', component: BallTransformComponent },
    { path: 'Editor', component: VivEditorComponent },

    { path: '**', redirectTo: 'Home' }
];
