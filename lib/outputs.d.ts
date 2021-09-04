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
export declare class Outputs extends cdk.Construct {
    readonly cloudFront: cdk.CfnOutput;
    readonly destinationBucket: cdk.CfnOutput;
    readonly dynamoDbTable: cdk.CfnOutput;
    readonly sourceBucket: cdk.CfnOutput;
    readonly snsTopic: cdk.CfnOutput;
    readonly sqsArn: cdk.CfnOutput;
    readonly sqsUrl: cdk.CfnOutput;
    readonly uuid: cdk.CfnOutput;
    constructor(scope: cdk.Construct, id: string, props: OutputsProps);
}
