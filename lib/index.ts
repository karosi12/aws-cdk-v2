import { App, Stack, StackProps } from "aws-cdk-lib";
import { Todo } from "../lib/modules/todo/todo-stack";

export class TodoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    new Todo(this, "Todo");
  }
}
