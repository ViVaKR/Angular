#!/bin/bash

# 임시 경로
TMP_DIR=$(mktemp -d)

# 빌드
ng build --configuration production --output-path "$TMP_DIR"

# 기존 배포 폴더 제거/백업
sudo rm -rf /var/www/buddham.co.kr/root.old
sudo mv /var/www/buddham.co.kr/root /var/www/buddham.co.kr/root.old 2>/dev/null

# 배포
sudo mv "$TMP_DIR" /var/www/buddham.co.kr/root
sudo chown -R www-data:www-data /var/www/buddham.co.kr/root
