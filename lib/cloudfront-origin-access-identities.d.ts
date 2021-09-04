import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
export interface CloudfrontOriginAccessIdentitiesProps {
    stackName: string;
}
export declare class CloudfrontOriginAccessIdentities extends cdk.Construct {
    readonly destination: cloudfront.OriginAccessIdentity;
    constructor(scope: cdk.Construct, id: string, props: CloudfrontOriginAccessIdentitiesProps);
}
