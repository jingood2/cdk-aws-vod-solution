import * as cdk from '@aws-cdk/core';
import { LambdaFunctions } from './lambda-functions';
import { S3Buckets } from './s3-buckets';
import { CloudFronts } from './cloudfronts';
export interface CustomResourcesProps {
    cloudFronts: CloudFronts;
    enableMediaPackage: boolean;
    frameCapture: boolean;
    glacier: string;
    lambdaFunctions: LambdaFunctions;
    s3Buckets: S3Buckets;
    sendAnonymousMetrics: boolean;
    stackName: string;
    workflowTrigger: string;
}
export declare class CustomResources extends cdk.Construct {
    readonly anonymousMetrics: cdk.CustomResource | undefined;
    readonly mediaConvertEndPoint: cdk.CustomResource;
    readonly mediaConvertTemplates: cdk.CustomResource;
    readonly mediaPackageVod: cdk.CustomResource;
    readonly s3Config: cdk.CustomResource;
    readonly uuid: cdk.CustomResource | undefined;
    constructor(scope: cdk.Construct, id: string, props: CustomResourcesProps);
}
