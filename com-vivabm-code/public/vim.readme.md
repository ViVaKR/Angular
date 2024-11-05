
### 모드

```markdown
1. Normal
    - esc,
    - 커서 움직이기, 특정 명령 수행
2. Insert
    - i, a, I, A
    - 문자열 입력
3. Command
    - :
    - 문서저장, 종료, 문자열 찾기 또는 수정하기
4. Visual
    - CTRL + V
    - SHIFT + V
    - 마우스 드래그 하여 블럭을 씌우는 역할 수행
    - 문서 내 범위 지정
```

<br>

### 일반

```md
    :h[elp] keyword - 도움말 열기
    :sav[eas] file - 다른 이름으로 저장
    :clo[se] - 현재 창 닫기
    :ter[minal] - 터미널 열기
    :set nu - view number
    :set nonu - hide number
    :set ignore - case insensitive
    :e [new fileName]
```

<br>
<br>

### 커서이동

```markdown
    h - 왼쪽으로 한 칸 이동
    j - 아래로 한 칸 이동
    k - 위로 한 칸 이동
    l - 오른쪽으로 한 칸 이동
    gj - 다음 문장으로 이동 (한 문장이 여러 줄로 나뉘어 있을 경우)
    gk - 이전 문장으로 이동 (한 문장이 여러 줄로 나뉘어 있을 경우)
    H - 현재화면 상단으로 점프
    M - 현재화면 중단으로 점프
    L - 현재화면 하단으로 점프
    w - 다음 단어 시작으로 점프
    W - 다음 단어 시작으로 점프 (특수문자 포함)
    e - 다음 단어 끝으로 점프
    E - 다음 단어 끝으로 점프 (특수문자 포함)
    b - 이전 단어 시작으로 점프
    B - 이전 단어 시작으로 점프 (특수문자 포함)
    <CR> - 다음 줄의 첫글자로 이동
    -    - 윗줄의 첫 글자로 이동
    +    - 다음 줄의 첫글자로 이동
    ge - 이전 단어 끝으로 점프
    gE - 이전 단어 끝으로 점프 (특수문자 포함)
    g_ -> goes to the last non-whitespace character.
    % - 현재 괄호의 짝으로 점프 (:h matchpairs를 통해 더 많은 정보를 얻을 수 있습니다.)
    0 - 현재 행 시작으로 점프 (공백 포함)
    ^ - 현재 행 시작으로 점프
    $ - 현재 행 끝으로 점프 (공백 포함)
    gg - 문서 첫 줄 시작으로 점프
    G - 문서 끝 줄 시작으로 점프
    5gg or 5G - 5번째 행 시작으로 점프
    gd - 지역변수 선언위치로 점프
    gD - 전역변수 선언위치로 점프
    fx - 다음 검색 문자 x로 점프
    tx - 다음 검색 문자 x 앞에 점프
    Fx - 이전 검색 문자 x로 점프
    Tx - 이전 검색 문자 x 뒤에 점프
    ; - 최근 f/t/F/T 명령어 실행
    , - 최근 F/T/f/t 명령어 실행
    } - 다음 단락으로 점프
    { - 이전 단락으로 점프
    zz - 화면 위치 중간으로 조정
    zt - 화면 맨 위로 커서 이동
    zb - 화면 맨 아래로 커서 이동
    <C-o> - 이전 커서 위치로 이동
    <C-i> - 새로운 커서 위치로 이동
    <C-e> - 한 줄 아래로 이동
    <C-y> - 한 줄 위로 화면 조정
    <C-b> - 한 화면 위로 조정
    <C-f> - 한 화면 아래로 조정
    <C-d> - 반 화면 아래로 조정
    <C-u> - 반 화면 위로 조정
```

<br>
<br>

### 삽입 모드

