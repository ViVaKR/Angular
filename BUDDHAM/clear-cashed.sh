#! /usr/bin/env zsh

set -e

echo "🛀🏻 씻는 중... (.angular ./dist ./node_modules ./package-lock.json)"
rm -rf ./.angular ./dist ./node_modules ./package-lock.json

echo "🏁 완료!"
