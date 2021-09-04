import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export interface LambdaPermissionsProps {

}

export class LambdaPermissions extends cdk.Construct {
  public readonly s3LambdaInvokeVideo: lambda.Permission;
  public readonly cloudwatchLambdaInvokeErrors: lambda.Permission;
  public readonly cloudwatchLambdaInvokeComplete: lambda.Permission;

  constructor(scope: cdk.Construct, id: string, props: LambdaPermissionsProps) {
    super(scope, id);

    this.s3LambdaInvokeVideo = {
      principal: new iam.ServicePrincipal('s3.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceAccount: `${cdk.Stack.of(this).account}`
    };

    this.cloudwatchLambdaInvokeErrors = {
      principal: new iam.ServicePrincipal('events.amazonaws.com'),
      action: 'lambda:InvokeFunction',
    }

    this.cloudwatchLambdaInvokeComplete = {
      principal: new iam.ServicePrincipal('events.amazonaws.com'),
      action: 'lambda:InvokeFunction'
    }

    
  }
}