FROM localstack/localstack:latest

COPY ./docker-entrypoint-initaws.d/init.sh /docker-entrypoint-initaws.d/init.sh
RUN chmod +x /docker-entrypoint-initaws.d/init.sh