import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import { KmsKeys } from './kms-keys';
export interface SnsTopicsProps {
    adminEmail: string;
    kmsKeys: KmsKeys;
    stackName: string;
}
export declare class SnsTopics extends cdk.Construct {
    readonly notifications: sns.Topic;
    constructor(scope: cdk.Construct, id: string, props: SnsTopicsProps);
}
