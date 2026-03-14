import { Routes } from '@angular/router';
import { Paths } from './data/menu-data';
import { MultiFileUpload } from './shared/multi-file-upload/multi-file-upload';
import { Home } from './pages/home/home';
import { MemberList } from './pages/membership/member-list/member-list';
import { MyTranscription } from './pages/membership/my-transcription/my-transcription';
import { SignOut } from './pages/membership/sign-out/sign-out';
import { authGuard } from './core/guards/auth-guard';
import { loadingGuard } from './core/guards/loading-guard';
import { Forbidden } from './shared/forbidden/forbidden';
import { Error } from './shared/error/error';
import { UserInfo } from './pages/membership/user-info/user-info';
import { TwoFactorVerify } from './pages/membership/two-factor-verify/two-factor-verify';
import { SecuritySettings } from './pages/membership/security-settings/security-settings';
import { TwoFactorDisableDialog } from './pages/membership/security-settings/two-factor-disable-dialog/two-factor-disable-dialog';
import { TodaySutra } from './pages/today-sutra/today-sutra';
import { ReadRole } from './pages/membership/auth-role/read-role/read-role';
import { ReadTodaySutra } from './pages/today-sutra/read-today-sutra/read-today-sutra';
import { ScriptureMaster } from './pages/scripture/scripture-master/scripture-master';
import { ScriptureParagraph } from './pages/scripture/scripture-paragraph/scripture-paragraph';
import { HomeScripture } from './pages/scripture/home-scripture/home-scripture';
import { Scripture } from './pages/scripture/scripture';
import { ReadTranscription } from './pages/transcription/read-transcription/read-transcription';
import { ReadScriptureParagraph } from './pages/scripture/scripture-paragraph/read-scripture-paragraph/read-scripture-paragraph';
import { ReadScriptureMaster } from './pages/scripture/scripture-master/read-scripture-master/read-scripture-master';
import { CreateScriptureParagraph } from './pages/scripture/scripture-paragraph/create-scripture-paragraph/create-scripture-paragraph';
import { CreateBuddhistTerm } from './pages/about/buddhist-term/create-buddhist-term/create-buddhist-term';
import { WriteTranscription } from './pages/transcription/write-transcription/write-transcription';
import { IpInfo } from './pages/ip-info/ip-info';
import { MirrorOfMind } from './pages/mirror-of-mind/mirror-of-mind';
import { ReflectionMirrorOfMind } from './pages/mirror-of-mind/reflection-mirror-of-mind/reflection-mirror-of-mind';
import { DharmaMirrorOfMind } from './pages/mirror-of-mind/dharma-mirror-of-mind/dharma-mirror-of-mind';
import { DailyLifeMirrorOfMind } from './pages/mirror-of-mind/daily-life-mirror-of-mind/daily-life-mirror-of-mind';
import { QnaMirrorOfMind } from './pages/mirror-of-mind/qna-mirror-of-mind/qna-mirror-of-mind';
import { HomeMirrorOfMind } from './pages/mirror-of-mind/home-mirror-of-mind/home-mirror-of-mind';
import { DocumentType } from './core/enums/document-type';
import { QnaDetail } from './pages/mirror-of-mind/qna-mirror-of-mind/qna-detail/qna-detail';
import { BuddhaFortune } from './pages/buddha-fortune/buddha-fortune';

const topic = 'topic';
const autoStories = 'auto_stories';

