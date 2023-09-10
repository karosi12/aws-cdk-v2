import { Queue, QueueProps } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export interface EventQueueProps extends QueueProps {
  maxReceiveCount?: number;
}

export class EventQueue extends Queue {
  constructor(
    scope: Construct,
    id: string,
    { maxReceiveCount = 15, ...props }: EventQueueProps = {}
  ) {
    super(scope, id, {
      deadLetterQueue: {
        queue: new Queue(scope, id + "DLQ"),
        maxReceiveCount,
      },
      ...props,
    });
  }
}
