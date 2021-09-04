import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
export interface LambdaPermissionsProps {
}
export declare class LambdaPermissions extends cdk.Construct {
    readonly s3LambdaInvokeVideo: lambda.Permission;
    readonly cloudwatchLambdaInvokeErrors: lambda.Permission;
    readonly cloudwatchLambdaInvokeComplete: lambda.Permission;
    constructor(scope: cdk.Construct, id: string, props: LambdaPermissionsProps);
}
