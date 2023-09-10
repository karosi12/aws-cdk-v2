import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { create } from "../services/todo.service";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body) {
      const data = create(JSON.parse(event.body));
      return data;
    }
    return { statusCode: 400, body: "Empty payload" };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
