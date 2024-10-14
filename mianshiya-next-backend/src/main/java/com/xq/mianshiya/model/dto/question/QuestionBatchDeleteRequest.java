package com.xq.mianshiya.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author xq
 * @create 2024/10/14 10:41
 */
@Data
public class QuestionBatchDeleteRequest implements Serializable {

    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}

