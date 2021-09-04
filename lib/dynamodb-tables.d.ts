import * as cdk from '@aws-cdk/core';
import * as dynamoDb from '@aws-cdk/aws-dynamodb';
export interface DynamoDbTablesProps {
    stackName: string;
}
export declare class DynamoDbTables extends cdk.Construct {
    readonly videoInfo: dynamoDb.CfnTable;
    constructor(scope: cdk.Construct, id: string, props: DynamoDbTablesProps);
}
