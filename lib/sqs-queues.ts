import * as cdk from '@aws-cdk/core';
import { KmsKeys } from './kms-keys';
import * as sqs from '@aws-cdk/aws-sqs';

export interface SqsQueuesProps {
  kmsKeys: KmsKeys;
  stackName: string;
}

export class SqsQueues extends cdk.Construct {

  public readonly main: sqs.Queue; 
  public readonly deadLetter: sqs.Queue;

  constructor(scope: cdk.Construct, id: string, props: SqsQueuesProps) {
    super(scope, id);

    this.deadLetter = new sqs.Queue(this, 'SqsDeadLetterQueue', {
      queueName: `${props.stackName}-SqsDeadLetterQueue`,
      visibilityTimeout: cdk.Duration.seconds(120),
      dataKeyReuse: cdk.Duration.seconds(300),
    });

    this.main = new sqs.Queue(this, 'MainSqsQueue', {
      queueName: `${props.stackName}-MainSqsQueue`,
      visibilityTimeout: cdk.Duration.seconds(120),
      dataKeyReuse: cdk.Duration.seconds(300),
      deadLetterQueue: {
        queue: this.deadLetter,
        maxReceiveCount: 1,
      },
    });
  }
}