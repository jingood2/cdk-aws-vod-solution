import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as cloudFront from '@aws-cdk/aws-cloudfront';
import { CloudfrontOriginAccessIdentities } from './cloudfront-origin-access-identities';
import { S3Buckets } from './s3-buckets';
export interface CloudFrontsProps {
    cloudFrontDomain: string;
    cloudfrontOriginAccessIdentities: CloudfrontOriginAccessIdentities;
    hostedZoneId: string;
    region: string;
    s3Buckets: S3Buckets;
    stackName: string;
}
export declare class CloudFronts extends cdk.Construct {
    readonly distribution: cloudFront.Distribution;
    readonly certificate: acm.DnsValidatedCertificate;
    readonly hostedZone: route53.IHostedZone;
    constructor(scope: cdk.Construct, id: string, props: CloudFrontsProps);
}
