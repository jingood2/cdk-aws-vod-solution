import * as cdk from '@aws-cdk/core';
import * as events from '@aws-cdk/aws-events';
import { EventPatterns } from './event-patterns';
import { LambdaFunctions } from './lambda-functions';
export interface RulesProps {
    eventPatterns: EventPatterns;
    lambdaFunctions: LambdaFunctions;
    stackName: string;
}
export declare class Rules extends cdk.Construct {
    readonly encodeComplete: events.Rule;
    readonly encodeError: events.Rule;
    constructor(scope: cdk.Construct, id: string, props: RulesProps);
}
