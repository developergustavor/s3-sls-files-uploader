# Server Setup

### Localhost
1. install packages (yarn or npm install)
2. copy the env/.env.example to .env and replace/adjust the variables values
3. run `sudo chmod +x docker-entrypointy-initaws.d/init.sh`
4. run `yarn dev`
5. to list the localstack files after the upload, run on the project's root folder:
    - `sudo chmod +x scripts/list-files.sh`
    - `sudo yarn list-files`

### To deploy
1. replace/adjust the scripts/deploy-hml.example.sh file's variables (wrapped by `@@`) and rename it to deploy-hml.sh
2. make sure you have serverless framework globally configured (and the profile's used in scripts/deploy-hml.sh) 
3. make sure you have aws-cli globally configured (and the profile's owner of the credentials used in scripts/deploy-hml.sh and in .env)
4. make sure the .env is properly adjusted and located on project's root folder
5. run `yarn deploy:hml`

#### S3 Configuration
1. create a bucket (named after the value of the .env variable `BUCKET_NAME`)
2. bucket policy (replace `BUCKET_NAME` by your bucket's name):
```
{
  "Version": "2012-10-17",
  "Id": "preventHotLinking",
  "Statement": [
      {
          "Sid": "1",
          "Effect": "Allow",
          "Principal": {
              "AWS": "*"
          },
          "Action": [
              "s3:GetObject",
              "s3:PutObject",
              "s3:PutObjectAcl",
              "s3:DeleteObject"
          ],
          "Resource": "arn:aws:s3:::BUCKET_NAME/*",
          "Condition": {
              "StringLike": {
                  "aws:Referer": "*"
              }
          }
      }
  ]
}
```

3. bucket CORS:
```
[
    {
        "AllowedHeaders": [
            "Authorization"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "Access-Control-Allow-Origin"
        ]
    }
]
```