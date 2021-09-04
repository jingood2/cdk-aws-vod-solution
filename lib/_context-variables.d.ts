import * as cdk from '@aws-cdk/core';
export interface ContextVariablesProps {
}
export declare class ContextVariables extends cdk.Construct {
    readonly acceleratedTranscoding: string;
    readonly adminEmail: string;
    readonly cloudFrontDomain: string;
    readonly enableMediaPackage: boolean;
    readonly enableSns: boolean;
    readonly enableSqs: boolean;
    readonly frameCapture: boolean;
    readonly glacier: string;
    readonly hostedZoneId: string;
    readonly prependDomainWithStackStage: boolean;
    readonly sendAnonymousMetrics: boolean;
    readonly workflowTrigger: string;
    constructor(scope: cdk.Construct, id: string, props: ContextVariablesProps);
}
