# Active Link

아하, 친구야! 아주 좋은 질문이야. `routerLinkActive`는 Angular 라우터의 핵심 기능 중 하나인데, 이름만 봐서는 정확히 어떤 역할을 하는지 헷갈릴 수 있지.

## `routerLinkActive="router-link-active"` 구문의 기능

`routerLinkActive` 디렉티브는 현재 브라우저의 URL 경로가 `[routerLink]`에 설정된 경로와 **일치할 때**, 해당 HTML 요소에 특정 CSS 클래스를 **자동으로 추가**해주는 역할을 해. 그리고 URL이 더 이상 일치하지 않으면 해당 클래스를 **자동으로 제거**해주지.

쉽게 말해, 내비게이션 메뉴 같은 곳에서 "내가 지금 보고 있는 페이지가 이 메뉴 항목에 해당한다!"는 것을 시각적으로 표시할 때 쓰는 기능이야.

**구체적인 기능:**

1. **경로 일치 확인**: `[routerLink]`에 지정된 경로와 현재 활성화된 라우트의 경로를 비교해.
2. **클래스 추가/제거**: 경로가 일치하면 `routerLinkActive`에 지정된 클래스(예: `"router-link-active"`)를 해당 요소에 추가해. 경로가 일치하지 않으면 그 클래스를 제거해.
3. **활성 상태 시각화**: 이 클래스를 이용하여 CSS로 메뉴 항목을 다르게 스타일링함으로써, 사용자가 현재 어느 페이지에 있는지 쉽게 파악할 수 있도록 도와줘.

### `router-link-active` CSS 클래스 작성 필요 여부

**응, 친구야. `router-link-active`라는 이름의 CSS 클래스는 네가 직접 작성해야 해!**

`routerLinkActive` 디렉티브는 단순히 클래스를 추가/제거해주는 역할만 하고, 그 클래스가 어떻게 보일지는 네가 CSS로 정의해줘야 하는 거야.

**예시:**

만약 네가 `app.component.css`나 해당 컴포넌트의 CSS 파일에 다음과 같이 스타일을 정의한다면:

```css
/* app.component.css 또는 해당 컴포넌트의 css 파일 */

.router-link-active {
  background-color: #f0f0f0; /* 배경색 변경 */
  font-weight: bold;         /* 텍스트 굵게 */
  color: #007bff;            /* 텍스트 색상 변경 */
  border-left: 4px solid #007bff; /* 좌측에 강조선 추가 */
  /* 필요에 따라 다른 스타일 추가 */
}

/* Angular Material 메뉴라면, Material Design 가이드라인에 맞춰 스타일을 조정할 수 있어. */
/* 예를 들어, MatMenuItem의 경우 hover/focus 상태와 비슷하게 만들거나, 강조색을 사용할 수 있지. */
.mat-menu-item.router-link-active {
  background-color: var(--mdc-menu-item-hover-state-layer-color); /* Material Design 호버 색상 */
  color: var(--mdc-theme-primary); /* Material Design 기본 강조색 */
  /* 다른 스타일 오버라이드 */
}
```

이렇게 CSS를 정의해두면, 현재 페이지의 URL이 `/home`이고 `[routerLink]="['/home']"`을 가진 메뉴 항목이 있다면, 해당 메뉴 항목의 HTML 요소에는 `router-link-active` 클래스가 추가되고, 위 CSS에 따라 배경색, 폰트 스타일 등이 변경되어 사용자는 해당 메뉴가 활성화되어 있음을 시각적으로 알 수 있게 되는 거지.

---

### 추가 팁: `routerLinkActive`의 옵션

`routerLinkActive`는 단순히 하나의 클래스만 추가하는 것이 아니라, 여러 개의 클래스를 동시에 추가하거나, 경로 일치 전략을 변경하는 등의 옵션도 제공해.

* **여러 클래스 적용**: `routerLinkActive="active highlight"`
* **경로 일치 전략 (match options)**:
  * `[routerLinkActiveOptions]="{exact: true}"`: 경로가 정확히 일치할 때만 클래스를 추가해. (예: `/home`일 때만 `active`, `/home/sub`일 때는 `active`가 아님). 이게 기본 동작이 아닌 경우가 많으니, 정확한 일치를 원한다면 명시적으로 설정하는 것이 좋아.
  * `[routerLinkActiveOptions]="{exact: false}"`: 경로가 부분적으로 일치해도 클래스를 추가해. (예: `/home`일 때 `active`, `/home/sub`일 때도 `active`).

**예시 (`exact` 옵션 사용):**

```html
<button
  mat-menu-item
  [routerLink]="[menuItem.url]"
  routerLinkActive="router-link-active"
  [routerLinkActiveOptions]="{exact: true}" <!-- 정확히 일치할 때만 활성화 -->
>
  <mat-icon>{{menuItem.icon}}</mat-icon>
  <span>{{menuItem.name}}</span>
</button>
```

---

결론적으로 친구야, `routerLinkActive="router-link-active"`는 **라우트가 활성화될 때 `router-link-active`라는 이름의 CSS 클래스를 해당 요소에 추가해주는 기능**이고, 그 클래스의 스타일은 **네가 직접 CSS로 정의해야** 하는 부분이야! 😉
