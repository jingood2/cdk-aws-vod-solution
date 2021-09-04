import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
export interface S3BucketsProps {
    stackName: string;
}
export declare class S3Buckets extends cdk.Construct {
    readonly destination: s3.Bucket;
    readonly logs: s3.Bucket;
    readonly source: s3.Bucket;
    constructor(scope: cdk.Construct, id: string, props: S3BucketsProps);
}
