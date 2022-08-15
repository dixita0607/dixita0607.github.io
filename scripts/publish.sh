#!/bin/sh

# e=Exit on error, u=Don't use undefined variables, x=Echo the ran commands
set -eux

cleanup() {
    git reset --hard
    git checkout "$branch"
}

npm run build

# Store current branch
branch=$(git branch --show-current)

git checkout public

# Register clean function on exit
trap cleanup EXIT

git --work-tree=public add .
git commit
git push -u origin public
