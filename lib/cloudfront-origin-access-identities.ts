import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export interface CloudfrontOriginAccessIdentitiesProps {
  stackName: string;
}

export class CloudfrontOriginAccessIdentities extends cdk.Construct {

  public readonly destination: cloudfront.OriginAccessIdentity;

  constructor(scope: cdk.Construct, id: string, props: CloudfrontOriginAccessIdentitiesProps) {
    super(scope, id);

    this.destination = new cloudfront.OriginAccessIdentity(
      this,
      'CloudfrontDestinationOriginAccessIdentity'
    );

  }
}