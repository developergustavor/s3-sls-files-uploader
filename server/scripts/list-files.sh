#!/bin/bash
sudo docker exec -it localstack sh -c 'AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls s3://assets.test-upload-files.com.br/uploads/';

sudo docker exec -it localstack sh -c 'AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls s3://assets.test-upload-files.com.br/uploads/2025-01-03/';
