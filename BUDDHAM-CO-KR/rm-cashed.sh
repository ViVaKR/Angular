#! /usr/bin/env zsh

set -e
echo "Cleaning..."
rm -rf ./.angular ./dist ./node_modules ./package-lock.json

echo "Installing..."
npm install

echo "Building..."
ng build

echo "Done"
