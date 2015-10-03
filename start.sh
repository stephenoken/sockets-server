#!/bin/sh
echo "Starting server on: http://localhost:$1"

node server/index.js $1
