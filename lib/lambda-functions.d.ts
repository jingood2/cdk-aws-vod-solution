import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { IamRoles } from './iam-roles';
import { S3Buckets } from './s3-buckets';
import { CloudFronts } from './cloudfronts';
import { LambdaPermissions } from './lambda-permissions';
import { DynamoDbTables } from './dynamodb-tables';
import { SqsQueues } from './sqs-queues';
import { SnsTopics } from './sns-topics';
export interface LambdaFunctionsProps {
    acceleratedTranscoding: string;
    account: string;
    cloudFronts: CloudFronts;
    dynamoDbTables: DynamoDbTables;
    enableMediaPackage: boolean;
    enableSns: boolean;
    enableSqs: boolean;
    frameCapture: boolean;
    glacier: string;
    iamRoles: IamRoles;
    lambdaPermissions: LambdaPermissions;
    partition: string;
    region: string;
    s3Buckets: S3Buckets;
    snsTopics: SnsTopics;
    sqsQueues: SqsQueues;
    stackName: string;
}
export declare class LambdaFunctions extends cdk.Construct {
    readonly archiveSource: lambda.Function;
    readonly customResource: lambda.Function;
    readonly dynamoDbUpdate: lambda.Function;
    readonly errorHandler: lambda.Function;
    readonly encode: lambda.Function;
    readonly inputValidate: lambda.Function;
    readonly mediaInfo: lambda.Function;
    readonly mediaPackageAssets: lambda.Function;
    readonly outputValidate: lambda.Function;
    readonly profiler: lambda.Function;
    readonly snsNotification: lambda.Function;
    readonly sqsSendMessage: lambda.Function;
    readonly stepFunctions: lambda.Function;
    constructor(scope: cdk.Construct, id: string, props: LambdaFunctionsProps);
}
