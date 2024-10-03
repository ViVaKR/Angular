#! /usr/bin/env zsh

ng build -c production --output-path=/Users/vivakr/WebServer/com.vivabm/code/
# ng build -c production --output-path=/Users/vivakr/WebServer/com.kimbumjun/iam/

# writer.or.kr
rm -rf /Users/vivakr/WebServer/kr.or.writer/www/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.writer/www/

rm -rf /Users/vivakr/WebServer/kr.or.writer/ns/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.writer/ns/

rm -rf /Users/vivakr/WebServer/kr.or.writer/ip/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.writer/ip/

rm -rf /Users/vivakr/WebServer/kr.or.writer/iam/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.writer/iam/

rm -rf /Users/vivakr/WebServer/kr.or.writer/code/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.writer/code/

rm -rf /Users/vivakr/WebServer/kr.or.writer/_/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.writer/_/

# vivabm.com
rm -rf /Users/vivakr/WebServer/com.vivabm/viv/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivabm/viv/

rm -rf /Users/vivakr/WebServer/com.vivabm/bm/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivabm/bm/

rm -rf /Users/vivakr/WebServer/com.vivabm/bj/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivabm/bj/

# vivakr.com
rm -rf /Users/vivakr/WebServer/com.vivakr/www/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivakr/www/

rm -rf /Users/vivakr/WebServer/com.vivakr/ns/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivakr/ns/

rm -rf /Users/vivakr/WebServer/com.vivakr/bj/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivakr/bj/

rm -rf /Users/vivakr/WebServer/com.vivakr/_/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.vivakr/_/

# text.or.kr
rm -rf /Users/vivakr/WebServer/kr.or.text/www/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/www/

rm -rf /Users/vivakr/WebServer/kr.or.text/writer/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/writer/

rm -rf /Users/vivakr/WebServer/kr.or.text/ip/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/ip/

rm -rf /Users/vivakr/WebServer/kr.or.text/iam/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/iam/

rm -rf /Users/vivakr/WebServer/kr.or.text/code/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/code/

rm -rf /Users/vivakr/WebServer/kr.or.text/chat/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/chat/

rm -rf /Users/vivakr/WebServer/kr.or.text/ns/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/ns/

rm -rf /Users/vivakr/WebServer/kr.or.text/_/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.or.text/_/

# kimbumjun.com
rm -rf /Users/vivakr/WebServer/com.kimbumjun/iam/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.kimbumjun/iam/
# ng build -c production --output-path=/Users/vivakr/WebServer/com.kimbumjun/iam/

rm -rf /Users/vivakr/WebServer/com.kimbumjun/code/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.kimbumjun/code/

rm -rf /Users/vivakr/WebServer/com.kimbumjun/bj/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.kimbumjun/bj/

rm -rf /Users/vivakr/WebServer/com.kimbumjun/_/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/com.kimbumjun/_/

# kimbumjun.co.kr
rm -rf /Users/vivakr/WebServer/kr.co.kimbumjun/_/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.co.kimbumjun/_/

rm -rf /Users/vivakr/WebServer/kr.co.kimbumjun/www/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.co.kimbumjun/www/

rm -rf /Users/vivakr/WebServer/kr.co.kimbumjun/ns/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.co.kimbumjun/ns/

rm -rf /Users/vivakr/WebServer/kr.co.kimbumjun/code/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.co.kimbumjun/code/

rm -rf /Users/vivakr/WebServer/kr.co.kimbumjun/bj/*
cp -R /Users/vivakr/WebServer/com.vivabm/code/* /Users/vivakr/WebServer/kr.co.kimbumjun/bj/
