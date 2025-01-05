# Useful commands for LocalStack

1. Run:
```
docker exec -it localstack sh
```

- After it, you can run the below commands to list your bucket's folders and files
- `⚠️` Replace the `BUCKET_NAME` below by your .env BUCKET_NAME variable value
- `⚠️` Replace the `FOLDER` and `FILE` below based on your target's path inside the bucket

* List all buckets running on LocalStack container:
```
AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls
```

* List a single bucket running on LocalStack container:
```
AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls s3://BUCKET_NAME
```

* List a single file from a single bucket running on LocalStack container:
```
AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls s3://BUCKET_NAME/FILE.png
```

* List files inside a folder from a single bucket running on LocalStack container:
```
AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls s3://BUCKET_NAME/FOLDER/
```

* List files inside a folder from a single bucket running on LocalStack container:
```
AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test aws --endpoint-url=http://localhost:4566 s3 ls s3://BUCKET_NAME/FOLDER/FILE.png
```
