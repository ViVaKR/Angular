import { Routes } from '@angular/router';
import { DocumentType } from './core/enums/document-type';
import { authGuard } from './core/guards/auth-guard';
import { loadingGuard } from './core/guards/loading-guard';
import { Paths } from './data/menu-data';

const topic = 'topic';
const autoStories = 'auto_stories';

// * 클로저를 사용한 지연 로딩
// "어떤 타입이든 받겠다" 추후 실제 컴포넌트 타입으로 대체됨
// lc() 헬퍼 - 고차 함수
// import() - 동적로딩 (Lazy Loading)
// <T> 제너릭으로 타입 안정성 확보
// 클로저 - 바깥 변수를 안쪽 함수가 기억
const lc = <T>(path: string, exportName: string) =>
  () => import(`./${path}.ts`).then((m) => m[exportName] as T);

/*
// lc 를 호출 lc('pages/home/home', 'Home')

// 이런 함수가 만들어져서 라우터에 전달됨
() => import('./pages/home/home.ts').then((m) => m['Home'])

// 사용자가 /Home 경로에 접근할 때 비로소 실행
// → home.ts 파일을 그때 내려받음
// → 거기서 Home 컴포넌트를 꺼내서 화면에 띄움

한 줄 요약
"경로와 이름을 받아서, 나중에 필요할 때 그 파일을 내려받아 컴포넌트를 꺼내주는 함수를 만드는 함수" 😄
함수가 함수를 반환하는 이 패턴을 커링(Currying) 이라고도 해. Angular lazy loading 의 핵심 원리이기도 하고! 🎉
*/


