import { join } from "path";
import { Construct } from "constructs";
import { CfnOutput, Duration } from "aws-cdk-lib";
import {
  CORSOptions,
  APIGateway,
  RestAPI,
} from "../utils/resources/apiGateway";
import { Function } from "../utils/resources/function";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";
import { EventQueue } from "../utils/queue";

export class Todo extends Construct {
  private createTodoIntegration: APIGateway;
  private todoCreateHandler: Function;
  private todoApi: RestAPI;
  private todoQueue: EventQueue;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.todoCreateHandler = new Function(this, "todoLamda", {
      entry: join(__dirname, "controller", "create-todo.ts"),
      // ...todoEnv,
    });

    // Integrates AWS Lambda function into an AWS API Gateway
    this.createTodoIntegration = new APIGateway(this.todoCreateHandler);

    // Todo api
    this.todoApi = new RestAPI(this, "TodoApi", {
      restApiName: "Todo Service",
    });

    const todoCreate = this.todoApi.root.addResource("todos");
    todoCreate.addMethod("POST", this.createTodoIntegration);
    new CORSOptions(todoCreate);

    // SQS Service
    this.todoQueue = new EventQueue(this, "TodoQueue", {
      retentionPeriod: Duration.days(14),
      visibilityTimeout: Duration.minutes(1),
    });


    this.todoCreateHandler.addEnvironment(
      "TODO_QUEUE_URL",
      this.todoQueue.queueUrl
    );

    this.todoCreateHandler.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [this.todoQueue.queueArn],
        actions: ["*"],
      })
    );

    new CfnOutput(this, "TodoBaseUrl", {
      exportName: "TodoBaseUrl",
      value: this.todoApi.url,
      description: `Todo ${this.todoApi.restApiName}`,
    });

    new CfnOutput(this, "TodoQueueUrl", {
      exportName: "TodoQueueUrl",
      value: this.todoQueue.queueUrl,
    });
  }
}
