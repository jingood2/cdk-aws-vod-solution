import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { PolicyStatements } from './policy-statements';
import { PolicyDocuments } from './policy-documents';
export interface IamRolesProps {
    policyDocuments: PolicyDocuments;
    policyStatements: PolicyStatements;
    stackName: string;
}
export declare class IamRoles extends cdk.Construct {
    readonly archiveSource: iam.Role;
    readonly customResource: iam.Role;
    readonly dynamoDbUpdate: iam.Role;
    readonly encode: iam.Role;
    readonly errorHandler: iam.Role;
    readonly inputValidate: iam.Role;
    readonly mediaConvert: iam.Role;
    readonly mediaInfo: iam.Role;
    readonly mediaPackageAssets: iam.Role;
    readonly mediaPackageVod: iam.Role;
    readonly outputValidate: iam.Role;
    readonly profiler: iam.Role;
    readonly snsNotification: iam.Role;
    readonly sqsSendMessage: iam.Role;
    readonly stepFunctions: iam.Role;
    readonly stepFunctionsService: iam.Role;
    constructor(scope: cdk.Construct, id: string, props: IamRolesProps);
}