export const routes: Routes = [
  {
    path: '',
    redirectTo: Paths.Home.url,
    pathMatch: 'full',
  },

  /* 홈 */
  {
    path: Paths.Home.url,
    loadComponent: lc('pages/home/home', 'Home'),
    data: { showBar: false, breadcrumb: Paths.Home.title, breadcrumbIcon: 'home' },
    title: Paths.Home.title,
  },

  /* 108 운세 - 오늘의 법연 */
  {
    path: Paths.BuddhaFortune.url,
    loadComponent: lc('pages/buddha-fortune/buddha-fortune', 'BuddhaFortune'),
    data: { showBar: true, breadcrumb: Paths.BuddhaFortune.title, breadcrumbIcon: topic },
    title: Paths.BuddhaFortune.title,
  },
  {
    path: `${Paths.BuddhaFortune.url}/:id`,
    loadComponent: lc('pages/buddha-fortune/buddha-fortune', 'BuddhaFortune'),
    data: { showBar: false, breadcrumb: Paths.BuddhaFortune.title, breadcrumbIcon: autoStories },
    title: Paths.BuddhaFortune.title,
  },

  // #region Dharma
  {
    path: Paths.Dharma.url,
    loadComponent: lc('pages/dharma/dharma', 'Dharma'),
    data: { showBar: true, breadcrumb: Paths.Dharma.title, breadcrumbIcon: topic },
    title: Paths.Dharma.title,
    children: [

      /* 경전 */
      {
        path: Paths.DharmaScripture.url,
        loadComponent: lc('pages/dharma/dharma-scripture/dharma-scripture', 'DharmaScripture'),
        data: { showBar: true, breadcrumb: Paths.DharmaScripture.title, breadcrumbIcon: autoStories },
        title: Paths.DharmaScripture.title,
      },
      {
        path: Paths.DharmaScriptureViewer.url,
        loadComponent: lc('pages/dharma/dharma-scripture/components/viewer/dharma-scripture-viewer', 'DharmaScriptureViewer'),
        data: { showBar: true, breadcrumb: Paths.DharmaScriptureViewer.title, breadcrumbIcon: autoStories },
        title: Paths.DharmaScriptureViewer.title,
      },
      {
        path: `${Paths.DharmaScriptureViewer.url}/:id`,
        loadComponent: lc('pages/dharma/dharma-scripture/components/viewer/dharma-scripture-viewer', 'DharmaScriptureViewer'),
        data: { showBar: true, breadcrumb: Paths.DharmaScriptureViewer.title, breadcrumbIcon: autoStories },
        title: Paths.DharmaScriptureViewer.title,
      },
      {
        path: Paths.DharmaScriptureEditor.url,
        loadComponent: lc('pages/dharma/dharma-scripture/components/editor/dharma-scripture-editor', 'DharmaScriptureEditor'),
        data: { showBar: true, breadcrumb: Paths.DharmaScriptureEditor.title, breadcrumbIcon: autoStories },
        title: Paths.DharmaScriptureEditor.title,
      },
      {
        path: `${Paths.DharmaScriptureEditor.url}/:id`,
        loadComponent: lc('pages/dharma/dharma-scripture/components/editor/dharma-scripture-editor', 'DharmaScriptureEditor'),
        data: { showBar: true, breadcrumb: Paths.DharmaScriptureEditor.title, breadcrumbIcon: autoStories },
        title: Paths.DharmaScriptureEditor.title,
      },

      /* 성전 */
      {
        path: Paths.Canon.url,
        loadComponent: lc('pages/dharma/canon/canon', 'Canon'),
        data: { showBar: true, breadcrumb: Paths.Canon.title, breadcrumbIcon: autoStories },
        title: Paths.Canon.title,
      },
      {
        path: Paths.CreateCanon.url,
        loadComponent: lc('pages/dharma/canon/create-canon/create-canon', 'CreateCanon'),
        data: { showBar: true, breadcrumb: Paths.CreateCanon.title, breadcrumbIcon: autoStories },
        title: Paths.CreateCanon.title,
      },
      {
        path: Paths.ReadCanon.url,
        loadComponent: lc('pages/dharma/canon/read-canon/read-canon', 'ReadCanon'),
        data: { showBar: true, breadcrumb: Paths.ReadCanon.title, breadcrumbIcon: autoStories },
        title: Paths.ReadCanon.title,
      },
      {
        path: `${Paths.ReadCanon.url}/:id`,
        loadComponent: lc('pages/dharma/canon/read-canon/read-canon', 'ReadCanon'),
        data: { showBar: true, breadcrumb: Paths.ReadCanon.title, breadcrumbIcon: autoStories },
        title: Paths.ReadCanon.title,
      },

      /* 법문 */
      {
        path: Paths.Passage.url,
        loadComponent: lc('pages/dharma/passage/passage', 'Passage'),
        data: { showBar: true, breadcrumb: Paths.Passage.title, breadcrumbIcon: autoStories },
        title: Paths.Passage.title,
      },
      {
        path: Paths.CreatePassage.url,
        loadComponent: lc('pages/dharma/passage/create-passage/create-passage', 'CreatePassage'),
        data: { showBar: true, breadcrumb: Paths.CreatePassage.title, breadcrumbIcon: autoStories },
        title: Paths.CreatePassage.title,
      },
      {
        path: Paths.ReadPassage.url,
        loadComponent: lc('pages/dharma/passage/read-passage/read-passage', 'ReadPassage'),
        data: { showBar: true, breadcrumb: Paths.ReadPassage.title, breadcrumbIcon: autoStories },
        title: Paths.ReadPassage.title,
      },
      {
        path: `${Paths.ReadPassage.url}/:id`,
        loadComponent: lc('pages/dharma/passage/read-passage/read-passage', 'ReadPassage'),
        data: { showBar: true, breadcrumb: Paths.ReadPassage.title, breadcrumbIcon: autoStories },
        title: Paths.ReadPassage.title,
      },

      /* 사경 */
      {
        path: Paths.SutraCopying.url,
        loadComponent: lc('pages/dharma/sutra-copying/sutra-copying', 'SutraCopying'),
        data: { showBar: true, breadcrumb: Paths.SutraCopying.title, breadcrumbIcon: autoStories },
        title: Paths.SutraCopying.title,
      },
      {
        path: Paths.CreateSutraCopying.url,
        loadComponent: lc('pages/dharma/sutra-copying/create-sutra-copying/create-sutra-copying', 'CreateSutraCopying'),
        data: { showBar: true, breadcrumb: Paths.CreateSutraCopying.title, breadcrumbIcon: autoStories },
        title: Paths.CreateSutraCopying.title,
      },
      {
        path: Paths.ReadSutraCopying.url,
        loadComponent: lc('pages/dharma/sutra-copying/read-sutra-copying/read-sutra-copying', 'ReadSutraCopying'),
        data: { showBar: true, breadcrumb: Paths.ReadSutraCopying.title, breadcrumbIcon: autoStories },
        title: Paths.ReadSutraCopying.title,
      },
      {
        path: `${Paths.ReadSutraCopying.url}/:id`,
        loadComponent: lc('pages/dharma/sutra-copying/read-sutra-copying/read-sutra-copying', 'ReadSutraCopying'),
        data: { showBar: true, breadcrumb: Paths.ReadSutraCopying.title, breadcrumbIcon: autoStories },
        title: Paths.ReadSutraCopying.title,
      },
      {
        path: Paths.TangwhaGallery.url,
        loadComponent: lc('pages/tangwha/tangwha-gallery/tangwha-gallery', 'TangwhaGallery'),
        data: { showBar: true, breadcrumb: '탱화 갤러리', breadcrumbIcon: autoStories },
        title: Paths.TangwhaGallery.title,
      },
      {
        path: '',
        redirectTo: Paths.Canon.url,
        pathMatch: 'full',
      },
    ],
  },
  // #endregion

  /* 경전 */
  {
    path: Paths.Scripture.url,
    loadComponent: lc('pages/scripture/scripture', 'Scripture'),
    data: { showBar: true, breadcrumb: Paths.Scripture.title, breadcrumbIcon: topic },
    title: Paths.Scripture.title,
    children: [
      {
        path: Paths.HomeScripture.url,
        loadComponent: lc('pages/scripture/home-scripture/home-scripture', 'HomeScripture'),
        data: { showBar: true, breadcrumb: Paths.HomeScripture.title, breadcrumbIcon: autoStories },
        title: Paths.HomeScripture.title,
      },

      /* 경전 목록 */
      {
        path: Paths.ScriptureMaster.url,
        loadComponent: lc('pages/scripture/scripture-master/scripture-master', 'ScriptureMaster'),
        data: { showBar: true, roles: ['Admin'], breadcrumb: Paths.ScriptureMaster.title, breadcrumbIcon: autoStories },
        title: Paths.ScriptureMaster.title,
      },
      {
        path: Paths.CreateScriptureMaster.url,
        loadComponent: lc('pages/scripture/scripture-master/create-scripture-master/create-scripture-master', 'CreateScriptureMaster'),
        data: { showBar: true, roles: ['Admin'], breadcrumb: Paths.CreateScriptureMaster.title, breadcrumbIcon: autoStories },
        title: Paths.CreateScriptureMaster.title,
      },
      {
        path: `${Paths.ReadScriptureMaster.url}/:id`,
        loadComponent: lc('pages/scripture/scripture-master/read-scripture-master/read-scripture-master', 'ReadScriptureMaster'),
        data: { showBar: true, roles: ['User'], breadcrumb: Paths.ReadScriptureMaster.title, breadcrumbIcon: autoStories },
        title: Paths.ReadScriptureMaster.title,
      },

      /* 경전 구절 */
      {
        path: Paths.ScriptureParagraph.url,
        loadComponent: lc('pages/scripture/scripture-paragraph/scripture-paragraph', 'ScriptureParagraph'),
        data: { showBar: true, roles: ['Admin'], breadcrumb: Paths.ScriptureParagraph.title, breadcrumbIcon: autoStories },
        title: Paths.ScriptureParagraph.title,
      },
      {
        path: Paths.CreateScriptureParagraph.url,
        loadComponent: lc('pages/scripture/scripture-paragraph/create-scripture-paragraph/create-scripture-paragraph', 'CreateScriptureParagraph'),
        data: { showBar: true, roles: ['Admin'], breadcrumb: Paths.CreateScriptureParagraph.title, breadcrumbIcon: autoStories },
        title: Paths.CreateScriptureParagraph.title,
      },
      {
        path: Paths.ReadScriptureParagraph.url,
        loadComponent: lc('pages/scripture/scripture-paragraph/read-scripture-paragraph/read-scripture-paragraph', 'ReadScriptureParagraph'),
        data: { showBar: true, roles: ['User'], breadcrumb: Paths.ReadScriptureParagraph.title, breadcrumbIcon: autoStories },
        title: Paths.ReadScriptureParagraph.title,
      },
      {
        path: `${Paths.ReadScriptureParagraph.url}/:id`,
        loadComponent: lc('pages/scripture/scripture-paragraph/read-scripture-paragraph/read-scripture-paragraph', 'ReadScriptureParagraph'),
        data: { showBar: true, roles: ['User'], breadcrumb: Paths.ReadScriptureParagraph.title, breadcrumbIcon: autoStories },
        title: Paths.ReadScriptureParagraph.title,
      },

      /* 경전 사경 */
      {
        path: Paths.ScriptureTranscription.url,
        loadComponent: lc('pages/scripture/scripture-transcription/scripture-transcription', 'ScriptureTranscription'),
        data: { showBar: true, roles: ['User'], breadcrumb: Paths.ScriptureTranscription.title, breadcrumbIcon: autoStories },
        title: Paths.ScriptureTranscription.title,
      },
      {
        path: Paths.CreateScriptureTranscription.url,
        loadComponent: lc('pages/scripture/scripture-transcription/create-scripture-transcription/create-scripture-transcription', 'CreateScriptureTranscription'),
        data: { showBar: true, roles: ['User'], breadcrumb: Paths.CreateScriptureTranscription.title, breadcrumbIcon: autoStories },
        title: Paths.CreateScriptureTranscription.title,
      },
      {
        path: Paths.ReadScriptureTranscription.url,
        loadComponent: lc('pages/scripture/scripture-transcription/read-scripture-transcription/read-scripture-transcription', 'ReadScriptureTranscription'),
        data: { showBar: true, roles: ['User'], breadcrumb: Paths.ReadScriptureTranscription.title, breadcrumbIcon: autoStories },
        title: Paths.ReadScriptureTranscription.title,
      },
      {
        path: Paths.ListTranscription.url,
        loadComponent: lc('pages/transcription/list-transcription/list-transcription', 'ListTranscription'),
        data: { showBar: true, breadcrumb: Paths.ListTranscription.title, breadcrumbIcon: autoStories },
        title: Paths.ListTranscription.title,
      },
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeScripture.url,
        pathMatch: 'full',
        data: { showBar: true, breadcrumb: Paths.HomeScripture.title, breadcrumbIcon: autoStories },
        title: Paths.HomeScripture.title,
      },
      { path: '**', redirectTo: Paths.HomeScripture.url },
    ],
  },

  /* 사경 */
  {
    path: Paths.Transcription.url,
    loadComponent: lc('pages/transcription/transcription', 'Transcription'),
    data: { showBar: true, breadcrumb: Paths.Transcription.title, breadcrumbIcon: topic },
    title: Paths.Transcription.title,
    canActivate: [authGuard],
    children: [
      {
        path: Paths.HomeTranscription.url,
        loadComponent: lc('pages/transcription/home-transcription/home-transcription', 'HomeTranscription'),
        data: { showBar: true, breadcrumb: Paths.HomeTranscription.title, breadcrumbIcon: autoStories },
        title: Paths.HomeTranscription.title,
      },
      {
        path: Paths.ListTranscription.url,
        loadComponent: lc('pages/transcription/list-transcription/list-transcription', 'ListTranscription'),
        data: { showBar: true, breadcrumb: Paths.ListTranscription.title, breadcrumbIcon: autoStories },
        title: Paths.ListTranscription.title,
      },
      {
        path: Paths.WriteTranscription.url,
        loadComponent: lc('pages/transcription/write-transcription/write-transcription', 'WriteTranscription'),
        data: { showBar: true },
        title: Paths.WriteTranscription.title,
      },
      {
        path: Paths.ReadTranscription.url,
        loadComponent: lc('pages/transcription/read-transcription/read-transcription', 'ReadTranscription'),
        data: { showBar: true },
        title: Paths.ReadTranscription.title,
      },
      {
        path: `${Paths.ReadTranscription.url}/:id`,
        loadComponent: lc('pages/transcription/read-transcription/read-transcription', 'ReadTranscription'),
        data: { showBar: true },
        title: Paths.ReadTranscription.title,
      },
      {
        path: Paths.EditTranscription.url,
        loadComponent: lc('pages/transcription/edit-transcription/edit-transcription', 'EditTranscription'),
        data: { showBar: true },
        title: Paths.EditTranscription.title,
      },
      {
        path: Paths.BackupTranscription.url,
        loadComponent: lc('pages/transcription/backup-transcription/backup-transcription', 'BackupTranscription'),
        data: { showBar: true },
        title: Paths.BackupTranscription.title,
      },
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeTranscription.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.HomeTranscription.title,
      },
      { path: '**', redirectTo: Paths.HomeTranscription.url },
    ],
  },

  /* 소통 */
  {
    path: Paths.Communication.url,
    loadComponent: lc('pages/communication/communication', 'Communication'),
    data: { showBar: true, breadcrumb: Paths.Communication.title, breadcrumbIcon: topic },
    title: Paths.Communication.title,
    canActivate: [authGuard],
    children: [
      {
        path: Paths.Root.url,
        loadComponent: lc('pages/communication/lobby/lobby', 'Lobby'),
        data: { showBar: true },
        title: Paths.Lobby.title,
      },
      {
        path: Paths.Lobby.url,
        loadComponent: lc('pages/communication/lobby/lobby', 'Lobby'),
        data: { showBar: true },
        title: Paths.Lobby.title,
      },
      {
        path: Paths.ChatRoom.url,
        loadComponent: lc('pages/communication/chat-room/chat-room', 'ChatRoom'),
        data: { showBar: true },
        title: Paths.ChatRoom.title,
      },
      {
        path: 'ChatRoom/:roomId',
        loadComponent: lc('pages/communication/chat-room/chat-room', 'ChatRoom'),
        data: { showBar: true },
        title: Paths.ChatRoom.title,
      },
      {
        path: Paths.IpInfo.url,
        loadComponent: lc('pages/ip-info/ip-info', 'IpInfo'),
        data: { showBar: true },
        title: Paths.IpInfo.title,
      },
      {
        path: Paths.DataExchange.url,
        loadComponent: lc('pages/communication/data-exchange/data-exchange', 'DataExchange'),
        data: { showBar: true },
        title: Paths.DataExchange.title,
      },
    ],
  },

  /* 문서 */
  {
    path: Paths.Document.url,
    loadComponent: lc('pages/document/document', 'Document'),
    data: { showBar: true, breadcrumb: Paths.Document.title, breadcrumbIcon: topic },
    title: Paths.Document.title,
    children: [
      {
        path: Paths.HomeDocument.url,
        loadComponent: lc('pages/document/home-document/home-document', 'HomeDocument'),
        data: { showBar: true },
        title: Paths.HomeDocument.title,
      },
      {
        path: Paths.ListDocument.url,
        loadComponent: lc('pages/document/list-document/list-document', 'ListDocument'),
        data: { showBar: true },
        title: Paths.ListDocument.title,
      },
      {
        path: Paths.Sermon.url,
        loadComponent: lc('pages/document/list-document/list-document', 'ListDocument'),
        data: { showBar: true, DocumentType: DocumentType.Sermon },
        title: Paths.Sermon.title,
      },
      {
        path: Paths.DharmaTalk.url,
        loadComponent: lc('pages/document/list-document/list-document', 'ListDocument'),
        data: { showBar: true, DocumentType: DocumentType.DharmaTalk },
        title: Paths.DharmaTalk.title,
      },
      {
        path: Paths.Discourse.url,
        loadComponent: lc('pages/document/list-document/list-document', 'ListDocument'),
        data: { showBar: true, DocumentType: DocumentType.Lecture },
        title: Paths.Discourse.title,
      },
      {
        path: Paths.Teisho.url,
        loadComponent: lc('pages/document/list-document/list-document', 'ListDocument'),
        data: { showBar: true, DocumentType: DocumentType.ZenTeaching },
        title: Paths.Teisho.title,
      },
      {
        path: `${Paths.ReadDocument.url}/:id`,
        loadComponent: lc('pages/document/read-document/read-document', 'ReadDocument'),
        data: { showBar: true },
        title: Paths.ReadDocument.title,
      },
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeDocument.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.HomeDocument.title,
      },
      { path: '**', redirectTo: Paths.HomeDocument.url },
    ],
  },

  /* 마음의 거울 */
  {
    path: Paths.MirrorOfMind.url,
    loadComponent: lc('pages/mirror-of-mind/mirror-of-mind', 'MirrorOfMind'),
    data: { showBar: true, breadcrumb: Paths.MirrorOfMind.title, breadcrumbIcon: topic },
    title: Paths.MirrorOfMind.title,
    children: [
      {
        path: Paths.HomeMirrorOfMind.url,
        loadComponent: lc('pages/mirror-of-mind/home-mirror-of-mind/home-mirror-of-mind', 'HomeMirrorOfMind'),
        data: { showBar: true, breadcrumb: '홈', breadcrumbIcon: '' },
        title: Paths.HomeMirrorOfMind.title,
      },
      {
        path: Paths.ReflectionMirrorOfMind.url,
        loadComponent: lc('pages/mirror-of-mind/reflection-mirror-of-mind/reflection-mirror-of-mind', 'ReflectionMirrorOfMind'),
        data: { showBar: true, breadcrumb: '성찰', breadcrumbIcon: '' },
        title: Paths.ReflectionMirrorOfMind.title,
      },
      {
        path: Paths.DharmaMirrorOfMind.url,
        loadComponent: lc('pages/mirror-of-mind/dharma-mirror-of-mind/dharma-mirror-of-mind', 'DharmaMirrorOfMind'),
        data: { showBar: true },
        title: Paths.DharmaMirrorOfMind.title,
      },
      {
        path: Paths.DailyLifeMirrorOfMind.url,
        loadComponent: lc('pages/mirror-of-mind/daily-life-mirror-of-mind/daily-life-mirror-of-mind', 'DailyLifeMirrorOfMind'),
        data: { showBar: true },
        title: Paths.DailyLifeMirrorOfMind.title,
      },
      {
        path: Paths.QnaMirrorOfMind.url,
        loadComponent: lc('pages/mirror-of-mind/qna-mirror-of-mind/qna-mirror-of-mind', 'QnaMirrorOfMind'),
        data: { showBar: true },
        title: Paths.QnaMirrorOfMind.title,
      },
      {
        path: Paths.QnaDetail.url,
        loadComponent: lc('pages/mirror-of-mind/qna-mirror-of-mind/qna-detail/qna-detail', 'QnaDetail'),
        data: { showBar: true, breadcrumb: '법문 나눔', breadcrumbIcon: 'forum' },
        title: Paths.QnaDetail.title,
      },
      {
        path: `${Paths.QnaDetail.url}/:id`,
        loadComponent: lc('pages/mirror-of-mind/qna-mirror-of-mind/qna-detail/qna-detail', 'QnaDetail'),
        data: { showBar: true },
        title: Paths.QnaDetail.title,
      },
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeMirrorOfMind.url,
        pathMatch: 'full',
        data: { showBar: true },
      },
      { path: '**', redirectTo: Paths.HomeMirrorOfMind.url, pathMatch: 'full' },
    ],
  },

  /* 소개 */
  {
    path: Paths.About.url,
    loadComponent: lc('pages/about/about', 'About'),
    data: { showBar: true, breadcrumb: Paths.About.title, breadcrumbIcon: autoStories },
    title: Paths.About.title,
    children: [
      {
        path: Paths.HomeAbout.url,
        loadComponent: lc('pages/about/home-about/home-about', 'HomeAbout'),
        data: { showBar: true, breadcrumb: '소개 홈', breadcrumbIcon: autoStories },
        title: Paths.HomeAbout.title,
      },
      {
        path: Paths.BuddhistEtiquette.url,
        loadComponent: lc('pages/about/buddhist-etiquette/buddhist-etiquette', 'BuddhistEtiquette'),
        data: { showBar: true, breadcrumb: '불교 예절', breadcrumbIcon: autoStories },
        title: Paths.BuddhistEtiquette.title,
      },
      {
        path: Paths.BuddhistSense.url,
        loadComponent: lc('pages/about/buddhist-sense/buddhist-sense', 'BuddhistSense'),
        data: { showBar: true },
        title: Paths.BuddhistSense.title,
      },
      {
        path: Paths.OllamaChat.url,
        loadComponent: lc('pages/ollama-chat/ollama-chat', 'OllamaChat'),
        data: { showBar: true },
        title: 'AI Chat',
      },
      {
        path: Paths.BuddhistTerm.url,
        loadComponent: lc('pages/about/buddhist-term/buddhist-term', 'BuddhistTerm'),
        data: { showBar: true },
        title: Paths.BuddhistTerm.title,
      },
      {
        path: Paths.CreateBuddhistTerm.url,
        loadComponent: lc('pages/about/buddhist-term/create-buddhist-term/create-buddhist-term', 'CreateBuddhistTerm'),
        data: { showBar: true },
        title: Paths.CreateBuddhistTerm.title,
      },
      {
        path: Paths.BuddhistEvents.url,
        loadComponent: lc('pages/about/buddhist-events/buddhist-events', 'BuddhistEvents'),
        data: { showBar: true },
        title: Paths.BuddhistEvents.title,
      },
      {
        path: Paths.Help.url,
        loadComponent: lc('pages/help/help', 'Help'),
        data: { showBar: true },
        title: Paths.Help.title,
      },
      {
        path: Paths.Root.url,
        redirectTo: Paths.HomeAbout.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.HomeAbout.title,
      },
      { path: '**', redirectTo: Paths.HomeAbout.url },
    ],
  },

  /* 회원 */
  {
    path: Paths.MemberShip.url,
    loadComponent: lc('pages/membership/membership', 'Membership'),
    data: { showBar: true, breadcrumb: Paths.MemberShip.title, breadcrumbIcon: topic },
    title: Paths.MemberShip.title,
    canActivate: [loadingGuard, authGuard],
    children: [
      {
        path: Paths.MemberList.url,
        loadComponent: lc('pages/membership/member-list/member-list', 'MemberList'),
        data: { showBar: true, roles: ['Admin'] },
        title: Paths.MemberList.title,
      },
      {
        path: Paths.MyTranscription.url,
        loadComponent: lc('pages/membership/my-transcription/my-transcription', 'MyTranscription'),
        data: { showBar: true },
        title: Paths.MyTranscription.title,
      },
      {
        path: Paths.AuthRole.url,
        loadComponent: lc('pages/membership/auth-role/auth-role', 'AuthRole'),
        data: { showBar: true, roles: ['Admin'] },
        title: Paths.AuthRole.title,
      },
      {
        path: Paths.ReadRole.url,
        loadComponent: lc('pages/membership/auth-role/read-role/read-role', 'ReadRole'),
        data: { showBar: true, roles: ['Admin'] },
        title: Paths.ReadRole.title,
      },
      {
        path: 'ReadRole/:id',
        loadComponent: lc('pages/membership/auth-role/read-role/read-role', 'ReadRole'),
        data: { showBar: true, roles: ['Admin'] },
        title: Paths.ReadRole.title,
      },
      {
        path: Paths.ReadTodaySutra.url,
        loadComponent: lc('pages/today-sutra/read-today-sutra/read-today-sutra', 'ReadTodaySutra'),
        data: { showBar: true },
        title: Paths.ReadTodaySutra.title,
      },
      {
        path: 'ReadTodaySutra/:id',
        loadComponent: lc('pages/today-sutra/read-today-sutra/read-today-sutra', 'ReadTodaySutra'),
        data: { showBar: true },
        title: Paths.ReadTodaySutra.title,
      },
      {
        path: Paths.TodaySutra.url,
        loadComponent: lc('pages/today-sutra/today-sutra', 'TodaySutra'),
        data: { showBar: true },
        title: Paths.TodaySutra.title,
      },
      {
        path: Paths.SecuritySettings.url,
        loadComponent: lc('pages/membership/security-settings/security-settings', 'SecuritySettings'),
        data: { showBar: true },
        title: Paths.SecuritySettings.title,
      },
      {
        path: Paths.TwoFactorDisableDialog.url,
        loadComponent: lc('pages/membership/security-settings/two-factor-disable-dialog/two-factor-disable-dialog', 'TwoFactorDisableDialog'),
        data: { showBar: true },
        title: Paths.TwoFactorDisableDialog.title,
      },
      {
        path: Paths.UserInfo.url,
        loadComponent: lc('pages/membership/user-info/user-info', 'UserInfo'),
        data: { showBar: true, roles: ['Admin'] },
        title: Paths.UserInfo.title,
      },
      {
        path: 'UserInfo/:id',
        loadComponent: lc('pages/membership/user-info/user-info', 'UserInfo'),
        data: { showBar: true, roles: ['Admin'] },
        title: Paths.UserInfo.title,
      },
      {
        path: Paths.Profile.url,
        loadComponent: lc('pages/membership/profile/profile', 'Profile'),
        data: { showBar: true },
        title: '프로파일',
      },
      {
        path: Paths.EditProfile.url,
        loadComponent: lc('pages/membership/edit-profile/edit-profile', 'EditProfile'),
        data: { showBar: true },
        title: Paths.EditProfile.title,
      },
      {
        path: Paths.ChangePassword.url,
        loadComponent: lc('pages/membership/change-password/change-password', 'ChangePassword'),
        data: { showBar: true },
        title: Paths.ChangePassword.title,
      },
      {
        path: Paths.ConfirmEmail.url,
        loadComponent: lc('pages/membership/confirm-email/confirm-email', 'ConfirmEmail'),
        data: { showBar: true },
        title: Paths.ConfirmEmail.title,
      },
      {
        path: Paths.ConfirmEmailReply.url,
        loadComponent: lc('pages/membership/confirm-email-reply/confirm-email-reply', 'ConfirmEmailReply'),
        data: { showBar: true },
        title: Paths.ConfirmEmailReply.title,
      },
      {
        path: Paths.UploadFiles.url,
        loadComponent: lc('shared/multi-file-upload/multi-file-upload', 'MultiFileUpload'),
        data: { showBar: false },
        title: Paths.UploadFiles.title,
      },
      {
        path: Paths.CancelMemberShip.url,
        loadComponent: lc('pages/membership/cancel-membership/cancel-membership', 'CancelMembership'),
        data: { showBar: true },
        title: Paths.CancelMemberShip.title,
      },
      {
        path: Paths.SignOut.url,
        loadComponent: lc('pages/membership/sign-out/sign-out', 'SignOut'),
        data: { showBar: true },
        title: Paths.SignOut.title,
      },
      {
        path: '',
        redirectTo: Paths.Profile.url,
        pathMatch: 'full',
        data: { showBar: true },
        title: Paths.Profile.title,
      },
      { path: '**', redirectTo: Paths.Profile.url },
    ],
  },

  {
    path: Paths.ForgotPassword.url,
    loadComponent: lc('pages/forgot-password/forgot-password', 'ForgotPassword'),
    data: { showBar: false },
    title: Paths.ForgotPassword.title,
  },
  {
    path: Paths.ResetPassword.url,
    loadComponent: lc('pages/reset-password/reset-password', 'ResetPassword'),
    data: { showBar: false },
    title: Paths.ResetPassword.title,
  },

  /* 쿠키정책 */
  {
    path: Paths.Cookie.url,
    loadComponent: lc('shared/cookie/cookie', 'Cookie'),
    data: { showBar: false },
    title: Paths.Cookie.title,
  },

  /* 이용약관 */
  {
    path: Paths.TermsOfService.url,
    loadComponent: lc('shared/terms-of-service/terms-of-service', 'TermsOfService'),
    data: { showBar: false },
    title: Paths.TermsOfService.title,
  },

  /* 개인정보 보호 정책 */
  {
    path: Paths.Privacy.url,
    loadComponent: lc('shared/privacy/privacy', 'Privacy'),
    data: { showBar: false },
    title: Paths.Privacy.title,
  },

  /* 로그인 */
  {
    path: Paths.SignIn.url,
    loadComponent: lc('pages/membership/sign-in/sign-in', 'SignIn'),
    data: { showBar: false },
    title: Paths.SignIn.title,
  },
  {
    path: Paths.TwoFactorVerify.url,
    loadComponent: lc('pages/membership/two-factor-verify/two-factor-verify', 'TwoFactorVerify'),
    data: { showBar: true },
    title: Paths.TwoFactorVerify.title,
  },

  /* 에러 페이지 */
  {
    path: 'error',
    loadComponent: lc('shared/error/error', 'Error'),
  },
  {
    path: 'forbidden',
    loadComponent: lc('shared/forbidden/forbidden', 'Forbidden'),
  },

  /* 회원관리 */
  {
    path: Paths.SignUp.url,
    loadComponent: lc('pages/membership/sign-up/sign-up', 'SignUp'),
    data: { showBar: false },
    title: Paths.SignUp.title,
  },

  /* 404 폴백 */
  {
    path: '**',
    loadComponent: lc('shared/not-found/not-found', 'NotFound'),
    data: { showBar: false },
    title: '없는 페이지',
  },
];
