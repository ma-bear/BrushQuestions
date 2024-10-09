package com.xq.mianshiya.job.once;

import cn.hutool.core.collection.CollUtil;
import com.xq.mianshiya.esdao.QuestionEsDao;
import com.xq.mianshiya.model.dto.question.QuestionEsDTO;
import com.xq.mianshiya.model.entity.Question;
import com.xq.mianshiya.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 全量同步问题到 ES
 *
 * @author xq
 * @create 2024/10/9 11:22
 */
@Slf4j
@Component
public class FullSyncQuestionToEs implements CommandLineRunner {

    @Resource
    private QuestionService questionService;

    @Resource
    private QuestionEsDao questionEsDao;

    @Override
    public void run(String... args) throws Exception {
        // 全量获取题目（数据量不大的情况下使用)
        List<Question> questionList = questionService.list();
        if (CollUtil.isEmpty(questionList)) {
            return;
        }

        // 转换为 ES DTO
        List<QuestionEsDTO> questionEsDTOList = questionList.stream()
                .map(QuestionEsDTO::objToDto)
                .collect(Collectors.toList());

        // 批次全量同步到 ES
        final int batchSize = 1000;
        int total = questionEsDTOList.size();
        for (int i = 0; i < total; i+=batchSize) {
            int end = Math.min(i + batchSize, total);
            log.info("第{}-{}条数据开始同步", i, end);
            questionEsDao.saveAll(questionEsDTOList.subList(i, end));
        }
        log.info("全量同步问题到 ES 完成, 总条数: {}", total);
    }
}
