import {
  LambdaIntegration,
  MockIntegration,
  PassthroughBehavior,
  IResource,
  RestApi,
  RestApiProps,
  ApiKeySourceType,
} from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class APIGateway extends LambdaIntegration {
  constructor(scope: IFunction) {
    super(scope);
  }
}

export class RestAPI extends RestApi {
  constructor(scope: Construct, id: string, props?: RestApiProps) {
    super(scope, id, {
      apiKeySourceType: ApiKeySourceType.HEADER,
      deployOptions: {
        stageName: process.env.STACK_ENV,
      },
      ...props,
    });
  }
}

export class CORSOptions {
  constructor(apiResource: IResource) {
    apiResource.addMethod(
      "OPTIONS",
      new MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers":
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              "method.response.header.Access-Control-Allow-Origin": "'*'",
              "method.response.header.Access-Control-Allow-Credentials":
                "'false'",
              "method.response.header.Access-Control-Allow-Methods":
                "'OPTIONS,GET,PUT,POST,DELETE'",
            },
          },
        ],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Credentials": true,
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );
  }
}
