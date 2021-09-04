"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyStatements = void 0;
const cdk = require("@aws-cdk/core");
const iam = require("@aws-cdk/aws-iam");
class PolicyStatements extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.archiveSourceRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.archiveSourceRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.archiveSourceRoleS3 = new iam.PolicyStatement({
            actions: ['s3:PutObjectTagging'],
            resources: [props.s3Buckets.source.bucketArn],
        });
        this.customResourceRoleCloudFront = new iam.PolicyStatement({
            actions: [
                'cloudfront:GetDistributionConfig',
                'cloudfront:UpdateDistribution',
            ],
            resources: [
                `arn:${props.partition}:cloudfront::${props.account}:distribution/${props.cloudFronts.distribution.distributionId}`,
            ],
        });
        this.customResourceRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.customResourceRoleMediaConvert = new iam.PolicyStatement({
            actions: [
                'mediaconvert:CreatePreset',
                'mediaconvert:CreateJobTemplate',
                'mediaconvert:DeletePreset',
                'mediaconvert:DeleteJobTemplate',
                'mediaconvert:DescribeEndpoints',
                'mediaconvert:ListJobTemplates',
            ],
            resources: [
                `arn:${props.partition}:mediaconvert:${props.region}:${props.account}:*`,
            ],
        });
        this.customResourceRoleMediaPackageCreateList = new iam.PolicyStatement({
            actions: [
                'mediapackage-vod:CreatePackagingConfiguration',
                'mediapackage-vod:CreatePackagingGroup',
                'mediapackage-vod:ListAssets',
                'mediapackage-vod:ListPackagingConfigurations',
                'mediapackage-vod:ListPackagingGroups',
            ],
            resources: ['*'],
        });
        this.customResourceRoleMediaPackageDelete = new iam.PolicyStatement({
            actions: [
                'mediapackage-vod:DeleteAsset',
                'mediapackage-vod:DeletePackagingConfiguration',
            ],
            resources: [
                `arn:${props.partition}:mediapackage-vod:${props.region}:${props.account}:assets/*`,
                `arn:${props.partition}:mediapackage-vod:${props.region}:${props.account}:packaging-configurations/packaging-config-*`,
            ],
        });
        this.customResourceRoleMediaPackageDescribeDelete = new iam.PolicyStatement({
            actions: [
                'mediapackage-vod:DescribePackagingGroup',
                'mediapackage-vod:DeletePackagingGroup',
            ],
            resources: [
                `arn:${props.partition}:mediapackage-vod:${props.region}:${props.account}:packaging-groups/${props.stackName}-packaging-group`,
            ],
        });
        this.customResourceRoleS3 = new iam.PolicyStatement({
            actions: ['s3:PutBucketNotification', 's3:PutObject', 's3:PutObjectAcl'],
            resources: [props.s3Buckets.source.bucketArn],
        });
        this.destinationBucket = new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            principals: [
                new iam.CanonicalUserPrincipal(props.cloudfrontOriginAccessIdentities.destination.cloudFrontOriginAccessIdentityS3CanonicalUserId),
            ],
            resources: [
                `arn:${props.partition}:s3:::${props.s3Buckets.destination.bucketName}/*`,
            ],
        });
        this.dynamoDbUpdateRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.dynamoDbUpdateRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.dynamoDbUpdateRoleDynamoDb = new iam.PolicyStatement({
            actions: ['dynamoDb:UpdateItem'],
            resources: [
                `arn:${props.partition}:dynamodb:${props.region}:${props.account}:table/${props.dynamoDbTables.videoInfo.tableName}`,
            ],
        });
        this.encodeRoleIam = new iam.PolicyStatement({
            actions: ['iam:PassRole'],
        });
        this.encodeRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.encodeRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.encodeRoleMediaConvert = new iam.PolicyStatement({
            actions: ['mediaconvert:CreateJob', 'mediaconvert:GetJobTemplate'],
            resources: [
                `arn:${props.partition}:mediaconvert:${props.region}:${props.account}:*`,
            ],
        });
        this.encodeRoleS3GetObject = new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [props.s3Buckets.source.bucketArn],
        });
        this.encodeRoleS3PutObject = new iam.PolicyStatement({
            actions: ['s3:PutObject'],
            resources: [props.s3Buckets.destination.bucketArn],
        });
        this.errorHandlerRoleDynamoDb = new iam.PolicyStatement({
            actions: ['dynamodb:UpdateItem'],
            resources: [
                `arn:${props.partition}:dynamodb:${props.region}:${props.account}:table/${props.dynamoDbTables.videoInfo.tableName}`,
            ],
        });
        // this.errorHandlerRoleKms = new iam.PolicyStatement({
        //   actions: ['kms:GenerateDataKey'],
        //   resources: ['*'],
        // });
        this.errorHandlerRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.errorHandlerRoleSns = new iam.PolicyStatement({
            actions: ['sns:Publish'],
            resources: [props.snsTopics.notifications.topicArn],
        });
        this.inputValidateRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.inputValidateRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.inputValidateRoleS3 = new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [`${props.s3Buckets.source.bucketArn}/*`],
        });
        this.mediaConvertRoleExecuteApi = new iam.PolicyStatement({
            actions: ['execute-api:Invoke'],
            resources: [
                `arn:${props.partition}:execute-api:${props.region}:${props.account}:*`,
            ],
        });
        this.mediaConvertRoleS3 = new iam.PolicyStatement({
            actions: ['s3:GetObject', 's3:PutObject'],
            resources: [
                `${props.s3Buckets.source.bucketArn}/*`,
                `${props.s3Buckets.destination.bucketArn}/*`,
            ],
        });
        this.mediaInfoRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.mediaInfoRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.mediaInfoRoleS3 = new iam.PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [`${props.s3Buckets.source.bucketArn}/*`],
        });
        this.mediaPackageAssetRoleIam = new iam.PolicyStatement({
            actions: ['iam:PassRole'],
        });
        this.mediaPackageAssetRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.mediaPackageAssetRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*s`,
            ],
        });
        this.mediaPackageAssetRoleMediaPackage = new iam.PolicyStatement({
            actions: ['mediapackage-vod:CreateAsset'],
            resources: ['*'],
        });
        this.mediaPackageVodRoleS3 = new iam.PolicyStatement({
            actions: [
                's3:GetObject',
                's3:GetBucketLocation',
                's3:GetBucketRequestPayment',
            ],
            resources: [
                `${props.s3Buckets.destination.bucketArn}`,
                `${props.s3Buckets.destination.bucketArn}/*`,
            ],
        });
        this.outputValidateRoleDynamoDb = new iam.PolicyStatement({
            actions: ['dynamodb:GetItem'],
            resources: [
                `arn:${props.partition}:dynamodb:${props.region}:${props.account}:table/${props.dynamoDbTables.videoInfo.tableName}`,
            ],
        });
        this.outputValidateRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.outputValidateRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.outputValidateRoleS3 = new iam.PolicyStatement({
            actions: ['s3:ListBucket'],
            resources: [props.s3Buckets.destination.bucketArn],
        });
        this.profilerRoleDynamoDb = new iam.PolicyStatement({
            actions: ['dynamodb:GetItem'],
            resources: [
                `arn:${props.partition}:dynamodb:${props.region}:${props.account}:table/${props.dynamoDbTables.videoInfo.tableName}`,
            ],
        });
        this.profilerRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.profilerRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.snsNotificationRoleKms = new iam.PolicyStatement({
            actions: ['kms:GenerateDataKey'],
            resources: [props.kmsKeys.snsMasterKey.keyArn],
        });
        this.snsNotificationRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.snsNotificationRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'log:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.snsNotificationRoleSns = new iam.PolicyStatement({
            actions: ['sns:Publish'],
            resources: [props.snsTopics.notifications.topicArn],
            conditions: { Bool: { 'aws:SecureTransport': 'true' } },
        });
        this.sqsSendMessageRoleKms = new iam.PolicyStatement({
            actions: ['kms:GenerateDataKey'],
            resources: [props.kmsKeys.sqsMasterKey.keyArn],
        });
        this.sqsSendMessageRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.sqsSendMessageRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'log:PutLogEvents',
            ],
            resources: [
                `arn:aws:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.sqsSendMessageRoleSqs = new iam.PolicyStatement({
            actions: ['sqs:SendMessage'],
            resources: [props.sqsQueues.main.queueArn],
            conditions: { Bool: { 'aws:SecureTransport': 'true' } },
        });
        this.stepFunctionsRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:${props.stackName}-ErrorHandlerLambdaFunction`,
            ],
        });
        this.stepFunctionsRoleLogs = new iam.PolicyStatement({
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
            ],
            resources: [
                `arn:${props.partition}:logs:${props.region}:${props.account}:log-group:/aws/lambda/*`,
            ],
        });
        this.stepFunctionsRoleStates = new iam.PolicyStatement({
            actions: ['states:StartExecution'],
            resources: [
                `arn:${props.partition}:states:${props.region}:${props.account}:stateMachine:${props.stackName}-IngestWorkflowStateMachine`,
                `arn:${props.partition}:states:${props.region}:${props.account}:stateMachine:${props.stackName}-ProcessWorkflowStateMachine`,
                `arn:${props.partition}:states:${props.region}:${props.account}:stateMachine:${props.stackName}-PublishWorkflowStateMachine`,
            ],
        });
        this.stepFunctionServiceRoleLambda = new iam.PolicyStatement({
            actions: ['lambda:InvokeFunction'],
            resources: [
                `arn:${props.partition}:lambda:${props.region}:${props.account}:function:*`,
            ],
        });
    }
}
exports.PolicyStatements = PolicyStatements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXN0YXRlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2xpY3ktc3RhdGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsd0NBQXdDO0FBd0J4QyxNQUFhLGdCQUFpQixTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBNEZqRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQTRCO1FBQ3hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUNyRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxLQUFLLENBQUMsU0FBUyxXQUFXLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sYUFBYSxLQUFLLENBQUMsU0FBUyw2QkFBNkI7YUFDeEg7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ25ELE9BQU8sRUFBRTtnQkFDUCxxQkFBcUI7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsbUJBQW1CO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULE9BQU8sS0FBSyxDQUFDLFNBQVMsU0FBUyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLDBCQUEwQjthQUN2RjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUM7WUFDakQsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDaEMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQzlDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLEdB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QzdIO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUMzRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxLQUFLLENBQUMsU0FBUyxXQUFXLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sYUFBYTthQUM1RTtTQUNGLENBQUMsQ0FBQztJQVdMLENBQUM7Q0FDRjtBQTNpQkQsNENBMmlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcbmltcG9ydCB7IENsb3VkRnJvbnRzIH0gZnJvbSAnLi9jbG91ZGZyb250cyc7XG5pbXBvcnQgeyBDbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcyB9IGZyb20gJy4vY2xvdWRmcm9udC1vcmlnaW4tYWNjZXNzLWlkZW50aXRpZXMnO1xuaW1wb3J0IHsgRHluYW1vRGJUYWJsZXMgfSBmcm9tICcuL2R5bmFtb2RiLXRhYmxlcyc7XG5pbXBvcnQgeyBLbXNLZXlzIH0gZnJvbSAnLi9rbXMta2V5cyc7XG5pbXBvcnQgeyBTM0J1Y2tldHMgfSBmcm9tICcuL3MzLWJ1Y2tldHMnO1xuaW1wb3J0IHsgU25zVG9waWNzIH0gZnJvbSAnLi9zbnMtdG9waWNzJztcbmltcG9ydCB7IFNxc1F1ZXVlcyB9IGZyb20gJy4vc3FzLXF1ZXVlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9saWN5U3RhdGVtZW50c1Byb3BzIHtcbiAgYWNjb3VudDogc3RyaW5nO1xuICBjbG91ZEZyb250czogQ2xvdWRGcm9udHM7XG4gIGNsb3VkZnJvbnRPcmlnaW5BY2Nlc3NJZGVudGl0aWVzOiBDbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcztcbiAgZHluYW1vRGJUYWJsZXM6IER5bmFtb0RiVGFibGVzO1xuICBrbXNLZXlzOiBLbXNLZXlzO1xuICBwYXJ0aXRpb246IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIHMzQnVja2V0czogUzNCdWNrZXRzO1xuICBzbnNUb3BpY3M6IFNuc1RvcGljcztcbiAgc3FzUXVldWVzOiBTcXNRdWV1ZXM7XG4gIHN0YWNrTmFtZTogc3RyaW5nO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBQb2xpY3lTdGF0ZW1lbnRzIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG5cbiAgLy8gQXJjaGl2ZVNvdXJjZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IGFyY2hpdmVTb3VyY2VSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgYXJjaGl2ZVNvdXJjZVJvbGVMb2dzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgYXJjaGl2ZVNvdXJjZVJvbGVTMzogaWFtLlBvbGljeVN0YXRlbWVudDtcblxuICAvLyBDdXN0b21SZXNvdXJjZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IGN1c3RvbVJlc291cmNlUm9sZUNsb3VkRnJvbnQ6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBjdXN0b21SZXNvdXJjZVJvbGVMb2dzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgY3VzdG9tUmVzb3VyY2VSb2xlTWVkaWFDb252ZXJ0OiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgY3VzdG9tUmVzb3VyY2VSb2xlUzM6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBjdXN0b21SZXNvdXJjZVJvbGVNZWRpYVBhY2thZ2VDcmVhdGVMaXN0OiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgY3VzdG9tUmVzb3VyY2VSb2xlTWVkaWFQYWNrYWdlRGVsZXRlOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgY3VzdG9tUmVzb3VyY2VSb2xlTWVkaWFQYWNrYWdlRGVzY3JpYmVEZWxldGU6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG5cbiAgLy8gRGVzdGluYXRpb25CdWNrZXQgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IGRlc3RpbmF0aW9uQnVja2V0OiBpYW0uUG9saWN5U3RhdGVtZW50O1xuXG4gIC8vIER5bmFtb0RiVXBkYXRlUm9sZSBQb2xpY3kgU3RhdGVtZW50c1xuICBwdWJsaWMgcmVhZG9ubHkgZHluYW1vRGJVcGRhdGVSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgZHluYW1vRGJVcGRhdGVSb2xlTG9nczogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IGR5bmFtb0RiVXBkYXRlUm9sZUR5bmFtb0RiOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuXG4gIC8vIEVuY29kZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IGVuY29kZVJvbGVJYW06IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBlbmNvZGVSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgZW5jb2RlUm9sZUxvZ3M6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBlbmNvZGVSb2xlTWVkaWFDb252ZXJ0OiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgZW5jb2RlUm9sZVMzR2V0T2JqZWN0OiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgZW5jb2RlUm9sZVMzUHV0T2JqZWN0OiBpYW0uUG9saWN5U3RhdGVtZW50O1xuXG4gIC8vIEVycm9ySGFuZGxlclJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IGVycm9ySGFuZGxlclJvbGVEeW5hbW9EYjogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IGVycm9ySGFuZGxlclJvbGVLbXM6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBlcnJvckhhbmRsZXJSb2xlTG9nczogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IGVycm9ySGFuZGxlclJvbGVTbnM6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG5cbiAgLy8gSW5wdXRWYWxpZGF0ZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IGlucHV0VmFsaWRhdGVSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgaW5wdXRWYWxpZGF0ZVJvbGVMb2dzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgaW5wdXRWYWxpZGF0ZVJvbGVTMzogaWFtLlBvbGljeVN0YXRlbWVudDtcblxuICAvLyBNZWRpYUNvbnZlcnRSb2xlIFBvbGljeSBTdGF0ZW1lbnRzXG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUNvbnZlcnRSb2xlRXhlY3V0ZUFwaTogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IG1lZGlhQ29udmVydFJvbGVTMzogaWFtLlBvbGljeVN0YXRlbWVudDtcblxuICAvLyBNZWRpYUluZm9Sb2xlIFBvbGljeSBTdGF0ZW1lbnRzXG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUluZm9Sb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgbWVkaWFJbmZvUm9sZUxvZ3M6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUluZm9Sb2xlUzM6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG5cbiAgLy8gTWVkaWFQYWNrYWdlQXNzZXRSb2xlIFBvbGljeSBTdGF0ZW1lbnRzXG4gIHB1YmxpYyByZWFkb25seSBtZWRpYVBhY2thZ2VBc3NldFJvbGVJYW06IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYVBhY2thZ2VBc3NldFJvbGVMYW1iZGE6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYVBhY2thZ2VBc3NldFJvbGVMb2dzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgbWVkaWFQYWNrYWdlQXNzZXRSb2xlTWVkaWFQYWNrYWdlOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuXG4gIC8vIE1lZGlhUGFja2FnZVZvZFJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IG1lZGlhUGFja2FnZVZvZFJvbGVTMzogaWFtLlBvbGljeVN0YXRlbWVudDtcblxuICAvLyBPdXRwdXRWYWxpZGF0ZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IG91dHB1dFZhbGlkYXRlUm9sZUR5bmFtb0RiOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgb3V0cHV0VmFsaWRhdGVSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgb3V0cHV0VmFsaWRhdGVSb2xlTG9nczogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IG91dHB1dFZhbGlkYXRlUm9sZVMzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuXG4gIC8vIFByb2ZpbGVyIFJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IHByb2ZpbGVyUm9sZUR5bmFtb0RiOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgcHJvZmlsZXJSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgcHJvZmlsZXJSb2xlTG9nczogaWFtLlBvbGljeVN0YXRlbWVudDtcblxuICAvLyBTbnNOb3RpZmljYXRpb25Sb2xlIFBvbGljeSBTdGF0ZW1lbnRzXG4gIHB1YmxpYyByZWFkb25seSBzbnNOb3RpZmljYXRpb25Sb2xlS21zOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgc25zTm90aWZpY2F0aW9uUm9sZUxhbWJkYTogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IHNuc05vdGlmaWNhdGlvblJvbGVMb2dzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgc25zTm90aWZpY2F0aW9uUm9sZVNuczogaWFtLlBvbGljeVN0YXRlbWVudDtcblxuICAvLyBTcXNTZW5kTWVzc2FnZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IHNxc1NlbmRNZXNzYWdlUm9sZUttczogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IHNxc1NlbmRNZXNzYWdlUm9sZUxhbWJkYTogaWFtLlBvbGljeVN0YXRlbWVudDtcbiAgcHVibGljIHJlYWRvbmx5IHNxc1NlbmRNZXNzYWdlUm9sZUxvZ3M6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBzcXNTZW5kTWVzc2FnZVJvbGVTcXM6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG5cbiAgLy8gU3RlcEZ1bmN0aW9uc1JvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IHN0ZXBGdW5jdGlvbnNSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgc3RlcEZ1bmN0aW9uc1JvbGVMb2dzOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgc3RlcEZ1bmN0aW9uc1JvbGVTdGF0ZXM6IGlhbS5Qb2xpY3lTdGF0ZW1lbnQ7XG5cbiAgLy8gU3RlcEZ1bmN0aW9uU2VydmljZVJvbGUgUG9saWN5IFN0YXRlbWVudHNcbiAgcHVibGljIHJlYWRvbmx5IHN0ZXBGdW5jdGlvblNlcnZpY2VSb2xlTGFtYmRhOiBpYW0uUG9saWN5U3RhdGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogUG9saWN5U3RhdGVtZW50c1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMuYXJjaGl2ZVNvdXJjZVJvbGVMYW1iZGEgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ2xhbWJkYTpJbnZva2VGdW5jdGlvbiddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmxhbWJkYToke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpmdW5jdGlvbjoke3Byb3BzLnN0YWNrTmFtZX0tRXJyb3JIYW5kbGVyTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuYXJjaGl2ZVNvdXJjZVJvbGVMb2dzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogW1xuICAgICAgICAnbG9nczpDcmVhdGVMb2dHcm91cCcsXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ1N0cmVhbScsXG4gICAgICAgICdsb2dzOlB1dExvZ0V2ZW50cycsXG4gICAgICBdLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmxvZ3M6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06bG9nLWdyb3VwOi9hd3MvbGFtYmRhLypgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuYXJjaGl2ZVNvdXJjZVJvbGVTMyA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnczM6UHV0T2JqZWN0VGFnZ2luZyddLFxuICAgICAgcmVzb3VyY2VzOiBbcHJvcHMuczNCdWNrZXRzLnNvdXJjZS5idWNrZXRBcm5dLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jdXN0b21SZXNvdXJjZVJvbGVDbG91ZEZyb250ID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogW1xuICAgICAgICAnY2xvdWRmcm9udDpHZXREaXN0cmlidXRpb25Db25maWcnLFxuICAgICAgICAnY2xvdWRmcm9udDpVcGRhdGVEaXN0cmlidXRpb24nLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpjbG91ZGZyb250Ojoke3Byb3BzLmFjY291bnR9OmRpc3RyaWJ1dGlvbi8ke3Byb3BzLmNsb3VkRnJvbnRzLmRpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25JZH1gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuY3VzdG9tUmVzb3VyY2VSb2xlTG9ncyA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nR3JvdXAnLFxuICAgICAgICAnbG9nczpDcmVhdGVMb2dTdHJlYW0nLFxuICAgICAgICAnbG9nczpQdXRMb2dFdmVudHMnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsb2dzOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OmxvZy1ncm91cDovYXdzL2xhbWJkYS8qYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1c3RvbVJlc291cmNlUm9sZU1lZGlhQ29udmVydCA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ21lZGlhY29udmVydDpDcmVhdGVQcmVzZXQnLFxuICAgICAgICAnbWVkaWFjb252ZXJ0OkNyZWF0ZUpvYlRlbXBsYXRlJyxcbiAgICAgICAgJ21lZGlhY29udmVydDpEZWxldGVQcmVzZXQnLFxuICAgICAgICAnbWVkaWFjb252ZXJ0OkRlbGV0ZUpvYlRlbXBsYXRlJyxcbiAgICAgICAgJ21lZGlhY29udmVydDpEZXNjcmliZUVuZHBvaW50cycsXG4gICAgICAgICdtZWRpYWNvbnZlcnQ6TGlzdEpvYlRlbXBsYXRlcycsXG4gICAgICBdLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259Om1lZGlhY29udmVydDoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fToqYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1c3RvbVJlc291cmNlUm9sZU1lZGlhUGFja2FnZUNyZWF0ZUxpc3QgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdtZWRpYXBhY2thZ2Utdm9kOkNyZWF0ZVBhY2thZ2luZ0NvbmZpZ3VyYXRpb24nLFxuICAgICAgICAnbWVkaWFwYWNrYWdlLXZvZDpDcmVhdGVQYWNrYWdpbmdHcm91cCcsXG4gICAgICAgICdtZWRpYXBhY2thZ2Utdm9kOkxpc3RBc3NldHMnLFxuICAgICAgICAnbWVkaWFwYWNrYWdlLXZvZDpMaXN0UGFja2FnaW5nQ29uZmlndXJhdGlvbnMnLFxuICAgICAgICAnbWVkaWFwYWNrYWdlLXZvZDpMaXN0UGFja2FnaW5nR3JvdXBzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jdXN0b21SZXNvdXJjZVJvbGVNZWRpYVBhY2thZ2VEZWxldGUgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdtZWRpYXBhY2thZ2Utdm9kOkRlbGV0ZUFzc2V0JyxcbiAgICAgICAgJ21lZGlhcGFja2FnZS12b2Q6RGVsZXRlUGFja2FnaW5nQ29uZmlndXJhdGlvbicsXG4gICAgICBdLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259Om1lZGlhcGFja2FnZS12b2Q6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06YXNzZXRzLypgLFxuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTptZWRpYXBhY2thZ2Utdm9kOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OnBhY2thZ2luZy1jb25maWd1cmF0aW9ucy9wYWNrYWdpbmctY29uZmlnLSpgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuY3VzdG9tUmVzb3VyY2VSb2xlTWVkaWFQYWNrYWdlRGVzY3JpYmVEZWxldGUgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudChcbiAgICAgIHtcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICdtZWRpYXBhY2thZ2Utdm9kOkRlc2NyaWJlUGFja2FnaW5nR3JvdXAnLFxuICAgICAgICAgICdtZWRpYXBhY2thZ2Utdm9kOkRlbGV0ZVBhY2thZ2luZ0dyb3VwJyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bWVkaWFwYWNrYWdlLXZvZDoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpwYWNrYWdpbmctZ3JvdXBzLyR7cHJvcHMuc3RhY2tOYW1lfS1wYWNrYWdpbmctZ3JvdXBgLFxuICAgICAgICBdLFxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLmN1c3RvbVJlc291cmNlUm9sZVMzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydzMzpQdXRCdWNrZXROb3RpZmljYXRpb24nLCAnczM6UHV0T2JqZWN0JywgJ3MzOlB1dE9iamVjdEFjbCddLFxuICAgICAgcmVzb3VyY2VzOiBbcHJvcHMuczNCdWNrZXRzLnNvdXJjZS5idWNrZXRBcm5dLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kZXN0aW5hdGlvbkJ1Y2tldCA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXG4gICAgICBwcmluY2lwYWxzOiBbXG4gICAgICAgIG5ldyBpYW0uQ2Fub25pY2FsVXNlclByaW5jaXBhbChcbiAgICAgICAgICBwcm9wcy5jbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcy5kZXN0aW5hdGlvbi5jbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHlTM0Nhbm9uaWNhbFVzZXJJZFxuICAgICAgICApLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpzMzo6OiR7cHJvcHMuczNCdWNrZXRzLmRlc3RpbmF0aW9uLmJ1Y2tldE5hbWV9LypgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuZHluYW1vRGJVcGRhdGVSb2xlTGFtYmRhID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsYW1iZGE6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06ZnVuY3Rpb246JHtwcm9wcy5zdGFja05hbWV9LUVycm9ySGFuZGxlckxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmR5bmFtb0RiVXBkYXRlUm9sZUxvZ3MgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ0dyb3VwJyxcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nU3RyZWFtJyxcbiAgICAgICAgJ2xvZ3M6UHV0TG9nRXZlbnRzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bG9nczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9sYW1iZGEvKmAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5keW5hbW9EYlVwZGF0ZVJvbGVEeW5hbW9EYiA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnZHluYW1vRGI6VXBkYXRlSXRlbSddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmR5bmFtb2RiOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OnRhYmxlLyR7cHJvcHMuZHluYW1vRGJUYWJsZXMudmlkZW9JbmZvLnRhYmxlTmFtZX1gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuZW5jb2RlUm9sZUlhbSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnaWFtOlBhc3NSb2xlJ10sXG4gICAgICAvLyBSZXNvdXJjZXMgc2V0IGluIGF3cy12b2QtY2RrLXN0YWNrLnRzXG4gICAgfSk7XG5cbiAgICB0aGlzLmVuY29kZVJvbGVMYW1iZGEgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ2xhbWJkYTpJbnZva2VGdW5jdGlvbiddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmxhbWJkYToke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpmdW5jdGlvbjoke3Byb3BzLnN0YWNrTmFtZX0tRXJyb3JIYW5kbGVyTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuZW5jb2RlUm9sZUxvZ3MgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ0dyb3VwJyxcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nU3RyZWFtJyxcbiAgICAgICAgJ2xvZ3M6UHV0TG9nRXZlbnRzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bG9nczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9sYW1iZGEvKmAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5lbmNvZGVSb2xlTWVkaWFDb252ZXJ0ID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydtZWRpYWNvbnZlcnQ6Q3JlYXRlSm9iJywgJ21lZGlhY29udmVydDpHZXRKb2JUZW1wbGF0ZSddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259Om1lZGlhY29udmVydDoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fToqYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmVuY29kZVJvbGVTM0dldE9iamVjdCA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXG4gICAgICByZXNvdXJjZXM6IFtwcm9wcy5zM0J1Y2tldHMuc291cmNlLmJ1Y2tldEFybl0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmVuY29kZVJvbGVTM1B1dE9iamVjdCA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnczM6UHV0T2JqZWN0J10sXG4gICAgICByZXNvdXJjZXM6IFtwcm9wcy5zM0J1Y2tldHMuZGVzdGluYXRpb24uYnVja2V0QXJuXSxcbiAgICB9KTtcblxuICAgIHRoaXMuZXJyb3JIYW5kbGVyUm9sZUR5bmFtb0RiID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydkeW5hbW9kYjpVcGRhdGVJdGVtJ10sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06ZHluYW1vZGI6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06dGFibGUvJHtwcm9wcy5keW5hbW9EYlRhYmxlcy52aWRlb0luZm8udGFibGVOYW1lfWAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgLy8gdGhpcy5lcnJvckhhbmRsZXJSb2xlS21zID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgIC8vICAgYWN0aW9uczogWydrbXM6R2VuZXJhdGVEYXRhS2V5J10sXG4gICAgLy8gICByZXNvdXJjZXM6IFsnKiddLFxuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5lcnJvckhhbmRsZXJSb2xlTG9ncyA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nR3JvdXAnLFxuICAgICAgICAnbG9nczpDcmVhdGVMb2dTdHJlYW0nLFxuICAgICAgICAnbG9nczpQdXRMb2dFdmVudHMnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsb2dzOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OmxvZy1ncm91cDovYXdzL2xhbWJkYS8qYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmVycm9ySGFuZGxlclJvbGVTbnMgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ3NuczpQdWJsaXNoJ10sXG4gICAgICByZXNvdXJjZXM6IFtwcm9wcy5zbnNUb3BpY3Mubm90aWZpY2F0aW9ucy50b3BpY0Fybl0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmlucHV0VmFsaWRhdGVSb2xlTGFtYmRhID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsYW1iZGE6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06ZnVuY3Rpb246JHtwcm9wcy5zdGFja05hbWV9LUVycm9ySGFuZGxlckxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmlucHV0VmFsaWRhdGVSb2xlTG9ncyA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nR3JvdXAnLFxuICAgICAgICAnbG9nczpDcmVhdGVMb2dTdHJlYW0nLFxuICAgICAgICAnbG9nczpQdXRMb2dFdmVudHMnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsb2dzOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OmxvZy1ncm91cDovYXdzL2xhbWJkYS8qYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmlucHV0VmFsaWRhdGVSb2xlUzMgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ3MzOkdldE9iamVjdCddLFxuICAgICAgcmVzb3VyY2VzOiBbYCR7cHJvcHMuczNCdWNrZXRzLnNvdXJjZS5idWNrZXRBcm59LypgXSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFDb252ZXJ0Um9sZUV4ZWN1dGVBcGkgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ2V4ZWN1dGUtYXBpOkludm9rZSddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmV4ZWN1dGUtYXBpOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OipgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFDb252ZXJ0Um9sZVMzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydzMzpHZXRPYmplY3QnLCAnczM6UHV0T2JqZWN0J10sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYCR7cHJvcHMuczNCdWNrZXRzLnNvdXJjZS5idWNrZXRBcm59LypgLFxuICAgICAgICBgJHtwcm9wcy5zM0J1Y2tldHMuZGVzdGluYXRpb24uYnVja2V0QXJufS8qYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLm1lZGlhSW5mb1JvbGVMYW1iZGEgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ2xhbWJkYTpJbnZva2VGdW5jdGlvbiddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmxhbWJkYToke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpmdW5jdGlvbjoke3Byb3BzLnN0YWNrTmFtZX0tRXJyb3JIYW5kbGVyTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFJbmZvUm9sZUxvZ3MgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ0dyb3VwJyxcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nU3RyZWFtJyxcbiAgICAgICAgJ2xvZ3M6UHV0TG9nRXZlbnRzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bG9nczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9sYW1iZGEvKmAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYUluZm9Sb2xlUzMgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ3MzOkdldE9iamVjdCddLFxuICAgICAgcmVzb3VyY2VzOiBbYCR7cHJvcHMuczNCdWNrZXRzLnNvdXJjZS5idWNrZXRBcm59LypgXSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFQYWNrYWdlQXNzZXRSb2xlSWFtID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydpYW06UGFzc1JvbGUnXSxcbiAgICAgIC8vIFJlc291cmNlcyBzZXQgaW4gYXdzLXZvZC1jZGstc3RhY2sudHNcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFQYWNrYWdlQXNzZXRSb2xlTGFtYmRhID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsYW1iZGE6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06ZnVuY3Rpb246JHtwcm9wcy5zdGFja05hbWV9LUVycm9ySGFuZGxlckxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLm1lZGlhUGFja2FnZUFzc2V0Um9sZUxvZ3MgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ0dyb3VwJyxcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nU3RyZWFtJyxcbiAgICAgICAgJ2xvZ3M6UHV0TG9nRXZlbnRzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bG9nczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9sYW1iZGEvKnNgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFQYWNrYWdlQXNzZXRSb2xlTWVkaWFQYWNrYWdlID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydtZWRpYXBhY2thZ2Utdm9kOkNyZWF0ZUFzc2V0J10sXG4gICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYVBhY2thZ2VWb2RSb2xlUzMgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdzMzpHZXRPYmplY3QnLFxuICAgICAgICAnczM6R2V0QnVja2V0TG9jYXRpb24nLFxuICAgICAgICAnczM6R2V0QnVja2V0UmVxdWVzdFBheW1lbnQnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgJHtwcm9wcy5zM0J1Y2tldHMuZGVzdGluYXRpb24uYnVja2V0QXJufWAsXG4gICAgICAgIGAke3Byb3BzLnMzQnVja2V0cy5kZXN0aW5hdGlvbi5idWNrZXRBcm59LypgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMub3V0cHV0VmFsaWRhdGVSb2xlRHluYW1vRGIgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ2R5bmFtb2RiOkdldEl0ZW0nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpkeW5hbW9kYjoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTp0YWJsZS8ke3Byb3BzLmR5bmFtb0RiVGFibGVzLnZpZGVvSW5mby50YWJsZU5hbWV9YCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLm91dHB1dFZhbGlkYXRlUm9sZUxhbWJkYSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnbGFtYmRhOkludm9rZUZ1bmN0aW9uJ10sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bGFtYmRhOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OmZ1bmN0aW9uOiR7cHJvcHMuc3RhY2tOYW1lfS1FcnJvckhhbmRsZXJMYW1iZGFGdW5jdGlvbmAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5vdXRwdXRWYWxpZGF0ZVJvbGVMb2dzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogW1xuICAgICAgICAnbG9nczpDcmVhdGVMb2dHcm91cCcsXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ1N0cmVhbScsXG4gICAgICAgICdsb2dzOlB1dExvZ0V2ZW50cycsXG4gICAgICBdLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmxvZ3M6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06bG9nLWdyb3VwOi9hd3MvbGFtYmRhLypgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMub3V0cHV0VmFsaWRhdGVSb2xlUzMgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ3MzOkxpc3RCdWNrZXQnXSxcbiAgICAgIHJlc291cmNlczogW3Byb3BzLnMzQnVja2V0cy5kZXN0aW5hdGlvbi5idWNrZXRBcm5dLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9maWxlclJvbGVEeW5hbW9EYiA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6R2V0SXRlbSddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmR5bmFtb2RiOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OnRhYmxlLyR7cHJvcHMuZHluYW1vRGJUYWJsZXMudmlkZW9JbmZvLnRhYmxlTmFtZX1gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvZmlsZXJSb2xlTGFtYmRhID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsYW1iZGE6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06ZnVuY3Rpb246JHtwcm9wcy5zdGFja05hbWV9LUVycm9ySGFuZGxlckxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnByb2ZpbGVyUm9sZUxvZ3MgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ0dyb3VwJyxcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nU3RyZWFtJyxcbiAgICAgICAgJ2xvZ3M6UHV0TG9nRXZlbnRzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bG9nczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9sYW1iZGEvKmAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zbnNOb3RpZmljYXRpb25Sb2xlS21zID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydrbXM6R2VuZXJhdGVEYXRhS2V5J10sXG4gICAgICByZXNvdXJjZXM6IFtwcm9wcy5rbXNLZXlzLnNuc01hc3RlcktleS5rZXlBcm5dLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zbnNOb3RpZmljYXRpb25Sb2xlTGFtYmRhID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsYW1iZGE6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06ZnVuY3Rpb246JHtwcm9wcy5zdGFja05hbWV9LUVycm9ySGFuZGxlckxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnNuc05vdGlmaWNhdGlvblJvbGVMb2dzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogW1xuICAgICAgICAnbG9nczpDcmVhdGVMb2dHcm91cCcsXG4gICAgICAgICdsb2dzOkNyZWF0ZUxvZ1N0cmVhbScsXG4gICAgICAgICdsb2c6UHV0TG9nRXZlbnRzJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bG9nczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpsb2ctZ3JvdXA6L2F3cy9sYW1iZGEvKmAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zbnNOb3RpZmljYXRpb25Sb2xlU25zID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydzbnM6UHVibGlzaCddLFxuICAgICAgcmVzb3VyY2VzOiBbcHJvcHMuc25zVG9waWNzLm5vdGlmaWNhdGlvbnMudG9waWNBcm5dLFxuICAgICAgY29uZGl0aW9uczogeyBCb29sOiB7ICdhd3M6U2VjdXJlVHJhbnNwb3J0JzogJ3RydWUnIH0gfSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3FzU2VuZE1lc3NhZ2VSb2xlS21zID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydrbXM6R2VuZXJhdGVEYXRhS2V5J10sXG4gICAgICByZXNvdXJjZXM6IFtwcm9wcy5rbXNLZXlzLnNxc01hc3RlcktleS5rZXlBcm5dLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zcXNTZW5kTWVzc2FnZVJvbGVMYW1iZGEgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ2xhbWJkYTpJbnZva2VGdW5jdGlvbiddLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OmxhbWJkYToke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpmdW5jdGlvbjoke3Byb3BzLnN0YWNrTmFtZX0tRXJyb3JIYW5kbGVyTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3FzU2VuZE1lc3NhZ2VSb2xlTG9ncyA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nR3JvdXAnLFxuICAgICAgICAnbG9nczpDcmVhdGVMb2dTdHJlYW0nLFxuICAgICAgICAnbG9nOlB1dExvZ0V2ZW50cycsXG4gICAgICBdLFxuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIGBhcm46YXdzOmxvZ3M6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06bG9nLWdyb3VwOi9hd3MvbGFtYmRhLypgLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3FzU2VuZE1lc3NhZ2VSb2xlU3FzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydzcXM6U2VuZE1lc3NhZ2UnXSxcbiAgICAgIHJlc291cmNlczogW3Byb3BzLnNxc1F1ZXVlcy5tYWluLnF1ZXVlQXJuXSxcbiAgICAgIGNvbmRpdGlvbnM6IHsgQm9vbDogeyAnYXdzOlNlY3VyZVRyYW5zcG9ydCc6ICd0cnVlJyB9IH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnN0ZXBGdW5jdGlvbnNSb2xlTGFtYmRhID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsYW1iZGE6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06ZnVuY3Rpb246JHtwcm9wcy5zdGFja05hbWV9LUVycm9ySGFuZGxlckxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnN0ZXBGdW5jdGlvbnNSb2xlTG9ncyA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ2xvZ3M6Q3JlYXRlTG9nR3JvdXAnLFxuICAgICAgICAnbG9nczpDcmVhdGVMb2dTdHJlYW0nLFxuICAgICAgICAnbG9nczpQdXRMb2dFdmVudHMnLFxuICAgICAgXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpsb2dzOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OmxvZy1ncm91cDovYXdzL2xhbWJkYS8qYCxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnN0ZXBGdW5jdGlvbnNSb2xlU3RhdGVzID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgYWN0aW9uczogWydzdGF0ZXM6U3RhcnRFeGVjdXRpb24nXSxcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBgYXJuOiR7cHJvcHMucGFydGl0aW9ufTpzdGF0ZXM6JHtwcm9wcy5yZWdpb259OiR7cHJvcHMuYWNjb3VudH06c3RhdGVNYWNoaW5lOiR7cHJvcHMuc3RhY2tOYW1lfS1Jbmdlc3RXb3JrZmxvd1N0YXRlTWFjaGluZWAsXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OnN0YXRlczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpzdGF0ZU1hY2hpbmU6JHtwcm9wcy5zdGFja05hbWV9LVByb2Nlc3NXb3JrZmxvd1N0YXRlTWFjaGluZWAsXG4gICAgICAgIGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OnN0YXRlczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpzdGF0ZU1hY2hpbmU6JHtwcm9wcy5zdGFja05hbWV9LVB1Ymxpc2hXb3JrZmxvd1N0YXRlTWFjaGluZWAsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGVwRnVuY3Rpb25TZXJ2aWNlUm9sZUxhbWJkYSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGFjdGlvbnM6IFsnbGFtYmRhOkludm9rZUZ1bmN0aW9uJ10sXG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYGFybjoke3Byb3BzLnBhcnRpdGlvbn06bGFtYmRhOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OmZ1bmN0aW9uOipgLFxuICAgICAgXSxcbiAgICB9KTtcblxuXG5cblxuXG5cblxuXG5cbiAgICBcbiAgfVxufSJdfQ==