```bash
    i - 현재 커서 앞에 삽입
    I - 현재 커서 행 시작에 삽입
    a - 현재 커서 뒤에 삽입
    A - 현재 커서 행 끝에 삽입
    o - 현재 커서 행 아래에 새 행을 삽입
    O - 현재 커서 행 위에 새 행을 삽입
    ea - 단어 끝 뒤에 삽입
    Ctrl + h - 이전 문자 제거
    Ctrl + w - 이전 단어 제거
    Ctrl + j - 한 줄 바꿈
    Ctrl + t - 한 탭 들여쓰기
    Ctrl + d - 한 탭 내어쓰기
    Ctrl + n - 다음 단어 탐색 (자동완성)
    Ctrl + p - 이전 단어 탐색 (자동완성)
    Ctrl + rx - 레지스터 x의 내용 삽입
    Ctrl + ox - 일시적으로 삽입 모드에서 노멀 모드로 이동하여 command x 실행
    Esc or Ctrl + c - 삽입모드 종료
```

<br>
<br>

### <b>편집 모드</b>

```
    r - 한 글자 바꾸기
    R - 한 글자 이상 바꾸기(ESC 누르면 종료)
    J - 현재 행과 다음 행 연결
    gJ - 현재 행과 다음 행 연결 (공백무시)
    gwip - 단락 리플로우
    g~ - 커서 이동으로 대·소문자 전환
    g~$ - 커서에서 끝까지 대소문 변환
    gu - 커서 이동으로 소문자 전환
    gU - 커서 이동으로 대문자 전환
    cc - 한 행 전체 새로 쓰기, 커서가 있는 줄을 교체
    c$ or C - 한 행 끝까지 새로 쓰기
    c[h, j, k, l] -> 커서의 [앞, 다음줄, 윗줄, 현재] 교체
    cw or ce - 한 단어 끝까지 새로 쓰기
    ciw - 한 단어 전체 새로 쓰기
    y0 - 커서 위치 부터 줄 처음까지 복사
    y$ - 커서 위치 부터 줄 끝까지 복사
    yy - 커서가 있는 줄 복사
    yw - 커서 위치 부터 단어의 끝까지 복사
    yk - 커서가 있는 줄과 그 윗 둘을 복사
    yj - 커서가 있는 줄과 그 다음 줄을 복사
    yiw - 한 단어 복사하기
    s - 한 문자 새로 쓰기
    S - 한 행 전체 새로 쓰기 (cc와 동일)
    x, dl - 커서 위치의 글자 삭제
    X, dh - 커서 바로 앞의 글자 삭제
    xp - 잘라내고 붙여넣기
    u - 실행취소
    U - 최근 수정한 줄 복원(실행취소)
    <C-r> - 다시실행
    . - 최근 명령어 반복
    x - 한글자 지우기
    d[h,j, k, l] - 커서의 [앞, 다음줄, 윗줄, 현재] 삭제
    d2w => delets two words
    dt; => delete until ;
    test demo test demo hh test test;
    dd => delete line
    D - delete from cursor until the end of the line
```

<br>
<br>

### 선택 모드 (비주얼 모드)

```
    $ vim --version | langmap
    v - 비주얼 모드
    shift + v - 비주얼 라인전체
    o - 선택 영역 반대쪽 끝으로 점프
    * Ctrl + v - 비주얼 블록 : up/down -> `Shift + i` -> type the text -> Esc
    * Shift + Alt + Up/Down Arrow
    O - 블록의 반대쪽 모서리로 이동, 시작 커서 현재 커서 토글.
    vaw - 단어 선택
    vab - 소괄호() 구간 선택, 괄호 포함
        -> int main (int argc, int* argc) {}
    vaB - 중괄호{} 구간 선택
    vat - 태그<> 구간 선택
    vib - 소괄호() 내부 선택
    viB - 중괄호{} 내부 선택

    it - 태그<> 내부 선택
    Esc or Ctrl + c - 선택 모드 종료
    Tip b 또는 B 대신에 ( 또는 { 사용가능.
    gv - 이전 블록 재 선택
```

<br>
<br>

### 선택 모드 명령

```
    > - 선택 행 들여쓰기
    < - 선택 행 내어쓰기
    y - 선택 구간 복사
    d - 선택 구간 삭제
    ~ - 대소문자 반전
    u - 선택 구간 소문자 전환
    U - 선택 구간 대문자 전환
```

<br>
<br>

