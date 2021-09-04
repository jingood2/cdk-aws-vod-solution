"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaFunctions = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
class LambdaFunctions extends cdk.Construct {
    constructor(scope, id, props) {
        var _a, _b, _c, _d;
        super(scope, id);
        const layer = new lambda.LayerVersion(this, 'LambdaLayer', {
            code: lambda.Code.fromAsset('./source/layer/nodejs.zip'),
            compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
            license: 'Apache-2.0',
            description: 'A layer to test LambdaLayers',
        });
        this.errorHandler = new lambda.Function(this, 'ErrorHandlerFunction', {
            functionName: `${props.stackName}-ErrorHandlerLambdaFunction`,
            description: 'Captures and processes workflow errors',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/error-handler'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                DynamoDBTable: (_a = props.dynamoDbTables.videoInfo.tableName) !== null && _a !== void 0 ? _a : `${props.stackName}-VideoInfo`,
                SnsTopic: props.snsTopics.notifications.topicArn,
            },
            role: props.iamRoles.errorHandler,
        });
        this.errorHandler.addPermission('ErrorHandlerS3LambdaInvokeVideoPermission', props.lambdaPermissions.s3LambdaInvokeVideo);
        this.archiveSource = new lambda.Function(this, 'ArchiveSourceFunction', {
            functionName: `${props.stackName}-ArchiveSourceLambdaFunction`,
            description: 'Updates tags on source files to enable Glacier',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/archive-source'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ErrorHandler: this.errorHandler.functionArn,
            },
            role: props.iamRoles.archiveSource,
        });
        this.customResource = new lambda.Function(this, 'CustomResourceFunction', {
            functionName: `${props.stackName}-CustomResourceLambdaFunction`,
            description: 'Used to deploy resources not supported by CloudFormation',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/custom-resource'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(180),
            layers: [layer],
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            },
            role: props.iamRoles.customResource,
        });
        this.dynamoDbUpdate = new lambda.Function(this, 'DynamoDbUpdateFunction', {
            functionName: `${props.stackName}-DynamoDbUpdateLambdaFunction`,
            description: 'Updates DynamoDB with event data',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/dynamo'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                DynamoDBTable: (_b = props.dynamoDbTables.videoInfo.tableName) !== null && _b !== void 0 ? _b : `${props.stackName}-VideoInfo`,
                ErrorHandler: this.errorHandler.functionArn,
            },
            layers: [layer],
            role: props.iamRoles.dynamoDbUpdate,
        });
        this.encode = new lambda.Function(this, 'EncodeFunction', {
            functionName: `${props.stackName}-EncodeLambdaFunction`,
            description: 'Creates a MediaConvert encode job',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/encode'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            layers: [layer],
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ErrorHandler: this.errorHandler.functionArn,
                MediaConvertRole: props.iamRoles.mediaConvert.roleArn,
            },
            role: props.iamRoles.encode,
        });
        this.inputValidate = new lambda.Function(this, 'InputValidateFunction', {
            functionName: `${props.stackName}-InputValidateLambdaFunction`,
            description: 'Validates the input given to the workflow',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/input-validate'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            layers: [layer],
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ErrorHandler: this.errorHandler.functionArn,
                WorkflowName: props.stackName,
                FrameCapture: props.frameCapture.toString(),
                ArchiveSource: props.glacier,
                EnableMediaPackage: props.enableMediaPackage.toString(),
                InputRotate: 'DEGREE_0',
                EnableSns: props.enableSns.toString(),
                EnableSqs: props.enableSqs.toString(),
                AcceleratedTranscoding: props.acceleratedTranscoding,
                Source: props.s3Buckets.source.bucketName,
                Destination: props.s3Buckets.destination.bucketName,
                CloudFront: props.cloudFronts.distribution.domainName,
            },
            role: props.iamRoles.inputValidate,
        });
        if (props.enableMediaPackage) {
            this.inputValidate.addEnvironment('MediaConvert_Template_2160p', `${props.stackName}_Ott_2160p_Avc_Aac_16x9_mvod_no_preset`);
            this.inputValidate.addEnvironment('MediaConvert_Template_2160p', `${props.stackName}_Ott_2160p_Avc_Aac_16x9_qvbr_no_preset`);
            this.inputValidate.addEnvironment('MediaConvert_Template_1080p', `${props.stackName}_Ott_1080p_Avc_Aac_16x9_mvod_no_preset`);
            this.inputValidate.addEnvironment('MediaConvert_Template_1080p', `${props.stackName}_Ott_1080p_Avc_Aac_16x9_qvbr_no_preset`);
            this.inputValidate.addEnvironment('MediaConvert_Template_720p', `${props.stackName}_Ott_720p_Avc_Aac_16x9_mvod_no_preset`);
            this.inputValidate.addEnvironment('MediaConvert_Template_720p', `${props.stackName}_Ott_720p_Avc_Aac_16x9_qvbr_no_preset`);
        }
        this.mediaInfo = new lambda.Function(this, 'MediaInfoFunction', {
            functionName: `${props.stackName}-MediaInfoLambdaFunction`,
            description: 'Runs MediaInfo on a pre-signed S3 URL',
            handler: 'lambda_function.lambda_handler',
            code: new lambda.AssetCode('./source/mediainfo'),
            runtime: lambda.Runtime.PYTHON_3_7,
            timeout: cdk.Duration.seconds(120),
            environment: {
                ErrorHandler: this.errorHandler.functionArn,
            },
            role: props.iamRoles.mediaInfo,
        });
        this.mediaPackageAssets = new lambda.Function(this, 'MediaPackageAssetsFunction', {
            functionName: `${props.stackName}-MediaPackageAssetsLambdaFunction`,
            description: 'Ingests an asset into MediaPackage-VOD',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/media-package-assets'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(300),
            layers: [layer],
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ErrorHandler: this.errorHandler.functionArn,
                MediaPackageVodRole: props.iamRoles.mediaPackageVod.roleArn,
            },
            role: props.iamRoles.mediaPackageAssets,
        });
        this.outputValidate = new lambda.Function(this, 'OutputValidateFunction', {
            functionName: `${props.stackName}-OutputValidateLambdaFunction`,
            description: 'Parses MediaConvert job output',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/output-validate'),
            layers: [layer],
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                DynamoDBTable: (_c = props.dynamoDbTables.videoInfo.tableName) !== null && _c !== void 0 ? _c : `${props.stackName}-VideoInfo`,
                ErrorHandler: this.errorHandler.functionArn,
            },
            role: props.iamRoles.outputValidate,
        });
        this.profiler = new lambda.Function(this, 'ProfilerFunction', {
            functionName: `${props.stackName}-ProfilerLambdaFunction`,
            description: 'Sets an EncodeProfile based on mediainfo output',
            handler: 'index.handler',
            code: new lambda.AssetCode('./source/profiler'),
            layers: [layer],
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                DynamoDBTable: (_d = props.dynamoDbTables.videoInfo.tableName) !== null && _d !== void 0 ? _d : `${props.stackName}-VideoInfo`,
                ErrorHandler: this.errorHandler.functionArn,
            },
            role: props.iamRoles.profiler,
        });
        this.snsNotification = new lambda.Function(this, 'SnsNotificationFunction', {
            functionName: `${props.stackName}-SnsNotificationLambdaFunction`,
            description: 'Sends a notification when the encode job is completed',
            handler: 'index.handler',
            layers: [layer],
            code: new lambda.AssetCode('./source/sns-notification'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ErrorHandler: this.errorHandler.functionArn,
                SnsTopic: props.snsTopics.notifications.topicArn,
            },
            role: props.iamRoles.snsNotification,
        });
        this.sqsSendMessage = new lambda.Function(this, 'SqsSendMessageFunction', {
            functionName: `${props.stackName}-SqsSendMessageLambdaFunction`,
            description: 'Publish the workflow results to an SQS queue',
            handler: 'index.handler',
            layers: [layer],
            code: new lambda.AssetCode('./source/sqs-publish'),
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(120),
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                ErrorHandler: this.errorHandler.functionArn,
                SqsQueue: props.sqsQueues.main.queueUrl,
            },
            role: props.iamRoles.sqsSendMessage,
        });
        this.stepFunctions = new lambda.Function(this, 'StepFunctionsFunction', {
            functionName: `${props.stackName}-StepFunctionsLambdaFunction`,
            description: 'Creates a unique identifier (GUID) and executes the Ingest StateMachine',
            code: new lambda.AssetCode('./source/step-functions'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            layers: [layer],
            environment: {
                AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
                IngestWorkflow: `arn:${props.partition}:states:${props.region}:${props.account}:stateMachine:${props.stackName}-IngestWorkflowStateMachine`,
                ProcessWorkflow: `arn:${props.partition}:states:${props.region}:${props.account}:stateMachine:${props.stackName}-ProcessWorkflowStateMachine`,
                PublishWorkflow: `arn:${props.partition}:states:${props.region}:${props.account}:stateMachine:${props.stackName}-PublishWorkflowStateMachine`,
                ErrorHandler: this.errorHandler.functionArn,
            },
            role: props.iamRoles.stepFunctions,
        });
        this.stepFunctions.addPermission('S3LambdaInvokeVideo', props.lambdaPermissions.s3LambdaInvokeVideo);
        this.stepFunctions.addPermission('CloudWatchLambdaInvokeComplete', props.lambdaPermissions.cloudwatchLambdaInvokeComplete);
    }
}
exports.LambdaFunctions = LambdaFunctions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLWZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhbWJkYS1mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQTZCOUMsTUFBYSxlQUFnQixTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBZWhELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBMkI7O1FBQ3ZFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDekQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDO1lBQ3hELGtCQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDaEQsT0FBTyxFQUFFLFlBQVk7WUFDckIsV0FBVyxFQUFFLDhCQUE4QjtTQUM1QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDcEUsWUFBWSxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsNkJBQTZCO1lBQzdELFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztZQUNwRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbEMsV0FBVyxFQUFFO2dCQUNYLG1DQUFtQyxFQUFFLEdBQUc7Z0JBQ3hDLGFBQWEsUUFDWCxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLG1D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V0FBVyxFQUFFO2dCQUNYLG1DQUFtQyxFQUFFLEdBQUc7Z0JBQ3hDLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQyxTQUFTLFdBQVcsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxpQkFBaUIsS0FBSyxDQUFDLFNBQVMsNkJBQTZCO2dCQUMzSSxlQUFlLEVBQUUsT0FBTyxLQUFLLENBQUMsU0FBUyxXQUFXLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8saUJBQWlCLEtBQUssQ0FBQyxTQUFTLDhCQUE4QjtnQkFDN0ksZUFBZSxFQUFFLE9BQU8sS0FBSyxDQUFDLFNBQVMsV0FBVyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLGlCQUFpQixLQUFLLENBQUMsU0FBUyw4QkFBOEI7Z0JBQzdJLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVc7YUFDNUM7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhO1NBQ25DLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM5QixxQkFBcUIsRUFDckIsS0FBSyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUM1QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQzlCLGdDQUFnQyxFQUNoQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsOEJBQThCLENBQ3ZELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE3U0QsMENBNlNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgSWFtUm9sZXMgfSBmcm9tICcuL2lhbS1yb2xlcyc7XG5pbXBvcnQgeyBTM0J1Y2tldHMgfSBmcm9tICcuL3MzLWJ1Y2tldHMnO1xuaW1wb3J0IHsgQ2xvdWRGcm9udHMgfSBmcm9tICcuL2Nsb3VkZnJvbnRzJztcbmltcG9ydCB7IExhbWJkYVBlcm1pc3Npb25zIH0gZnJvbSAnLi9sYW1iZGEtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgRHluYW1vRGJUYWJsZXMgfSBmcm9tICcuL2R5bmFtb2RiLXRhYmxlcyc7XG5pbXBvcnQgeyBTcXNRdWV1ZXMgfSBmcm9tICcuL3Nxcy1xdWV1ZXMnO1xuaW1wb3J0IHsgU25zVG9waWNzIH0gZnJvbSAnLi9zbnMtdG9waWNzJztcblxuZXhwb3J0IGludGVyZmFjZSBMYW1iZGFGdW5jdGlvbnNQcm9wcyB7XG4gIGFjY2VsZXJhdGVkVHJhbnNjb2Rpbmc6IHN0cmluZztcbiAgYWNjb3VudDogc3RyaW5nO1xuICBjbG91ZEZyb250czogQ2xvdWRGcm9udHM7XG4gIGR5bmFtb0RiVGFibGVzOiBEeW5hbW9EYlRhYmxlcztcbiAgZW5hYmxlTWVkaWFQYWNrYWdlOiBib29sZWFuO1xuICBlbmFibGVTbnM6IGJvb2xlYW47XG4gIGVuYWJsZVNxczogYm9vbGVhbjtcbiAgZnJhbWVDYXB0dXJlOiBib29sZWFuO1xuICBnbGFjaWVyOiBzdHJpbmc7XG4gIGlhbVJvbGVzOiBJYW1Sb2xlcztcbiAgbGFtYmRhUGVybWlzc2lvbnM6IExhbWJkYVBlcm1pc3Npb25zO1xuICBwYXJ0aXRpb246IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIHMzQnVja2V0czogUzNCdWNrZXRzO1xuICBzbnNUb3BpY3M6IFNuc1RvcGljcztcbiAgc3FzUXVldWVzOiBTcXNRdWV1ZXM7XG4gIHN0YWNrTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgTGFtYmRhRnVuY3Rpb25zIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBhcmNoaXZlU291cmNlOiBsYW1iZGEuRnVuY3Rpb247XG4gIHB1YmxpYyByZWFkb25seSBjdXN0b21SZXNvdXJjZTogbGFtYmRhLkZ1bmN0aW9uO1xuICBwdWJsaWMgcmVhZG9ubHkgZHluYW1vRGJVcGRhdGU6IGxhbWJkYS5GdW5jdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IGVycm9ySGFuZGxlcjogbGFtYmRhLkZ1bmN0aW9uO1xuICBwdWJsaWMgcmVhZG9ubHkgZW5jb2RlOiBsYW1iZGEuRnVuY3Rpb247XG4gIHB1YmxpYyByZWFkb25seSBpbnB1dFZhbGlkYXRlOiBsYW1iZGEuRnVuY3Rpb247XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUluZm86IGxhbWJkYS5GdW5jdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IG1lZGlhUGFja2FnZUFzc2V0czogbGFtYmRhLkZ1bmN0aW9uO1xuICBwdWJsaWMgcmVhZG9ubHkgb3V0cHV0VmFsaWRhdGU6IGxhbWJkYS5GdW5jdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IHByb2ZpbGVyOiBsYW1iZGEuRnVuY3Rpb247XG4gIHB1YmxpYyByZWFkb25seSBzbnNOb3RpZmljYXRpb246IGxhbWJkYS5GdW5jdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IHNxc1NlbmRNZXNzYWdlOiBsYW1iZGEuRnVuY3Rpb247XG4gIHB1YmxpYyByZWFkb25seSBzdGVwRnVuY3Rpb25zOiBsYW1iZGEuRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBMYW1iZGFGdW5jdGlvbnNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBsYXllciA9IG5ldyBsYW1iZGEuTGF5ZXJWZXJzaW9uKHRoaXMsICdMYW1iZGFMYXllcicsIHtcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnLi9zb3VyY2UvbGF5ZXIvbm9kZWpzLnppcCcpLFxuICAgICAgY29tcGF0aWJsZVJ1bnRpbWVzOiBbbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1hdLFxuICAgICAgbGljZW5zZTogJ0FwYWNoZS0yLjAnLFxuICAgICAgZGVzY3JpcHRpb246ICdBIGxheWVyIHRvIHRlc3QgTGFtYmRhTGF5ZXJzJyxcbiAgICB9KTtcblxuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnRXJyb3JIYW5kbGVyRnVuY3Rpb24nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tRXJyb3JIYW5kbGVyTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgZGVzY3JpcHRpb246ICdDYXB0dXJlcyBhbmQgcHJvY2Vzc2VzIHdvcmtmbG93IGVycm9ycycsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBuZXcgbGFtYmRhLkFzc2V0Q29kZSgnLi9zb3VyY2UvZXJyb3ItaGFuZGxlcicpLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMjApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQVdTX05PREVKU19DT05ORUNUSU9OX1JFVVNFX0VOQUJMRUQ6ICcxJyxcbiAgICAgICAgRHluYW1vREJUYWJsZTpcbiAgICAgICAgICBwcm9wcy5keW5hbW9EYlRhYmxlcy52aWRlb0luZm8udGFibGVOYW1lID8/XG4gICAgICAgICAgYCR7cHJvcHMuc3RhY2tOYW1lfS1WaWRlb0luZm9gLFxuICAgICAgICBTbnNUb3BpYzogcHJvcHMuc25zVG9waWNzLm5vdGlmaWNhdGlvbnMudG9waWNBcm4sXG4gICAgICB9LFxuICAgICAgcm9sZTogcHJvcHMuaWFtUm9sZXMuZXJyb3JIYW5kbGVyLFxuICAgIH0pO1xuXG4gICAgdGhpcy5lcnJvckhhbmRsZXIuYWRkUGVybWlzc2lvbihcbiAgICAgICdFcnJvckhhbmRsZXJTM0xhbWJkYUludm9rZVZpZGVvUGVybWlzc2lvbicsXG4gICAgICBwcm9wcy5sYW1iZGFQZXJtaXNzaW9ucy5zM0xhbWJkYUludm9rZVZpZGVvXG4gICAgKTtcblxuICAgIHRoaXMuYXJjaGl2ZVNvdXJjZSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0FyY2hpdmVTb3VyY2VGdW5jdGlvbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1BcmNoaXZlU291cmNlTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgZGVzY3JpcHRpb246ICdVcGRhdGVzIHRhZ3Mgb24gc291cmNlIGZpbGVzIHRvIGVuYWJsZSBHbGFjaWVyJyxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9hcmNoaXZlLXNvdXJjZScpLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMjApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQVdTX05PREVKU19DT05ORUNUSU9OX1JFVVNFX0VOQUJMRUQ6ICcxJyxcbiAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgIH0sXG4gICAgICByb2xlOiBwcm9wcy5pYW1Sb2xlcy5hcmNoaXZlU291cmNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jdXN0b21SZXNvdXJjZSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0N1c3RvbVJlc291cmNlRnVuY3Rpb24nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tQ3VzdG9tUmVzb3VyY2VMYW1iZGFGdW5jdGlvbmAsXG4gICAgICBkZXNjcmlwdGlvbjogJ1VzZWQgdG8gZGVwbG95IHJlc291cmNlcyBub3Qgc3VwcG9ydGVkIGJ5IENsb3VkRm9ybWF0aW9uJyxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9jdXN0b20tcmVzb3VyY2UnKSxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTgwKSxcbiAgICAgIGxheWVyczogW2xheWVyXSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEFXU19OT0RFSlNfQ09OTkVDVElPTl9SRVVTRV9FTkFCTEVEOiAnMScsXG4gICAgICB9LFxuICAgICAgcm9sZTogcHJvcHMuaWFtUm9sZXMuY3VzdG9tUmVzb3VyY2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmR5bmFtb0RiVXBkYXRlID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnRHluYW1vRGJVcGRhdGVGdW5jdGlvbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1EeW5hbW9EYlVwZGF0ZUxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVXBkYXRlcyBEeW5hbW9EQiB3aXRoIGV2ZW50IGRhdGEnLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUoJy4vc291cmNlL2R5bmFtbycpLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMjApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQVdTX05PREVKU19DT05ORUNUSU9OX1JFVVNFX0VOQUJMRUQ6ICcxJyxcbiAgICAgICAgRHluYW1vREJUYWJsZTpcbiAgICAgICAgICBwcm9wcy5keW5hbW9EYlRhYmxlcy52aWRlb0luZm8udGFibGVOYW1lID8/XG4gICAgICAgICAgYCR7cHJvcHMuc3RhY2tOYW1lfS1WaWRlb0luZm9gLFxuICAgICAgICBFcnJvckhhbmRsZXI6IHRoaXMuZXJyb3JIYW5kbGVyLmZ1bmN0aW9uQXJuLFxuICAgICAgfSxcbiAgICAgIGxheWVyczogW2xheWVyXSxcbiAgICAgIHJvbGU6IHByb3BzLmlhbVJvbGVzLmR5bmFtb0RiVXBkYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5lbmNvZGUgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdFbmNvZGVGdW5jdGlvbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1FbmNvZGVMYW1iZGFGdW5jdGlvbmAsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NyZWF0ZXMgYSBNZWRpYUNvbnZlcnQgZW5jb2RlIGpvYicsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBuZXcgbGFtYmRhLkFzc2V0Q29kZSgnLi9zb3VyY2UvZW5jb2RlJyksXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDEyMCksXG4gICAgICBsYXllcnM6IFtsYXllcl0sXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBBV1NfTk9ERUpTX0NPTk5FQ1RJT05fUkVVU0VfRU5BQkxFRDogJzEnLFxuICAgICAgICBFcnJvckhhbmRsZXI6IHRoaXMuZXJyb3JIYW5kbGVyLmZ1bmN0aW9uQXJuLFxuICAgICAgICBNZWRpYUNvbnZlcnRSb2xlOiBwcm9wcy5pYW1Sb2xlcy5tZWRpYUNvbnZlcnQucm9sZUFybixcbiAgICAgIH0sXG4gICAgICByb2xlOiBwcm9wcy5pYW1Sb2xlcy5lbmNvZGUsXG4gICAgfSk7XG5cbiAgICB0aGlzLmlucHV0VmFsaWRhdGUgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdJbnB1dFZhbGlkYXRlRnVuY3Rpb24nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tSW5wdXRWYWxpZGF0ZUxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVmFsaWRhdGVzIHRoZSBpbnB1dCBnaXZlbiB0byB0aGUgd29ya2Zsb3cnLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUoJy4vc291cmNlL2lucHV0LXZhbGlkYXRlJyksXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDEyMCksXG4gICAgICBsYXllcnM6IFtsYXllcl0sXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBBV1NfTk9ERUpTX0NPTk5FQ1RJT05fUkVVU0VfRU5BQkxFRDogJzEnLFxuICAgICAgICBFcnJvckhhbmRsZXI6IHRoaXMuZXJyb3JIYW5kbGVyLmZ1bmN0aW9uQXJuLFxuICAgICAgICBXb3JrZmxvd05hbWU6IHByb3BzLnN0YWNrTmFtZSxcbiAgICAgICAgRnJhbWVDYXB0dXJlOiBwcm9wcy5mcmFtZUNhcHR1cmUudG9TdHJpbmcoKSxcbiAgICAgICAgQXJjaGl2ZVNvdXJjZTogcHJvcHMuZ2xhY2llcixcbiAgICAgICAgRW5hYmxlTWVkaWFQYWNrYWdlOiBwcm9wcy5lbmFibGVNZWRpYVBhY2thZ2UudG9TdHJpbmcoKSxcbiAgICAgICAgSW5wdXRSb3RhdGU6ICdERUdSRUVfMCcsXG4gICAgICAgIEVuYWJsZVNuczogcHJvcHMuZW5hYmxlU25zLnRvU3RyaW5nKCksXG4gICAgICAgIEVuYWJsZVNxczogcHJvcHMuZW5hYmxlU3FzLnRvU3RyaW5nKCksXG4gICAgICAgIEFjY2VsZXJhdGVkVHJhbnNjb2Rpbmc6IHByb3BzLmFjY2VsZXJhdGVkVHJhbnNjb2RpbmcsXG4gICAgICAgIFNvdXJjZTogcHJvcHMuczNCdWNrZXRzLnNvdXJjZS5idWNrZXROYW1lLFxuICAgICAgICBEZXN0aW5hdGlvbjogcHJvcHMuczNCdWNrZXRzLmRlc3RpbmF0aW9uLmJ1Y2tldE5hbWUsXG4gICAgICAgIENsb3VkRnJvbnQ6IHByb3BzLmNsb3VkRnJvbnRzLmRpc3RyaWJ1dGlvbi5kb21haW5OYW1lLFxuICAgICAgfSxcbiAgICAgIHJvbGU6IHByb3BzLmlhbVJvbGVzLmlucHV0VmFsaWRhdGUsXG4gICAgfSk7XG5cbiAgICBpZiAocHJvcHMuZW5hYmxlTWVkaWFQYWNrYWdlKSB7XG4gICAgICB0aGlzLmlucHV0VmFsaWRhdGUuYWRkRW52aXJvbm1lbnQoXG4gICAgICAgICdNZWRpYUNvbnZlcnRfVGVtcGxhdGVfMjE2MHAnLFxuICAgICAgICBgJHtwcm9wcy5zdGFja05hbWV9X090dF8yMTYwcF9BdmNfQWFjXzE2eDlfbXZvZF9ub19wcmVzZXRgXG4gICAgICApO1xuXG4gICAgICB0aGlzLmlucHV0VmFsaWRhdGUuYWRkRW52aXJvbm1lbnQoXG4gICAgICAgICdNZWRpYUNvbnZlcnRfVGVtcGxhdGVfMjE2MHAnLFxuICAgICAgICBgJHtwcm9wcy5zdGFja05hbWV9X090dF8yMTYwcF9BdmNfQWFjXzE2eDlfcXZicl9ub19wcmVzZXRgXG4gICAgICApO1xuXG4gICAgICB0aGlzLmlucHV0VmFsaWRhdGUuYWRkRW52aXJvbm1lbnQoXG4gICAgICAgICdNZWRpYUNvbnZlcnRfVGVtcGxhdGVfMTA4MHAnLFxuICAgICAgICBgJHtwcm9wcy5zdGFja05hbWV9X090dF8xMDgwcF9BdmNfQWFjXzE2eDlfbXZvZF9ub19wcmVzZXRgXG4gICAgICApO1xuXG4gICAgICB0aGlzLmlucHV0VmFsaWRhdGUuYWRkRW52aXJvbm1lbnQoXG4gICAgICAgICdNZWRpYUNvbnZlcnRfVGVtcGxhdGVfMTA4MHAnLFxuICAgICAgICBgJHtwcm9wcy5zdGFja05hbWV9X090dF8xMDgwcF9BdmNfQWFjXzE2eDlfcXZicl9ub19wcmVzZXRgXG4gICAgICApO1xuXG4gICAgICB0aGlzLmlucHV0VmFsaWRhdGUuYWRkRW52aXJvbm1lbnQoXG4gICAgICAgICdNZWRpYUNvbnZlcnRfVGVtcGxhdGVfNzIwcCcsXG4gICAgICAgIGAke3Byb3BzLnN0YWNrTmFtZX1fT3R0XzcyMHBfQXZjX0FhY18xNng5X212b2Rfbm9fcHJlc2V0YFxuICAgICAgKTtcblxuICAgICAgdGhpcy5pbnB1dFZhbGlkYXRlLmFkZEVudmlyb25tZW50KFxuICAgICAgICAnTWVkaWFDb252ZXJ0X1RlbXBsYXRlXzcyMHAnLFxuICAgICAgICBgJHtwcm9wcy5zdGFja05hbWV9X090dF83MjBwX0F2Y19BYWNfMTZ4OV9xdmJyX25vX3ByZXNldGBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5tZWRpYUluZm8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdNZWRpYUluZm9GdW5jdGlvbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1NZWRpYUluZm9MYW1iZGFGdW5jdGlvbmAsXG4gICAgICBkZXNjcmlwdGlvbjogJ1J1bnMgTWVkaWFJbmZvIG9uIGEgcHJlLXNpZ25lZCBTMyBVUkwnLFxuICAgICAgaGFuZGxlcjogJ2xhbWJkYV9mdW5jdGlvbi5sYW1iZGFfaGFuZGxlcicsXG4gICAgICBjb2RlOiBuZXcgbGFtYmRhLkFzc2V0Q29kZSgnLi9zb3VyY2UvbWVkaWFpbmZvJyksXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QWVRIT05fM183LFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTIwKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEVycm9ySGFuZGxlcjogdGhpcy5lcnJvckhhbmRsZXIuZnVuY3Rpb25Bcm4sXG4gICAgICB9LFxuICAgICAgcm9sZTogcHJvcHMuaWFtUm9sZXMubWVkaWFJbmZvLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYVBhY2thZ2VBc3NldHMgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgICdNZWRpYVBhY2thZ2VBc3NldHNGdW5jdGlvbicsXG4gICAgICB7XG4gICAgICAgIGZ1bmN0aW9uTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1NZWRpYVBhY2thZ2VBc3NldHNMYW1iZGFGdW5jdGlvbmAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSW5nZXN0cyBhbiBhc3NldCBpbnRvIE1lZGlhUGFja2FnZS1WT0QnLFxuICAgICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9tZWRpYS1wYWNrYWdlLWFzc2V0cycpLFxuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzAwKSxcbiAgICAgICAgbGF5ZXJzOiBbbGF5ZXJdLFxuICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIEFXU19OT0RFSlNfQ09OTkVDVElPTl9SRVVTRV9FTkFCTEVEOiAnMScsXG4gICAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgICAgICBNZWRpYVBhY2thZ2VWb2RSb2xlOiBwcm9wcy5pYW1Sb2xlcy5tZWRpYVBhY2thZ2VWb2Qucm9sZUFybixcbiAgICAgICAgICAvLyBHcm91cElkLCBHcm91cERvbWFpbk5hbWUgYWRkZWQgaW4gYXdzLXZvZC1jZGstc3RhY2sudHNcbiAgICAgICAgfSxcbiAgICAgICAgcm9sZTogcHJvcHMuaWFtUm9sZXMubWVkaWFQYWNrYWdlQXNzZXRzLFxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLm91dHB1dFZhbGlkYXRlID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnT3V0cHV0VmFsaWRhdGVGdW5jdGlvbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1PdXRwdXRWYWxpZGF0ZUxhbWJkYUZ1bmN0aW9uYCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUGFyc2VzIE1lZGlhQ29udmVydCBqb2Igb3V0cHV0JyxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9vdXRwdXQtdmFsaWRhdGUnKSxcbiAgICAgIGxheWVyczogW2xheWVyXSxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTIwKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEFXU19OT0RFSlNfQ09OTkVDVElPTl9SRVVTRV9FTkFCTEVEOiAnMScsXG4gICAgICAgIER5bmFtb0RCVGFibGU6XG4gICAgICAgICAgcHJvcHMuZHluYW1vRGJUYWJsZXMudmlkZW9JbmZvLnRhYmxlTmFtZSA/P1xuICAgICAgICAgIGAke3Byb3BzLnN0YWNrTmFtZX0tVmlkZW9JbmZvYCxcbiAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgIH0sXG4gICAgICByb2xlOiBwcm9wcy5pYW1Sb2xlcy5vdXRwdXRWYWxpZGF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvZmlsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdQcm9maWxlckZ1bmN0aW9uJywge1xuICAgICAgZnVuY3Rpb25OYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LVByb2ZpbGVyTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgZGVzY3JpcHRpb246ICdTZXRzIGFuIEVuY29kZVByb2ZpbGUgYmFzZWQgb24gbWVkaWFpbmZvIG91dHB1dCcsXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBjb2RlOiBuZXcgbGFtYmRhLkFzc2V0Q29kZSgnLi9zb3VyY2UvcHJvZmlsZXInKSxcbiAgICAgIGxheWVyczogW2xheWVyXSxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTIwKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEFXU19OT0RFSlNfQ09OTkVDVElPTl9SRVVTRV9FTkFCTEVEOiAnMScsXG4gICAgICAgIER5bmFtb0RCVGFibGU6XG4gICAgICAgICAgcHJvcHMuZHluYW1vRGJUYWJsZXMudmlkZW9JbmZvLnRhYmxlTmFtZSA/P1xuICAgICAgICAgIGAke3Byb3BzLnN0YWNrTmFtZX0tVmlkZW9JbmZvYCxcbiAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgIH0sXG4gICAgICByb2xlOiBwcm9wcy5pYW1Sb2xlcy5wcm9maWxlcixcbiAgICB9KTtcblxuICAgIHRoaXMuc25zTm90aWZpY2F0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICAnU25zTm90aWZpY2F0aW9uRnVuY3Rpb24nLFxuICAgICAge1xuICAgICAgICBmdW5jdGlvbk5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tU25zTm90aWZpY2F0aW9uTGFtYmRhRnVuY3Rpb25gLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NlbmRzIGEgbm90aWZpY2F0aW9uIHdoZW4gdGhlIGVuY29kZSBqb2IgaXMgY29tcGxldGVkJyxcbiAgICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgICBsYXllcnM6IFtsYXllcl0sXG4gICAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9zbnMtbm90aWZpY2F0aW9uJyksXG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMjApLFxuICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIEFXU19OT0RFSlNfQ09OTkVDVElPTl9SRVVTRV9FTkFCTEVEOiAnMScsXG4gICAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgICAgICBTbnNUb3BpYzogcHJvcHMuc25zVG9waWNzLm5vdGlmaWNhdGlvbnMudG9waWNBcm4sXG4gICAgICAgIH0sXG4gICAgICAgIHJvbGU6IHByb3BzLmlhbVJvbGVzLnNuc05vdGlmaWNhdGlvbixcbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5zcXNTZW5kTWVzc2FnZSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ1Nxc1NlbmRNZXNzYWdlRnVuY3Rpb24nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tU3FzU2VuZE1lc3NhZ2VMYW1iZGFGdW5jdGlvbmAsXG4gICAgICBkZXNjcmlwdGlvbjogJ1B1Ymxpc2ggdGhlIHdvcmtmbG93IHJlc3VsdHMgdG8gYW4gU1FTIHF1ZXVlJyxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGxheWVyczogW2xheWVyXSxcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9zcXMtcHVibGlzaCcpLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMjApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgQVdTX05PREVKU19DT05ORUNUSU9OX1JFVVNFX0VOQUJMRUQ6ICcxJyxcbiAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgICAgU3FzUXVldWU6IHByb3BzLnNxc1F1ZXVlcy5tYWluLnF1ZXVlVXJsLFxuICAgICAgfSxcbiAgICAgIHJvbGU6IHByb3BzLmlhbVJvbGVzLnNxc1NlbmRNZXNzYWdlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGVwRnVuY3Rpb25zID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnU3RlcEZ1bmN0aW9uc0Z1bmN0aW9uJywge1xuICAgICAgZnVuY3Rpb25OYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LVN0ZXBGdW5jdGlvbnNMYW1iZGFGdW5jdGlvbmAsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ0NyZWF0ZXMgYSB1bmlxdWUgaWRlbnRpZmllciAoR1VJRCkgYW5kIGV4ZWN1dGVzIHRoZSBJbmdlc3QgU3RhdGVNYWNoaW5lJyxcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCcuL3NvdXJjZS9zdGVwLWZ1bmN0aW9ucycpLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBsYXllcnM6IFtsYXllcl0sXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBBV1NfTk9ERUpTX0NPTk5FQ1RJT05fUkVVU0VfRU5BQkxFRDogJzEnLFxuICAgICAgICBJbmdlc3RXb3JrZmxvdzogYGFybjoke3Byb3BzLnBhcnRpdGlvbn06c3RhdGVzOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OnN0YXRlTWFjaGluZToke3Byb3BzLnN0YWNrTmFtZX0tSW5nZXN0V29ya2Zsb3dTdGF0ZU1hY2hpbmVgLFxuICAgICAgICBQcm9jZXNzV29ya2Zsb3c6IGBhcm46JHtwcm9wcy5wYXJ0aXRpb259OnN0YXRlczoke3Byb3BzLnJlZ2lvbn06JHtwcm9wcy5hY2NvdW50fTpzdGF0ZU1hY2hpbmU6JHtwcm9wcy5zdGFja05hbWV9LVByb2Nlc3NXb3JrZmxvd1N0YXRlTWFjaGluZWAsXG4gICAgICAgIFB1Ymxpc2hXb3JrZmxvdzogYGFybjoke3Byb3BzLnBhcnRpdGlvbn06c3RhdGVzOiR7cHJvcHMucmVnaW9ufToke3Byb3BzLmFjY291bnR9OnN0YXRlTWFjaGluZToke3Byb3BzLnN0YWNrTmFtZX0tUHVibGlzaFdvcmtmbG93U3RhdGVNYWNoaW5lYCxcbiAgICAgICAgRXJyb3JIYW5kbGVyOiB0aGlzLmVycm9ySGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgIH0sXG4gICAgICByb2xlOiBwcm9wcy5pYW1Sb2xlcy5zdGVwRnVuY3Rpb25zLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGVwRnVuY3Rpb25zLmFkZFBlcm1pc3Npb24oXG4gICAgICAnUzNMYW1iZGFJbnZva2VWaWRlbycsXG4gICAgICBwcm9wcy5sYW1iZGFQZXJtaXNzaW9ucy5zM0xhbWJkYUludm9rZVZpZGVvXG4gICAgKTtcblxuICAgIHRoaXMuc3RlcEZ1bmN0aW9ucy5hZGRQZXJtaXNzaW9uKFxuICAgICAgJ0Nsb3VkV2F0Y2hMYW1iZGFJbnZva2VDb21wbGV0ZScsXG4gICAgICBwcm9wcy5sYW1iZGFQZXJtaXNzaW9ucy5jbG91ZHdhdGNoTGFtYmRhSW52b2tlQ29tcGxldGVcbiAgICApO1xuICB9XG59Il19