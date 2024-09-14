// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addQuestionBankQuestion POST /api/questionbankquestion/add */
export async function addQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/questionbankquestion/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteQuestionBankQuestion POST /api/questionbankquestion/delete */
export async function deleteQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionRemoveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionbankquestion/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