### 레지스터

```
    - 레지스터는 [쌍따옴표(") + 문자] 로 지정
    - 레지스터 이름을 받을 수 있는 명령어
      - 일반적인 삭제(d, D, x, X)
      - 교체 (s, S)
      - 복사 (y)
    - 운영체제와 공유 : "+ or "*
    :reg[isters] - 레지스터 내용 확인
    "xy - 레지스터 x 복사
    "xp - 레지스터 x 붙여넣기
    "+y - 클립보드 복사
    "+p - 클립보드 붙여넣기

        Tip 특수 레지스터:
             0 - 최근 복사 레지스터
             " - 최근 사용 레지스터
             % - 현재 파일명
             # - 대체 파일명
             * - 클립보드 (X11 primary)
             + - 클립보드 (X11 clipboard)
             / - 최근 검색 패턴
             : - 최근 Vim 명령줄
             . - 최근 삽입 텍스트
             - - 최근 제거 문자
             = - 표현식 레지스터
             _ - 블랙홀 레지스터
```

<br>
<br>

### 마킹, marking

```
    :marks - 마킹 항목 표시
    ma - 현재 위치를 a로 마킹
    `a - 마크 a로 점프
    y`a - 마크 a까지 복사
    `0 - 종료 전 커서위치로 점프
    `" - 최근 편집한 커서 위치로 점프
    `. - 최근 변경한 커서 위치로 점프
    `` - 최근 점프 전 위치로 점프
    :ju[mps] - 점프목록
    Ctrl + i - 이전 점프목록 위치로 점프
    Ctrl + o - 다음 점프목록 위치로 점프
    :changes - 변경목록
    g, - 이전 변경목록 위치로 점프
    g; - 다음 변경목록 위치로 점프
    Ctrl + ] - 커서가 가리키는 태그로 점프
        - Tip 마킹한 곳으로 점프 시 그레이브 액센트 (`) 또는 아포스트로피 (') 모두 사용가능합니다. 아포스트로피 사용 시, 마킹한 곳의 줄 머리로 이동합니다. (공백 미포함)
    :delm <0-9> - 0 부터 9까지의 마크 삭제.
```

<br>
<br>

### 매크로

```
    q - 매크로 기록 중지
    @a - 매크로 a 실행
    @@ - 최근 매크로 재실행
    yy - 한 행 복사하기
    2yy - 2줄 복사하기
    yw - 다음 단어까지 복사하기
    yiw - 한 단어 복사하기
    yaw - 한 단어 복사하기 (공백포함)
    y$ or Y - 한 행 끝까지 복사하기
    p - 커서 뒤에 붙여넣기
    P - 커서 앞에 붙여넣기
    gp - 커서 뒤에 붙여넣고 붙여넣은 행 다음으로 커서 옮기기
    gP - 커서 앞에 붙여넣고 붙여넣은 행 다음으로 커서 옮기기
    dd - 한 행 잘라내기
    2dd - 2줄 잘라내기
    dw - 다음 단어까지 잘라내기
    diw - 한 단어 잘라내기
    daw - 한 단어 잘라내기 (공백포함)
    :3,5d - 3행 부터 5행 까지 삭제
    :.,$d - 현재 행 부터 끝까지
    :.,1d - 현재 행 부터 처음까지
    :10,$d - 10 번째 행 부터 처음까지
    :g/{pattern}/d - 패턴을 포함하는 모든 행 삭제
    :g!/{pattern}/d - 패턴을 포함하지 않는 모든 행 삭제
    d$ or D - 한 행 끝까지 잘라내기
    x - 한 문자 잘라내기
```

<br>
<br>

### 문단모양

```
    >> - 한 탭 들여쓰기
    << - 한 탭 내어쓰기
    >% - 중·소괄호 구간 들여쓰기
    <% - 중·소괄호 구간 내어쓰기
    >ib - 소괄호 내부 들여쓰기
    >at - 태그 구간 들여쓰기
    3== - 3줄 자동정렬
    =% - 중·소괄호 구간 자동정렬
    =iB - 중괄호 내부 자동정렬
    gg=G - 전체 버퍼 자동정렬
    ]p - 붙여쓰고 현재 행 들여쓰기 조
```

<br>
<br>

### 명령모드

```
    :w - 저장하기
    :w >> [file]<CR> -> 편집중인 문서를 [file]에 덧 붙여서 저장
    :w !sudo tee % - 관리자로 저장하기
    :wq or :x or ZZ - 저장하고 나가기
    :e [file] -> 파일 불러오기
    :e# -> 이전에 펴집하던 파일을 불러옴
    :r [file]<CR> -> [file]을 커서 위치에 끼워 넣기
    :r ![command]<CR> -> 실행결과를 끼워 넣기
    :set [option]<CR> -> option turn on
    :set no[option]<CR> -> option turn off
    :q - 나가기 (변경확인)
    :q! or ZQ - 나가기 (변경무시)
    :wqa - 모든 탭 저장하고 나가기
```

<br>
<br>

### 상용구

```
    :ab <keyword> <syntax><CR>
    :ab <keyword> <syntax<C-v><C-m>next line><CR>
```

<br>
<br>

### Settings

```
    :set rnu (relativenumber)
    :set nornu (norelativenumber)
    :set nornu nonu
    :set <option>   (turn on)
    :set no<option> (turn off)
    :set <option>!  (toggle)
    :set <option>?  (chekc if an option is on or off)
    :set <option>&  (Set back to its default)
```

<br>
<br>

### Pattern, 패턴 검색 및 변경

```
    /pattern - 패턴 검색 (순방향)
    ?pattern - 패턴 검색 (역방향)
    \vpattern - 특수 매직 패턴
    n - 다음 검색항목으로 점프, repeat forward
    N - 이전 검색항목으로 점프, repeat backward
    :s/old/new<CR> - 현재 줄의 처음 old 를 new 로 교체
    :s/old/new/g<CR> - 현재 줄의 모든 old 를 new 로 교체
    :1,20s/old/new/g<CR> - 1 부터 20 번째 줄까지 모든 old를 new 로 교체
    :%s/old/new/g - 문서 전체에서 old를 new로 바꾸기
    :%s/old/new/gc - 문서 전체에서 old를 new로 확인하며 바꾸기
    :g/pattern/s/old/new/g<CR> - pattern 이 있는 모든 줄의 old를 new 로 교체
    :noh[lsearch] - 검색 하이라이트 제거
```

<br>
<br>

### 여러 파일 검색

```
    :vim[grep] /pattern/ {`{file}`} - 여러 파일에서 패턴 검색
    e.g. :vim[grep] /foo/ **/*
    :cn[ext] - 다음 검색항목으로 점프
    :cp[revious] - 이전 검색항목으로 점프
    :cope[n] - 일치 목록을 새 창으로 열기
    :ccl[ose] - 일치 목록 창 닫기
```

<br>
<br>

### 탭

```
    :tabnew or :tabnew {page.words.file} - 새 탭에서 파일 열기
    Ctrl + wT - 현재 분할 창을 새로운 탭으로 이동
    gt or :tabn[ext] - 다음 탭으로 이동
    gT or :tabp[revious] - 이전 탭으로 이동
    #gt - #번째 탭으로 이동
    :tabm[ove] # - 현재 탭을 #번째로 이동
    :tabc[lose] - 현재 탭과 그 안의 창들 닫기
    :tabo[nly] - 현재 탭 이외의 모든 탭 닫기
    :tabdo command - 모든 탭에서 command 실행하기 (예를 들어, :tabdo q - 열린 모든 탭 닫기)
```

<br>
<br>

### 다중 창 작업

```
    :e[dit] file - 새 버퍼에서 파일 편집
    :bn[ext] - 다음 버퍼로 이동
    :bp[revious] - 이전 버퍼로 이동
    :bd[elete] - 버퍼 삭제 (파일 닫기)
    :b[uffer]# - #번째 버퍼로 이동
    :b[uffer] file - 파일명 버퍼로 이동
    :ls or :buffers - 열린 버퍼 모두 나열
    :sp[lit] file - 새 버퍼에 파일 열고 상하로 창 분할
    :vs[plit] file - 새 버퍼에 파일 열고 좌우로 창 분할
    :vert[ical] ba[ll] - 모든 버퍼 열고 좌우로 창 분할
    :tab ba[ll] - 모든 버퍼 열고 탭으로 창 분할
    Ctrl + ws - 상하로 창 분할
    Ctrl + wv - 좌우로 창 분할
    Ctrl + ww - 창 전환
    Ctrl + wq - 창 닫기
    Ctrl + wx - 창 바꾸기
    Ctrl + w= - 모든 창 크기 조정
    Ctrl + wh - 왼쪽 창으로 이동
    Ctrl + wl - 오른쪽 창으로 이동
    Ctrl + wj - 아래 창으로 이동
    Ctrl + wk - 위 창으로 이동
    Ctrl + wH - 현재 창을 최대 높이인 상태로 왼쪽 이동(가장 왼쪽)
    Ctrl + wL - 현재 창을 최대 높이인 상태로 오른쪽 이동(가장 오른쪽)
    Ctrl + wJ - 현재 창을 최대 너비인 상태로 아래로 이동(가장 아래쪽
    Ctrl + wK - 현재 창을 최대 너비인 상태로 위로 이동(가장 위쪽)
```

<br>
<br>

### 비교

```
    zf - 폴딩 정의
    zd - 폴드 제거
    za - 폴드 설정
    zo - 폴드 열기
    zc - 폴드 닫기
    zr - 한 단계씩 폴드 열기
    zm - 한 단계씩 폴드 접기
    zi - 스마트 폴딩
    ]c - 다음 수정으로 점프
    [c - 이전 수정으로 점프
    do or :diffg[et] - 다른 버퍼에서 차이점 얻기
    dp or :diffpu[t] - 다른 버퍼로 차이점 보내기
    :diffthis - 현재 창 비교모드 열기
    :dif[fupdate] - 비교모드 새로고침
    :diffo[ff] - 현재 창 비교모드 닫기

- `di"` = delete inside quote
- `di[`
- `di{`
- d + {Motion} - Motion (h,i,k,l)
```

<br>
<br>

### 운영체제 클립보드에서 Vim으로 붙여넣기

```
- Normal Mode 에서 `"*p` 를 순차적으로 입력하면 클립보드의 내용이 커서 다음에 붙여넣어진다.
- Normal Mode 에서 `"+P` 를 순차적으로 입력하면 클립보드의 내용이 커서 이전에 붙여넣어진다.
- Insert Mode 에서 ctrl + r 을 입력 후 "* 를 순차적으로 입력하면 클립보드의 내용이 커서를 기점으로 붙여넣어진다.
- 레지스터를 지정하는 방법이 쌍따옴표(")와 레지스터 이름을 나타내는 문자를 연결시키는 것이었다. 위 명령들에서 "* 는 클립보드를 지시하는 레지스터다.
- 마찬가지로 레지스터명으로 "+ 을 입력해도 동일한 결과를 볼 수 있다.
```

<br>
<br>

### Vim 에서 운영체제 클립보드로 복사하기

```
- `*y{모션}` 명령 또는 `"*Y` 명령을 활용하여 클립보드로 원하는 내용을 복사한다.
- y 대신 삭제 관련 명령을 활용하여 지워진 내용이 클립보드에 복사되도록 할 수도 있다
```

<br>
<br>

### 모션으로 활용가능한 기본 커서 이동 명령

```
- h, j, k, l
- w, W, b, B, e, E
- gg, G
- 0, ^, $
```

<br>
<br>

### 워드단위 모션

```
- iw, iW, ip, ie
- aw, aW, ap, ae
- s
- S
- C
```

<br>
<br>

### Replace Term $\rightarrow\,$

```
- `:%s/origin/replace/g`
```

<br>
<br>

### Within Specific Lines

`:start_line_number, end_line_number s/search_term/replace_term/g`

- 5번째 e $\rightarrow\,$ `5fe`
- Undo : `u`
- Redo : `Ctrl + r`

<br>
<br>

### Move entire line up and down

```
>- `ddkp`
>- `:m line-number`
>- `:m +2` or `:m -3`
```

<br>
<br>

### map : recursive map

```
    :map - 일반, 비주얼 모드
    :map - 입력, 명령줄 모드
    :imap - 입력모드
    :nmap - 일반모드
    :vmap - 비주얼모드
    :cmap - 명령줄모드
    :tmap - 터미널모드
    :noremap
```

<br>
<br>

### noremap : non-recursive map

<br>
<br>

### <leader> :=> is same `\`

<br>
<br>

### Macro

```
>- a ~ z 키에 기록 시작 -> `q + a`
>- `Actions`
>- 기록 중지 -> `q`
>- 실행 (100회) -> `100@a`
>- 직전 매크로 실행 -> `@@`
```

<br>
<br>

### Get Encodings

```bash
    :set enc? fenc? tenc?
```

<br>
<br>

### Vim Cursor Settings

```bash
# vim cursor style
let &t_SI = "\e[6 q"
let &t_EI = "\e[2 q"

# vim 편집기 빠져 나갈 때 터미널 커서 -> vertical bar
# 6 - steady bar (xterm)
`autocmd VimLeave * silent !echo -ne "\e[6 q"`

## options
Ps = 0  -> blinking block.
Ps = 1  -> blinking block (default).
Ps = 2  -> steady block.
Ps = 3  -> blinking underline.
Ps = 4  -> steady underline.
Ps = 5  -> blinking bar (xterm).
Ps = 6  -> steady bar (xterm).

```

### `|` 형태의 커서

```
    >- `echo -e -n "\x1b[\x35 q" # changes to blinking bar`
```

<br>
<br>

### 바꾸기 : 콜론 모드에서 's'ubstitue 명을 사용 $\rightarrow$ `:%s`

```
- `:시작줄, 끝줄 s /찾을패턴/바꿀문자/옵션`
    >- g : global - 한줄에 패턴이 여러번 나오면 모두 바꿈
    >- i : ignore case - 대소문자르 구분을 하지 않음
    >- c : confirm - 물어봄
```

<br>
<br>

### 정규 표현식 요약

```
    >- .        : 임의의 한글자
    >- [list]   : list 중의 한글자
        -> [adf] => a, b, f
        -> [a-f] => a, b, c, d, e, f
        -> [^adf] => ecept a, d, f
        -> [^a-f]
        -> [ab^] => a, b, ^
    >- *        : >= 0  , a* => null, a, , aaa, aaaa....
    >- +        : > 0   , a+ => a, , aaa, aaaa....
    >- |        : a | b , a or b
    >- ?        : ab? => a or ab
    >- {n, m}   : n >= 0 and  < m
    >- {n}      : repeat => n
    >- {,m}     : <= m
    >- {}       : >=0 , is same *
    >- {-n, m}
    >- {-n}
    >- {-n, }
    >- {-,m}
    >- {-}
```

<br>
<br>

### 라인 복사 후 Ctrl + A : 일련번호 증가 시키기

```
    >- yy3pE(c-v)2jg(c-a)
    >- Ctrl + u   --> Move half a screen up
    >- Ctrl + d   --> Move half a screen down
    >- Ctrl + b   --> Mojve one full screen up
    >- Ctrl + f   --> Move one full screen down
    >- zo          --> Open a fold
    >- zc          --> Close a fold
    >- zr          --> Reduce folding level throughout the file
    >- zm          --> Increase folding level throughout the file
    >- `gcc` -> comment
```

### 도움말 또는 터미널 과 편집기 사이 토글하기

```
    >- <c-w, w> - between help <-> editor
```

<br>
<br>

### GoTo Line Number

```
    :<line number>
```

<br>
<br>

### Increament the number -> `<c-a>`

### Recording (Macro, 일련번호를 98번 증가시키기)

```
    >- Start -> `qq` // Start the macro in register q
    >- Duplicate the line -> `yyp`
    >- Selection Duplicated Number
    >- Increment the number -> `<c-a>`
    >- End the recording -> `q`
    >- Replay 98 times -> `98@q`
```

<br>
<br>

### Record the following macro

##### $\rightarrow$ [ref](https://vi.stackexchange.com/questions/20038/visual-block-mode-edit-with-sequential-number)

```
- Mark a is at origin number line : ma
- Mark b is at second number line : mb
```

```
1. qq
2. `a
3. <c-a>
4. yiw          // Copy the number
5. `b
6. i-"
7. <esc>p
8. mb
9. q
10. 100@q
```

<br>
<br>

## Blank Tab

```
    >- :tabnew
    >- :tabedit
    >- :e
```

<br>
<br>

### Open a Tab with a file specified

```
    >- :tabf filename
    >- :tabnew filename
    >- :tabedit filename
    >- gt
    >- gT
    >- ngt : N 번째 탭으로 이동
    >- :tabs
    >- :tablast
    >- :tabfirst
    >- :ls - reopen by buffer
    >- :tabc :close current Tab
    >- :ntabc = close Nth Tab
    >- :tabo - close all tab but current Tab
    >- :tabnew +nbuf
    >- :tabm n - Move the current opend Tab to the Nth position (Start from0)
    >- :saveas new_saved.txt
    >- :file new_file.txt
    >- :Explore
```

<br>
<br>

### Open Terminal

```
    >- :below terminal # 해당 칸 하단
    >- :top terminal # 상단 전체
    >- :bo terminal # 하단 전체
    >- :set splitbelow -> :terminal
    >- :vert term
    >- :rightb :vert term
    >- .vimrc -> `cabbrev bterm bo term` -> :bterm
```

<br>
<br>

### Split

```
    >- : vsp filename.txt # file
    >- : botright vnew filename.txt

    - 분할
    >- 상하분할 - ctrl + w, s (:sp ~/.vimrc)
    >- 좌우분할 - ctrl + w, v (:vs ~/.vimrc)

    - 포커스 이동
    >- ctrl + w, w : 순차적으로 이동
    >- ctrl + w, t : 왼쪽 최상단
    >- ctrl + w, b : 오른쪽 하단
    >- ctrl + w, (h,j,k,l)  # 좌, 하, 상, 우

    >- 같은 크기 : ctrl + w + =

    - 세로 방향 크기 조절
    >- Ctrl w +  , Ctrl w 숫자 +
    >- :res +숫자
    >- Ctrl w -   , Ctrl w 숫자 -
    >- :res -숫자

    - 가로 방향
    >-  Ctrl w >  , Ctrl w 숫자 >
    >-  :vert(ical) res + 숫자
    >-  Ctrl w <  , Ctrl w 숫자 <
    >-  :vert(ical) res - 숫자

    >- Close split - <C-w>c (:close)
    >- Close split and quit file - <C-w>q (:q)
    >- Close all other splits - <C-w>o (:only)
```

### Shell Commands

```
    >- :!mv smaple.txt file_moved.txt
    >- :!cp sample.txt file_copied.tx
```

<br>
<br>

### Register

```
    - 등록하기
        >- "(큰따옴표) + A(a) ~ Z(z) (레지스터명)

    - 편집모드
        >- <c-r> % : 작성중인 파일    `a - 마크 a로 점프명

    - 일반모드
        >- 붙여넣기 -> " + p(P)

    1. 무명 레지스터
    2. 숫자 레지스터
```

<br>
<br>

### Split (창분리)

```
    `:vsplit` (좌우분리)
    `:split`  (상하분리)
    `:term ++curwin` (현재 창에 터미널 열기)
    `:bo 10sp`       (하단으로 10 크기 만큼 분리)
    `:bo 10sp | term ++curwin`  (하단으로 분리하고 터미널 열기)
```

<br>
<br>

### 파일열기 및 목록 보기

```
    `:e %:h`
    `:FZF`
    `:Ex`
    `:e `pwd`
    `:Sex dir/to/my`
    `:Sex`, `:Vex`
```

<br>
<br>

### 배열

```
    :let aa = [1, 2, 3]
    :let bb = aa
    :call add(aa, 4)
    :echo bb
    --> [1, 2, 3, 4]
```
