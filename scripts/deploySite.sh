#!/usr/bin/env sh

aws s3 sync --delete tablestakes.dev/ s3://tablestakes.dev
