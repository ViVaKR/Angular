##### Shebang (쉘 선언문)

쉘 스크립트를 어떤 쉘로 스크립트를 실행할지를 정의

##### 변수의 타입

- 로컬변수
- 전역변수
- 환경변수
- 예약변수
- 매개변수

<br>

##### 규칙 (Convention)

- 변수의 이름에는 문자, 숫자, 밑줄을 사용할 수 있습니다.
- 이름에 소문자나 대문자 알파벳을 사용할 수 있습니다.
- 변수 이름의 어느 위치에서나 밑줄 문자를 사용할 수 있습니다.
- 대, 소문자를 구별함
- 변수의 이름은 숫자를 포함할 수 있지만 숫자로 시작할 수 없다.

##### 규칙 2: 할당 연산자(=)의 양쪽에는 공백이 없어야 합니다

- 할당 연산자 앞이나 뒤에 공백이 있으면 셸 인터프리터가 변수 이름이 명령 자체라는 오류 메시지가 표시될 수 있음
- (예) name="Kim Bum Jun"

##### 규칙 3: 변수 이름에는 특수문자를 사용할 수 없습니다

- 밑줄을 제외하고 변수 이름에는 특수 문자가 포함될 수 없습니다.

##### 규칙 4: 변수 이름의 첫 번째 문자는 숫자가 될 수 없습니다

##### 규칙 5: 변수 이름은 예약어가 될 수 없습니다

##### 규칙 6: 변수 이름 사이에 공백이 있을 수 없습니다

##### 사용

- 변수는 모든 값을 문자열로 저장함
- 변수에는 자료형을 넣지 않는다.
- 변수를 사용할 때에는 변수명 앞에 특수 문자 '$' 를 사용함.
- 값을 대입할 때는 특수 문자 '$'를 사용하지 않음
- 변수와 연결하여 문자열을 붙일때는 '앞에 붙일문자열${변수명}붙일 일반 문자열'
- 변수는 기본적으로 전역변수다.
- 지역변수를 사용할 때에는 변수명 앞에 'local' 을 붙여주면됨

##### 변수타입

```bash
# -r 읽기 전용 타입 (상수 const)
declare -r foo
readonly bar

# -i 정수타입
declare -i number
number=9
echo "number = $number"

# -a 배열
declare -a dic






```

##### 연관배열

```bash
# -A 연관배열 (key value pair)
# 인덱스는 숫자가 아닌 문자열임
#!/bin/bash

# 연관 배열 선언
declare -A myArray

# 연관 배열에 값 할당
myArray["name"]="John Doe"
myArray["age"]="30"
myArray["city"]="New York"

# 연관 배열에서 값 읽기
echo "Name: ${myArray["name"]}"
echo "Age: ${myArray["age"]}"
echo "City: ${myArray["city"]}"

# 연관 배열의 모든 키와 값 출력
echo "All key-value pairs in the array:"
for key in "${!myArray[@]}"; do # 연관배열의 모든 키를 반복한다.
  echo "$key: ${myArray[$key]}"
done

```

##### 파일테스트 (-f)

> 파일 테스트 연산자 중 하나로 주어진 경로가 피일 여부를 확인하는 데 사용됨
> 이 연산자는 파일이 존재하고 일반 파일인지 확인함

- 예시1: 파일 존재 여부 확인

```bash

#!/bin/bash

FILE="/path/to/your/file.txt"

if [ -f "$FILE" ]; then
  echo "$FILE exists."
else
  echo "$FILE does not exist."
fi

```

- 예시 2: 파일이 존재할 경우 파일 삭제

```bash
#!/bin/bash

FILE="/path/to/your/file.txt"

if [ -f "$FILE" ]; then
  echo "$FILE exists. Deleting the file."
  rm "$FILE"
else
  echo "$FILE does not exist."
fi
```

##### 환경변수 (export)

- 스크립트 외부 환경에서도 변수 사용가능.
- 변수명 앞에 `export` 를 붙여서 environment variable 로 설정함.

<br>

##### 전달 매개변수 (인자)

> ./script.sh a b c
