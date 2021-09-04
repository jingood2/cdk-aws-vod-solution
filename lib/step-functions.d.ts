import * as cdk from '@aws-cdk/core';
import * as stepfunctions from '@aws-cdk/aws-stepfunctions';
import { StepFunctionsChoices } from './step-functions-choices';
import { StepFunctionsPasses } from './step-functions-passes';
import { StepFunctionsTasks } from './step-functions-tasks';
import { IamRoles } from './iam-roles';
export interface StepFunctionsProps {
    iamRoles: IamRoles;
    stackName: string;
    stepFunctionsChoices: StepFunctionsChoices;
    stepFunctionsPasses: StepFunctionsPasses;
    stepFunctionsTasks: StepFunctionsTasks;
}
export declare class StepFunctions extends cdk.Construct {
    readonly ingestWorkflowStateMachine: stepfunctions.StateMachine;
    readonly ingestWorkflowChain: stepfunctions.Chain;
    readonly processWorkflowStateMachine: stepfunctions.StateMachine;
    readonly processWorkflowChain: stepfunctions.Chain;
    readonly publishWorkflowStateMachine: stepfunctions.StateMachine;
    readonly publishWorkflowChain: stepfunctions.Chain;
    constructor(scope: cdk.Construct, id: string, props: StepFunctionsProps);
}
