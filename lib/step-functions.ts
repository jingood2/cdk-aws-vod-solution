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

export class StepFunctions extends cdk.Construct {
  // Ingest Workflow StateMachine, Chain, and States
  public readonly ingestWorkflowStateMachine: stepfunctions.StateMachine;
  public readonly ingestWorkflowChain: stepfunctions.Chain;

  // Process Workflow StateMachine, Chain, and States
  public readonly processWorkflowStateMachine: stepfunctions.StateMachine;
  public readonly processWorkflowChain: stepfunctions.Chain;

  // Publish Workflow StateMachine, Chain, and States
  public readonly publishWorkflowStateMachine: stepfunctions.StateMachine;
  public readonly publishWorkflowChain: stepfunctions.Chain;

  constructor(scope: cdk.Construct, id: string, props: StepFunctionsProps) {
    super(scope, id);

    this.ingestWorkflowChain =
      props.stepFunctionsTasks.ingestWorkflowInputValidate
        .next(props.stepFunctionsTasks.ingestWorkflowMediaInfo)
        .next(props.stepFunctionsTasks.ingestWorkflowDynamoDbUpdate)
        .next(
          props.stepFunctionsChoices.ingestWorkflowSnsChoice
            .when(
              stepfunctions.Condition.booleanEquals('$.enableSns', true),
              props.stepFunctionsTasks.ingestWorkflowSnsNotifications.next(
                props.stepFunctionsTasks.ingestWorkflowProcessExecute
              )
            )
            .otherwise(props.stepFunctionsTasks.ingestWorkflowProcessExecute)
        );

    this.ingestWorkflowStateMachine = new stepfunctions.StateMachine(
      this,
      'IngestWorkflowStateMachine',
      {
        stateMachineName: `${props.stackName}-IngestWorkflowStateMachine`,
        definition: this.ingestWorkflowChain,
        role: props.iamRoles.stepFunctionsService,
      }
    );

    this.processWorkflowChain =
      props.stepFunctionsTasks.processWorkflowProfiler.next(
        props.stepFunctionsChoices.processWorkflowEncodingProfileCheck
          .when(
            stepfunctions.Condition.booleanEquals('$.isCustomTemplate', true),
            props.stepFunctionsPasses.processWorkflowCustomJobTemplate
          )
          .when(
            stepfunctions.Condition.numberEquals('$.encodingProfile', 2160),
            props.stepFunctionsPasses.processWorkflowJobTemplate2160p
          )
          .when(
            stepfunctions.Condition.numberEquals('$.encodingProfile', 1080),
            props.stepFunctionsPasses.processWorkflowJobTemplate1080p
          )
          .when(
            stepfunctions.Condition.numberEquals('$.encodingProfile', 720),
            props.stepFunctionsPasses.processWorkflowJobTemplate720p
          )
          .afterwards()
          .next(
            props.stepFunctionsChoices.processWorkflowAcceleratedTranscodingCheck
              .when(
                stepfunctions.Condition.stringEquals('$.acceleratedTranscoding', 'ENABLED'),
                props.stepFunctionsPasses
                  .processWorkflowAcceleratedTranscodingEnabled
              )
              .when(
                stepfunctions.Condition.stringEquals('$.acceleratedTranscoding', 'PREFERRED'),
                props.stepFunctionsPasses
                  .processWorkflowAcceleratedTranscodingPreferred
              )
              .when(
                stepfunctions.Condition.stringEquals('$.acceleratedTranscoding', 'DISABLED'),
                props.stepFunctionsPasses
                  .processWorkflowAcceleratedTranscodingDisabled
              )
              .afterwards()
              .next(
                props.stepFunctionsChoices.processWorkflowFrameCaptureCheck
                  .when(
                    stepfunctions.Condition.booleanEquals('$.frameCapture', true),
                    props.stepFunctionsPasses.processWorkflowFrameCaptureOn
                  )
                  .otherwise(
                    props.stepFunctionsPasses.processWorkflowFrameCaptureOff
                  )
                  .afterwards()
                  .next(props.stepFunctionsTasks.processWorkflowEncodeJobSubmit)
                  .next(props.stepFunctionsTasks.processWorkflowDynamoDbUpdate)
              )
          )
      );

    this.processWorkflowStateMachine = new stepfunctions.StateMachine(
      this,
      'ProcessWorkflowStateMachine',
      {
        stateMachineName: `${props.stackName}-ProcessWorkflowStateMachine`,
        definition: this.processWorkflowChain,
        role: props.iamRoles.stepFunctionsService,
      }
    );

    this.publishWorkflowChain =
      props.stepFunctionsTasks.publishWorkflowValidateEncodingOutput.next(
        props.stepFunctionsChoices.publishWorkflowArchiveSource
          .when(
            stepfunctions.Condition.stringEquals('$.archiveSource', 'GLACIER'),
            props.stepFunctionsTasks.publishWorkflowArchive.next(
              props.stepFunctionsChoices.publishWorkflowMediaPackage
            )
          )
          .when(
            stepfunctions.Condition.stringEquals('$.archiveSource', 'DEEP_ARCHIVE'),
            props.stepFunctionsTasks.publishWorkflowDeepArchive.next(
              props.stepFunctionsChoices.publishWorkflowMediaPackage
            )
          )
          .otherwise(
            props.stepFunctionsChoices.publishWorkflowMediaPackage
              .when(
                stepfunctions.Condition.booleanEquals('$.enableMediaPackage', true),
                props.stepFunctionsTasks.publishWorkflowMediaPackageAssets.next(
                  props.stepFunctionsTasks.publishWorkflowDynamoDbUpdate
                )
              )
              .otherwise(
                props.stepFunctionsTasks.publishWorkflowDynamoDbUpdate.next(
                  props.stepFunctionsChoices.publishWorkflowSqs
                    .when(
                      stepfunctions.Condition.booleanEquals('$.enableSqs', true),
                      props.stepFunctionsTasks.publishWorkflowSqsSendMessage.next(
                        props.stepFunctionsChoices.publishWorkflowSns
                      )
                    )
                    .otherwise(
                      props.stepFunctionsChoices.publishWorkflowSns
                        .when(
                          stepfunctions.Condition.booleanEquals('$.enableSns', true),
                          props.stepFunctionsTasks.publishWorkflowSnsNotification.next(
                            props.stepFunctionsPasses.publishWorkflowComplete
                          )
                        )
                        .otherwise(
                          props.stepFunctionsPasses.publishWorkflowComplete
                        )
                    )
                )
              )
          )
      );

    this.publishWorkflowStateMachine = new stepfunctions.StateMachine(
      this,
      'PublishWorkflowStateMachine',
      {
        stateMachineName: `${props.stackName}-PublishWorkflowStateMachine`,
        definition: this.publishWorkflowChain,
        role: props.iamRoles.stepFunctionsService,
      }
    );
  }
}