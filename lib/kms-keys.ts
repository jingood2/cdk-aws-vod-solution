import * as cdk from '@aws-cdk/core';
import * as kms from '@aws-cdk/aws-kms';

export interface KmsKeysProps {
  stackName: string;
}

export class KmsKeys extends cdk.Construct {
  public readonly snsMasterKey: kms.Key;
  public readonly sqsMasterKey: kms.Key;

  constructor(scope: cdk.Construct, id: string, props: KmsKeysProps) {
    super(scope, id);

    this.snsMasterKey = new kms.Key(this, 'SnsKmsMasterKey', {
      alias: `${props.stackName}-SnsMasterKey`,
    });

    this.sqsMasterKey = new kms.Key(this, 'SqsKmsMasterKey', {
      alias: `${props.stackName}-SqsMasterKey`,
    });
  }
}