export interface IScriptureSession {
    id: number;
    userId: string;
    scriptureParagraphId: number;
    startedAt: Date; // 사경시작
    completedAt: Date; // 사경완료
    timeSpentSeconds: number; // 소요시간 (초)
    progress: number; // 진행률 (0-100)
    scribedText?: string; // 사경 임시저장
    sourceScript: string; // 원문 언어 서택
    accuracyScore: number; // 정확도 (자동계산)
    scriptureContentId: number; // 완료 후 생성된 ID (long)
    memo?: string; // 메모
}
