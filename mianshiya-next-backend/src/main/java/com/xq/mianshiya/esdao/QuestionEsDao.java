package com.xq.mianshiya.esdao;

import com.xq.mianshiya.model.dto.question.QuestionEsDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * 题目 ES 操作
 *
 * @author xq
 * @create 2024/10/9 11:15
 */
public interface QuestionEsDao
        extends ElasticsearchRepository<QuestionEsDTO, Long> {

}
