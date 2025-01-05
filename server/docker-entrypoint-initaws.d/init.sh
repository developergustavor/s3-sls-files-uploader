#!/bin/bash

if [ -z "$BUCKET_NAME" ]; then
  echo "ERROR: Missing BUCKET_NAME environment variable."
  exit 1
fi

if awslocal s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
  echo "Ready."
else
  echo "Creating S3 bucket: $BUCKET_NAME ..."
  awslocal s3 mb s3://$BUCKET_NAME
  echo "S3 bucket created successfully!"
fi