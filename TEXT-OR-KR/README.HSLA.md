# HSLA

---

### CSS `hsla()`: 색상, 채도, 명도, 알파 값을 통한 색상 정의

`hsla()`는 웹에서 색상을 정의하는 방법 중 하나로, `rgb()`, `rgba()`, `hex` 코드와는 다른 방식의 색상 모델을 사용해. 바로 **HSL (Hue, Saturation, Lightness)** 모델에 **Alpha** 값을 추가한 것이지.

**`hsla(hue, saturation, lightness, alpha)`**

각각의 매개변수가 의미하는 바를 자세히 살펴보자.

#### 1. `hue` (색상)

- **의미:** 색상의 종류를 나타내. 우리가 흔히 아는 빨강, 주황, 노랑, 초록, 파랑, 남색, 보라 등의 색상환(Color Wheel)에서의 위치를 말해.
- **값:** 0도에서 360도까지의 각도 값으로 표현돼.
  - `0` 또는 `360`: 빨강 (Red)
  - `60`: 노랑 (Yellow)
  - `120`: 초록 (Green)
  - `180`: 청록 (Cyan)
  - `240`: 파랑 (Blue)
  - `300`: 마젠타 (Magenta)
- **단위:** 일반적으로 `deg` (degrees) 단위를 사용하지만, 단위 없이 숫자만 입력해도 `deg`로 인식돼. `turn`, `grad`, `rad` 등 다른 각도 단위도 사용 가능해.
- **특징:** `hue` 값만으로도 특정 계열의 색상을 직관적으로 선택할 수 있어. 예를 들어, 초록 계열의 색을 원한다면 120 주변의 값을 선택하면 되지.

  **예시:**

  ```css
  color: hsla(0, 100%, 50%, 1); /* 완전한 빨강 */
  color: hsla(120, 100%, 50%, 1); /* 완전한 초록 */
  color: hsla(240, 100%, 50%, 1); /* 완전한 파랑 */
  ```

#### 2. `saturation` (채도)

- **의미:** 색상의 '순도' 또는 '생생함'을 나타내. 색상이 얼마나 풍부하고 강렬한지를 말해. 채도가 높으면 생생하고 선명한 색상이 되고, 채도가 낮으면 회색에 가까워져.
- **값:** 0%에서 100%까지의 백분율 값으로 표현돼.
  - `0%`: 완전한 회색 (Hue와 Lightness 값에 따라 어둡거나 밝은 회색이 됨)
  - `100%`: 가장 선명하고 순수한 색상
- **특징:** `saturation` 값을 조절하여 동일한 `hue`에서도 다양한 분위기의 색상을 만들 수 있어. 예를 들어, 부드럽거나 바랜 듯한 색상을 만들고 싶을 때 채도를 낮추면 돼.

  **예시:**

  ```css
  color: hsla(240, 100%, 50%, 1); /* 선명한 파랑 */
  color: hsla(240, 50%, 50%, 1); /* 덜 선명한 파랑 (회색기가 섞임) */
  color: hsla(240, 0%, 50%, 1); /* 회색 (hue와 상관없이) */
  ```

#### 3. `lightness` (명도)

- **의미:** 색상의 '밝기'를 나타내. 색상이 얼마나 어둡거나 밝은지를 말해.
- **값:** 0%에서 100%까지의 백분율 값으로 표현돼.
  - `0%`: 항상 완전한 검정 (black)
  - `50%`: 원래의 색상 (hue와 saturation 값에 따라)
  - `100%`: 항상 완전한 흰색 (white)
- **특징:** `lightness` 값을 조절하여 색상을 밝게 만들거나 어둡게 만들 수 있어. 50%를 기준으로 낮추면 어두워지고, 높이면 밝아져.

  **예시:**

  ```css
  color: hsla(240, 100%, 50%, 1); /* 일반적인 밝기의 파랑 */
  color: hsla(240, 100%, 20%, 1); /* 어두운 파랑 */
  color: hsla(240, 100%, 80%, 1); /* 밝은 파랑 */
  color: hsla(240, 100%, 0%, 1); /* 검정 */
  color: hsla(240, 100%, 100%, 1); /* 흰색 */
  ```

#### 4. `alpha` (투명도)

- **의미:** 색상의 투명도를 나타내. `rgba()`의 `a`와 동일한 역할을 해.
- **값:** 0 (완전 투명)에서 1 (완전 불투명)까지의 소수점 값으로 표현돼. 백분율(`%`)로도 표현할 수 있어 (예: `0.5` 대신 `50%`).
- **특징:** 배경 색상이나 다른 요소와 겹쳐질 때 유용하게 사용할 수 있어.

  **예시:**

  ```css
  color: hsla(240, 100%, 50%, 1); /* 완전 불투명한 파랑 */
  color: hsla(240, 100%, 50%, 0.5); /* 50% 투명한 파랑 */
  color: hsla(240, 100%, 50%, 0); /* 완전 투명 */
  ```

---

### `hsla()`의 장점

`hsla()`는 다른 색상 모델에 비해 다음과 같은 강력한 장점들을 가지고 있어.

