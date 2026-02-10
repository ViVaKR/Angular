import { computed, inject, Injectable } from '@angular/core';
import { UserStore } from './user-store';
import { Router } from '@angular/router';
import { AuthStore } from './auth-store';
import { IMenuConfig } from '../interfaces/i-menu-config';
import { Paths } from '@app/data/menu-data';

@Injectable({ providedIn: 'root' })
export class MenuService {

  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  // ✨ 메인 메뉴
  readonly mainMenus = computed(() => this.filterMenus(this.getMainMenus()));

  // ✨ 회원 메뉴
  readonly membershipMenus = computed(() => this.filterMenus(this.getMembershipMenus()));

  // ✨ 경전 메뉴
  readonly scriptureMenus = computed(() => this.filterMenus(this.getScriptureMenus()));

  // ✨ 사경 메뉴
  readonly transcriptionMenus = computed(() => this.filterMenus(this.getTranscriptionMenus()));

  // ✨ 소통 메뉴
  readonly communicationMenus = computed(() => this.filterMenus(this.getCommunicationMenus()));

  // ✨ 문서 메뉴
  readonly documentMenus = computed(() => this.filterMenus(this.getDocumentMenus()));

  // ✨ 소개 메뉴
  readonly aboutMenus = computed(() => this.filterMenus(this.getAboutMenus()));

  // ✨ 로그인 전 사용자 메뉴
  readonly signInMenus = computed(() => this.filterMenus(this.getSignInMenus()));

  // ✨ 로그인 후 사용자 메뉴
  readonly signOutMenus = computed(() => this.filterMenus(this.getSignOutMenus()));

  // 🎯 메뉴 정의들
  private getMainMenus(): IMenuConfig[] {
    return [
      {
        id: 0,
        title: Paths.Scripture.title, // 경전
        url: Paths.Scripture.url,
        icon: 'spa'
      },
      {
        id: 1,
        title: Paths.Transcription.title, // 사경
        url: Paths.Transcription.url,
        icon: 'edit_document'
      },
      {
        id: 2,
        title: Paths.Communication.title, // 소통
        url: Paths.Communication.url,
        icon: 'nature_people',
        access: {
          requiresAuth: true,
          requiresEmailConfirmed: true,
          roles: [
            'Admin', 'Writer', 'User'
          ]
        }
      },
      {
        id: 3,
        title: Paths.Document.title,
        url: Paths.Document.url,
        icon: 'library_books'
      },
      {
        id: 4,
        title: Paths.About.title,
        url: Paths.About.url,
        icon: 'temple_buddhist'
      },
    ];
  }

  private getMembershipMenus(): IMenuConfig[] {
    return [
      {
        id: 0,
        title: Paths.Profile.title,
        url: Paths.Profile.url,
        icon: 'nature_people',
        access: { requiresAuth: true }
      },
      {
        id: 1,
        title: Paths.MemberList.title,
        url: Paths.MemberList.url,
        icon: 'spa',
        access: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        id: 3,
        title: Paths.EditProfile.title,
        url: Paths.EditProfile.url,
        icon: 'nature_people',
        access: {
          requiresAuth: true
        }
      },
      {
        id: 4,
        title: Paths.UploadFiles.title,
        url: Paths.UploadFiles.url,
        icon: 'spa',
        access: { requiresAuth: true }
      },
      {
        id: 5,
        title: Paths.ChangePassword.title,
        url: Paths.ChangePassword.url,
        icon: 'edit_document',
        access: { requiresAuth: true }
      },
      {
        id: 6,
        title: Paths.ConfirmEmail.title,
        url: Paths.ConfirmEmail.url,
        icon: 'library_books',
        access: {
          requiresAuth: true,
          hideWhen: { emailConfirmed: true }
        },
        badge: {
          show: () => !this.userStore.isEmailConfirmed(),
          text: '!',
          color: 'warn'
        }
      },
      {
        id: 7,
        title: Paths.AuthRole.title,
        url: Paths.AuthRole.url,
        icon: 'library_books',
        access: {
          requiresAuth: true,
          roles: ['Admin']
        }
      },
      {
        id: 8,
        title: Paths.TodaySutra.title,
        url: Paths.TodaySutra.url,
        icon: 'library_books',
        access: { requiresAuth: true, }
      },
      {
        id: 9,
        title: Paths.CancelMemberShip.title,
        url: Paths.CancelMemberShip.url,
        icon: 'temple_buddhist',
        access: {
          requiresAuth: true
        }
      },
      {
        id: 10,
        title: Paths.SecuritySettings.title,
        url: Paths.SecuritySettings.url,
        icon: 'temple_buddhist',
        access: {
          requiresAuth: true
        }
      },
    ];
  }

