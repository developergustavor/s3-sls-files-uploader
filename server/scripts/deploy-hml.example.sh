#!/bin/bash

deploy() {
  sudo rm -rf .build .serverless;
  sudo yarn;
  sudo chmod -R 777 .; 
  sudo chown -R $USER:$USER .;
  sudo npx sls package -s hml;
  export AWS_SDK_LOAD_CONFIG=1;
  sudo sls config credentials --profile @@profile_name@@ --provider aws --key @@aws_key@@ --secret @@aws_secret@@ --overwrite;
  sudo npx sls deploy --aws-profile @@profile_name@@ -s hml --verbose;
  sudo chmod -R 777 .; 
  sudo chown -R $USER:$USER .;
}


read -p "Confirm deploy to HML staging ? Remember to apply migrations. Choose: (y/n) " choice
case "$choice" in 
  y|Y|yes|Yes|s|S|Sim|sim ) deploy;;
  n|N|no|No|not|Not|não|Não|* ) echo "Deploy cancelled";;
esac