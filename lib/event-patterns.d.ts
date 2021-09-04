import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';
export interface EventPatternsProps {
    stackName: string;
}
export declare class EventPatterns extends cdk.Construct {
    readonly encodeComplete: events.EventPattern;
    readonly encodeError: events.EventPattern;
    constructor(scope: cdk.Construct, id: string, props: EventPatternsProps);
}
