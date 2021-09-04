import * as cdk from '@aws-cdk/core';
import { KmsKeys } from './kms-keys';
import * as sqs from '@aws-cdk/aws-sqs';
export interface SqsQueuesProps {
    kmsKeys: KmsKeys;
    stackName: string;
}
export declare class SqsQueues extends cdk.Construct {
    readonly main: sqs.Queue;
    readonly deadLetter: sqs.Queue;
    constructor(scope: cdk.Construct, id: string, props: SqsQueuesProps);
}
