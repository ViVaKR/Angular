# ============================================
# Stage 1: Build Angular Application
# ============================================
FROM node:lts AS builder

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --legacy-peer-deps

# 소스 코드 복사
COPY . .

# Angular 프로덕션 빌드
RUN npm run build

# ============================================
# Stage 2: Production Runtime
# ============================================
FROM node:lts AS runner

WORKDIR /app

# 프로덕션 의존성만 설치
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# 빌드된 파일 복사
COPY --from=builder /app/dist/buddham-co-kr ./dist/buddham-co-kr

# 환경변수 설정
ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME=0.0.0.0
ENV HOST=0.0.0.0

# 포트 노출
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)}).on('error', () => process.exit(1))"

# 앱 실행
CMD ["node", "dist/buddham-co-kr/server/server.mjs"]
