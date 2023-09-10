import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface AwsCdkV2Props {
  // Define construct properties here
}

export class AwsCdkV2 extends Construct {

  constructor(scope: Construct, id: string, props: AwsCdkV2Props = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkV2Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
