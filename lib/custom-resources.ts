import * as cdk from '@aws-cdk/core';
import { LambdaFunctions } from './lambda-functions';
import { S3Buckets } from './s3-buckets';
import { CloudFronts } from './cloudfronts';

export interface CustomResourcesProps {
  cloudFronts: CloudFronts;
  enableMediaPackage: boolean;
  frameCapture: boolean;
  glacier: string;
  lambdaFunctions: LambdaFunctions;
  s3Buckets: S3Buckets;
  sendAnonymousMetrics: boolean;
  stackName: string;
  workflowTrigger: string;
}

export class CustomResources extends cdk.Construct {
  public readonly anonymousMetrics: cdk.CustomResource | undefined;
  public readonly mediaConvertEndPoint: cdk.CustomResource;
  public readonly mediaConvertTemplates: cdk.CustomResource;
  public readonly mediaPackageVod: cdk.CustomResource;
  public readonly s3Config: cdk.CustomResource;
  public readonly uuid: cdk.CustomResource | undefined;

  constructor(scope: cdk.Construct, id: string, props: CustomResourcesProps) {
    super(scope, id);

    this.uuid = props.sendAnonymousMetrics
      ? new cdk.CustomResource(this, 'UUID', {
          resourceType: 'Custom::UUID',
          serviceToken: props.lambdaFunctions.customResource.functionArn,
          properties: { Resource: 'UUID' },
        })
      : undefined;

    this.anonymousMetrics =
      props.sendAnonymousMetrics && this.uuid !== undefined
        ? new cdk.CustomResource(this, 'AnonymousMetrics', {
            resourceType: 'Custom::LoadLambda',
            serviceToken: props.lambdaFunctions.customResource.functionArn,
            properties: {
              SolutionId: 'SO0021',
              UUID: this.uuid.getAtt('UUID'),
              //Version: this.node.tryGetContext('version') ?? '1.0.0',
              Version: '1.0.0',
              Transcoder: 'MediaConvert',
              WorkflowTrigger: props.workflowTrigger,
              Glacier: props.glacier,
              FrameCapture: props.frameCapture,
              Resource: 'AnonymousMetrics',
              EnableMediaPackage: props.enableMediaPackage,
            },
          })
        : undefined;

    this.mediaConvertEndPoint = new cdk.CustomResource(
      this,
      'MediaConvertEndPoint',
      {
        resourceType: 'Custom::LoadLambda',
        serviceToken: props.lambdaFunctions.customResource.functionArn,
        properties: { Resource: 'EndPoint' },
      }
    );

    this.mediaConvertTemplates = new cdk.CustomResource(
      this,
      'MediaConvertTemplates',
      {
        resourceType: 'Custom::LoadLambda',
        serviceToken: props.lambdaFunctions.customResource.functionArn,
        properties: {
          Resource: 'MediaConvertTemplates',
          StackName: props.stackName,
          EndPoint: this.mediaConvertEndPoint.getAtt('EndpointUrl'),
          EnableMediaPackage: props.enableMediaPackage,
          EnableNewTemplates: true,
        },
      }
    );

    this.mediaPackageVod = new cdk.CustomResource(this, 'MediaPackageVod', {
      resourceType: 'Custom::LoadLambda',
      serviceToken: props.lambdaFunctions.customResource.functionArn,
      properties: {
        Resource: 'MediaPackageVod',
        StackName: props.stackName,
        GroupId: `${props.stackName}-packaging-group`,
        PackagingConfigurations: 'HLS,DASH,MSS,CMAF',
        DistributionId: props.cloudFronts.distribution.distributionId,
        EnableMediaPackage: props.enableMediaPackage,
      },
    });

    /**
     * Custom Resource에 대해 CloudFormation은 serviceToken에 요청을 보냄
     */
    this.s3Config = new cdk.CustomResource(this, 'S3Config', {
      resourceType: 'Custom::S3',
      serviceToken: props.lambdaFunctions.customResource.functionArn,
      properties: {
        Source: props.s3Buckets.source.bucketName,
        IngestArn: props.lambdaFunctions.stepFunctions.functionArn,
        Resource: 'S3Notification',
        WorkflowTrigger: props.workflowTrigger,
      },
    });
  }
}