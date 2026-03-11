// ══════════════════════════════════════════════════════════════
// buddha-fortune.data.ts
// 108 법연 (法緣) - 오늘의 불연 데이터
// ══════════════════════════════════════════════════════════════

export type FortuneGrade =
    | 'great'   // 대길 (大吉) ★★★★★
    | 'good'    // 길   (吉)   ★★★★
    | 'small'   // 소길 (小吉) ★★★
    | 'neutral' // 평   (平)   ★★
    | 'caution' // 소흉 (小凶) ★
    | 'warning' // 흉   (凶)   ☆

export interface IBuddhaFortune {
    id: number;           // 1 ~ 108
    grade: FortuneGrade;
    title: string;        // 예) 대길: 만사형통
    term: string;         // 사자성어 or 불교 용어
    termHanja: string;    // 한자
    dharma: string;       // 부처님 한마디
    advice: string;       // 개발자용 처방전 (범용도 가능)
    luckyItem: string;    // 행운의 아이템
    luckyColor: string;   // 행운의 색상
    luckyNumber: number;  // 행운의 숫자
}

export const BUDDHA_FORTUNES: IBuddhaFortune[] = [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 대길 (大吉) 10개 - 1~10
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 1, grade: 'great',
        title: '대길: 만사형통', term: '만사형통', termHanja: '萬事亨通',
        dharma: '강물이 바다를 만나듯, 모든 노력이 결실을 맺으리라.',
        advice: '오늘 작성하는 코드는 버그 없이 한 방에 컴파일됩니다!',
        luckyItem: '갓 볶은 커피', luckyColor: '금색', luckyNumber: 8,
    },
    {
        id: 2, grade: 'great',
        title: '대길: 화광동진', term: '화광동진', termHanja: '和光同塵',
        dharma: '빛을 감추고 세상과 함께하니, 진정한 지혜는 소박함 속에 있다.',
        advice: '숨겨둔 아이디어를 꺼낼 때입니다. 팀과 공유하세요!',
        luckyItem: '노트와 펜', luckyColor: '흰색', luckyNumber: 1,
    },
    {
        id: 3, grade: 'great',
        title: '대길: 연화화생', term: '연화화생', termHanja: '蓮花化生',
        dharma: '진흙 속에서 피어나는 연꽃처럼, 어려움이 깨달음의 씨앗이 된다.',
        advice: '지저분한 레거시 코드에서 아름다운 해법이 탄생합니다.',
        luckyItem: '연꽃차', luckyColor: '분홍색', luckyNumber: 3,
    },
    {
        id: 4, grade: 'great',
        title: '대길: 보리원만', term: '보리원만', termHanja: '菩提圓滿',
        dharma: '깨달음이 둥글게 가득 차니, 지혜의 빛이 사방을 비춘다.',
        advice: '오늘의 문제는 오늘 안에 해결됩니다. 자신을 믿으세요.',
        luckyItem: '보리수 목걸이', luckyColor: '초록색', luckyNumber: 7,
    },
    {
        id: 5, grade: 'great',
        title: '대길: 법륜상전', term: '법륜상전', termHanja: '法輪常轉',
        dharma: '법의 수레바퀴가 쉬지 않고 구르듯, 정진이 곧 길이다.',
        advice: '자동화 스크립트가 모든 반복 작업을 해결해줄 것입니다.',
        luckyItem: '바퀴 모양 배지', luckyColor: '파란색', luckyNumber: 5,
    },
    {
        id: 6, grade: 'great',
        title: '대길: 불광보조', term: '불광보조', termHanja: '佛光普照',
        dharma: '부처님 광명이 온 세상을 비추듯, 당신의 선함이 주변을 밝힌다.',
        advice: '오늘 작성하는 문서는 팀 전체의 등불이 됩니다.',
        luckyItem: '작은 촛불', luckyColor: '노란색', luckyNumber: 9,
    },
    {
        id: 7, grade: 'great',
        title: '대길: 자비충만', term: '자비충만', termHanja: '慈悲充滿',
        dharma: '자비심이 가득 차면 우주가 응답하고 모든 문이 열린다.',
        advice: '동료의 코드 리뷰를 친절히 해주세요. 좋은 일이 돌아옵니다.',
        luckyItem: '따뜻한 차 한 잔', luckyColor: '주황색', luckyNumber: 2,
    },
    {
        id: 8, grade: 'great',
        title: '대길: 반야지혜', term: '반야지혜', termHanja: '般若智慧',
        dharma: '지혜의 눈이 열리면 고통의 뿌리가 보이고 해탈이 가까워진다.',
        advice: '풀리지 않던 알고리즘의 해답이 오늘 찾아올 것입니다.',
        luckyItem: '반야심경 책갈피', luckyColor: '보라색', luckyNumber: 6,
    },
    {
        id: 9, grade: 'great',
        title: '대길: 원융무애', term: '원융무애', termHanja: '圓融無礙',
        dharma: '모든 것이 둥글게 통하여 막힘이 없으니 이것이 대자유다.',
        advice: '오늘의 배포는 무사히 완료됩니다. 자신 있게 진행하세요.',
        luckyItem: '동그란 쿠키', luckyColor: '하늘색', luckyNumber: 0,
    },
    {
        id: 10, grade: 'great',
        title: '대길: 무량공덕', term: '무량공덕', termHanja: '無量功德',
        dharma: '헤아릴 수 없는 공덕이 쌓이니, 선한 행동 하나가 만 배가 된다.',
        advice: '오픈소스에 기여해보세요. 뜻밖의 커리어 기회가 찾아옵니다.',
        luckyItem: '별 모양 스티커', luckyColor: '금색', luckyNumber: 8,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 길 (吉) 20개 - 11~30
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 11, grade: 'good',
        title: '길: 정진불태', term: '정진불태', termHanja: '精進不怠',
        dharma: '한 방울의 물이 모여 항아리를 채우듯, 작은 노력이 큰 결과를 만든다.',
        advice: '오늘 하루 집중력이 최고조에 달합니다.',
        luckyItem: '파란 펜', luckyColor: '파란색', luckyNumber: 4,
    },
    {
        id: 12, grade: 'good',
        title: '길: 인연화합', term: '인연화합', termHanja: '因緣和合',
        dharma: '좋은 인연이 화합하면 꽃이 피고 열매가 맺힌다.',
        advice: '뜻밖의 협력 제안이 들어올 수 있습니다. 열린 마음으로 받아들이세요.',
        luckyItem: '명함', luckyColor: '초록색', luckyNumber: 3,
    },
    {
        id: 13, grade: 'good',
        title: '길: 상구보리', term: '상구보리', termHanja: '上求菩提',
        dharma: '위로는 깨달음을 구하고 아래로는 중생을 제도하니 이것이 보살의 길.',
        advice: '배움의 기회를 놓치지 마세요. 오늘 배운 것이 내일의 무기입니다.',
        luckyItem: '기술서적', luckyColor: '흰색', luckyNumber: 1,
    },
    {
        id: 14, grade: 'good',
        title: '길: 일기일회', term: '일기일회', termHanja: '一期一會',
        dharma: '지금 이 만남은 평생 단 한 번뿐이니, 온 마음을 다해 임하라.',
        advice: '오늘의 미팅은 특별한 인연이 될 수 있습니다. 최선을 다하세요.',
        luckyItem: '명함 지갑', luckyColor: '갈색', luckyNumber: 5,
    },
    {
        id: 15, grade: 'good',
        title: '길: 지계청정', term: '지계청정', termHanja: '持戒淸淨',
        dharma: '계율을 지키면 마음이 맑아지고, 맑은 마음에서 지혜가 샘솟는다.',
        advice: '코딩 컨벤션을 지켜주세요. 오늘따라 팀장님이 코드를 봅니다.',
        luckyItem: '체크리스트', luckyColor: '흰색', luckyNumber: 7,
    },
    {
        id: 16, grade: 'good',
        title: '길: 화엄법계', term: '화엄법계', termHanja: '華嚴法界',
        dharma: '하나 속에 전체가, 전체 속에 하나가 있으니 이것이 화엄의 세계다.',
        advice: '작은 모듈 하나가 전체 시스템을 바꿀 수 있습니다.',
        luckyItem: '레고 블록', luckyColor: '무지개색', luckyNumber: 9,
    },
    {
        id: 17, grade: 'good',
        title: '길: 선정삼매', term: '선정삼매', termHanja: '禪定三昧',
        dharma: '깊은 선정에 들어가면 모든 번뇌가 사라지고 진실이 드러난다.',
        advice: '이어폰을 끼고 딥워크 모드로 들어가세요. 최고의 결과물이 나옵니다.',
        luckyItem: '노이즈캔슬링 이어폰', luckyColor: '검은색', luckyNumber: 6,
    },
    {
        id: 18, grade: 'good',
        title: '길: 사무량심', term: '사무량심', termHanja: '四無量心',
        dharma: '자비희사 네 가지 무한한 마음으로 세상을 대하면 적이 없어진다.',
        advice: '오늘은 팀원들에게 먼저 따뜻하게 인사해보세요.',
        luckyItem: '초콜릿', luckyColor: '분홍색', luckyNumber: 4,
    },
    {
        id: 19, grade: 'good',
        title: '길: 연기법성', term: '연기법성', termHanja: '緣起法性',
        dharma: '이것이 있으므로 저것이 있나니, 모든 것은 서로 연결되어 있다.',
        advice: '버그의 원인은 예상치 못한 곳에 있습니다. 연결고리를 추적하세요.',
        luckyItem: '거미줄 모양 메모장', luckyColor: '회색', luckyNumber: 2,
    },
    {
        id: 20, grade: 'good',
        title: '길: 삼법인지', term: '삼법인지', termHanja: '三法印智',
        dharma: '무상, 무아, 열반의 세 가지 진리를 알면 괴로움에서 벗어난다.',
        advice: '불필요한 변수와 집착을 버리세요. 코드가 가벼워집니다.',
        luckyItem: '지우개', luckyColor: '하늘색', luckyNumber: 3,
    },
    {
        id: 21, grade: 'good',
        title: '길: 육바라밀', term: '육바라밀', termHanja: '六波羅蜜',
        dharma: '보시, 지계, 인욕, 정진, 선정, 지혜의 여섯 가지 완성이 피안으로 이끈다.',
        advice: '오늘은 6가지 작은 목표를 세우고 하나씩 완성해보세요.',
        luckyItem: '체크박스 노트', luckyColor: '초록색', luckyNumber: 6,
    },
    {
        id: 22, grade: 'good',
        title: '길: 불퇴전심', term: '불퇴전심', termHanja: '不退轉心',
        dharma: '한번 결심한 마음은 물러서지 않으니, 이것이 보살의 서원이다.',
        advice: '포기하려던 프로젝트, 오늘 다시 시작할 좋은 날입니다.',
        luckyItem: '새 프로젝트 폴더', luckyColor: '빨간색', luckyNumber: 1,
    },
    {
        id: 23, grade: 'good',
        title: '길: 문사수행', term: '문사수행', termHanja: '聞思修行',
        dharma: '듣고 생각하고 수행하니, 세 단계를 거쳐야 진정한 깨달음이 된다.',
        advice: '문서를 먼저 읽고, 생각하고, 그다음 코딩하세요. 순서가 중요합니다.',
        luckyItem: 'README 파일', luckyColor: '파란색', luckyNumber: 3,
    },
    {
        id: 24, grade: 'good',
        title: '길: 유유상종', term: '유유상종', termHanja: '類類相從',
        dharma: '꽃향기가 바람을 타고 번지듯, 당신의 선의가 좋은 동료를 부른다.',
        advice: '뜻밖의 Stack Overflow 답변이 당신의 밤을 구원할 것입니다.',
        luckyItem: '노란 포스트잇', luckyColor: '노란색', luckyNumber: 5,
    },
    {
        id: 25, grade: 'good',
        title: '길: 공덕회향', term: '공덕회향', termHanja: '功德回向',
        dharma: '쌓은 공덕을 모든 중생에게 돌리니, 나눌수록 더 커지는 것이 선(善)이다.',
        advice: '지식 공유 블로그 하나를 써보세요. 돌아오는 것이 있습니다.',
        luckyItem: '블로그 에디터', luckyColor: '하늘색', luckyNumber: 7,
    },
    {
        id: 26, grade: 'good',
        title: '길: 오온개공', term: '오온개공', termHanja: '五蘊皆空',
        dharma: '색수상행식 다섯 가지 쌓임이 모두 공하니, 집착의 대상이 없다.',
        advice: '불필요한 기능을 과감히 제거하세요. 단순함이 최고의 설계입니다.',
        luckyItem: '삭제 키', luckyColor: '흰색', luckyNumber: 0,
    },
    {
        id: 27, grade: 'good',
        title: '길: 인욕바라밀', term: '인욕바라밀', termHanja: '忍辱波羅蜜',
        dharma: '욕됨을 참는 것이 완성의 길이니, 어려움이 클수록 공덕도 크다.',
        advice: '긴 빌드 시간도 수행이라 생각하세요. 마음의 여유가 생깁니다.',
        luckyItem: '모래시계', luckyColor: '갈색', luckyNumber: 9,
    },
    {
        id: 28, grade: 'good',
        title: '길: 심청정토', term: '심청정토', termHanja: '心淸淨土',
        dharma: '마음이 청정하면 그 자리가 곧 정토이니, 어디서든 극락이 이루어진다.',
        advice: '업무 환경을 깨끗이 정리하세요. 생산성이 눈에 띄게 올라갑니다.',
        luckyItem: '책상 정리함', luckyColor: '흰색', luckyNumber: 1,
    },
    {
        id: 29, grade: 'good',
        title: '길: 팔정도행', term: '팔정도행', termHanja: '八正道行',
        dharma: '바른 견해, 사유, 말, 행동, 생활, 노력, 염, 정으로 닦아나가라.',
        advice: '오늘은 코딩보다 설계를 먼저 하세요. 바른 구조가 모든 것을 결정합니다.',
        luckyItem: '아키텍처 다이어그램', luckyColor: '파란색', luckyNumber: 8,
    },
    {
        id: 30, grade: 'good',
        title: '길: 보살행원', term: '보살행원', termHanja: '菩薩行願',
        dharma: '중생을 위한 서원을 세우고 실천하는 것이 보살의 길이다.',
        advice: '사용자를 위한 기능 하나를 추가해보세요. 뿌듯함이 기다립니다.',
        luckyItem: '사용자 스토리 카드', luckyColor: '초록색', luckyNumber: 4,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 소길 (小吉) 18개 - 31~48
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 31, grade: 'small',
        title: '소길: 일취월장', term: '일취월장', termHanja: '日就月將',
        dharma: '날마다 나아가고 달마다 성장하니, 거북이도 결국 토끼를 이긴다.',
        advice: '오늘 배운 작은 팁이 한 달 후 큰 차이를 만들어냅니다.',
        luckyItem: '성장 기록 노트', luckyColor: '초록색', luckyNumber: 2,
    },
    {
        id: 32, grade: 'small',
        title: '소길: 안분지족', term: '안분지족', termHanja: '安分知足',
        dharma: '자신의 분수를 알고 만족하는 자가 진정으로 부유하다.',
        advice: '완벽한 코드보다 동작하는 코드가 먼저입니다. MVP를 완성하세요.',
        luckyItem: '간단한 도시락', luckyColor: '노란색', luckyNumber: 5,
    },
    {
        id: 33, grade: 'small',
        title: '소길: 공수래공수거', term: '공수래공수거', termHanja: '空手來空手去',
        dharma: '집착을 버리면 비로소 새로운 것이 들어올 공간이 생긴다.',
        advice: '오래된 레거시 코드를 과감히 삭제하세요. 새 술은 새 부대에!',
        luckyItem: '휴지통 비우기', luckyColor: '회색', luckyNumber: 0,
    },
    {
        id: 34, grade: 'small',
        title: '소길: 자등명법등명', term: '자등명법등명', termHanja: '自燈明法燈明',
        dharma: '자신을 등불로 삼고 법을 등불로 삼아 걸어가라.',
        advice: '남의 코드에 의존하지 말고 직접 구현해보는 날입니다.',
        luckyItem: '랜턴', luckyColor: '노란색', luckyNumber: 3,
    },
    {
        id: 35, grade: 'small',
        title: '소길: 처염상정', term: '처염상정', termHanja: '處染常淨',
        dharma: '더러운 곳에 있어도 항상 청정함을 유지하는 것이 연꽃의 덕이다.',
        advice: '복잡한 코드 속에서도 흔들리지 말고 원칙을 지키세요.',
        luckyItem: '연꽃 메모지', luckyColor: '분홍색', luckyNumber: 6,
    },
    {
        id: 36, grade: 'small',
        title: '소길: 수처작주', term: '수처작주', termHanja: '隨處作主',
        dharma: '어디서든 주인공이 되라. 상황이 나를 만들지 않고, 내가 상황을 만든다.',
        advice: '회의에서 먼저 발언해보세요. 주도권을 잡을 좋은 기회입니다.',
        luckyItem: '마이크', luckyColor: '빨간색', luckyNumber: 1,
    },
    {
        id: 37, grade: 'small',
        title: '소길: 직심도량', term: '직심도량', termHanja: '直心道場',
        dharma: '곧은 마음이 곧 수행하는 자리이니, 일상의 매 순간이 도량이다.',
        advice: '솔직한 피드백이 오늘의 선물입니다. 거리낌 없이 의견을 나누세요.',
        luckyItem: '투명 볼펜', luckyColor: '투명', luckyNumber: 7,
    },
    {
        id: 38, grade: 'small',
        title: '소길: 방편지혜', term: '방편지혜', termHanja: '方便智慧',
        dharma: '상황에 맞는 방편을 쓰는 것도 지혜이니, 고집보다 유연함이 낫다.',
        advice: '라이브러리를 바꿔보세요. 더 나은 방법이 있습니다.',
        luckyItem: '스위스 아미나이프', luckyColor: '빨간색', luckyNumber: 4,
    },
    {
        id: 39, grade: 'small',
        title: '소길: 정념정지', term: '정념정지', termHanja: '正念正知',
        dharma: '바른 알아차림으로 매 순간을 깨어서 살면 실수가 없다.',
        advice: '코드를 작성하기 전에 한 번 더 요구사항을 확인하세요.',
        luckyItem: '체크리스트', luckyColor: '하늘색', luckyNumber: 2,
    },
    {
        id: 40, grade: 'small',
        title: '소길: 무아무집', term: '무아무집', termHanja: '無我無執',
        dharma: '나라는 집착을 버리면 모든 것과 하나가 된다.',
        advice: '내 코드라는 생각을 버리세요. 팀의 코드입니다.',
        luckyItem: '공유 드라이브', luckyColor: '파란색', luckyNumber: 9,
    },
    {
        id: 41, grade: 'small',
        title: '소길: 선인선과', term: '선인선과', termHanja: '善因善果',
        dharma: '좋은 원인을 심으면 반드시 좋은 결과가 온다. 지금 씨앗을 뿌려라.',
        advice: '테스트 코드를 작성하세요. 미래의 당신이 감사해할 것입니다.',
        luckyItem: '씨앗 화분', luckyColor: '초록색', luckyNumber: 5,
    },
    {
        id: 42, grade: 'small',
        title: '소길: 공관중도', term: '공관중도', termHanja: '空觀中道',
        dharma: '공함을 관하되 치우치지 않는 중도, 그것이 진정한 지혜다.',
        advice: '극단적인 리팩토링보다 단계적인 개선이 안전합니다.',
        luckyItem: '저울', luckyColor: '회색', luckyNumber: 5,
    },
    {
        id: 43, grade: 'small',
        title: '소길: 청정무구', term: '청정무구', termHanja: '淸淨無垢',
        dharma: '티끌 하나 없이 맑고 깨끗한 본래 마음을 되찾으라.',
        advice: '오늘은 코드 정리의 날입니다. 주석과 불필요한 import를 제거하세요.',
        luckyItem: '빗자루 이모지', luckyColor: '흰색', luckyNumber: 0,
    },
    {
        id: 44, grade: 'small',
        title: '소길: 회광반조', term: '회광반조', termHanja: '廻光返照',
        dharma: '빛을 돌려 자신을 비추니, 답은 항상 내 안에 있었다.',
        advice: '외부 자료보다 직접 디버깅이 더 빠른 해결책입니다.',
        luckyItem: '거울', luckyColor: '은색', luckyNumber: 6,
    },
    {
        id: 45, grade: 'small',
        title: '소길: 이사무애', term: '이사무애', termHanja: '理事無礙',
        dharma: '이치와 일이 서로 막힘이 없으니, 이론과 실천이 하나가 된다.',
        advice: '설계와 구현을 번갈아가며 진행하세요. 균형이 최고의 생산성입니다.',
        luckyItem: '이론서 + 노트북', luckyColor: '파란색', luckyNumber: 8,
    },
    {
        id: 46, grade: 'small',
        title: '소길: 불이법문', term: '불이법문', termHanja: '不二法門',
        dharma: '둘이 아님의 문으로 들어가면 대립과 갈등이 사라진다.',
        advice: '프론트엔드와 백엔드, 오늘은 함께 해결해보세요.',
        luckyItem: 'USB 케이블', luckyColor: '회색', luckyNumber: 2,
    },
    {
        id: 47, grade: 'small',
        title: '소길: 약행정법', term: '약행정법', termHanja: '若行正法',
        dharma: '바른 법대로 행하면 어떤 어려움도 저절로 풀린다.',
        advice: '공식 문서대로 따라해보세요. 지름길보다 정도가 빠릅니다.',
        luckyItem: '공식 문서 북마크', luckyColor: '파란색', luckyNumber: 1,
    },
    {
        id: 48, grade: 'small',
        title: '소길: 심심미묘', term: '심심미묘', termHanja: '甚深微妙',
        dharma: '깊고 깊어 미묘하니, 쉽게 다가오지 않는 것에 더 큰 보배가 있다.',
        advice: '어렵게 느껴지는 기술일수록 익히면 강력한 무기가 됩니다.',
        luckyItem: '어려운 기술 서적', luckyColor: '보라색', luckyNumber: 7,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 평 (平) 20개 - 49~68
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 49, grade: 'neutral',
        title: '평: 화합평정', term: '화합평정', termHanja: '和合平靜',
        dharma: '나와 남이 다르지 않으니, 협력하는 곳에 다툼이 사라진다.',
        advice: '팀원과의 코드 리뷰에서 예상치 못한 깨달음을 얻게 됩니다.',
        luckyItem: '둥굴레차', luckyColor: '갈색', luckyNumber: 6,
    },
    {
        id: 50, grade: 'neutral',
        title: '평: 평상심도', term: '평상심도', termHanja: '平常心道',
        dharma: '평상심이 곧 도이니, 특별한 것을 찾지 말고 지금 이 자리에 있으라.',
        advice: '특별한 날이 아니어도 괜찮습니다. 꾸준함이 천재를 이깁니다.',
        luckyItem: '일반 노트', luckyColor: '흰색', luckyNumber: 5,
    },
    {
        id: 51, grade: 'neutral',
        title: '평: 중도행지', term: '중도행지', termHanja: '中道行持',
        dharma: '지나치지도 모자라지도 않는 중도, 그것이 부처님의 길이다.',
        advice: '과도한 최적화는 독입니다. 적당히 그리고 충분히.',
        luckyItem: '수평계', luckyColor: '회색', luckyNumber: 5,
    },
    {
        id: 52, grade: 'neutral',
        title: '평: 수연행지', term: '수연행지', termHanja: '隨緣行持',
        dharma: '인연 따라 흘러가되 휩쓸리지 않으니, 물처럼 낮고 유연하게.',
        advice: '오늘은 요청이 오는 대로 처리하세요. 흐름을 따르는 날입니다.',
        luckyItem: '물병', luckyColor: '하늘색', luckyNumber: 3,
    },
    {
        id: 53, grade: 'neutral',
        title: '평: 지족상락', term: '지족상락', termHanja: '知足常樂',
        dharma: '족함을 알면 항상 즐거우니, 욕심을 내려놓는 것이 행복의 시작이다.',
        advice: '지금의 기술 스택으로도 충분히 훌륭합니다. 새것보다 깊이를 추구하세요.',
        luckyItem: '현재 사용 중인 책', luckyColor: '갈색', luckyNumber: 4,
    },
    {
        id: 54, grade: 'neutral',
        title: '평: 묵묵수행', term: '묵묵수행', termHanja: '默默修行',
        dharma: '말없이 묵묵히 수행하는 자가 결국 멀리 간다.',
        advice: '오늘은 조용히 집중해서 밀린 작업을 처리하세요.',
        luckyItem: '헤드폰', luckyColor: '검은색', luckyNumber: 7,
    },
    {
        id: 55, grade: 'neutral',
        title: '평: 일일일선', term: '일일일선', termHanja: '一日一善',
        dharma: '하루에 선한 일 하나씩, 그것이 쌓여 위대한 삶이 된다.',
        advice: '오늘은 버그 하나만 잡아도 훌륭한 하루입니다.',
        luckyItem: '버그 트래커', luckyColor: '초록색', luckyNumber: 1,
    },
    {
        id: 56, grade: 'neutral',
        title: '평: 무위자연', term: '무위자연', termHanja: '無爲自然',
        dharma: '억지로 하지 않고 자연스럽게 흐르는 것이 가장 강한 힘이다.',
        advice: '억지로 코딩하지 마세요. 막히면 쉬고 다시 시작하면 됩니다.',
        luckyItem: '산책화', luckyColor: '초록색', luckyNumber: 0,
    },
    {
        id: 57, grade: 'neutral',
        title: '평: 담담여수', term: '담담여수', termHanja: '淡淡如水',
        dharma: '물처럼 담담하게, 파도에 흔들려도 본질은 변하지 않는다.',
        advice: '장애물이 생겨도 담담하게 대응하세요. 곧 지나갑니다.',
        luckyItem: '물 한 잔', luckyColor: '하늘색', luckyNumber: 2,
    },
    {
        id: 58, grade: 'neutral',
        title: '평: 시시각각', term: '시시각각', termHanja: '時時刻刻',
        dharma: '매 순간 깨어 알아차리면 후회할 일이 없다.',
        advice: '커밋을 자주 하세요. 작업 단위를 잘게 쪼개면 실수가 줄어듭니다.',
        luckyItem: '타이머', luckyColor: '주황색', luckyNumber: 8,
    },
    {
        id: 59, grade: 'neutral',
        title: '평: 여실지견', term: '여실지견', termHanja: '如實知見',
        dharma: '있는 그대로 알고 보는 것이 지혜의 시작이다.',
        advice: '로그를 왜곡하지 마세요. 현실을 직시해야 해결이 보입니다.',
        luckyItem: '모니터링 대시보드', luckyColor: '파란색', luckyNumber: 4,
    },
    {
        id: 60, grade: 'neutral',
        title: '평: 보통평범', term: '보통평범', termHanja: '普通平凡',
        dharma: '평범함 속에 위대함이 숨어있으니, 특별함을 억지로 만들지 마라.',
        advice: '평범하게 돌아가는 코드가 최고입니다. 과도한 설계를 피하세요.',
        luckyItem: '기본 에디터', luckyColor: '회색', luckyNumber: 5,
    },
    {
        id: 61, grade: 'neutral',
        title: '평: 인연소산', term: '인연소산', termHanja: '因緣消散',
        dharma: '인연이 다하면 자연히 흩어지니, 이별을 두려워하지 마라.',
        advice: '오래된 브랜치는 과감히 삭제하세요. 깔끔한 저장소가 생산성입니다.',
        luckyItem: '가지치기 가위', luckyColor: '빨간색', luckyNumber: 3,
    },
    {
        id: 62, grade: 'neutral',
        title: '평: 명경지수', term: '명경지수', termHanja: '明鏡止水',
        dharma: '맑은 거울은 사물을 있는 그대로 비추니, 마음을 닦아 진실을 보라.',
        advice: '로그 파일을 천천히 뜯어보세요. 범인은 가장 가까운 곳에 있습니다.',
        luckyItem: '안경 닦이', luckyColor: '은색', luckyNumber: 9,
    },
    {
        id: 63, grade: 'neutral',
        title: '평: 허심탄회', term: '허심탄회', termHanja: '虛心坦懷',
        dharma: '비어있는 마음으로 솔직하게, 그것이 진정한 소통이다.',
        advice: '팀원에게 모른다고 솔직히 말하세요. 그게 더 빠른 해결책입니다.',
        luckyItem: '화이트보드', luckyColor: '흰색', luckyNumber: 6,
    },
    {
        id: 64, grade: 'neutral',
        title: '평: 일체유심조', term: '일체유심조', termHanja: '一切唯心造',
        dharma: '모든 것은 마음이 만들어내니, 마음을 바꾸면 세상이 바뀐다.',
        advice: '생각의 틀을 바꿔보세요. 같은 문제도 다르게 보입니다.',
        luckyItem: '마인드맵 앱', luckyColor: '무지개색', luckyNumber: 7,
    },
    {
        id: 65, grade: 'neutral',
        title: '평: 차제진수', term: '차제진수', termHanja: '次第進修',
        dharma: '차례차례 단계를 밟아 나아가는 것이 가장 빠른 길이다.',
        advice: '건너뛰지 말고 순서대로 하세요. 기초가 흔들리면 모두 무너집니다.',
        luckyItem: '학습 로드맵', luckyColor: '초록색', luckyNumber: 1,
    },
    {
        id: 66, grade: 'neutral',
        title: '평: 수구여병', term: '수구여병', termHanja: '守口如甁',
        dharma: '입을 지키기를 병마개 막듯이 하라. 말이 줄면 실수도 줄어든다.',
        advice: '코드 리뷰에서 먼저 듣고 나중에 말하세요.',
        luckyItem: '귀마개', luckyColor: '살구색', luckyNumber: 2,
    },
    {
        id: 67, grade: 'neutral',
        title: '평: 거진출속', term: '거진출속', termHanja: '去塵出俗',
        dharma: '티끌을 털고 속됨을 벗어나니, 본래의 나로 돌아갈 수 있다.',
        advice: 'SNS를 잠시 끊고 집중해보세요. 놀라운 생산성이 기다립니다.',
        luckyItem: '디지털 디톡스 앱', luckyColor: '회색', luckyNumber: 0,
    },
    {
        id: 68, grade: 'neutral',
        title: '평: 안심처사', term: '안심처사', termHanja: '安心處事',
        dharma: '마음을 편안히 하고 일을 처리하면 어떤 일도 해낼 수 있다.',
        advice: '마감 압박보다 마음의 여유가 더 좋은 코드를 만듭니다.',
        luckyItem: '아로마 캔들', luckyColor: '라벤더', luckyNumber: 3,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 소흉 (小凶) 20개 - 69~88
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 69, grade: 'caution',
        title: '소흉: 번뇌망상', term: '번뇌망상', termHanja: '煩惱妄想',
        dharma: '번뇌는 망상에서 비롯되니, 생각을 내려놓으면 번뇌도 사라진다.',
        advice: '너무 많은 방법을 고민하다 아무것도 못할 수 있습니다. 일단 시작하세요.',
        luckyItem: '타이머 (25분 포모도로)', luckyColor: '빨간색', luckyNumber: 4,
    },
    {
        id: 70, grade: 'caution',
        title: '소흉: 우치무지', term: '우치무지', termHanja: '愚癡無知',
        dharma: '어리석음을 인정하는 것이 지혜의 시작이니, 모름을 부끄러워 말라.',
        advice: '모르는 것을 모른다고 말하는 날입니다. 물어보는 용기가 필요합니다.',
        luckyItem: '질문 노트', luckyColor: '노란색', luckyNumber: 7,
    },
    {
        id: 71, grade: 'caution',
        title: '소흉: 아집아상', term: '아집아상', termHanja: '我執我相',
        dharma: '나라는 집착에 사로잡히면 진실이 보이지 않는다.',
        advice: '내 방식만 고집하지 마세요. 오늘은 남의 의견에 귀 기울이세요.',
        luckyItem: '다른 사람의 키보드', luckyColor: '주황색', luckyNumber: 3,
    },
    {
        id: 72, grade: 'caution',
        title: '소흉: 산란심동', term: '산란심동', termHanja: '散亂心動',
        dharma: '마음이 흩어지고 동요하니, 오늘은 집중하기 어려운 날이다.',
        advice: '멀티태스킹을 피하세요. 한 가지만 집중해서 완성하세요.',
        luckyItem: '싱글태스킹 앱', luckyColor: '회색', luckyNumber: 1,
    },
    {
        id: 73, grade: 'caution',
        title: '소흉: 방일해태', term: '방일해태', termHanja: '放逸懈怠',
        dharma: '게으름과 방종은 수행의 가장 큰 적이니, 오늘 하루 정신을 차려라.',
        advice: '유튜브는 퇴근 후에 보세요. 지금은 집중할 시간입니다.',
        luckyItem: '사이트 차단 앱', luckyColor: '빨간색', luckyNumber: 9,
    },
    {
        id: 74, grade: 'caution',
        title: '소흉: 탐욕집착', term: '탐욕집착', termHanja: '貪慾執著',
        dharma: '탐욕이 집착을 만들고, 집착이 고통을 만든다.',
        advice: '기능을 너무 많이 추가하지 마세요. 스코프 크리프를 조심하세요.',
        luckyItem: '요구사항 문서', luckyColor: '주황색', luckyNumber: 5,
    },
    {
        id: 75, grade: 'caution',
        title: '소흉: 업장소멸', term: '업장소멸', termHanja: '業障消滅',
        dharma: '쌓인 업의 장애가 길을 막고 있으니, 참회와 정진으로 녹여내라.',
        advice: '기술 부채를 더 이상 미루지 마세요. 지금이 해결할 때입니다.',
        luckyItem: '리팩토링 시간', luckyColor: '보라색', luckyNumber: 0,
    },
    {
        id: 76, grade: 'caution',
        title: '소흉: 시비분별', term: '시비분별', termHanja: '是非分別',
        dharma: '옳고 그름을 지나치게 따지면 화합이 깨지니, 큰 그림을 보라.',
        advice: '사소한 코딩 스타일 논쟁보다 기능 완성이 먼저입니다.',
        luckyItem: 'Prettier 설정 파일', luckyColor: '회색', luckyNumber: 6,
    },
    {
        id: 77, grade: 'caution',
        title: '소흉: 의심망설', term: '의심망설', termHanja: '疑心妄說',
        dharma: '근거 없는 의심과 망령된 말이 관계를 해친다.',
        advice: '확인하지 않고 추측으로 말하지 마세요. 테스트 먼저입니다.',
        luckyItem: '단위 테스트', luckyColor: '노란색', luckyNumber: 2,
    },
    {
        id: 78, grade: 'caution',
        title: '소흉: 진에분노', term: '진에분노', termHanja: '瞋恚憤怒',
        dharma: '분노는 지혜의 불꽃을 끄는 물이니, 화를 내기 전에 세 번 숨을 들이쉬어라.',
        advice: '버그 때문에 화내지 마세요. 차분한 마음이 더 빠른 해결입니다.',
        luckyItem: '심호흡 앱', luckyColor: '파란색', luckyNumber: 8,
    },
    {
        id: 79, grade: 'caution',
        title: '소흉: 교만아만', term: '교만아만', termHanja: '驕慢我慢',
        dharma: '교만은 성장을 막는 벽이니, 항상 초심자의 마음으로 대하라.',
        advice: '내가 가장 잘 안다는 생각을 내려놓으세요. 새로운 것을 배울 기회입니다.',
        luckyItem: '입문서', luckyColor: '갈색', luckyNumber: 4,
    },
    {
        id: 80, grade: 'caution',
        title: '소흉: 요행심리', term: '요행심리', termHanja: '僥倖心理',
        dharma: '요행을 바라는 마음이 방심을 만들고, 방심이 실수를 만든다.',
        advice: '오늘은 백업을 꼭 확인하세요. 요행은 없습니다.',
        luckyItem: '백업 드라이브', luckyColor: '파란색', luckyNumber: 3,
    },
    {
        id: 81, grade: 'caution',
        title: '소흉: 무연대비', term: '무연대비', termHanja: '無緣大悲',
        dharma: '조건 없이 베푸는 마음이 우주의 에너지를 당신에게 끌어온다.',
        advice: '커뮤니티에 답변 하나를 달아보세요. 뜻밖의 제안이 올지도?',
        luckyItem: '초콜릿 한 조각', luckyColor: '갈색', luckyNumber: 4,
    },
    {
        id: 82, grade: 'caution',
        title: '소흉: 전도몽상', term: '전도몽상', termHanja: '顚倒夢想',
        dharma: '뒤집힌 생각과 꿈같은 망상이 진실을 가리고 있다.',
        advice: '요구사항을 다시 한번 확인하세요. 잘못된 방향으로 가고 있을 수 있습니다.',
        luckyItem: '방향 나침반', luckyColor: '빨간색', luckyNumber: 1,
    },
    {
        id: 83, grade: 'caution',
        title: '소흉: 업연소감', term: '업연소감', termHanja: '業緣消感',
        dharma: '과거의 업이 현재에 영향을 미치니, 지난 실수를 돌아보고 교훈을 얻어라.',
        advice: '이전 프로젝트의 실수를 돌아보세요. 같은 실수를 반복하지 않도록.',
        luckyItem: '회고 노트', luckyColor: '회색', luckyNumber: 9,
    },
    {
        id: 84, grade: 'caution',
        title: '소흉: 독각미연', term: '독각미연', termHanja: '獨覺未緣',
        dharma: '홀로 깨달으려 하지만 인연이 무르익지 않아 아직 때가 이르다.',
        advice: '혼자 해결하려 고집하지 마세요. 팀의 힘이 더 강합니다.',
        luckyItem: '슬랙 채널', luckyColor: '보라색', luckyNumber: 6,
    },
    {
        id: 85, grade: 'caution',
        title: '소흉: 허망심행', term: '허망심행', termHanja: '虛妄心行',
        dharma: '허망한 마음과 행동이 에너지를 낭비하니, 본질에 집중하라.',
        advice: '시간을 낭비하는 회의를 줄이세요. 핵심만 논의하면 됩니다.',
        luckyItem: '회의 아젠다', luckyColor: '주황색', luckyNumber: 7,
    },
    {
        id: 86, grade: 'caution',
        title: '소흉: 불급지처', term: '불급지처', termHanja: '不及之處',
        dharma: '미치지 못하는 곳이 있으니, 능력을 과대평가하지 말고 준비하라.',
        advice: '오늘은 과도하게 약속하지 마세요. 할 수 있는 것만 하세요.',
        luckyItem: '플래너', luckyColor: '파란색', luckyNumber: 5,
    },
    {
        id: 87, grade: 'caution',
        title: '소흉: 침잠우울', term: '침잠우울', termHanja: '沈潛憂鬱',
        dharma: '마음이 가라앉고 우울하니, 걷고 햇빛을 받으면 기운이 살아난다.',
        advice: '잠깐 밖에 나가 산책하세요. 컴퓨터 앞을 떠나는 것도 개발입니다.',
        luckyItem: '운동화', luckyColor: '초록색', luckyNumber: 2,
    },
    {
        id: 88, grade: 'caution',
        title: '소흉: 도중폐업', term: '도중폐업', termHanja: '途中廢業',
        dharma: '중도에 그만두려는 마음이 드니, 조금만 더 참으면 반드시 길이 열린다.',
        advice: '포기하고 싶은 순간이 바로 돌파구 직전입니다. 조금만 더!',
        luckyItem: '에너지 드링크', luckyColor: '노란색', luckyNumber: 8,
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 흉 (凶) 20개 - 89~108
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        id: 89, grade: 'warning',
        title: '흉: 고집아만', term: '고집아만', termHanja: '固執我慢',
        dharma: '굳은 고집과 아만이 앞길을 막으니, 지금 당장 내려놓아야 한다.',
        advice: '오늘은 모든 PR을 재검토하세요. 놓친 버그가 있을 수 있습니다.',
        luckyItem: '코드 리뷰 체크리스트', luckyColor: '빨간색', luckyNumber: 6,
    },
    {
        id: 90, grade: 'warning',
        title: '흉: 삼독맹독', term: '삼독맹독', termHanja: '三毒猛毒',
        dharma: '탐진치 세 가지 독이 맹렬히 타오르니, 지금 당장 수행으로 다스려라.',
        advice: '욕심, 화, 어리석음을 피하는 날입니다. 중요한 결정을 미루세요.',
        luckyItem: '명상 앱', luckyColor: '검은색', luckyNumber: 0,
    },
    {
        id: 91, grade: 'warning',
        title: '흉: 업장두중', term: '업장두중', termHanja: '業障頭重',
        dharma: '업의 장애가 머리를 무겁게 하니, 참회의 기도로 가볍게 하라.',
        advice: '기술 부채가 임계점에 달했습니다. 지금 바로 정리하지 않으면 나중에 큰 문제가 됩니다.',
        luckyItem: '리팩토링 타임블록', luckyColor: '검은색', luckyNumber: 9,
    },
    {
        id: 92, grade: 'warning',
        title: '흉: 오욕번성', term: '오욕번성', termHanja: '五慾煩盛',
        dharma: '색성향미촉 다섯 가지 욕망이 타오르니, 감각을 절제하라.',
        advice: '새로운 기술 도입은 잠시 보류하세요. 지금은 안정이 우선입니다.',
        luckyItem: '중단 버튼', luckyColor: '빨간색', luckyNumber: 5,
    },
    {
        id: 93, grade: 'warning',
        title: '흉: 사견무명', term: '사견무명', termHanja: '邪見無明',
        dharma: '잘못된 견해와 무명이 깊은 곳에 자리하니, 스승을 찾아 바른 길을 물어라.',
        advice: '오늘은 혼자 판단하지 마세요. 시니어에게 조언을 구하세요.',
        luckyItem: '멘토 연락처', luckyColor: '보라색', luckyNumber: 3,
    },
    {
        id: 94, grade: 'warning',
        title: '흉: 악연상봉', term: '악연상봉', termHanja: '惡緣相逢',
        dharma: '악한 인연이 가까이 있으니, 경계하고 신중하게 처신하라.',
        advice: '출처 불명의 코드를 함부로 복사하지 마세요. 보안 취약점이 숨어있을 수 있습니다.',
        luckyItem: '보안 스캐너', luckyColor: '주황색', luckyNumber: 7,
    },
    {
        id: 95, grade: 'warning',
        title: '흉: 재물손실', term: '재물손실', termHanja: '財物損失',
        dharma: '재물이 흩어지는 기운이 있으니, 불필요한 지출을 삼가라.',
        advice: '클라우드 비용을 점검하세요. 예상치 못한 비용이 발생하고 있을 수 있습니다.',
        luckyItem: '비용 모니터링 알림', luckyColor: '노란색', luckyNumber: 1,
    },
    {
        id: 96, grade: 'warning',
        title: '흉: 구설수구', term: '구설수구', termHanja: '口舌數口',
        dharma: '말로 인한 시비가 생기는 기운이니, 오늘은 입을 조심하라.',
        advice: '슬랙에서 감정적인 메시지를 보내지 마세요. 내일 다시 읽어보면 다릅니다.',
        luckyItem: '임시저장 버튼', luckyColor: '주황색', luckyNumber: 4,
    },
    {
        id: 97, grade: 'warning',
        title: '흉: 관재구설', term: '관재구설', termHanja: '官災口舌',
        dharma: '관재와 구설이 따를 수 있으니, 법과 규칙을 철저히 따르라.',
        advice: '라이선스를 확인하세요. 무단 사용하는 라이브러리가 없는지 점검해야 합니다.',
        luckyItem: 'SBOM 문서', luckyColor: '빨간색', luckyNumber: 2,
    },
    {
        id: 98, grade: 'warning',
        title: '흉: 신심피로', term: '신심피로', termHanja: '身心疲勞',
        dharma: '몸과 마음이 지쳐있으니, 쉬지 않고 나아가면 더 큰 손해를 본다.',
        advice: '오늘은 일찍 퇴근하세요. 번아웃은 회복에 몇 배의 시간이 걸립니다.',
        luckyItem: '침대', luckyColor: '흰색', luckyNumber: 8,
    },
    {
        id: 99, grade: 'warning',
        title: '흉: 제행무상', term: '제행무상', termHanja: '諸行無常',
        dharma: '모든 것은 변하나니, 변화를 두려워 말고 파도를 타라.',
        advice: '새로운 프레임워크 소식에 당황하지 마세요. 당신은 이미 고수입니다!',
        luckyItem: '최신 기술 뉴스', luckyColor: '하늘색', luckyNumber: 9,
    },
    {
        id: 100, grade: 'warning',
        title: '흉: 수화기제', term: '수화기제', termHanja: '水火旣濟',
        dharma: '물과 불이 이미 건넜으니, 균형이 깨지기 전에 조심해야 한다.',
        advice: '서버 상태를 모니터링하세요. 예상치 못한 장애가 올 수 있습니다.',
        luckyItem: '모니터링 알림', luckyColor: '빨간색', luckyNumber: 6,
    },
    {
        id: 101, grade: 'warning',
        title: '흉: 고통윤회', term: '고통윤회', termHanja: '苦痛輪廻',
        dharma: '고통의 수레바퀴가 멈추지 않으니, 집착을 끊는 것만이 해방이다.',
        advice: '무한루프를 조심하세요. 탈출 조건을 반드시 확인하세요.',
        luckyItem: '탈출 조건 체크', luckyColor: '검은색', luckyNumber: 4,
    },
    {
        id: 102, grade: 'warning',
        title: '흉: 공허허망', term: '공허허망', termHanja: '空虛虛妄',
        dharma: '텅 빈 것과 허망함이 가득하니, 실질을 추구하고 허상을 버려야 한다.',
        advice: '화려한 UI보다 핵심 기능을 먼저 완성하세요.',
        luckyItem: '와이어프레임', luckyColor: '회색', luckyNumber: 0,
    },
    {
        id: 103, grade: 'warning',
        title: '흉: 미혹전도', term: '미혹전도', termHanja: '迷惑顚倒',
        dharma: '미혹함이 깊어 판단이 뒤집혀있으니, 스스로의 판단을 의심하라.',
        advice: '오늘 내린 설계 결정을 내일 다시 검토하세요. 지금은 믿지 마세요.',
        luckyItem: '수면', luckyColor: '남색', luckyNumber: 2,
    },
    {
        id: 104, grade: 'warning',
        title: '흉: 폭풍과환', term: '폭풍과환', termHanja: '暴風過患',
        dharma: '폭풍 같은 재난이 지나가는 중이니, 폭풍이 지날 때까지 기다리는 지혜가 필요하다.',
        advice: '운영 중인 서버를 오늘 만지지 마세요. 폭풍이 지나기를 기다리세요.',
        luckyItem: '변경 동결 공지', luckyColor: '주황색', luckyNumber: 5,
    },
    {
        id: 105, grade: 'warning',
        title: '흉: 불화이간', term: '불화이간', termHanja: '不和離間',
        dharma: '불화와 이간이 생기는 기운이니, 오해가 쌓이기 전에 직접 소통하라.',
        advice: '이메일보다 직접 대화가 낫습니다. 오해를 사기 전에 먼저 나서세요.',
        luckyItem: '전화기', luckyColor: '하늘색', luckyNumber: 3,
    },
    {
        id: 106, grade: 'warning',
        title: '흉: 도적침탈', term: '도적침탈', termHanja: '盜賊侵奪',
        dharma: '도둑이 침입하는 기운이 있으니, 소중한 것을 철저히 지켜라.',
        advice: '2단계 인증을 활성화하세요. 계정 보안을 즉시 점검하세요.',
        luckyItem: '보안 키', luckyColor: '검은색', luckyNumber: 7,
    },
    {
        id: 107, grade: 'warning',
        title: '흉: 사고질병', term: '사고질병', termHanja: '事故疾病',
        dharma: '뜻밖의 사고나 질병이 올 수 있으니, 몸과 주변을 각별히 돌보아라.',
        advice: '건강을 챙기세요. 오늘은 야근 금지. 몸이 자산입니다.',
        luckyItem: '비타민', luckyColor: '주황색', luckyNumber: 8,
    },
    {
        id: 108, grade: 'warning',
        title: '해탈: 번뇌보리', term: '번뇌보리', termHanja: '煩惱菩提',
        dharma: '108번의 번뇌가 결국 108번의 깨달음이 되어 당신을 빛나게 한다.',
        advice: '드디어 그 지독한 버그를 잡았습니다. 이 모든 과정이 당신을 고수로 만들었습니다!',
        luckyItem: '시원한 맥주 (혹은 보리차)', luckyColor: '금색', luckyNumber: 8,
    },
];

// ── 유틸리티 함수 ──────────────────────────────────────────────

/** 날짜 기반 시드로 오늘의 운세 번호 결정 (매일 다른 번호, 같은 날 같은 번호) */
export function getTodayFortuneId(): number {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return (seed % 108) + 1; // 1 ~ 108
}

/** id 로 운세 조회 */
export function getFortuneById(id: number): IBuddhaFortune {
    return BUDDHA_FORTUNES.find(f => f.id === id) ?? BUDDHA_FORTUNES[0];
}

/** 등급별 한글 라벨 */
export const GRADE_LABEL: Record<FortuneGrade, string> = {
    great: '대길 (大吉) ★★★★★',
    good: '길   (吉)   ★★★★',
    small: '소길 (小吉) ★★★',
    neutral: '평   (平)   ★★',
    caution: '소흉 (小凶) ★',
    warning: '흉   (凶)   ☆',
};

/** 등급별 테마 색상 */
export const GRADE_COLOR: Record<FortuneGrade, { bg: string; text: string; border: string }> = {
    great: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300' },
    good: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' },
    small: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300' },
    neutral: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-300' },
    caution: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300' },
    warning: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300' },
};
