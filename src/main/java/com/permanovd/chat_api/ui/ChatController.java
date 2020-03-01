package com.permanovd.chat_api.ui;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

@Slf4j
@AllArgsConstructor
@Controller
public class ChatController extends AbstractWebSocketHandler {

    private RabbitTemplate mq;
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/messages/new")
    public void consumeMessage(@Payload String message) {
        mq.convertAndSend("chat", "message", message);
    }

    @RabbitListener(queues = "message")
    public void onMqMessage(Message message) {
        messagingTemplate.convertAndSend("/chat/messages/onUpdate", new String(message.getBody()));
    }
}
