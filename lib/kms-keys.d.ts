import * as cdk from '@aws-cdk/core';
import * as kms from '@aws-cdk/aws-kms';
export interface KmsKeysProps {
    stackName: string;
}
export declare class KmsKeys extends cdk.Construct {
    readonly snsMasterKey: kms.Key;
    readonly sqsMasterKey: kms.Key;
    constructor(scope: cdk.Construct, id: string, props: KmsKeysProps);
}
