import * as cdk from '@aws-cdk/core';
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks';
import { LambdaFunctions } from './lambda-functions';
export interface StepFunctionsTasksProps {
    lambdaFunctions: LambdaFunctions;
    stackName: string;
}
export declare class StepFunctionsTasks extends cdk.Construct {
    readonly ingestWorkflowInputValidate: tasks.LambdaInvoke;
    readonly ingestWorkflowMediaInfo: tasks.LambdaInvoke;
    readonly ingestWorkflowDynamoDbUpdate: tasks.LambdaInvoke;
    readonly ingestWorkflowSnsNotifications: tasks.LambdaInvoke;
    readonly ingestWorkflowProcessExecute: tasks.LambdaInvoke;
    readonly processWorkflowProfiler: tasks.LambdaInvoke;
    readonly processWorkflowEncodeJobSubmit: tasks.LambdaInvoke;
    readonly processWorkflowDynamoDbUpdate: tasks.LambdaInvoke;
    readonly publishWorkflowValidateEncodingOutput: tasks.LambdaInvoke;
    readonly publishWorkflowArchive: tasks.LambdaInvoke;
    readonly publishWorkflowDeepArchive: tasks.LambdaInvoke;
    readonly publishWorkflowMediaPackageAssets: tasks.LambdaInvoke;
    readonly publishWorkflowDynamoDbUpdate: tasks.LambdaInvoke;
    readonly publishWorkflowSqsSendMessage: tasks.LambdaInvoke;
    readonly publishWorkflowSnsNotification: tasks.LambdaInvoke;
    constructor(scope: cdk.Construct, id: string, props: StepFunctionsTasksProps);
}
