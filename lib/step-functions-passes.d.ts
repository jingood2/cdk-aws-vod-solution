import * as cdk from '@aws-cdk/core';
import * as stepfunctions from '@aws-cdk/aws-stepfunctions';
export interface StepFunctionsPassesProps {
    stackName: string;
}
export declare class StepFunctionsPasses extends cdk.Construct {
    readonly processWorkflowAcceleratedTranscodingDisabled: stepfunctions.Pass;
    readonly processWorkflowAcceleratedTranscodingEnabled: stepfunctions.Pass;
    readonly processWorkflowAcceleratedTranscodingPreferred: stepfunctions.Pass;
    readonly processWorkflowCustomJobTemplate: stepfunctions.Pass;
    readonly processWorkflowFrameCaptureOff: stepfunctions.Pass;
    readonly processWorkflowFrameCaptureOn: stepfunctions.Pass;
    readonly processWorkflowJobTemplate1080p: stepfunctions.Pass;
    readonly processWorkflowJobTemplate2160p: stepfunctions.Pass;
    readonly processWorkflowJobTemplate720p: stepfunctions.Pass;
    readonly publishWorkflowComplete: stepfunctions.Pass;
    constructor(scope: cdk.Construct, id: string, props: StepFunctionsPassesProps);
}
