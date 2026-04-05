export const Paths = {
  Root: { url: '', title: '' },
  Home: { url: 'Home', title: '홈' },

  /* 오늘의 법연 - 108 운세 */
  BuddhaFortune: { url: 'BuddhaFortune', title: '오늘의 법연 | Buddham' },

  /* 법 */

  /* '법(法)'이라는 딱딱한 한자어보다. 사이트의 정체성! */
  Dharma: { url: 'Dharma', title: '부처님의 가르침' },

  /* 법 경전 목록 및 카테고리 */
  DharmaScripture: { url: 'DharmaScripture', title: '경전' }, // 목록 비행단
  DharmaScriptureEditor: { url: 'DharmaScriptureEditor', title: '경전 편집' }, // 수정/생성 편대
  DharmaScriptureViewer: { url: 'DharmaScriptureViewer', title: '경전 읽기' }, // 상세 조회 편대

  /* '경전'보다 조금 더 넓고 숭고한 느낌을 줍니다. 팔만대장경 같은 거대한 지혜의 창고라는 느낌이 확 옵니다. */
  Canon: { url: 'Canon', title: '성전' },
  CreateCanon: { url: 'CreateCanon', title: '성전쓰기' },
  ReadCanon: { url: 'ReadCanon', title: '성전읽기' },

  /* 성전(Canon)에서 발췌한 구절이나 스님들의 말씀을 뜻하기에 '법문'만큼 완벽한 단어는 없죠 */
  Passage: { url: 'Passage', title: '법문' },
  CreatePassage: { url: 'CreatePassage', title: '법문 쓰기' },
  ReadPassage: { url: 'ReadPassage', title: '법문 읽기' },

  /* 군더더기 없습니다. 불자님들에게 가장 익숙하고 고요한 수행의 이름입니다. */
  SutraCopying: { url: 'SutraCopying', title: '사경' },
  CreateSutraCopying: { url: 'CreateSutraCopying', title: '사경 쓰기' },
  ReadSutraCopying: { url: 'ReadSutraCopying', title: '사경 읽기' },

  /* 탱화 */
  TangwhaGallery: { url: 'TangwhaGallery', title: '탱화 화랑' },

  /* 경전 */
  Scripture: { url: 'Scripture', title: '경전' },
  HomeScripture: { url: 'HomeScripture', title: '만다라' },

  /* 경전 목록 */
  ScriptureMaster: {
    url: 'ScriptureMaster',
    title: '경전 목록',
    titleEng: 'Scripture Master',
    subTitle: '목록',
  },
  CreateScriptureMaster: {
    url: 'CreateScriptureMaster',
    title: '경전 쓰기',
    titleEng: 'Create Scripture Master',
    subTitle: '경전 쓰기',
  },
  ReadScriptureMaster: { url: 'ReadScriptureMaster', title: '경전 읽기' },

  /* 경전 구절 */
  ScriptureParagraph: { url: 'ScriptureParagraph', title: '경전구절 목록' },
  CreateScriptureParagraph: { url: 'CreateScriptureParagraph', title: '경전구절 쓰기' },
  ReadScriptureParagraph: { url: 'ReadScriptureParagraph', title: '경전구절 읽기' },

  /* 경전 사경 */
  ScriptureTranscription: { url: 'ScriptureTranscription', title: '경전수행 목록' },
  CreateScriptureTranscription: { url: 'CreateScriptureTranscription', title: '경전수행 쓰기' },
  ReadScriptureTranscription: { url: 'ReadScriptureTranscription', title: '경전수행 읽기' },

  /* 사경 */
  Transcription: { url: 'Transcription', title: '수행' },
  HomeTranscription: { url: 'HomeTranscription', title: '만다라' },
  ListTranscription: { url: 'ListTranscription', title: '경전수행 목록' },
  WriteTranscription: { url: 'WriteTranscription', title: '경전수행 작성' },
  ReadTranscription: { url: 'ReadTranscription', title: '경전수행 보기' },
  EditTranscription: { url: 'EditTranscription', title: '경전수행 수정' },
  BackupTranscription: { url: 'BackupTranscription', title: '경전수행 백업' },

  /* 소통 */
  Communication: { url: 'Communication', title: '소통' },
  Lobby: { url: 'Lobby', title: '로비' },
  ChatRoom: { url: 'ChatRoom', title: '채팅방' },
  IpInfo: { url: 'IpInfo', title: 'IP Info' },
  OpenChat: { url: 'OpenChat', title: '공개 대화방' },
  SecurityChat: { url: 'SecurityChat', title: '비밀 대화방' },
  DataExchange: { url: 'DataExchange', title: '불교 자료실' },

  /* 문서 */
  Document: { url: 'Document', title: '문서' },
  HomeDocument: { url: 'HomeDocument', title: '만다라' },
  ListDocument: { url: 'ListDocument', title: '문서 목록' },
  CreateDocument: { url: 'CreateDocument', title: '문서 쓰기' },
  ReadDocument: { url: 'ReadDocument', title: '문서 읽기' },
  Sermon: {
    url: 'Sermon',
    title: '법문 法門',
    description: '정기법회, 특별법회 스님의 공식 설법',
    icon: '💬',
  },
  DharmaTalk: {
    url: 'DharmaTalk',
    title: '법담 法談',
    description:
      '경전과 교리의 체계적 해설, 현대적이고 대중적인 설법, 일상생활 중심, 실용적이고 친근한 접근방식',
    tags: ['일상', '실천', 'QnA'],
  },
  Discourse: {
    url: 'Discourse',
    title: '강설 講說',
    description: '경전과 교리의 체계적 해설, 학술적, 교육적, 구조화되고 깊이 있는 설명',
    tags: ['경전', '교리', '학습'],
  },
  Teisho: {
    url: 'Teisho',
    title: '제창 提唱',
    description: '선사들의 깨달음 이야기, 직관거',
    tags: ['공안', '화두', '선', '깨달음'],
  },

  /* 마음의 거울 */
  MirrorOfMind: { url: 'MirrorOfMind', title: '마음의 거울' },
  HomeMirrorOfMind: { url: 'HomeMirrorOfMind', title: '만다라' },
  ReflectionMirrorOfMind: { url: 'ReflectionMirrorOfMind', title: '성찰' },
  DharmaMirrorOfMind: { url: 'DharmaMirrorOfMind', title: '법열' },
  DailyLifeMirrorOfMind: { url: 'DailyLifeMirrorOfMind', title: '일상' },
  QnaMirrorOfMind: { url: 'QnaMirrorOfMind', title: '질문과 답변' },
  QnaDetail: { url: 'QnaDetail', title: '질문과 답변 상세' },

  /* 소개 */
  About: { url: 'About', title: '소개' },
  HomeAbout: { url: 'HomeAbout', title: '만다라' },
  BuddhistSense: { url: 'BuddhistSense', title: '불교상식' },
  BuddhistEtiquette: { url: 'BuddhistEtiquette', title: '불교예절' },
  BuddhistTerm: { url: 'BuddhistTerm', title: '불교용어' },
  CreateBuddhistTerm: { url: 'CreateBuddhistTerm', title: '불교용어 작성' },
  BuddhistEvents: { url: 'BuddhistEvents', title: '불교행사' },
  Help: { url: 'Help', title: '이용안내' },

  /* 회원 */
  MemberShip: { url: 'MemberShip', title: '회원정보' },
  MemberList: { url: 'MemberList', title: '회원 목록' },
  AuthRole: { url: 'AuthRole', title: '회원 역할' },
  ReadRole: { url: 'ReadRole', title: '역할' },
  ReadTodaySutra: { url: 'ReadTodaySutra', title: '오늘의 경전' },
  Profile: { url: 'Profile', title: '프로파일' },
  TodaySutra: { url: 'TodaySutra', title: '오늘의 경전' },
  MyInfo: { url: 'MyInfo', title: '나의정보' },
  UserInfo: { url: 'UserInfo', title: '회원 정보' },
  MyTranscription: { url: 'MyTranscription', title: '나의경전' },
  EditProfile: { url: 'EditProfile', title: '법명 / 필명 수정' },
  ConfirmEmail: { url: 'ConfirmEmail', title: '이메일 확인' },
  ConfirmEmailReply: { url: 'ConfirmEmailReply', title: '이메일 확인 회신' },
  ForgotPassword: { url: 'ForgotPassword', title: '비밀번호 분실' },
  SecuritySettings: { url: 'SecuritySettins', title: '2단계 인증 (2FA)' },
  TwoFactorDisableDialog: { url: 'TwoFactorDisableDialog', title: '보안설정 해제 (2FA)' },
  ResetPassword: { url: 'ResetPassword', title: '비밀번호 초기화' },
  ChangePassword: { url: 'ChangePassword', title: '비밀번호 변경' },
  CancelMemberShip: { url: 'CancelMemberShip', title: '가입 해제' },
  UploadFiles: { url: 'UploadFiles', title: '파일 업로드' },
  SignOut: { url: 'SignOut', title: '로그아웃' },

  /* 로그인 */
  SignIn: { url: 'SignIn', title: '로그인' },

  /* 2FA 인증 */
  TwoFactorVerify: { url: 'TwoFactorVerify', title: '2단계 인증' },

  /* 회원가입 */
  SignUp: { url: 'SignUp', title: '회원 가입' },

  /* 개인정보 보호 정책 */
  Privacy: { url: 'Privacy', title: '개인정보 처리방침' },
  Cookie: { url: 'Cookie', title: '쿠키정책' },
  TermsOfService: { url: 'TermsOfService', title: '이용약관' },
};
