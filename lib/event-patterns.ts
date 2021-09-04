import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';

export interface EventPatternsProps {
  stackName: string;
}

export class EventPatterns extends cdk.Construct {

  public readonly encodeComplete: events.EventPattern;
  public readonly encodeError: events.EventPattern;

  constructor(scope: cdk.Construct, id: string, props: EventPatternsProps) {
    super(scope, id);

    this.encodeComplete = {
      source: ['aws.mediaconvert'],
      detail: {
        status: ['COMPLETE'],
      },
    };

    this.encodeError = {
      source: ['aws.mediaconvert'],
      detail: {
        status: ['ERROR'],
      },
    };
  }
}