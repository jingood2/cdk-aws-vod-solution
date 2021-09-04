"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamRoles = void 0;
const iam = require("@aws-cdk/aws-iam");
const cdk = require("@aws-cdk/core");
class IamRoles extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.archiveSource = new iam.Role(this, 'ArchiveSourceRole', {
            roleName: `${props.stackName}-ArchiveSourceRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-ArchiveSourceRolePolicyDocument`]: props.policyDocuments.archiveSource,
            },
        });
        this.customResource = new iam.Role(this, 'CustomResourceRole', {
            roleName: `${props.stackName}-CustomResourceRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-CustomResourceRolePolicyDocument`]: props.policyDocuments.customResource,
            },
        });
        this.dynamoDbUpdate = new iam.Role(this, 'DynamoUpdateRole', {
            roleName: `${props.stackName}-DynamoUpdateRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-DynamoDbUpdateRolePolicyDocument`]: props.policyDocuments.dynamoDbUpdate,
            },
        });
        this.encode = new iam.Role(this, 'EncodeRole', {
            roleName: `${props.stackName}-EncodeRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-EncodeRolePolicyDocument`]: props.policyDocuments.encode,
            },
        });
        this.errorHandler = new iam.Role(this, 'ErrorHandlerRole', {
            roleName: `${props.stackName}-ErrorHandlerRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-ErrorHandlerRolePolicyDocument`]: props.policyDocuments.errorHandler,
            },
        });
        this.errorHandler.addToPolicy(props.policyStatements.errorHandlerRoleDynamoDb);
        this.inputValidate = new iam.Role(this, 'InputValidateRole', {
            roleName: `${props.stackName}-InputValidateRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-InputValidateRolePolicyDocument`]: props.policyDocuments.inputValidate,
            },
        });
        this.mediaConvert = new iam.Role(this, 'MediaConvertRole', {
            roleName: `${props.stackName}-MediaConvertRole`,
            assumedBy: new iam.ServicePrincipal(`mediaconvert.amazonaws.com`),
            inlinePolicies: {
                [`${props.stackName}-MediaConvertRolePolicyDocument`]: props.policyDocuments.mediaConvert,
            },
        });
        this.mediaInfo = new iam.Role(this, 'MediaInfoRole', {
            roleName: `${props.stackName}-MediaInfoRole`,
            assumedBy: new iam.ServicePrincipal(`lambda.amazonaws.com`),
            inlinePolicies: {
                [`${props.stackName}-MediaInfoRolePolicyDocument`]: props.policyDocuments.mediaInfo,
            },
        });
        this.mediaPackageAssets = new iam.Role(this, 'MediaPackageAssetsRole', {
            roleName: `${props.stackName}-MediaPackageAssetsRole`,
            assumedBy: new iam.ServicePrincipal(`lambda.amazonaws.com`),
            inlinePolicies: {
                [`${props.stackName}-MediaPackageAssetsRolePolicyDocument`]: props.policyDocuments.mediaPackageAssets,
            },
        });
        this.mediaPackageVod = new iam.Role(this, 'MediaPackageVodRole', {
            roleName: `${props.stackName}-MediaPackageVodRole`,
            assumedBy: new iam.ServicePrincipal(`mediapackage.amazonaws.com`),
            inlinePolicies: {
                [`${props.stackName}-MediaPackageVodRolePolicyDocument`]: props.policyDocuments.mediaPackageVod,
            },
        });
        this.outputValidate = new iam.Role(this, 'OutputValidateRole', {
            roleName: `${props.stackName}-OutputValidateRole`,
            assumedBy: new iam.ServicePrincipal(`lambda.amazonaws.com`),
            inlinePolicies: {
                [`${props.stackName}-OutputValidateRolePolicyDocument`]: props.policyDocuments.outputValidate,
            },
        });
        this.profiler = new iam.Role(this, 'ProfilerRole', {
            roleName: `${props.stackName}-ProfilerRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-ProfilerRolePolicyDocument`]: props.policyDocuments.profiler,
            },
        });
        this.snsNotification = new iam.Role(this, 'SnsNotificationRole', {
            roleName: `${props.stackName}-SnsNotificationRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-SnsNotificationRolePolicyDocument`]: props.policyDocuments.snsNotification,
            },
        });
        this.sqsSendMessage = new iam.Role(this, 'SqsSendMessageRole', {
            roleName: `${props.stackName}-SqsSendMessageRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-SqsSendMessageRolePolicyDocument`]: props.policyDocuments.sqsSendMessage,
            },
        });
        this.stepFunctions = new iam.Role(this, 'StepFunctionsRole', {
            roleName: `${props.stackName}-StepFunctionsRole`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                [`${props.stackName}-StepFunctionsRolePolicyDocument`]: props.policyDocuments.stepFunctions,
            },
        });
        this.stepFunctionsService = new iam.Role(this, 'StepFunctionsServiceRole', {
            roleName: `${props.stackName}-StepFunctionsServiceRole`,
            assumedBy: new iam.ServicePrincipal(`states.${cdk.Stack.of(this).region}.amazonaws.com`),
            inlinePolicies: {
                [`${props.stackName}-StepFunctionsServiceRolePolicyDocument`]: props.policyDocuments.stepFunctionsService,
            },
        });
    }
}
exports.IamRoles = IamRoles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWFtLXJvbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaWFtLXJvbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUF3QztBQUN4QyxxQ0FBcUM7QUFVckMsTUFBYSxRQUFTLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFrQnpDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBb0I7UUFDaEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDM0QsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsb0JBQW9CO1lBQ2hELFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzRCxjQUFjLEVBQUU7Z0JBQ2QsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLGtDQUFrQyxDQUFDLEVBQ3BELEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYTthQUN0QztTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUM3RCxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUyxxQkFBcUI7WUFDakQsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDO1lBQzNELGNBQWMsRUFBRTtnQkFDZCxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsbUNBQW1DLENBQUMsRUFDckQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxjQUFjO2FBQ3ZDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzNELFFBQVEsRUFBRSxHQUFH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Q0FBQyxhQUFhO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7WUFDekUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsMkJBQTJCO1lBQ3ZELFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FDakMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLGdCQUFnQixDQUNwRDtZQUNELGNBQWMsRUFBRTtnQkFDZCxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMseUNBQXlDLENBQUMsRUFDM0QsS0FBSyxDQUFDLGVBQWUsQ0FBQyxvQkFBb0I7YUFDN0M7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEzS0QsNEJBMktDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaWFtIGZyb20gJ0Bhd3MtY2RrL2F3cy1pYW0nO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgUG9saWN5U3RhdGVtZW50cyB9IGZyb20gJy4vcG9saWN5LXN0YXRlbWVudHMnO1xuaW1wb3J0IHsgUG9saWN5RG9jdW1lbnRzIH0gZnJvbSAnLi9wb2xpY3ktZG9jdW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJYW1Sb2xlc1Byb3BzIHtcbiAgcG9saWN5RG9jdW1lbnRzOiBQb2xpY3lEb2N1bWVudHM7XG4gIHBvbGljeVN0YXRlbWVudHM6IFBvbGljeVN0YXRlbWVudHM7XG4gIHN0YWNrTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgSWFtUm9sZXMgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IGFyY2hpdmVTb3VyY2U6IGlhbS5Sb2xlO1xuICBwdWJsaWMgcmVhZG9ubHkgY3VzdG9tUmVzb3VyY2U6IGlhbS5Sb2xlO1xuICBwdWJsaWMgcmVhZG9ubHkgZHluYW1vRGJVcGRhdGU6IGlhbS5Sb2xlO1xuICBwdWJsaWMgcmVhZG9ubHkgZW5jb2RlOiBpYW0uUm9sZTtcbiAgcHVibGljIHJlYWRvbmx5IGVycm9ySGFuZGxlcjogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBpbnB1dFZhbGlkYXRlOiBpYW0uUm9sZTtcbiAgcHVibGljIHJlYWRvbmx5IG1lZGlhQ29udmVydDogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUluZm86IGlhbS5Sb2xlO1xuICBwdWJsaWMgcmVhZG9ubHkgbWVkaWFQYWNrYWdlQXNzZXRzOiBpYW0uUm9sZTtcbiAgcHVibGljIHJlYWRvbmx5IG1lZGlhUGFja2FnZVZvZDogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBvdXRwdXRWYWxpZGF0ZTogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBwcm9maWxlcjogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBzbnNOb3RpZmljYXRpb246IGlhbS5Sb2xlO1xuICBwdWJsaWMgcmVhZG9ubHkgc3FzU2VuZE1lc3NhZ2U6IGlhbS5Sb2xlO1xuICBwdWJsaWMgcmVhZG9ubHkgc3RlcEZ1bmN0aW9uczogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBzdGVwRnVuY3Rpb25zU2VydmljZTogaWFtLlJvbGU7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBJYW1Sb2xlc1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMuYXJjaGl2ZVNvdXJjZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnQXJjaGl2ZVNvdXJjZVJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1BcmNoaXZlU291cmNlUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LUFyY2hpdmVTb3VyY2VSb2xlUG9saWN5RG9jdW1lbnRgXTpcbiAgICAgICAgICBwcm9wcy5wb2xpY3lEb2N1bWVudHMuYXJjaGl2ZVNvdXJjZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1c3RvbVJlc291cmNlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdDdXN0b21SZXNvdXJjZVJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1DdXN0b21SZXNvdXJjZVJvbGVgLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2xhbWJkYS5hbWF6b25hd3MuY29tJyksXG4gICAgICBpbmxpbmVQb2xpY2llczoge1xuICAgICAgICBbYCR7cHJvcHMuc3RhY2tOYW1lfS1DdXN0b21SZXNvdXJjZVJvbGVQb2xpY3lEb2N1bWVudGBdOlxuICAgICAgICAgIHByb3BzLnBvbGljeURvY3VtZW50cy5jdXN0b21SZXNvdXJjZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmR5bmFtb0RiVXBkYXRlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdEeW5hbW9VcGRhdGVSb2xlJywge1xuICAgICAgcm9sZU5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tRHluYW1vVXBkYXRlUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LUR5bmFtb0RiVXBkYXRlUm9sZVBvbGljeURvY3VtZW50YF06XG4gICAgICAgICAgcHJvcHMucG9saWN5RG9jdW1lbnRzLmR5bmFtb0RiVXBkYXRlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuZW5jb2RlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdFbmNvZGVSb2xlJywge1xuICAgICAgcm9sZU5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tRW5jb2RlUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LUVuY29kZVJvbGVQb2xpY3lEb2N1bWVudGBdOlxuICAgICAgICAgIHByb3BzLnBvbGljeURvY3VtZW50cy5lbmNvZGUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5lcnJvckhhbmRsZXIgPSBuZXcgaWFtLlJvbGUodGhpcywgJ0Vycm9ySGFuZGxlclJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1FcnJvckhhbmRsZXJSb2xlYCxcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdsYW1iZGEuYW1hem9uYXdzLmNvbScpLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgW2Ake3Byb3BzLnN0YWNrTmFtZX0tRXJyb3JIYW5kbGVyUm9sZVBvbGljeURvY3VtZW50YF06XG4gICAgICAgICAgcHJvcHMucG9saWN5RG9jdW1lbnRzLmVycm9ySGFuZGxlcixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmVycm9ySGFuZGxlci5hZGRUb1BvbGljeShcbiAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZXJyb3JIYW5kbGVyUm9sZUR5bmFtb0RiXG4gICAgKTtcblxuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnSW5wdXRWYWxpZGF0ZVJvbGUnLCB7XG4gICAgICByb2xlTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1JbnB1dFZhbGlkYXRlUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LUlucHV0VmFsaWRhdGVSb2xlUG9saWN5RG9jdW1lbnRgXTpcbiAgICAgICAgICBwcm9wcy5wb2xpY3lEb2N1bWVudHMuaW5wdXRWYWxpZGF0ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLm1lZGlhQ29udmVydCA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnTWVkaWFDb252ZXJ0Um9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LU1lZGlhQ29udmVydFJvbGVgLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoYG1lZGlhY29udmVydC5hbWF6b25hd3MuY29tYCksXG4gICAgICBpbmxpbmVQb2xpY2llczoge1xuICAgICAgICBbYCR7cHJvcHMuc3RhY2tOYW1lfS1NZWRpYUNvbnZlcnRSb2xlUG9saWN5RG9jdW1lbnRgXTpcbiAgICAgICAgICBwcm9wcy5wb2xpY3lEb2N1bWVudHMubWVkaWFDb252ZXJ0LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVkaWFJbmZvID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdNZWRpYUluZm9Sb2xlJywge1xuICAgICAgcm9sZU5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tTWVkaWFJbmZvUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChgbGFtYmRhLmFtYXpvbmF3cy5jb21gKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LU1lZGlhSW5mb1JvbGVQb2xpY3lEb2N1bWVudGBdOlxuICAgICAgICAgIHByb3BzLnBvbGljeURvY3VtZW50cy5tZWRpYUluZm8sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYVBhY2thZ2VBc3NldHMgPSBuZXcgaWFtLlJvbGUodGhpcywgJ01lZGlhUGFja2FnZUFzc2V0c1JvbGUnLCB7XG4gICAgICByb2xlTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1NZWRpYVBhY2thZ2VBc3NldHNSb2xlYCxcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKGBsYW1iZGEuYW1hem9uYXdzLmNvbWApLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgW2Ake3Byb3BzLnN0YWNrTmFtZX0tTWVkaWFQYWNrYWdlQXNzZXRzUm9sZVBvbGljeURvY3VtZW50YF06XG4gICAgICAgICAgcHJvcHMucG9saWN5RG9jdW1lbnRzLm1lZGlhUGFja2FnZUFzc2V0cyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLm1lZGlhUGFja2FnZVZvZCA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnTWVkaWFQYWNrYWdlVm9kUm9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LU1lZGlhUGFja2FnZVZvZFJvbGVgLFxuICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoYG1lZGlhcGFja2FnZS5hbWF6b25hd3MuY29tYCksXG4gICAgICBpbmxpbmVQb2xpY2llczoge1xuICAgICAgICBbYCR7cHJvcHMuc3RhY2tOYW1lfS1NZWRpYVBhY2thZ2VWb2RSb2xlUG9saWN5RG9jdW1lbnRgXTpcbiAgICAgICAgICBwcm9wcy5wb2xpY3lEb2N1bWVudHMubWVkaWFQYWNrYWdlVm9kLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMub3V0cHV0VmFsaWRhdGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ091dHB1dFZhbGlkYXRlUm9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LU91dHB1dFZhbGlkYXRlUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChgbGFtYmRhLmFtYXpvbmF3cy5jb21gKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LU91dHB1dFZhbGlkYXRlUm9sZVBvbGljeURvY3VtZW50YF06XG4gICAgICAgICAgcHJvcHMucG9saWN5RG9jdW1lbnRzLm91dHB1dFZhbGlkYXRlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMucHJvZmlsZXIgPSBuZXcgaWFtLlJvbGUodGhpcywgJ1Byb2ZpbGVyUm9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LVByb2ZpbGVyUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LVByb2ZpbGVyUm9sZVBvbGljeURvY3VtZW50YF06XG4gICAgICAgICAgcHJvcHMucG9saWN5RG9jdW1lbnRzLnByb2ZpbGVyLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuc25zTm90aWZpY2F0aW9uID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdTbnNOb3RpZmljYXRpb25Sb2xlJywge1xuICAgICAgcm9sZU5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tU25zTm90aWZpY2F0aW9uUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnbGFtYmRhLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGlubGluZVBvbGljaWVzOiB7XG4gICAgICAgIFtgJHtwcm9wcy5zdGFja05hbWV9LVNuc05vdGlmaWNhdGlvblJvbGVQb2xpY3lEb2N1bWVudGBdOlxuICAgICAgICAgIHByb3BzLnBvbGljeURvY3VtZW50cy5zbnNOb3RpZmljYXRpb24sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5zcXNTZW5kTWVzc2FnZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnU3FzU2VuZE1lc3NhZ2VSb2xlJywge1xuICAgICAgcm9sZU5hbWU6IGAke3Byb3BzLnN0YWNrTmFtZX0tU3FzU2VuZE1lc3NhZ2VSb2xlYCxcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdsYW1iZGEuYW1hem9uYXdzLmNvbScpLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgW2Ake3Byb3BzLnN0YWNrTmFtZX0tU3FzU2VuZE1lc3NhZ2VSb2xlUG9saWN5RG9jdW1lbnRgXTpcbiAgICAgICAgICBwcm9wcy5wb2xpY3lEb2N1bWVudHMuc3FzU2VuZE1lc3NhZ2UsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGVwRnVuY3Rpb25zID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdTdGVwRnVuY3Rpb25zUm9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LVN0ZXBGdW5jdGlvbnNSb2xlYCxcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdsYW1iZGEuYW1hem9uYXdzLmNvbScpLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgW2Ake3Byb3BzLnN0YWNrTmFtZX0tU3RlcEZ1bmN0aW9uc1JvbGVQb2xpY3lEb2N1bWVudGBdOlxuICAgICAgICAgIHByb3BzLnBvbGljeURvY3VtZW50cy5zdGVwRnVuY3Rpb25zLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RlcEZ1bmN0aW9uc1NlcnZpY2UgPSBuZXcgaWFtLlJvbGUodGhpcywgJ1N0ZXBGdW5jdGlvbnNTZXJ2aWNlUm9sZScsIHtcbiAgICAgIHJvbGVOYW1lOiBgJHtwcm9wcy5zdGFja05hbWV9LVN0ZXBGdW5jdGlvbnNTZXJ2aWNlUm9sZWAsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChcbiAgICAgICAgYHN0YXRlcy4ke2Nkay5TdGFjay5vZih0aGlzKS5yZWdpb259LmFtYXpvbmF3cy5jb21gXG4gICAgICApLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgW2Ake3Byb3BzLnN0YWNrTmFtZX0tU3RlcEZ1bmN0aW9uc1NlcnZpY2VSb2xlUG9saWN5RG9jdW1lbnRgXTpcbiAgICAgICAgICBwcm9wcy5wb2xpY3lEb2N1bWVudHMuc3RlcEZ1bmN0aW9uc1NlcnZpY2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59Il19