export const routes: Routes = [
  {
    path: '',
    redirectTo: Paths.Home.url,
    pathMatch: 'full'
  },

  /* 홈 */
  {
    path: Paths.Home.url,
    component: Home,
    data: {
      showBar: false,
      breadcrumb: Paths.Home.title,
      breadcrumbIcon: 'home'
    },
    title: Paths.Home.title
  },

  /* 108 운세 - 오늘의 법연 */
  {
    path: Paths.BuddhaFortune.url,
    component: BuddhaFortune,
    data: {
      showBar: true,
      breadcrumb: Paths.BuddhaFortune.title,
      breadcrumbIcon: topic
    },
    title: Paths.BuddhaFortune.title
  },
  {
    path: `${Paths.BuddhaFortune.url}/:id`,
    component: BuddhaFortune,
    data: {
      showBar: false,
      breadcrumb: Paths.BuddhaFortune.title,
      breadcrumbIcon: autoStories
    },
    title: Paths.BuddhaFortune.title
  },

  /* 경전 */
  {
    path: Paths.Scripture.url,
    component: Scripture,
    data: {
      showBar: true,
      breadcrumb: Paths.Scripture.title,
      breadcrumbIcon: topic
    },
    title: Paths.Scripture.title,
    children: [
      {
        path: Paths.HomeScripture.url, component: HomeScripture, title: Paths.HomeScripture.title, data: {
          showBar: true,
          breadcrumb: Paths.HomeScripture.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.ScriptureMaster.url, component: ScriptureMaster, title: Paths.ScriptureMaster.title,
        data: {
          showBar: true,
          roles: ['Admin'],
          breadcrumb: Paths.ScriptureMaster.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.CreateScriptureParagraph.url,
        component: CreateScriptureParagraph,
        title: Paths.CreateScriptureParagraph.title,
        data: {
          showBar: true,
          roles: ['Admin'],
          breadcrumb: Paths.CreateScriptureParagraph.title,
          breadcrumbIcon: autoStories
        }
      },

      {
        path: `${Paths.ReadScriptureMaster.url}/:id`,
        component: ReadScriptureMaster,
        title: Paths.ReadScriptureMaster.title,
        data: {
          showBar: true,
          roles: ['User'],
          breadcrumb: Paths.ReadScriptureMaster.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.ScriptureParagraph.url,
        component: ScriptureParagraph,
        title: Paths.ScriptureParagraph.title,
        data: {
          showBar: true,
          roles: ['Admin'],
          breadcrumb: Paths.ScriptureParagraph.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.ReadScriptureParagraph.url,
        component: ReadScriptureParagraph,
        title: Paths.ReadScriptureParagraph.title,
        data: {
          showBar: true,
          roles: ['User'],
          breadcrumb: Paths.ReadScriptureParagraph.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: `${Paths.ReadScriptureParagraph.url}/:id`,
        component: ReadScriptureParagraph,
        title: Paths.ReadScriptureParagraph.title,
        data: {
          showBar: true,
          roles: ['User'],
          breadcrumb: Paths.ReadScriptureParagraph.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.ListTranscription.url,
        loadComponent: () => import('./pages/transcription/list-transcription/list-transcription').then(m => m.ListTranscription),
        title: Paths.ListTranscription.title,
        data: {
          showBar: true,
          breadcrumb: Paths.ListTranscription.title,
          breadcrumbIcon: autoStories
        }
      },
      // 빈 경로 리다이렉트
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeScripture.url,
        pathMatch: 'full',
        data: {
          showBar: true,
          breadcrumb: Paths.HomeScripture.title,
          breadcrumbIcon: autoStories
        },
        title: Paths.HomeScripture.title,
      },
      // 404
      {
        path: '**',
        redirectTo: Paths.HomeScripture.url
      }
    ]
  },

  /* 사경 */
  {
    path: Paths.Transcription.url,
    loadComponent: () => import('./pages/transcription/transcription').then(m => m.Transcription),
    title: Paths.Transcription.title,
    canActivate: [authGuard],
    data: {
      showBar: true,
      breadcrumb: Paths.Transcription.title,
      breadcrumbIcon: topic
    },
    children: [
      {
        path: Paths.HomeTranscription.url,
        loadComponent: () => import('./pages/transcription/home-transcription/home-transcription').then(m => m.HomeTranscription),
        title: Paths.HomeTranscription.title,
        data: {
          showBar: true,
          breadcrumb: Paths.HomeTranscription.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.ListTranscription.url,
        loadComponent: () => import('./pages/transcription/list-transcription/list-transcription').then(m => m.ListTranscription),
        title: Paths.ListTranscription.title,
        data: {
          showBar: true,
          breadcrumb: Paths.ListTranscription.title,
          breadcrumbIcon: autoStories
        }
      },
      {
        path: Paths.WriteTranscription.url,
        component: WriteTranscription,
        title: Paths.WriteTranscription.title,
        data: { showBar: true }
      },
      {
        path: Paths.ReadTranscription.url,
        component: ReadTranscription,
        title: Paths.ReadTranscription.title,
        data: { showBar: true }
      },
      {
        path: `${Paths.ReadTranscription.url}/:id`,
        component: ReadTranscription,
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
      },

      // 빈 경로 리다이렉트
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeTranscription.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.HomeTranscription.title,
      },
      // 404
      {
        path: '**',
        redirectTo: Paths.HomeTranscription.url
      }
    ]
  },

  /* 소통 */
  {
    path: Paths.Communication.url,
    loadComponent: () => import('./pages/communication/communication').then(m => m.Communication),
    title: Paths.Communication.title,
    canActivate: [authGuard],
    data: {
      showBar: true,
      breadcrumb: Paths.Communication.title,
      breadcrumbIcon: topic
    },
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
        path: Paths.IpInfo.url,
        component: IpInfo,
        title: Paths.IpInfo.title,
        data: { showBar: true }
      },
      {
        path: Paths.DataExchange.url,
        loadComponent: () => import('./pages/communication/data-exchange/data-exchange').then(m => m.DataExchange),
        title: Paths.DataExchange.title,
        data: { showBar: true }
      },
    ],
  },

  /* 문서 */
  {
    path: Paths.Document.url,
    loadComponent: () => import('./pages/document/document').then(m => m.Document),
    data: {
      showBar: true,
      breadcrumb: Paths.Document.title,
      breadcrumbIcon: topic
    },
    title: Paths.Document.title,
    children: [
      // 홈은 (대시보드/소개 페이지)
      {
        path: Paths.HomeDocument.url,
        loadComponent: () => import('./pages/document/home-document/home-document').then(m => m.HomeDocument),
        title: Paths.HomeDocument.title,
        data: { showBar: true }
      },

      // 통합된 리스트 컴포넌트 (타입별 필터링)
      {
        path: Paths.ListDocument.url, // 'list' 또는 빈 문자열
        loadComponent: () => import('./pages/document/list-document/list-document').then(m => m.ListDocument),
        title: Paths.ListDocument.title,
        data: { showBar: true }
      },
      {
        path: Paths.Sermon.url, // 부처님 말씀
        loadComponent: () => import('./pages/document/list-document/list-document').then(m => m.ListDocument),
        title: Paths.Sermon.title,
        data: { showBar: true, DocumentType: DocumentType.Sermon }
      },
      {
        path: Paths.DharmaTalk.url, // 법문
        loadComponent: () => import('./pages/document/list-document/list-document').then(m => m.ListDocument),
        title: Paths.DharmaTalk.title,
        data: { showBar: true, DocumentType: DocumentType.DharmaTalk }
      },
      {
        path: Paths.Discourse.url, // 강론
        loadComponent: () => import('./pages/document/list-document/list-document').then(m => m.ListDocument),
        title: Paths.Discourse.title,
        data: { showBar: true, DocumentType: DocumentType.Lecture }
      },
      {
        path: Paths.Teisho.url, // 제창
        loadComponent: () => import('./pages/document/list-document/list-document').then(m => m.ListDocument),
        title: Paths.Teisho.title,
        data: { showBar: true, DocumentType: DocumentType.ZenTeaching }
      },

      // 상세 페이지
      {
        path: `${Paths.ReadDocument.url}/:id`,
        loadComponent: () => import('./pages/document/read-document/read-document').then(m => m.ReadDocument),
        title: Paths.ReadDocument.title,
        data: { showBar: true }
      },
      // 빈 경로 리다이렉트
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeDocument.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.HomeDocument.title,
      },
      // 404
      {
        path: '**',
        redirectTo: Paths.HomeDocument.url
      }
    ]
  },

  /* 마음의 거울 */
  {
    path: Paths.MirrorOfMind.url,
    component: MirrorOfMind,
    title: Paths.MirrorOfMind.title,
    data: {
      showBar: true,
      breadcrumb: Paths.MirrorOfMind.title,
      breadcrumbIcon: topic
    },
    children: [
      {
        path: Paths.HomeMirrorOfMind.url,
        component: HomeMirrorOfMind,
        title: Paths.HomeMirrorOfMind.title,
        data: {
          showBar: true,
          breadcrumb: '홈',
          breadcrumbIcon: '',
        }
      },
      {
        path: Paths.ReflectionMirrorOfMind.url,
        component: ReflectionMirrorOfMind,
        title: Paths.ReflectionMirrorOfMind.title,
        data: {
          showBar: true,
          breadcrumb: '성찰',
          breadcrumbIon: ''
        }
      },
      {
        path: Paths.DharmaMirrorOfMind.url,
        component: DharmaMirrorOfMind,
        title: Paths.DharmaMirrorOfMind.title,
        data: { showBar: true }
      },
      {
        path: Paths.DailyLifeMirrorOfMind.url,
        component: DailyLifeMirrorOfMind,
        title: Paths.DailyLifeMirrorOfMind.title,
        data: { showBar: true }
      },
      {
        path: Paths.QnaMirrorOfMind.url,
        component: QnaMirrorOfMind,
        title: Paths.QnaMirrorOfMind.title,
        data: { showBar: true }
      },
      {
        path: Paths.QnaDetail.url,
        component: QnaDetail,
        title: Paths.QnaDetail.title,
        data: {
          showBar: true,
          breadcrumb: '법문 나눔',
          breadcrumbIcon: 'forum',
        }
      },
      {
        path: `${Paths.QnaDetail.url}/:id`,
        component: QnaDetail,
        title: Paths.QnaDetail.title,
        data: {
          showBar: true,


        }
      },
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeMirrorOfMind.url,
        pathMatch: 'full',
        data: { showBar: true }
      },
      // 404
      {
        path: '**',
        redirectTo: Paths.HomeAbout.url
      }
    ]
  },

  /* 소개 */
  {
    path: Paths.About.url,
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: {
      showBar: true,
      breadcrumb: Paths.About.title,
      breadcrumbIcon: autoStories
    },
    title: Paths.About.title,
    children: [
      {
        path: Paths.HomeAbout.url,
        loadComponent: () => import('./pages/about/home-about/home-about').then(m => m.HomeAbout),
        data: {
          showBar: true,
          breadcrumb: '소개 홈',
          breadcrumbIcon: autoStories
        },
        title: Paths.HomeAbout.title
      },
      {
        path: Paths.BuddhistEtiquette.url, // 불교 예절
        loadComponent: () => import('./pages/about/buddhist-etiquette/buddhist-etiquette').then(m => m.BuddhistEtiquette),
        data: {
          showBar: true,
          breadcrumb: '불교 예절',
          breadcrumbIcon: 'auto_stories'
        },
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
        title: Paths.BuddhistTerm.title,
      },
      {
        path: Paths.CreateBuddhistTerm.url,
        component: CreateBuddhistTerm,
        title: Paths.CreateBuddhistTerm.title,
        data: { showBar: true }
      },
      {
        path: Paths.BuddhistEvents.url, // 이벤트
        loadComponent: () => import('./pages/about/buddhist-events/buddhist-events').then(m => m.BuddhistEvents),
        data: { showBar: true },
        title: Paths.BuddhistEvents.title
      },
      {
        path: Paths.Help.url,
        loadComponent: () => import('./pages/help/help').then(m => m.Help),
        title: Paths.Help.title,
        data: { showBar: true }
      },
      // 빈 경로
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeAbout.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.HomeAbout.title,
      },
      // 404
      {
        path: '**',
        redirectTo: Paths.HomeAbout.url
      }
    ]
  },

  /* 회원 */
  {
    path: Paths.MemberShip.url,
    loadComponent: () => import('./pages/membership/membership').then(m => m.Membership),
    title: Paths.MemberShip.title,
    data: {
      showBar: true,
      breadcrumb: Paths.MemberShip.title,
      breadcrumbIcon: topic
    },
    canActivate: [loadingGuard, authGuard],
    children: [
      {
        path: Paths.MemberList.url,
        component: MemberList,
        title: Paths.MemberList.title,
        data: {
          showBar: true,
          roles: ['Admin']
        }
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
        data: { showBar: true, roles: ['Admin'] },
      },
      {
        path: Paths.ReadRole.url,
        title: Paths.ReadRole.title,
        component: ReadRole,
        data: { showBar: true, roles: ['Admin'] },
      },
      {
        path: 'ReadRole/:id',
        title: Paths.ReadRole.title,
        component: ReadRole,
        data: { showBar: true, roles: ['Admin'] },
      },
      {
        path: Paths.ReadTodaySutra.url,
        title: Paths.ReadTodaySutra.title,
        component: ReadTodaySutra,
        data: { showBar: true },
      },
      {
        path: 'ReadTodaySutra/:id',
        title: Paths.ReadTodaySutra.title,
        component: ReadTodaySutra,
        data: { showBar: true },
      },
      {
        path: Paths.TodaySutra.url,
        component: TodaySutra,
        data: { showBar: true },
        title: Paths.TodaySutra.title,
      },
      {
        path: Paths.SecuritySettings.url,
        title: Paths.SecuritySettings.title,
        component: SecuritySettings,
        data: {
          showBar: true
        }
      },
      {
        path: Paths.TwoFactorDisableDialog.url,
        title: Paths.TwoFactorDisableDialog.title,
        component: TwoFactorDisableDialog,
        data: {
          showBar: true
        }
      },
      {
        path: Paths.SecuritySettings.url,
        title: Paths.SecuritySettings.title,
        component: SecuritySettings,
        data: {
          showBar: true
        }
      },
      {
        path: Paths.UserInfo.url,
        title: Paths.UserInfo.title,
        loadComponent: () => import('./pages/membership/user-info/user-info').then(m => m.UserInfo),
        data: {
          showBar: true,
          roles: ['Admin']
        },
      },
      {
        path: 'UserInfo/:id',
        title: Paths.UserInfo.title,
        component: UserInfo,
        data: {
          showBar: true,
          roles: ['Admin']
        },
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
  { // TwoFactor
    path: Paths.TwoFactorVerify.url,
    title: Paths.TwoFactorVerify.title,
    component: TwoFactorVerify,
    data: {
      showBar: true
    }
  },
  // 🔹 에러 페이지
  {
    path: 'error',
    component: Error
  },
  {
    path: 'forbidden',
    component: Forbidden
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
