import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import { PolicyStatements } from './policy-statements';
export interface PolicyDocumentsProps {
    policyStatements: PolicyStatements;
    stackName: string;
}
export declare class PolicyDocuments extends cdk.Construct {
    readonly archiveSource: iam.PolicyDocument;
    readonly customResource: iam.PolicyDocument;
    readonly destinationBucket: iam.PolicyDocument;
    readonly dynamoDbUpdate: iam.PolicyDocument;
    readonly encode: iam.PolicyDocument;
    readonly errorHandler: iam.PolicyDocument;
    readonly inputValidate: iam.PolicyDocument;
    readonly mediaConvert: iam.PolicyDocument;
    readonly mediaInfo: iam.PolicyDocument;
    readonly mediaPackageAssets: iam.PolicyDocument;
    readonly mediaPackageVod: iam.PolicyDocument;
    readonly outputValidate: iam.PolicyDocument;
    readonly profiler: iam.PolicyDocument;
    readonly snsNotification: iam.PolicyDocument;
    readonly sqsSendMessage: iam.PolicyDocument;
    readonly stepFunctions: iam.PolicyDocument;
    readonly stepFunctionsService: iam.PolicyDocument;
    constructor(scope: cdk.Construct, id: string, props: PolicyDocumentsProps);
}
