import * as cdk from '@aws-cdk/core';
import { DynamoDbTables } from './dynamodb-tables';
import { S3Buckets } from './s3-buckets';
import { CloudFronts } from './cloudfronts';
import { CustomResources } from './custom-resources';
import { SnsTopics } from './sns-topics';
import { SqsQueues } from './sqs-queues';

export interface OutputsProps {
  cloudFronts: CloudFronts;
  customResources: CustomResources;
  dynamoDbTables: DynamoDbTables;
  s3Buckets: S3Buckets;
  snsTopics: SnsTopics;
  sqsQueues: SqsQueues;
  stackName: string;
}

export class Outputs extends cdk.Construct {
  public readonly cloudFront: cdk.CfnOutput;
  public readonly destinationBucket: cdk.CfnOutput;
  public readonly dynamoDbTable: cdk.CfnOutput;
  public readonly sourceBucket: cdk.CfnOutput;
  public readonly snsTopic: cdk.CfnOutput;
  public readonly sqsArn: cdk.CfnOutput;
  public readonly sqsUrl: cdk.CfnOutput;
  public readonly uuid: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props: OutputsProps) {
    super(scope, id);

    this.cloudFront = new cdk.CfnOutput(this, 'CloudFrontOutput', {
      description: `${props.stackName} CloudFront Domain Name`,
      value: props.cloudFronts.distribution.domainName,
      exportName: `${props.stackName}-CloudFront`,
    });

    this.destinationBucket = new cdk.CfnOutput(this, 'DestinationBucketOutput', {
      description: `${props.stackName} Destination S3 Bucket`,
      value: props.s3Buckets.destination.bucketName,
      exportName: `${props.stackName}-DestinationBucket`,
    });

    this.dynamoDbTable = new cdk.CfnOutput(this, 'DynamoDbTableOutput', {
      description: `${props.stackName} DynamoDB Table`,
      value: props.dynamoDbTables.videoInfo.tableName ?? '',
      exportName: `${props.stackName}-DynamoDbTable`,
    });

    this.sourceBucket = new cdk.CfnOutput(this, 'SourceBucketOutput', {
      description: `${props.stackName} Source S3 Bucket`,
      value: props.s3Buckets.source.bucketName,
      exportName: `${props.stackName}-SourceBucket`,
    });

    this.snsTopic = new cdk.CfnOutput(this, 'SnsTopicOutput', {
      description: `${props.stackName} SNS Notification Topic`,
      value: props.snsTopics.notifications.topicArn,
      exportName: `${props.stackName}-SnsTopic`,
    });

    this.sqsArn = new cdk.CfnOutput(this, 'SqsQueueArnOutput', {
      description: `${props.stackName} SQS Queue ARN`,
      value: props.sqsQueues.main.queueArn,
      exportName: `${props.stackName}-SqsQueueArn`,
    });

    this.sqsUrl = new cdk.CfnOutput(this, 'SqsQueueUrlOutput', {
      description: `${props.stackName} SQS Queue URL`,
      value: props.sqsQueues.main.queueUrl,
      exportName: `${props.stackName}-SqsQueueUrl`,
    });
  }
}