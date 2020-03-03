Simple chat application
----

### Prerequisites

* docker-compose

### Run

*1.* Run in shell

```shell script
docker-compose up -d
```

*2.* Open [172.29.128.1](http://172.29.128.1) in first and in second browser (or in incognito mode).

### Task definition

> #### Should work this way:
>
> * User 1 enters webpage, enters name, gets into chat room
> * User 2 enters webpage (from another browser), enters name, gets into chat room
> * Users write messages to each other. Each of them sees messages (signed with username) of one another in chat room window.
>
> #### Implementation:
>
> **Backend**: SpringBoot + WebSocket
> 
> * messages from client received through websocket and sent to RabbitMQ
> * RabbitMQ is observed. New messages (from mq) are sent to browser, into chat room window via websocket.
>
> **Frontend**: HTML + JS with any tools you want.
>
> #### Requirements
>
> * Project should be published on github (or any other place, when we can access it)
> * Service has to be wrapped into docker container.
> * Has to be docker-compose file, that will contain your service and rabbitmq.
> * In project root should be README.md file containing instructions. How to build service, how to start service, what we have to open with browser.
