import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export interface S3BucketsProps {
  stackName: string;
}

export class S3Buckets extends cdk.Construct {

  public readonly destination: s3.Bucket;
  public readonly logs: s3.Bucket;
  public readonly source: s3.Bucket;

  constructor(scope: cdk.Construct, id: string, props: S3BucketsProps) {
    super(scope, id);

    this.logs = new s3.Bucket(this, 'LogsBucket', {
      bucketName: `${props.stackName.toLowerCase()}-logs`,
      accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.destination = new s3.Bucket(this, 'DestinationBucket', {
      bucketName: `${props.stackName.toLowerCase()}-destination`,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          maxAge: 3000,
        },
      ],
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: this.logs,
      serverAccessLogsPrefix: 's3-access/',
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.source = new s3.Bucket(this, 'SourceBucket', {
      bucketName: `${props.stackName.toLowerCase()}-source`,  
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      lifecycleRules: [
        {
          id: `${props.stackName}-source-archive`,
          enabled: true,
          tagFilters: {
            key: `${props.stackName}`,
            value: 'GLACIER',
          },
          transitions: [
            { 
              storageClass: s3.StorageClass.GLACIER,
              transitionAfter: cdk.Duration.days(1),
            }
          ]
        },
        {
          id: `${props.stackName}-source-deep-archive`,
          enabled: true,
          tagFilters: {
            key: `${props.stackName}`,
            value: 'DEEP_ARCHIVE',
          },
          transitions: [
            {
              storageClass: s3.StorageClass.DEEP_ARCHIVE,
              transitionAfter: cdk.Duration.days(1),
            },
          ],
        },
      ],
      encryption: s3.BucketEncryption.S3_MANAGED,
      serverAccessLogsBucket: this.logs,
      serverAccessLogsPrefix: 's3-access/',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
    
  }
}