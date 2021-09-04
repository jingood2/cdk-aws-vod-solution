import * as cdk from '@aws-cdk/core';
import * as dynamoDb from '@aws-cdk/aws-dynamodb';

export interface DynamoDbTablesProps {
  stackName: string;
}

export class DynamoDbTables extends cdk.Construct {

  public readonly videoInfo: dynamoDb.CfnTable;

  constructor(scope: cdk.Construct, id: string, props: DynamoDbTablesProps) {
    super(scope, id);

    // Utilize CfnTable Construct to allow access to
    // required items such as KeySchema, etc.
    this.videoInfo = new dynamoDb.CfnTable(this, 'VideoInfoDynamoDbTable', {
      tableName: `${props.stackName}-VideoInfo`,
      attributeDefinitions: [
        {
          attributeName: 'guid',
          attributeType: 'S',
        },
        {
          attributeName: 'srcBucket',
          attributeType: 'S',
        },
        {
          attributeName: 'startTime',
          attributeType: 'S',
        },
      ],
      keySchema: [
        {
          attributeName: 'guid',
          keyType: 'HASH',
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: 'srcBucket-startTime-index',
          keySchema: [
            {
              attributeName: 'srcBucket',
              keyType: 'HASH',
            },
            {
              attributeName: 'startTime',
              keyType: 'RANGE',
            },
          ],
          projection: {
            projectionType: 'ALL',
          },
        },
      ],
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: true,
      },
      billingMode: 'PAY_PER_REQUEST',
    });

    this.videoInfo.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;
    this.videoInfo.cfnOptions.updateReplacePolicy = cdk.CfnDeletionPolicy.RETAIN;
  }
}