export interface IBuddhistDocument {

    id: number;
    title: string;

    /**
     * 부제목
     * 예: "부처님오신날 봉축법문", "2026 정초"
     */
    subTitle: string;
    // 저자정보

    /**
     * 저자 ID
     * 스님, 법사, 학자
     */
    authorId: string;

    /**
     * 저자명 (법명, 법호)
     */
    authorName: string;

    /**
     * 저자 소속/직책(선택)
     */
    authorTitle?: string;

    // ========== 📍 법문 메타 정보 ==========

    /**
     * 법문장소
     * 예: "조계사 대웅저", "불광사", "온라인"
     */
    venue?: string;

    /**
     * 법문일시
     */
    dharmaDate?: Date;

    /**
     * 범회/행사 이름 (선택)
     * 예: "백중천도재", "초하루법회", "특별법문"
     */
    eventName?: string;

    // ========== 📖 경전 연결 (핵심!) ==========
    /**
     * 참조경전 ID (선택)
     * 이 법문이 어떤 경전을 기반으로 하는지
     * NULL = 경전 기반이 아님 (일반 법문)
     */
    scriptureMasterId?: number;

    /**
     * 참조경전본문 ID (선택)
     * 특정 구절/단락을 다룰 때
     * NULL = 경전 전체 또는 여러 구절
     */
    scriptureParagraphId?: number;

    /**
     * 참조구절 텍스트 (선택)
     * 예: "금강경 제3분", "법구경 쌍품 1-20송"
     */
    scriptureReference?: string;

    // ========== 📝 본문 내용 ==========

    /**
     * 본문 (HTML 또는 Markdown)
     */
    content: string;

    /**
     * 요약문 (선택)
     * 목록 표시용 짧은 요약
     */
    summary: string;

    /**
     * 주제 태그 (JSON 배열 또는 CSV)
     * 예: "사성제, 팔정도, 자비", 또는 ["사성제", "팔정도"]
     */
    tags?: string;

    /**
     * 대상수준
     * 예: "입문", "초급", "중급", "고급"
     */
    targetLevel?: string;

    /**
     * 전통구분 (선택)
     * 예: "선종", "정토정", "티베트", "상좌부"
     */
    tradition?: string;

    // ========== 🎬 미디어 ==========

    audioUrl?: string;

    videoUrl?: string;

    thumnailUrl?: string;

    durationMinutes?: number;

    // ========== 🔒 공개 설정 ==========
}
