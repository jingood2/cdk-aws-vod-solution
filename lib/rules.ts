import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import { EventPatterns } from './event-patterns';
import { LambdaFunctions } from './lambda-functions';

export interface RulesProps {
  eventPatterns: EventPatterns;
  lambdaFunctions: LambdaFunctions;
  stackName: string;
}

export class Rules extends cdk.Construct {
  public readonly encodeComplete: events.Rule;
  public readonly encodeError: events.Rule;

  constructor(scope: cdk.Construct, id: string, props: RulesProps) {
    super(scope, id);

    // create rule
    this.encodeComplete = new events.Rule(this, 'EncodeCompleteRule', {
      ruleName: `${props.stackName}-EncodeCompleteRule`,
      description: 'MediaConvert Completed event rule',
    });

    // add event pattern for rule
    this.encodeComplete.addEventPattern(props.eventPatterns.encodeComplete);

    // add event target for rule
    this.encodeComplete.addTarget(
      new targets.LambdaFunction(props.lambdaFunctions.stepFunctions)
    );

    this.encodeError = new events.Rule(this, 'EncodeErrorRule', {
      ruleName: `${props.stackName}-EncodeErrorRule`,
      description: 'MediaConvert Error event rule',
    });

    this.encodeError.addEventPattern(props.eventPatterns.encodeError);

    this.encodeError.addTarget(
      new targets.LambdaFunction(props.lambdaFunctions.errorHandler)
    );
  }
}