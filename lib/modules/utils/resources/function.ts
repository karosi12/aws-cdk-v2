import { Construct } from "constructs";
import { Duration } from "aws-cdk-lib";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

export class Function extends NodejsFunction {
  constructor(scope: Construct, id: string, props?: NodejsFunctionProps) {
    super(scope, id, {
      runtime: Runtime.NODEJS_16_X,
      tracing: Tracing.ACTIVE,
      timeout: Duration.seconds(30),
      memorySize: 1024,
      logRetention: props?.logRetention || RetentionDays.TWO_WEEKS,
      ...props,
      bundling: {
        externalModules: [
          "aws-sdk", // Use the 'aws-sdk' available in the Lambda runtime
        ],
        sourceMap: true,
        ...props?.bundling,
        environment: {
          NODE_OPTIONS: "--enable-source-maps",
          ...props?.bundling?.environment,
        },
      },
    });
  }
}
