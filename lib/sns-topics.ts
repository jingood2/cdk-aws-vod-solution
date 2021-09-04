import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import { KmsKeys } from './kms-keys';
import * as sns_subscrptions from '@aws-cdk/aws-sns-subscriptions';

export interface SnsTopicsProps {
  adminEmail: string;
  kmsKeys: KmsKeys;
  stackName: string;
}

export class SnsTopics extends cdk.Construct {
  public readonly notifications: sns.Topic;

  constructor(scope: cdk.Construct, id: string, props: SnsTopicsProps) {
    super(scope, id);

    this.notifications = new sns.Topic(this, 'Notifications', {
      displayName: `${props.stackName}-Notifications`,
      // masterKey: props.kmsKeys.snsMasterKey,
    });

    this.notifications.addSubscription(
      new sns_subscrptions.EmailSubscription(props.adminEmail)
    )
    
  }
}