export type FortuneMode =
    | 'daily'      // 오늘의 법연 (날짜 시드 - 현재)
    | 'random'     // 완전 랜덤 (뽑을 때마다 달라짐)
    | 'scripture'  // 경전 구절 (카테고리별)
    | 'koan';      // 화두 (선문답)
