import * as cdk from '@aws-cdk/core';
import * as stepfunctions from '@aws-cdk/aws-stepfunctions';
export interface StepFunctionsChoicesProps {
    stackName: string;
}
export declare class StepFunctionsChoices extends cdk.Construct {
    readonly ingestWorkflowSnsChoice: stepfunctions.Choice;
    readonly processWorkflowAcceleratedTranscodingCheck: stepfunctions.Choice;
    readonly processWorkflowEncodingProfileCheck: stepfunctions.Choice;
    readonly processWorkflowFrameCaptureCheck: stepfunctions.Choice;
    readonly publishWorkflowArchiveSource: stepfunctions.Choice;
    readonly publishWorkflowMediaPackage: stepfunctions.Choice;
    readonly publishWorkflowSns: stepfunctions.Choice;
    readonly publishWorkflowSqs: stepfunctions.Choice;
    constructor(scope: cdk.Construct, id: string, props: StepFunctionsChoicesProps);
}
