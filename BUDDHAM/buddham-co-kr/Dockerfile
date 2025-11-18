FROM node:24.11.0

# 1️⃣ 필수 시스템 의존성 (native 모듈 대비)
RUN apt-get update \
 && apt-get install -y python3 g++ make \
 && rm -rf /var/lib/apt/lists/*

# 2️⃣ 전역 Angular CLI 설치 (버전 고정)
RUN npm install -g @angular/cli@20.3.7

# 3️⃣ npm registry 명시 (내부망이나 프록시 환경 대응)
RUN npm config set registry https://registry.npmjs.org/

# 4️⃣ 작업 디렉터리 지정
WORKDIR /app

# 5️⃣ 패키지 목록만 먼저 복사 (캐시 활용)
COPY package*.json ./

# 6️⃣ 의존성 설치 — 안전하게, 속도 빠르게, 권한 문제 없이
RUN npm install

# 7️⃣ 소스 복사
COPY . .

# Production build
RUN ng build --configuration production
# 8️⃣ 외부 접근용 포트 노출
EXPOSE 4200

# 9️⃣ Angular dev server 실행
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
