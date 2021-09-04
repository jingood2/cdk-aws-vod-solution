"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResources = void 0;
const cdk = require("@aws-cdk/core");
class CustomResources extends cdk.Construct {
    constructor(scope, id, props) {
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
        this.mediaConvertEndPoint = new cdk.CustomResource(this, 'MediaConvertEndPoint', {
            resourceType: 'Custom::LoadLambda',
            serviceToken: props.lambdaFunctions.customResource.functionArn,
            properties: { Resource: 'EndPoint' },
        });
        this.mediaConvertTemplates = new cdk.CustomResource(this, 'MediaConvertTemplates', {
            resourceType: 'Custom::LoadLambda',
            serviceToken: props.lambdaFunctions.customResource.functionArn,
            properties: {
                Resource: 'MediaConvertTemplates',
                StackName: props.stackName,
                EndPoint: this.mediaConvertEndPoint.getAtt('EndpointUrl'),
                EnableMediaPackage: props.enableMediaPackage,
                EnableNewTemplates: true,
            },
        });
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
exports.CustomResources = CustomResources;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJlc291cmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbS1yZXNvdXJjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBaUJyQyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFRaEQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUN2RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLG9CQUFvQjtZQUNwQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7Z0JBQ25DLFlBQVksRUFBRSxjQUFjO2dCQUM1QixZQUFZLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsV0FBVztnQkFDOUQsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUNqQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVkLElBQUksQ0FBQyxnQkFBZ0I7WUFDbkIsS0FBSyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztnQkFDbkQsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7b0JBQy9DLFlBQVksRUFBRSxvQkFBb0I7b0JBQ2xDLFlBQVksRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxXQUFXO29CQUM5RCxVQUFVLEVBQUU7d0JBQ1YsVUFBVSxFQUFFLFFBQVE7d0JBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQzlCLHlEQUF5RDt3QkFDekQsT0FBTyxFQUFFLE9BQU87d0JBQ2hCLFVBQVUsRUFBRSxjQUFjO3dCQUMxQixlQUFlLEVBQUUsS0FBSyxDQUFDLGVBQWU7d0JBQ3RDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzt3QkFDdEIsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZO3dCQUNoQyxRQUFRLEVBQUUsa0JBQWtCO3dCQUM1QixrQkFBa0IsRUFBRSxLQUFLLENBQUMsa0JBQWtCO3FCQUM3QztpQkFDRixDQUFDO2dCQUNKLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFaEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FDaEQsSUFBSSxFQUNKLHNCQUFzQixFQUN0QjtZQUNFLFlBQVksRUFBRSxvQkFBb0I7WUFDbEMsWUFBWSxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFdBQVc7WUFDOUQsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtTQUNyQyxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUNqRCxJQUFJLEVBQ0osdUJBQXVCLEVBQ3ZCO1lBQ0UsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxZQUFZLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsV0FBVztZQUM5RCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0JBQ3pELGtCQUFrQixFQUFFLEtBQUssQ0FBQyxrQkFBa0I7Z0JBQzVDLGtCQUFrQixFQUFFLElBQUk7YUFDekI7U0FDRixDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDckUsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxZQUFZLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsV0FBVztZQUM5RCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUyxrQkFBa0I7Z0JBQzdDLHVCQUF1QixFQUFFLG1CQUFtQjtnQkFDNUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGNBQWM7Z0JBQzdELGtCQUFrQixFQUFFLEtBQUssQ0FBQyxrQkFBa0I7YUFDN0M7U0FDRixDQUFDLENBQUM7UUFFSDs7V0FFRztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdkQsWUFBWSxFQUFFLFlBQVk7WUFDMUIsWUFBWSxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFdBQVc7WUFDOUQsVUFBVSxFQUFFO2dCQUNWLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO2dCQUN6QyxTQUFTLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsV0FBVztnQkFDMUQsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLEtBQUssQ0FBQyxlQUFlO2FBQ3ZDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBNUZELDBDQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IExhbWJkYUZ1bmN0aW9ucyB9IGZyb20gJy4vbGFtYmRhLWZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBTM0J1Y2tldHMgfSBmcm9tICcuL3MzLWJ1Y2tldHMnO1xuaW1wb3J0IHsgQ2xvdWRGcm9udHMgfSBmcm9tICcuL2Nsb3VkZnJvbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21SZXNvdXJjZXNQcm9wcyB7XG4gIGNsb3VkRnJvbnRzOiBDbG91ZEZyb250cztcbiAgZW5hYmxlTWVkaWFQYWNrYWdlOiBib29sZWFuO1xuICBmcmFtZUNhcHR1cmU6IGJvb2xlYW47XG4gIGdsYWNpZXI6IHN0cmluZztcbiAgbGFtYmRhRnVuY3Rpb25zOiBMYW1iZGFGdW5jdGlvbnM7XG4gIHMzQnVja2V0czogUzNCdWNrZXRzO1xuICBzZW5kQW5vbnltb3VzTWV0cmljczogYm9vbGVhbjtcbiAgc3RhY2tOYW1lOiBzdHJpbmc7XG4gIHdvcmtmbG93VHJpZ2dlcjogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tUmVzb3VyY2VzIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBhbm9ueW1vdXNNZXRyaWNzOiBjZGsuQ3VzdG9tUmVzb3VyY2UgfCB1bmRlZmluZWQ7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUNvbnZlcnRFbmRQb2ludDogY2RrLkN1c3RvbVJlc291cmNlO1xuICBwdWJsaWMgcmVhZG9ubHkgbWVkaWFDb252ZXJ0VGVtcGxhdGVzOiBjZGsuQ3VzdG9tUmVzb3VyY2U7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYVBhY2thZ2VWb2Q6IGNkay5DdXN0b21SZXNvdXJjZTtcbiAgcHVibGljIHJlYWRvbmx5IHMzQ29uZmlnOiBjZGsuQ3VzdG9tUmVzb3VyY2U7XG4gIHB1YmxpYyByZWFkb25seSB1dWlkOiBjZGsuQ3VzdG9tUmVzb3VyY2UgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBDdXN0b21SZXNvdXJjZXNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLnV1aWQgPSBwcm9wcy5zZW5kQW5vbnltb3VzTWV0cmljc1xuICAgICAgPyBuZXcgY2RrLkN1c3RvbVJlc291cmNlKHRoaXMsICdVVUlEJywge1xuICAgICAgICAgIHJlc291cmNlVHlwZTogJ0N1c3RvbTo6VVVJRCcsXG4gICAgICAgICAgc2VydmljZVRva2VuOiBwcm9wcy5sYW1iZGFGdW5jdGlvbnMuY3VzdG9tUmVzb3VyY2UuZnVuY3Rpb25Bcm4sXG4gICAgICAgICAgcHJvcGVydGllczogeyBSZXNvdXJjZTogJ1VVSUQnIH0sXG4gICAgICAgIH0pXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuYW5vbnltb3VzTWV0cmljcyA9XG4gICAgICBwcm9wcy5zZW5kQW5vbnltb3VzTWV0cmljcyAmJiB0aGlzLnV1aWQgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IG5ldyBjZGsuQ3VzdG9tUmVzb3VyY2UodGhpcywgJ0Fub255bW91c01ldHJpY3MnLCB7XG4gICAgICAgICAgICByZXNvdXJjZVR5cGU6ICdDdXN0b206OkxvYWRMYW1iZGEnLFxuICAgICAgICAgICAgc2VydmljZVRva2VuOiBwcm9wcy5sYW1iZGFGdW5jdGlvbnMuY3VzdG9tUmVzb3VyY2UuZnVuY3Rpb25Bcm4sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIFNvbHV0aW9uSWQ6ICdTTzAwMjEnLFxuICAgICAgICAgICAgICBVVUlEOiB0aGlzLnV1aWQuZ2V0QXR0KCdVVUlEJyksXG4gICAgICAgICAgICAgIC8vVmVyc2lvbjogdGhpcy5ub2RlLnRyeUdldENvbnRleHQoJ3ZlcnNpb24nKSA/PyAnMS4wLjAnLFxuICAgICAgICAgICAgICBWZXJzaW9uOiAnMS4wLjAnLFxuICAgICAgICAgICAgICBUcmFuc2NvZGVyOiAnTWVkaWFDb252ZXJ0JyxcbiAgICAgICAgICAgICAgV29ya2Zsb3dUcmlnZ2VyOiBwcm9wcy53b3JrZmxvd1RyaWdnZXIsXG4gICAgICAgICAgICAgIEdsYWNpZXI6IHByb3BzLmdsYWNpZXIsXG4gICAgICAgICAgICAgIEZyYW1lQ2FwdHVyZTogcHJvcHMuZnJhbWVDYXB0dXJlLFxuICAgICAgICAgICAgICBSZXNvdXJjZTogJ0Fub255bW91c01ldHJpY3MnLFxuICAgICAgICAgICAgICBFbmFibGVNZWRpYVBhY2thZ2U6IHByb3BzLmVuYWJsZU1lZGlhUGFja2FnZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLm1lZGlhQ29udmVydEVuZFBvaW50ID0gbmV3IGNkay5DdXN0b21SZXNvdXJjZShcbiAgICAgIHRoaXMsXG4gICAgICAnTWVkaWFDb252ZXJ0RW5kUG9pbnQnLFxuICAgICAge1xuICAgICAgICByZXNvdXJjZVR5cGU6ICdDdXN0b206OkxvYWRMYW1iZGEnLFxuICAgICAgICBzZXJ2aWNlVG9rZW46IHByb3BzLmxhbWJkYUZ1bmN0aW9ucy5jdXN0b21SZXNvdXJjZS5mdW5jdGlvbkFybixcbiAgICAgICAgcHJvcGVydGllczogeyBSZXNvdXJjZTogJ0VuZFBvaW50JyB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLm1lZGlhQ29udmVydFRlbXBsYXRlcyA9IG5ldyBjZGsuQ3VzdG9tUmVzb3VyY2UoXG4gICAgICB0aGlzLFxuICAgICAgJ01lZGlhQ29udmVydFRlbXBsYXRlcycsXG4gICAgICB7XG4gICAgICAgIHJlc291cmNlVHlwZTogJ0N1c3RvbTo6TG9hZExhbWJkYScsXG4gICAgICAgIHNlcnZpY2VUb2tlbjogcHJvcHMubGFtYmRhRnVuY3Rpb25zLmN1c3RvbVJlc291cmNlLmZ1bmN0aW9uQXJuLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgUmVzb3VyY2U6ICdNZWRpYUNvbnZlcnRUZW1wbGF0ZXMnLFxuICAgICAgICAgIFN0YWNrTmFtZTogcHJvcHMuc3RhY2tOYW1lLFxuICAgICAgICAgIEVuZFBvaW50OiB0aGlzLm1lZGlhQ29udmVydEVuZFBvaW50LmdldEF0dCgnRW5kcG9pbnRVcmwnKSxcbiAgICAgICAgICBFbmFibGVNZWRpYVBhY2thZ2U6IHByb3BzLmVuYWJsZU1lZGlhUGFja2FnZSxcbiAgICAgICAgICBFbmFibGVOZXdUZW1wbGF0ZXM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMubWVkaWFQYWNrYWdlVm9kID0gbmV3IGNkay5DdXN0b21SZXNvdXJjZSh0aGlzLCAnTWVkaWFQYWNrYWdlVm9kJywge1xuICAgICAgcmVzb3VyY2VUeXBlOiAnQ3VzdG9tOjpMb2FkTGFtYmRhJyxcbiAgICAgIHNlcnZpY2VUb2tlbjogcHJvcHMubGFtYmRhRnVuY3Rpb25zLmN1c3RvbVJlc291cmNlLmZ1bmN0aW9uQXJuLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBSZXNvdXJjZTogJ01lZGlhUGFja2FnZVZvZCcsXG4gICAgICAgIFN0YWNrTmFtZTogcHJvcHMuc3RhY2tOYW1lLFxuICAgICAgICBHcm91cElkOiBgJHtwcm9wcy5zdGFja05hbWV9LXBhY2thZ2luZy1ncm91cGAsXG4gICAgICAgIFBhY2thZ2luZ0NvbmZpZ3VyYXRpb25zOiAnSExTLERBU0gsTVNTLENNQUYnLFxuICAgICAgICBEaXN0cmlidXRpb25JZDogcHJvcHMuY2xvdWRGcm9udHMuZGlzdHJpYnV0aW9uLmRpc3RyaWJ1dGlvbklkLFxuICAgICAgICBFbmFibGVNZWRpYVBhY2thZ2U6IHByb3BzLmVuYWJsZU1lZGlhUGFja2FnZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gUmVzb3VyY2Xsl5Ag64yA7ZW0IENsb3VkRm9ybWF0aW9u7J2AIHNlcnZpY2VUb2tlbuyXkCDsmpTssq3snYQg67O064OEXG4gICAgICovXG4gICAgdGhpcy5zM0NvbmZpZyA9IG5ldyBjZGsuQ3VzdG9tUmVzb3VyY2UodGhpcywgJ1MzQ29uZmlnJywge1xuICAgICAgcmVzb3VyY2VUeXBlOiAnQ3VzdG9tOjpTMycsXG4gICAgICBzZXJ2aWNlVG9rZW46IHByb3BzLmxhbWJkYUZ1bmN0aW9ucy5jdXN0b21SZXNvdXJjZS5mdW5jdGlvbkFybixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgU291cmNlOiBwcm9wcy5zM0J1Y2tldHMuc291cmNlLmJ1Y2tldE5hbWUsXG4gICAgICAgIEluZ2VzdEFybjogcHJvcHMubGFtYmRhRnVuY3Rpb25zLnN0ZXBGdW5jdGlvbnMuZnVuY3Rpb25Bcm4sXG4gICAgICAgIFJlc291cmNlOiAnUzNOb3RpZmljYXRpb24nLFxuICAgICAgICBXb3JrZmxvd1RyaWdnZXI6IHByb3BzLndvcmtmbG93VHJpZ2dlcixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn0iXX0=