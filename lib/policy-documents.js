"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyDocuments = void 0;
const cdk = require("@aws-cdk/core");
const iam = require("@aws-cdk/aws-iam");
class PolicyDocuments extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.archiveSource = new iam.PolicyDocument({
            statements: [
                props.policyStatements.archiveSourceRoleLambda,
                props.policyStatements.archiveSourceRoleLogs,
                props.policyStatements.archiveSourceRoleS3,
            ],
        });
        this.customResource = new iam.PolicyDocument({
            statements: [
                props.policyStatements.customResourceRoleCloudFront,
                props.policyStatements.customResourceRoleLogs,
                props.policyStatements.customResourceRoleMediaConvert,
                props.policyStatements.customResourceRoleMediaPackageCreateList,
                props.policyStatements.customResourceRoleMediaPackageDelete,
                props.policyStatements.customResourceRoleMediaPackageDescribeDelete,
                props.policyStatements.customResourceRoleS3,
            ],
        });
        this.destinationBucket = new iam.PolicyDocument({
            statements: [props.policyStatements.destinationBucket],
        });
        this.dynamoDbUpdate = new iam.PolicyDocument({
            statements: [
                props.policyStatements.dynamoDbUpdateRoleDynamoDb,
                props.policyStatements.dynamoDbUpdateRoleLambda,
                props.policyStatements.dynamoDbUpdateRoleLogs,
            ],
        });
        this.encode = new iam.PolicyDocument({
            statements: [
                props.policyStatements.encodeRoleIam,
                props.policyStatements.encodeRoleLambda,
                props.policyStatements.encodeRoleLogs,
                props.policyStatements.encodeRoleMediaConvert,
                props.policyStatements.encodeRoleS3GetObject,
                props.policyStatements.encodeRoleS3PutObject,
            ],
        });
        this.errorHandler = new iam.PolicyDocument({
            statements: [
                props.policyStatements.errorHandlerRoleDynamoDb,
                props.policyStatements.errorHandlerRoleLogs,
                props.policyStatements.errorHandlerRoleSns,
            ],
        });
        this.inputValidate = new iam.PolicyDocument({
            statements: [
                props.policyStatements.inputValidateRoleLambda,
                props.policyStatements.inputValidateRoleLogs,
                props.policyStatements.inputValidateRoleS3,
            ],
        });
        this.mediaConvert = new iam.PolicyDocument({
            statements: [
                props.policyStatements.mediaConvertRoleExecuteApi,
                props.policyStatements.mediaConvertRoleS3,
            ],
        });
        this.mediaInfo = new iam.PolicyDocument({
            statements: [
                props.policyStatements.mediaInfoRoleLambda,
                props.policyStatements.mediaInfoRoleLogs,
                props.policyStatements.mediaInfoRoleS3,
            ],
        });
        this.mediaPackageAssets = new iam.PolicyDocument({
            statements: [
                props.policyStatements.mediaPackageAssetRoleIam,
                props.policyStatements.mediaPackageAssetRoleLambda,
                props.policyStatements.mediaPackageAssetRoleLogs,
                props.policyStatements.mediaPackageAssetRoleMediaPackage,
            ],
        });
        this.mediaPackageVod = new iam.PolicyDocument({
            statements: [props.policyStatements.mediaPackageVodRoleS3],
        });
        this.outputValidate = new iam.PolicyDocument({
            statements: [
                props.policyStatements.outputValidateRoleDynamoDb,
                props.policyStatements.outputValidateRoleLambda,
                props.policyStatements.outputValidateRoleLogs,
                props.policyStatements.outputValidateRoleS3,
            ],
        });
        this.profiler = new iam.PolicyDocument({
            statements: [
                props.policyStatements.profilerRoleDynamoDb,
                props.policyStatements.profilerRoleLambda,
                props.policyStatements.profilerRoleLogs,
            ],
        });
        this.snsNotification = new iam.PolicyDocument({
            statements: [
                props.policyStatements.snsNotificationRoleKms,
                props.policyStatements.snsNotificationRoleLambda,
                props.policyStatements.snsNotificationRoleLogs,
                props.policyStatements.snsNotificationRoleSns,
            ],
        });
        this.sqsSendMessage = new iam.PolicyDocument({
            statements: [
                props.policyStatements.sqsSendMessageRoleKms,
                props.policyStatements.sqsSendMessageRoleLambda,
                props.policyStatements.sqsSendMessageRoleLogs,
                props.policyStatements.sqsSendMessageRoleSqs,
            ],
        });
        this.stepFunctions = new iam.PolicyDocument({
            statements: [
                props.policyStatements.stepFunctionsRoleLambda,
                props.policyStatements.stepFunctionsRoleLogs,
                props.policyStatements.stepFunctionsRoleStates,
            ],
        });
        this.stepFunctionsService = new iam.PolicyDocument({
            statements: [props.policyStatements.stepFunctionServiceRoleLambda],
        });
    }
}
exports.PolicyDocuments = PolicyDocuments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWRvY3VtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvbGljeS1kb2N1bWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLHdDQUF3QztBQVF4QyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFtQmhELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBMkI7UUFDdkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQztZQUMxQyxVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QjtnQkFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQjtnQkFDNUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQjthQUMzQztTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDO1lBQzNDLFVBQVUsRUFBRTtnQkFDVixLQUFLLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCO2dCQUNuRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCO2dCQUM3QyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCO2dCQUNyRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsd0NBQXdDO2dCQUMvRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsb0NBQW9DO2dCQUMzRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsNENBQTRDO2dCQUNuRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQztZQUM5QyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUM7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QUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQztZQUNqRCxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsNkJBQTZCLENBQUM7U0FDbkUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBNUpELDBDQTRKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcbmltcG9ydCB7IFBvbGljeVN0YXRlbWVudHMgfSBmcm9tICcuL3BvbGljeS1zdGF0ZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBQb2xpY3lEb2N1bWVudHNQcm9wcyB7XG4gIHBvbGljeVN0YXRlbWVudHM6IFBvbGljeVN0YXRlbWVudHM7XG4gIHN0YWNrTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUG9saWN5RG9jdW1lbnRzIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBhcmNoaXZlU291cmNlOiBpYW0uUG9saWN5RG9jdW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBjdXN0b21SZXNvdXJjZTogaWFtLlBvbGljeURvY3VtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgZGVzdGluYXRpb25CdWNrZXQ6IGlhbS5Qb2xpY3lEb2N1bWVudDtcbiAgcHVibGljIHJlYWRvbmx5IGR5bmFtb0RiVXBkYXRlOiBpYW0uUG9saWN5RG9jdW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBlbmNvZGU6IGlhbS5Qb2xpY3lEb2N1bWVudDtcbiAgcHVibGljIHJlYWRvbmx5IGVycm9ySGFuZGxlcjogaWFtLlBvbGljeURvY3VtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgaW5wdXRWYWxpZGF0ZTogaWFtLlBvbGljeURvY3VtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgbWVkaWFDb252ZXJ0OiBpYW0uUG9saWN5RG9jdW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBtZWRpYUluZm86IGlhbS5Qb2xpY3lEb2N1bWVudDtcbiAgcHVibGljIHJlYWRvbmx5IG1lZGlhUGFja2FnZUFzc2V0czogaWFtLlBvbGljeURvY3VtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgbWVkaWFQYWNrYWdlVm9kOiBpYW0uUG9saWN5RG9jdW1lbnQ7XG4gIHB1YmxpYyByZWFkb25seSBvdXRwdXRWYWxpZGF0ZTogaWFtLlBvbGljeURvY3VtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgcHJvZmlsZXI6IGlhbS5Qb2xpY3lEb2N1bWVudDtcbiAgcHVibGljIHJlYWRvbmx5IHNuc05vdGlmaWNhdGlvbjogaWFtLlBvbGljeURvY3VtZW50O1xuICBwdWJsaWMgcmVhZG9ubHkgc3FzU2VuZE1lc3NhZ2U6IGlhbS5Qb2xpY3lEb2N1bWVudDtcbiAgcHVibGljIHJlYWRvbmx5IHN0ZXBGdW5jdGlvbnM6IGlhbS5Qb2xpY3lEb2N1bWVudDtcbiAgcHVibGljIHJlYWRvbmx5IHN0ZXBGdW5jdGlvbnNTZXJ2aWNlOiBpYW0uUG9saWN5RG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBQb2xpY3lEb2N1bWVudHNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLmFyY2hpdmVTb3VyY2UgPSBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5hcmNoaXZlU291cmNlUm9sZUxhbWJkYSxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5hcmNoaXZlU291cmNlUm9sZUxvZ3MsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuYXJjaGl2ZVNvdXJjZVJvbGVTMyxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmN1c3RvbVJlc291cmNlID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuY3VzdG9tUmVzb3VyY2VSb2xlQ2xvdWRGcm9udCxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5jdXN0b21SZXNvdXJjZVJvbGVMb2dzLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmN1c3RvbVJlc291cmNlUm9sZU1lZGlhQ29udmVydCxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5jdXN0b21SZXNvdXJjZVJvbGVNZWRpYVBhY2thZ2VDcmVhdGVMaXN0LFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmN1c3RvbVJlc291cmNlUm9sZU1lZGlhUGFja2FnZURlbGV0ZSxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5jdXN0b21SZXNvdXJjZVJvbGVNZWRpYVBhY2thZ2VEZXNjcmliZURlbGV0ZSxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5jdXN0b21SZXNvdXJjZVJvbGVTMyxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmRlc3RpbmF0aW9uQnVja2V0ID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbcHJvcHMucG9saWN5U3RhdGVtZW50cy5kZXN0aW5hdGlvbkJ1Y2tldF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmR5bmFtb0RiVXBkYXRlID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZHluYW1vRGJVcGRhdGVSb2xlRHluYW1vRGIsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZHluYW1vRGJVcGRhdGVSb2xlTGFtYmRhLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmR5bmFtb0RiVXBkYXRlUm9sZUxvZ3MsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5lbmNvZGUgPSBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5lbmNvZGVSb2xlSWFtLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmVuY29kZVJvbGVMYW1iZGEsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZW5jb2RlUm9sZUxvZ3MsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZW5jb2RlUm9sZU1lZGlhQ29udmVydCxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5lbmNvZGVSb2xlUzNHZXRPYmplY3QsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZW5jb2RlUm9sZVMzUHV0T2JqZWN0LFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuZXJyb3JIYW5kbGVyUm9sZUR5bmFtb0RiLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmVycm9ySGFuZGxlclJvbGVMb2dzLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmVycm9ySGFuZGxlclJvbGVTbnMsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnB1dFZhbGlkYXRlID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuaW5wdXRWYWxpZGF0ZVJvbGVMYW1iZGEsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuaW5wdXRWYWxpZGF0ZVJvbGVMb2dzLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLmlucHV0VmFsaWRhdGVSb2xlUzMsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYUNvbnZlcnQgPSBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5tZWRpYUNvbnZlcnRSb2xlRXhlY3V0ZUFwaSxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5tZWRpYUNvbnZlcnRSb2xlUzMsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYUluZm8gPSBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5tZWRpYUluZm9Sb2xlTGFtYmRhLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLm1lZGlhSW5mb1JvbGVMb2dzLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLm1lZGlhSW5mb1JvbGVTMyxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLm1lZGlhUGFja2FnZUFzc2V0cyA9IG5ldyBpYW0uUG9saWN5RG9jdW1lbnQoe1xuICAgICAgc3RhdGVtZW50czogW1xuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLm1lZGlhUGFja2FnZUFzc2V0Um9sZUlhbSxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5tZWRpYVBhY2thZ2VBc3NldFJvbGVMYW1iZGEsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMubWVkaWFQYWNrYWdlQXNzZXRSb2xlTG9ncyxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5tZWRpYVBhY2thZ2VBc3NldFJvbGVNZWRpYVBhY2thZ2UsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWRpYVBhY2thZ2VWb2QgPSBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLm1lZGlhUGFja2FnZVZvZFJvbGVTM10sXG4gICAgfSk7XG5cbiAgICB0aGlzLm91dHB1dFZhbGlkYXRlID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMub3V0cHV0VmFsaWRhdGVSb2xlRHluYW1vRGIsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMub3V0cHV0VmFsaWRhdGVSb2xlTGFtYmRhLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLm91dHB1dFZhbGlkYXRlUm9sZUxvZ3MsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMub3V0cHV0VmFsaWRhdGVSb2xlUzMsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9maWxlciA9IG5ldyBpYW0uUG9saWN5RG9jdW1lbnQoe1xuICAgICAgc3RhdGVtZW50czogW1xuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnByb2ZpbGVyUm9sZUR5bmFtb0RiLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnByb2ZpbGVyUm9sZUxhbWJkYSxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5wcm9maWxlclJvbGVMb2dzLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuc25zTm90aWZpY2F0aW9uID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuc25zTm90aWZpY2F0aW9uUm9sZUttcyxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5zbnNOb3RpZmljYXRpb25Sb2xlTGFtYmRhLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnNuc05vdGlmaWNhdGlvblJvbGVMb2dzLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnNuc05vdGlmaWNhdGlvblJvbGVTbnMsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zcXNTZW5kTWVzc2FnZSA9IG5ldyBpYW0uUG9saWN5RG9jdW1lbnQoe1xuICAgICAgc3RhdGVtZW50czogW1xuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnNxc1NlbmRNZXNzYWdlUm9sZUttcyxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5zcXNTZW5kTWVzc2FnZVJvbGVMYW1iZGEsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuc3FzU2VuZE1lc3NhZ2VSb2xlTG9ncyxcbiAgICAgICAgcHJvcHMucG9saWN5U3RhdGVtZW50cy5zcXNTZW5kTWVzc2FnZVJvbGVTcXMsXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGVwRnVuY3Rpb25zID0gbmV3IGlhbS5Qb2xpY3lEb2N1bWVudCh7XG4gICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuc3RlcEZ1bmN0aW9uc1JvbGVMYW1iZGEsXG4gICAgICAgIHByb3BzLnBvbGljeVN0YXRlbWVudHMuc3RlcEZ1bmN0aW9uc1JvbGVMb2dzLFxuICAgICAgICBwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnN0ZXBGdW5jdGlvbnNSb2xlU3RhdGVzLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RlcEZ1bmN0aW9uc1NlcnZpY2UgPSBuZXcgaWFtLlBvbGljeURvY3VtZW50KHtcbiAgICAgIHN0YXRlbWVudHM6IFtwcm9wcy5wb2xpY3lTdGF0ZW1lbnRzLnN0ZXBGdW5jdGlvblNlcnZpY2VSb2xlTGFtYmRhXSxcbiAgICB9KTtcbiAgfVxufSJdfQ==