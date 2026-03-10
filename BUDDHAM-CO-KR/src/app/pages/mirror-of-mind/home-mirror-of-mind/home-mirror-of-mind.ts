import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Paths } from '@app/data/menu-data';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { MarkdownViewer } from "@app/shared/markdown-viewer/markdown-viewer";
import { KatexOptions } from 'katex';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'home-mirror-of-mind',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    MarkdownViewer,
  ],
  templateUrl: './home-mirror-of-mind.html',
  styleUrl: './home-mirror-of-mind.scss',
})
export class HomeMirrorOfMind {
  title = Paths.HomeMirrorOfMind.title;

  readonly activeTab = signal<number>(0);
  readonly tabs = [
    { label: '기본 문법', icon: 'article', content: TEST_BASIC },
    { label: '코드 블록', icon: 'code', content: TEST_CODE },
    { label: 'KaTeX 수식', icon: 'functions', content: TEST_KATEX },
    { label: 'Mermaid', icon: 'schema', content: TEST_MERMAID },
    { label: 'XSS 방어', icon: 'security', content: TEST_XSS },
  ];

  readonly currentContent = () => this.tabs[this.activeTab()].content;

  selectTab(index: number): void {
    this.activeTab.set(index);
  }

}
// ══════════════════════════════════════════════════════
// 테스트 콘텐츠 모음
// ══════════════════════════════════════════════════════

const TEST_BASIC = `
# 기본 마크다운 테스트 🙏

## 텍스트 서식

일반 단락 텍스트입니다. **굵게**, *기울임*, ~~취소선~~, \`인라인 코드\` 테스트.

## 인용구

> 색불이공 공불이색
> 색즉시공 공즉시색
>
> — 반야심경

## 리스트

**순서 없는 목록:**
- 나무관세음보살
- 나무아미타불
- 나무석가모니불

**순서 있는 목록:**
1. 계율 (戒)
2. 선정 (定)
3. 지혜 (慧)

## 테이블

| 경전 | 핵심 가르침 | 분량 |
|------|------------|------|
| 반야심경 | 공(空) | 260자 |
| 금강경 | 무아(無我) | 중편 |
| 화엄경 | 연기(緣起) | 대작 |
| 법화경 | 일불승(一佛乘) | 대작 |

## 구분선

---

## 링크 및 첨부파일 아이콘

- [일반 링크](https://buddham.co.kr)
- [PDF 법문](https://example.com/dharma.pdf)
- [Excel 자료](https://example.com/data.xlsx)
- [Word 문서](https://example.com/doc.docx)
- [음원 파일](https://example.com/chant.mp3)
`;

const TEST_CODE = `
## 코드 블록 테스트

### TypeScript

\`\`\`typescript
// Angular Signal 기반 댓글 정렬
readonly sortedReplies = computed(() => {
  const flat = this.localReplies();
  if (!flat.length) return [];

  const result: IQna[] = [];

  const appendChildren = (parentId: number) => {
    const children = flat.filter(x => x.parentId === parentId);
    for (const child of children) {
      result.push(child);
      appendChildren(child.id); // 재귀
    }
  };

  const roots = flat.filter(x => !x.parentId);
  for (const root of roots) {
    result.push(root);
    appendChildren(root.id);
  }
  return result;
});
\`\`\`

### C# ASP.NET Core

\`\`\`csharp
// 댓글 조회 - rootId 기준 flat 구조
var replies = await pgContext.Qnas.AsNoTracking()
    .Where(x => x.RootId == rootId)
    .OrderBy(x => x.CreatedAt)
    .ToDTO(userId)
    .ToListAsync();

return Ok(replies);
\`\`\`

### SQL (PostgreSQL FTS)

\`\`\`sql
-- Full Text Search 인덱스
CREATE INDEX ix_qna_fts
ON qna USING GIN (search_vector);

-- 답글 조회
SELECT id, root_id, parent_id, content
FROM qna
WHERE root_id = $1
ORDER BY created_at ASC;
\`\`\`
`;

const TEST_KATEX = `
## KaTeX 수식 테스트

### 인라인 수식

원의 넓이: $A = \\pi r^2$

에너지 방정식: $E = mc^2$

오일러 공식: $e^{i\\pi} + 1 = 0$

### 블록 수식

가우스 적분:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

테일러 급수:

$$
f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n
$$

행렬 곱셈:

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\begin{pmatrix}
x \\\\ y
\\end{pmatrix}
=
\\begin{pmatrix}
ax + by \\\\ cx + dy
\\end{pmatrix}
$$
`;

const TEST_MERMAID = `
## Mermaid 다이어그램 테스트

### 플로우차트

\`\`\`mermaid
graph TD
    A[법문 작성 스님] --> B[마크다운 입력]
    B --> C{검토 완료?}
    C -->|예| D[게시]
    C -->|아니오| B
    D --> E[신자 독서]
    E --> F[댓글 나눔]
    F --> G[SignalR 실시간 알림]
\`\`\`

### 시퀀스 다이어그램

\`\`\`mermaid
sequenceDiagram
    participant 신자
    participant Angular
    participant API
    participant DB

    신자->>Angular: 댓글 등록
    Angular->>API: POST /QnaCreate
    API->>DB: INSERT qna
    DB-->>API: 저장 완료
    API-->>Angular: 200 OK
    Angular-->>신자: UI 즉시 반영
\`\`\`
`;

// 🔥 XSS 공격 패턴 - DOMPurify 가 모두 제거해야 함
const TEST_XSS = `
## DOMPurify XSS 방어 테스트

아래 패턴들이 **실행되지 않으면** DOMPurify 정상 작동입니다 ✅

### 1. script 태그 삽입
<script>alert('XSS 1: script 태그')</script>

### 2. 이벤트 핸들러 삽입
<img src="x" onerror="alert('XSS 2: onerror')">

### 3. javascript: 프로토콜
<a href="javascript:alert('XSS 3: href')">클릭하면 안됨</a>

### 4. iframe 삽입
<iframe src="https://evil.com" width="0" height="0"></iframe>

### 5. 정상 허용 HTML
<strong>굵은 텍스트</strong>와 <em>기울임</em>은 허용됩니다.
<code>인라인 코드</code>도 허용됩니다.

> 위 1~4번 항목들이 실행되지 않고 텍스트로만 표시되거나
> 아예 사라지면 DOMPurify 가 정상 작동하는 것입니다.
`;



/*
==== Mongo DB ====
  mongoService = inject(MongoService);

<div class="grid grid-cols-1 gap-4 p-8 text-2xl text-slate-500">
  <body-title [title]="title"></body-title>
  <!-- 로딩 중 -->
  @if (mongoService.testList.isLoading()) {
  <p>로딩 중...</p>
  }

  <!-- 에러 -->
  @if (mongoService.testList.error()) {
  <p>에러 발생: {{ mongoService.testList.error() | json }}</p>
  }

  <!-- 데이터 -->
  @for (item of mongoService.testList.value(); track item.id) {
  <p>{{ item.name }} / {{ item.age }} / {{ item.role }}</p>
  }
</div>



*/