  private getScriptureMenus(): IMenuConfig[] {
    return [
      {
        id: 0, title: Paths.HomeScripture.title, url: Paths.HomeScripture.url,
        icon: 'home'
      },
      {
        id: 1, title: Paths.ScriptureMaster.title, url: Paths.ScriptureMaster.url,
        icon: 'list',
        access: { requiresAuth: true, roles: ['Admin'] }
      },
      {
        id: 2, title: Paths.ScriptureParagraph.title, url: Paths.ScriptureParagraph.url,
        icon: 'book_ribbon',
        access: { requiresAuth: true, roles: ['Admin'] }
      }
    ];
  }

  private getTranscriptionMenus(): IMenuConfig[] {
    return [
      { id: 0, title: Paths.HomeTranscription.title, url: Paths.HomeTranscription.url, icon: 'home' },
      {
        id: 1, title: Paths.ListTranscription.title, url: Paths.ListTranscription.url,
        icon: 'list'
      },
      { id: 2, title: Paths.WriteTranscription.title, url: Paths.WriteTranscription.url, icon: 'edit', access: { requiresAuth: true } },
      { id: 3, title: Paths.EditTranscription.title, url: Paths.EditTranscription.url, icon: 'edit_note', access: { requiresAuth: true } },
      {
        id: 4, title: Paths.BackupTranscription.title, url: Paths.BackupTranscription.url,
        icon: 'backup', access: { requiresAuth: true }
      }
    ];
  }

  private getCommunicationMenus(): IMenuConfig[] {
    return [
      { id: 0, title: Paths.Lobby.title, url: Paths.Lobby.url, icon: 'meeting_room', exact: false },
      { id: 1, title: Paths.DataExchange.title, url: Paths.DataExchange.url, icon: 'folder_shared' },
    ];
  }


  /*
  설법/강연 : 스님이 법당에서 신도들에게 불교의 핵심가르침을 설명하는 의미
  대화/토론 (선문답) : 스승과 제자 간의 문답이나, 대중과의 질의 응답형식으로 진행
  해설/강의 : 특정 경전 구절이안 불교적 주제에 개한 깊이 있는 해설을 제공하는 강의
  */
  private getDocumentMenus(): IMenuConfig[] {
    return [
      { id: 0, title: Paths.HomeDocument.title, url: Paths.HomeDocument.url, icon: 'home' },
      /*
      설법 : 부처님의 가르침인 법(Dharma)를 설(말씀하다)한다는 의미.
      법문: 불교의 진리로 들어가는 문이라는 의미, 깨달음으로 인도하는 가르침.
      */
      { id: 1, title: Paths.Sermon.title, url: Paths.Sermon.url, icon: 'auto_stories' }, // 설법

      /*
      달마토크 : 스님이나 법사가 부처님의 가르침, 즉 법에 대해 대중엑 설법하거나 강연.
      법문, 법담, 법화
      */
      {
        id: 2, title: Paths.DharmaTalk.title,
        url: Paths.DharmaTalk.url,
        access: {
          roles: ['User']
        },
        icon: 'record_voice_over'
      }, // 법문

      /*
        담론: 어떤 주제에 대해 여러 사람이 나누는 체계적인 이야기나 논의
      */
      { id: 3, title: Paths.Discourse.title, url: Paths.Discourse.url, icon: 'forum' }, // 담론

      /*
        단순한 강연이나 설교가 아니라 가르침을 직접적으로 보여주는 특별한 방식의 소통
        스승의 직접적인 경험적 이해 즉, 깨달음의 통찰(insight) 를 표현하는 것
      */
      { id: 4, title: Paths.Teisho.title, url: Paths.Teisho.url, icon: 'description' }, // 스승의 가르침
    ];
  }

  private getAboutMenus(): IMenuConfig[] {
    return [
      { id: 0, title: Paths.HomeAbout.title, url: Paths.HomeAbout.url, icon: 'home' },
      { id: 1, title: Paths.BuddhistEtiquette.title, url: Paths.BuddhistEtiquette.url, icon: 'self_improvement' },
      { id: 2, title: Paths.BuddhistSense.title, url: Paths.BuddhistSense.url, icon: 'lightbulb' },
      { id: 3, title: Paths.BuddhistTerm.title, url: Paths.BuddhistTerm.url, icon: 'menu_book' },
      { id: 4, title: Paths.BuddhistEvents.title, url: Paths.BuddhistEvents.url, icon: 'event' },
    ];
  }