1.  **직관성 (Human-Readable):** 색상을 인간이 사고하는 방식과 비슷하게 표현해. "빨간색을 좀 더 어둡게 하고 싶어", "파란색을 좀 더 바랜 듯하게 만들고 싶어" 같은 생각을 `hue`, `lightness`, `saturation` 값을 조절하는 것으로 쉽게 구현할 수 있어. `rgb`나 `hex` 코드로는 이런 조작이 쉽지 않지.
2.  **색상 조절 용이성:** 특정 색상의 명암을 조절하거나, 채도를 조절하여 톤을 바꾸는 것이 매우 간단해. 예를 들어, 메인 색상의 어두운 버전이나 밝은 버전을 만들 때 `lightness` 값만 조절하면 돼.
3.  **일관된 테마 관리:** 디자인 시스템이나 UI 프레임워크에서 특정 색상 팔레트를 만들고 유지보수할 때 `hsla()`는 탁월해. 메인 색상(hue)을 정하고, 그 색상의 다양한 변형(saturation, lightness 변화)을 쉽게 생성할 수 있어.
4.  **반응형 디자인:** 미디어 쿼리에 따라 특정 색상의 투명도를 조절하거나, 명도를 변경하여 다른 분위기를 연출할 때도 유용해.

---

### `hsla()` 사용 예시 및 활용 팁

Angular 애플리케이션에서 `scss`를 사용하고 있으니, `hsla`를 활용한 `scss` 변수 및 함수 사용 예시를 보여줄게.

**예시 1: 테마 색상 정의 및 변형**

```scss
// _variables.scss 또는 theme.scss
$primary-hue: 210; // 파랑 계열 (약간 하늘색 느낌)
$primary-saturation: 80%;

$primary-color: hsla($primary-hue, $primary-saturation, 50%, 1);
$primary-light: hsla($primary-hue, $primary-saturation, 80%, 1);
$primary-dark: hsla($primary-hue, $primary-saturation, 30%, 1);
$primary-transparent: hsla($primary-hue, $primary-saturation, 50%, 0.3);

// 회색 톤
$gray-light: hsla(0, 0%, 90%, 1);
$gray-medium: hsla(0, 0%, 50%, 1);
$gray-dark: hsla(0, 0%, 20%, 1);
```

**예시 2: 버튼 컴포넌트 스타일링**

```scss
// button.component.scss
@use 'variables' as *; // 위에서 정의한 변수들을 불러옴

.my-button {
  background-color: $primary-color;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $primary-dark; // hover 시 좀 더 어둡게
  }

  &:active {
    background-color: hsla($primary-hue, $primary-saturation, 20%, 1); // 클릭 시 더 어둡게
  }

  &.ghost {
    // 투명 버튼
    background-color: transparent;
    color: $primary-color;
    border: 1px solid $primary-color;

    &:hover {
      background-color: $primary-transparent; // hover 시 투명도 조절
      color: $primary-dark;
    }
  }

  &.disabled {
    background-color: $gray-light;
    color: $gray-medium;
    cursor: not-allowed;
  }
}
```

이처럼 `hsla()`를 사용하면 버튼의 기본 색상을 정의한 후, 해당 색상의 어두운 버전, 밝은 버전, 투명한 버전을 `hue`와 `saturation`을 그대로 유지한 채 `lightness`나 `alpha` 값만 조절하여 일관성 있게 만들어낼 수 있어. `rgb`나 `hex`로는 이 작업을 하려면 매번 색상 코드를 계산하거나 컬러 피커를 사용해야 하는 번거로움이 있지.

---

### 구형 브라우저 호환성 (IE)

`hsla()`는 대부분의 현대 브라우저에서 잘 지원돼. (Chrome, Firefox, Safari, Edge 등). 하지만 아주 오래된 Internet Explorer 버전(IE 8 이하)에서는 지원되지 않을 수 있어. 만약 구형 IE 호환성이 중요하다면, 대체 색상 (`fallback`)을 제공하는 것을 고려할 수 있어.

```css
.element {
  /* IE 8 이하를 위한 fallback */
  color: #3f51b5;
  /* 현대 브라우저를 위한 hsla */
  color: hsla(227, 60%, 48%, 1);
}
```

### 기본 칼라

- 빨강: H: 0°, S: 100%, L: 50%
- 주황: H: 30°, S: 100%, L: 50%
- 노랑: H: 60°, S: 100%, L: 50%
- 초록: H: 120°, S: 100%, L: 50%
- 파랑: H: 240°, S: 100%, L: 50%
- 남색: H: 270°, S: 100%, L: 50%
- 보라: H: 300°, S: 100%, L: 50%

### 주요 기본 색상의 HSLA 표기법

- 빨강 (Red): hsla(0, 100%, 50%, 1)
  - 색상(H): 0도 (적색)
  - 채도(S): 100% (순수한 색)
  - 명도(L): 50% (중간 밝기)
  - 투명도(A): 1 (완전히 불투명)
- 초록 (Green): hsla(120, 100%, 50%, 1)
  - 색상(H): 120도 (녹색)
  - 채도(S): 100%
  - 명도(L): 50%
  - 투명도(A): 1
- 파랑 (Blue): hsla(240, 100%, 50%, 1)
  - 색상(H): 240도 (청색)
  - 채도(S): 100%
  - 명도(L): 50%
  - 투명도(A): 1

### 각 속성의 의미

- H (Hue, 색상): 색의 띠를 나타내며, 0도에서 360도까지의 각도로 표현됩니다.
- S (Saturation, 채도): 색의 순수함을 나타냅니다. 0%는 회색, 100%는 가장 순수한 색을 의미합니다.
- L (Lightness, 명도): 색의 밝기를 나타냅니다. 0%는 검정, 50%는 색의 원본 색조, 100%는 흰색입니다.
- A (Alpha, 투명도): 색의 불투명도를 나타냅니다. 0은 완전히 투명, 1은 완전히 불투명한 상태를 의미합니다.
