import * as cdk from '@aws-cdk/core';
export interface CdkVodSolutionStackProps extends cdk.StackProps {
}
export declare class CdkVodSolutionStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: CdkVodSolutionStackProps);
}
