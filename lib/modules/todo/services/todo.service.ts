import * as AWS from "aws-sdk";
import { Logger } from "@aws-lambda-powertools/logger";

const sqs = new AWS.SQS();
const logger = new Logger();

import { formatResponse } from "../../utils/Response";
import { Todo } from "../models/todo";
import { verifyEnv } from "../../utils/env";

export const create = async (todo: Todo): Promise<any> => {
  const {
    required: { TODO_QUEUE_URL },
  } = verifyEnv(process.env);
  try {
    const queuePayload = {
      MessageBody: JSON.stringify(todo),
      QueueUrl: TODO_QUEUE_URL,
    };
    // save params in Queue
    await sqs.sendMessage(queuePayload).promise();
    return {
      statusCode: 201,
      body: formatResponse({ message: "Message sent" }),
    };
  } catch (error) {
    const errMsg = error as Error;
    logger.error(errMsg.message);
    return {
      statusCode: 400,
      body: formatResponse({ message: errMsg.message }),
    };
  }
};
