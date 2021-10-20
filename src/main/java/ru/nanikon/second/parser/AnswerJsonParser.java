package ru.nanikon.second.parser;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ru.nanikon.second.dto.Answer;
import ru.nanikon.second.dto.Point;

import java.io.Serializable;
import java.util.Arrays;

/**
 * @author Natalia Nikonova
 */
public class AnswerJsonParser implements Serializable {
    private ObjectMapper objectMapper;

    public AnswerJsonParser() {
        objectMapper = new ObjectMapper();
    }

    public String fromObjectToJson(Answer answer) {
        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(answer.getListPoint().toArray());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Parser error with " + Arrays.toString(answer.getListPoint().toArray()));
        }
    }
}
