FROM amazoncorretto:11

ADD . /var/app
WORKDIR /var/app

RUN ./mvnw clean install -T 1C -DskipTests

ENTRYPOINT ["java","-jar","./target/chat_api.jar"]

