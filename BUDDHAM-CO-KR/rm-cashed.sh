#! /usr/bin/env zsh

set -e
echo "🛀🏻 씻는 중... (.angular ./dist ./node_modules ./package-lock.json)"
rm -rf ./.angular ./dist ./node_modules ./package-lock.json

echo "✨ 설치 중... (npm install)..."
npm install

echo "🏗️ 빌드 중... (ng build)..."
ng build

echo "🏁 완료!"
