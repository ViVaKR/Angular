import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Paths } from './data/menu-data';
import { MultiFileUpload } from './shared/multi-file-upload/multi-file-upload';
import { Home } from './pages/home/home';
import { MemberList } from './pages/membership/member-list/member-list';
import { MyTranscription } from './pages/membership/my-transcription/my-transcription';
import { SignOut } from './pages/membership/sign-out/sign-out';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: Paths.Home.url,
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: Home,
    data: { showBar: false },
    title: '홈'
  },

  /* 경전 */
  {
    path: Paths.Scripture.url,
    loadComponent: () => import('./pages/scripture/scripture').then(m => m.Scripture),
    data: { showBar: true },
    title: Paths.Scripture.title,
    children: [
      {
        path: Paths.HomeScripture.url, // 경전 홈
        loadComponent: () => import('./pages/scripture/home-scripture/home-scripture').then(m => m.HomeScripture),
        title: Paths.HomeScripture.title,
        data: { showBar: true }
      },
      {
        path: Paths.ListScripture.url, // 경전 목록
        loadComponent: () => import('./pages/scripture/list-scripture/list-scripture').then(m => m.ListScripture),
        title: Paths.ListScripture.title,
        data: { showBar: true }
      },
      {
        path: Paths.WriteScripture.url, // 경전 쓰기
        loadComponent: () => import('./pages/scripture/write-scripture/write-scripture').then(m => m.WriteScripture),
        title: Paths.WriteScripture.title,
        data: { showBar: true },
        canActivate: [authGuard]
      },
      {
        path: Paths.ReadScripture.url, // 경전 읽기
        loadComponent: () => import('./pages/scripture/read-scripture/read-scripture').then(m => m.ReadScripture),
        title: Paths.ReadScripture.title,
        data: { showBar: true }
      },
      {
        path: Paths.EditScripture.url, // 경전 수정
        loadComponent: () => import('./pages/scripture/edit-scripture/edit-scripture').then(m => m.EditScripture),
        title: Paths.EditProfile.title,
        data: { showBar: true },
        canActivate: [authGuard]
      },
      {
        path: Paths.BackupScripture.url, // 경전 백업
        loadComponent: () => import('./pages/scripture/backup-scripture/backup-scripture').then(m => m.BackupScripture),
        title: Paths.BackupScripture.title,
        data: { showBar: true },
        canActivate: [authGuard]
      }
    ]
  },

  /* 사경 */
  {
    path: Paths.Transcription.url,
    loadComponent: () => import('./pages/transcription/transcription').then(m => m.Transcription),
    title: Paths.Transcription.title,
    data: { showBar: true },
    children: [
      {
        path: Paths.HomeTranscription.url,
        loadComponent: () => import('./pages/transcription/home-transcription/home-transcription').then(m => m.HomeTranscription),
        title: Paths.HomeTranscription.title,
        data: { showBar: true }
      },
      {
        path: Paths.ListTranscription.url,
        loadComponent: () => import('./pages/transcription/list-transcription/list-transcription').then(m => m.ListTranscription),
        title: Paths.ListTranscription.title,
        data: { showBar: true }
      },
      {
        path: Paths.WriteTranscription.url,
        loadComponent: () => import('./pages/transcription/write-transcription/write-transcription').then(m => m.WriteTranscription),
        title: Paths.WriteTranscription.title,
        data: { showBar: true }
      },
      {
        path: Paths.ReadTranscription.url,
        loadComponent: () => import('./pages/transcription/read-transcription/read-transcription').then(m => m.ReadTranscription),
        title: Paths.ReadTranscription.title,
        data: { showBar: true }
      },
      {
        path: Paths.EditTranscription.url,
        loadComponent: () => import('./pages/transcription/edit-transcription/edit-transcription').then(m => m.EditTranscription),
        title: Paths.EditTranscription.title,
        data: { showBar: true }
      },
      {
        path: Paths.BackupTranscription.url,
        loadComponent: () => import('./pages/transcription/backup-transcription/backup-transcription').then(m => m.BackupTranscription),
        title: Paths.BackupTranscription.title,
        data: { showBar: true }
      }
    ],
    canActivate: [authGuard]
  },

  /* 소통 */
  {
    path: Paths.Communication.url,
    loadComponent: () => import('./pages/communication/communication').then(m => m.Communication),
    title: Paths.Communication.title,
    data: { showBar: true },
    children: [
      {
        path: Paths.Root.url,
        loadComponent: () => import('./pages/communication/lobby/lobby').then(m => m.Lobby),
        title: Paths.Lobby.title,
        data: { showBar: true }
      },
      {
        path: Paths.Lobby.url,
        loadComponent: () => import('./pages/communication/lobby/lobby').then(m => m.Lobby),
        title: Paths.Lobby.title,
        data: { showBar: true }
      },
      {
        path: Paths.ChatRoom.url,
        loadComponent: () => import('./pages/communication/chat-room/chat-room').then(m => m.ChatRoom),
        title: Paths.ChatRoom.title,
        data: { showBar: true }
      },
      {
        path: 'ChatRoom/:roomId',
        loadComponent: () => import('./pages/communication/chat-room/chat-room').then(m => m.ChatRoom),
        title: Paths.ChatRoom.title,
        data: { showBar: true }
      },
      {
        path: Paths.DataExchange.url,
        loadComponent: () => import('./pages/communication/data-exchange/data-exchange').then(m => m.DataExchange),
        title: Paths.DataExchange.title,
        data: { showBar: true }
      },
    ],
    canActivate: [authGuard]
  },

  /* 문서 */
  {
    path: Paths.Document.url,
    loadComponent: () => import('./pages/document/document').then(m => m.Document),
    data: { showBar: true },
    title: Paths.Document.title,
    children: [
      {
        path: Paths.HomeDocument.url,
        loadComponent: () => import('./pages/document/home-document/home-document').then(m => m.HomeDocument),
        title: Paths.HomeDocument.title,
        data: { showBar: true }
      },
      {
        path: Paths.Sermon.url, // 부처님 말씀
        loadComponent: () => import('./pages/document/sermon/sermon').then(m => m.Sermon),
        title: Paths.Sermon.title,
        data: { showBar: true }
      },
      {
        path: Paths.DharmaTalk.url, // 법문
        loadComponent: () => import('./pages/document/dharma-talk/dharma-talk').then(m => m.DharmaTalk),
        title: Paths.DharmaTalk.title,
        data: { showBar: true }
      },
      {
        path: Paths.Discourse.url, // 강론
        loadComponent: () => import('./pages/document/discourse/discourse').then(m => m.Discourse),
        title: Paths.Discourse.title,
        data: { showBar: true }
      },
      {
        path: Paths.Teisho.url,
        loadComponent: () => import('./pages/document/teisho/teisho').then(m => m.Teisho),
        title: Paths.Teisho.title,
        data: { showBar: true }
      }
    ]
  },

  /* 소개 */
  {
    path: Paths.About.url,
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: { showBar: true },
    title: Paths.About.title,
    children: [
      {
        path: Paths.HomeAbout.url,
        loadComponent: () => import('./pages/about/home-about/home-about').then(m => m.HomeAbout),
        data: { showBar: true },
        title: Paths.HomeAbout.title
      },
      {
        path: Paths.BuddhistEtiquette.url, // 불교 예절
        loadComponent: () => import('./pages/about/buddhist-etiquette/buddhist-etiquette').then(m => m.BuddhistEtiquette),
        data: { showBar: true },
        title: Paths.BuddhistEtiquette.title
      },
      {
        path: Paths.BuddhistSense.url, // 불교 상식
        loadComponent: () => import('./pages/about/buddhist-sense/buddhist-sense').then(m => m.BuddhistSense),
        data: { showBar: true },
        title: Paths.BuddhistSense.title
      },
      {
        path: Paths.BuddhistTerm.url, // 불교 용어
        loadComponent: () => import('./pages/about/buddhist-term/buddhist-term').then(m => m.BuddhistTerm),
        data: { showBar: true },
        title: Paths.BuddhistTerm.title
      },
      {
        path: Paths.BuddhistEvents.url,
        loadComponent: () => import('./pages/about/buddhist-events/buddhist-events').then(m => m.BuddhistEvents),
        data: { showBar: true },
        title: Paths.BuddhistEvents.title
      }
    ]
  },

  /* 회원 */
  {
    path: Paths.MemberShip.url,
    loadComponent: () => import('./pages/membership/membership').then(m => m.Membership),
    canActivate: [authGuard],
    title: Paths.MemberShip.title,
    data: { showBar: true },
    children: [
      {
        path: Paths.MemberList.url,
        component: MemberList,
        data: { showBar: true },
        title: Paths.MemberList.title,
      },
      {
        path: Paths.MyTranscription.url,
        component: MyTranscription,
        data: { showBar: true },
        title: Paths.MyTranscription.title,
      },
      {
        path: Paths.AuthRole.url,
        title: Paths.AuthRole.title,
        loadComponent: () => import('./pages/membership/auth-role/auth-role').then(m => m.AuthRole),
        data: {
          showBar: true,
          roles: ['Admin']
        },
        canActivate: [roleGuard]
      },
      {
        path: Paths.Profile.url,
        loadComponent: () => import('./pages/membership/profile/profile').then(m => m.Profile),
        data: { showBar: true },
        title: '프로파일',
      },
      {
        path: Paths.EditProfile.url, // * 나의정보 수정
        loadComponent: () => import('./pages/membership/edit-profile/edit-profile').then(m => m.EditProfile),
        data: { showBar: true },
        title: Paths.EditProfile.title,
      },
      {
        path: Paths.ChangePassword.url, // * 비밀번호 변경
        loadComponent: () => import('./pages/membership/change-password/change-password').then(m => m.ChangePassword),
        data: { showBar: true },
        title: Paths.ChangePassword.title,
      },

      {
        path: Paths.ConfirmEmail.url, // * 이메일 확인
        loadComponent: () => import('./pages/membership/confirm-email/confirm-email').then(m => m.ConfirmEmail),
        data: { showBar: true },
        title: Paths.ConfirmEmail.title,
      },
      {
        path: Paths.ConfirmEmailReply.url, // * 이메일 확인 회신
        loadComponent: () => import('./pages/membership/confirm-email-reply/confirm-email-reply').then(m => m.ConfirmEmailReply),
        data: { showBar: true },
        title: Paths.ConfirmEmailReply.title,
      },
      {
        path: Paths.UploadFiles.url,
        component: MultiFileUpload,
        data: { showBar: false },
        title: Paths.UploadFiles.title,
      },
      {
        path: Paths.CancelMemberShip.url, // * 회원탈퇴
        loadComponent: () => import('./pages/membership/cancel-membership/cancel-membership').then(m => m.CancelMembership),
        data: { showBar: true },
        title: Paths.CancelMemberShip.title,
      },
      {
        path: Paths.SignOut.url,
        component: SignOut,
        data: { showBar: true },
        title: Paths.SignOut.title,
      },
      // 2. 빈 경로 리다이렉트는 맨 마지막에
      {
        path: '',
        redirectTo: Paths.Profile.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.Profile.title,
      },
      // 404
      {
        path: '**',
        redirectTo: Paths.Profile.url
      }
    ]

  },
  {
    path: Paths.ForgotPassword.url,
    loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword),
    data: { showBar: false },
    title: Paths.ForgotPassword.title

  },
  {
    path: Paths.ResetPassword.url, // * 비밀번호 리셋
    loadComponent: () => import('./pages/reset-password/reset-password').then(m => m.ResetPassword),
    data: { showBar: false },
    title: Paths.ResetPassword.title
  },
  /* 쿠키정책 */
  {
    path: Paths.Cookie.url,
    loadComponent: () => import('./shared/cookie/cookie').then(m => m.Cookie),
    data: { showBar: false },
    title: Paths.Cookie.title
  },

  /* 이용약관 */
  {
    path: Paths.TermsOfService.url,
    loadComponent: () => import('./shared/terms-of-service/terms-of-service').then(m => m.TermsOfService),
    data: { showBar: false },
    title: Paths.TermsOfService.title
  },

  /* 개인정보 보호 정책 */
  {
    path: Paths.Privacy.url,
    loadComponent: () => import('./shared/privacy/privacy').then(m => m.Privacy),
    data: { showBar: false },
    title: Paths.Privacy.title
  },

  /* 로그인 */
  {
    path: Paths.SignIn.url,
    loadComponent: () => import('./pages/membership/sign-in/sign-in').then(m => m.SignIn),
    data: { showBar: false },
    title: Paths.SignIn.title
  },

  /* 회원관리 */
  {
    path: Paths.SignUp.url,
    loadComponent: () => import('./pages/membership/sign-up/sign-up').then(m => m.SignUp),
    data: { showBar: false },
    title: Paths.SignUp.title
  },

  /* 404 폴백 */
  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found').then(m => m.NotFound),
    data: { showBar: false },
    title: '없는 페이지'
  }
];