  private getSignInMenus(): IMenuConfig[] {
    return [
      { id: 10, title: Paths.SignIn.title, url: Paths.SignIn.url, icon: 'login' },
      { id: 11, title: Paths.SignUp.title, url: Paths.SignUp.url, icon: 'how_to_reg' },
      { id: 12, title: Paths.ForgotPassword.title, url: Paths.ForgotPassword.url, icon: 'password' },
    ];
  }

  private getSignOutMenus(): IMenuConfig[] {
    return [
      { id: 0, title: Paths.MemberShip.title, url: Paths.MemberShip.url, icon: 'account_circle' },
      { id: 1, title: Paths.MyTranscription.title, url: `${Paths.MemberShip.url}/${Paths.MyTranscription.url}`, icon: 'book' },
      { id: 2, title: Paths.EditProfile.title, url: `${Paths.MemberShip.url}/${Paths.EditProfile.url}`, icon: 'edit' },
      { id: 3, title: Paths.ChangePassword.title, url: `${Paths.MemberShip.url}/${Paths.ChangePassword.url}`, icon: 'password' },
      { id: 4, title: Paths.SignOut.title, url: `${Paths.MemberShip.url}/${Paths.SignOut.url}`, icon: 'logout' },
    ];
  }

  // 🎯 메뉴 필터링 로직

  private filterMenus(menus: IMenuConfig[]): IMenuConfig[] {
    const isLoggedIn = this.authStore.isLoggedIn(); // 직접 호출
    const user = this.userStore.user(); // 직접 호출
    const emailConfirmed = this.userStore.isEmailConfirmed();

    return menus.filter(menu => {
      if (!menu.access) return true; // 접근 조건이 없으면 모두에게 표시
      const { requiresAuth, requiresEmailConfirmed, roles, hideWhen } = menu.access;

      // * 로그인 필요
      if (requiresAuth && !isLoggedIn) return false;

      // * 이메일 인증 필요
      if (requiresEmailConfirmed && !emailConfirmed) return false;

      // * 역할 체크 (배열 vs 배열)
      if (roles && roles.length > 0) {
        if (!this.hasMatchingRole(user?.roles, roles)) {
          return false;
        }
      }

      // * 숨김 조건
      if (hideWhen) {
        // 이메일 인증 시 숨김
        if (hideWhen.emailConfirmed === true && emailConfirmed) return false;
        if (hideWhen.emailConfirmed === false && !emailConfirmed) return false;

        // 특정 역할일 때 숨김 (배열 vs 배열)
        if (hideWhen.roles && this.hasMatchingRole(user?.roles, hideWhen.roles)) {
          return false;
        }
      }
      return true;
    });
  }
  // 🎯 역할 매칭 체크 (교집합 확인)
  private hasMatchingRole(userRoles: string[] | undefined, requiredRoles: string[]): boolean {

    // 사용자 역할이 없으면 false
    if (!userRoles || userRoles.length === 0) return false;

    // 필요한 역할이 없으면 true
    if (!requiredRoles || requiredRoles.length === 0) return true;

    // 교집합이 있는지 확인 (하나라도 일치하면 OK)
    return requiredRoles.some(role => userRoles.includes(role));
  }
  // 🎯 뱃지 표시 여부
  shouldShowBadge(menu: IMenuConfig): boolean {
    return menu.badge?.show() ?? false;
  }

  // 🎯 네비게이션
  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  // 🎯 라우트 접근 가능 여부 체크 (authGuard에서 사용)
  canAccessRoute(access?: IMenuConfig['access']): boolean {
    if (!access) return true;

    const isLoggedIn = this.authStore.isLoggedIn();
    const user = this.userStore.currentUser();
    const emailConfirmed = this.userStore.isEmailConfirmed();

    if (access.requiresAuth && !isLoggedIn) return false;
    if (access.requiresEmailConfirmed && !emailConfirmed) return false;

    // ✨ 역할 체크
    if (access.roles && !this.hasMatchingRole(user?.roles, access.roles)) {
      return false;
    }
    return true;
  }
}
