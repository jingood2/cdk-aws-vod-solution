"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkVodSolutionStack = void 0;
const cdk = require("@aws-cdk/core");
const cloudfront_origin_access_identities_1 = require("./cloudfront-origin-access-identities");
const cloudfronts_1 = require("./cloudfronts");
const custom_resources_1 = require("./custom-resources");
const dynamodb_tables_1 = require("./dynamodb-tables");
const event_patterns_1 = require("./event-patterns");
const iam_roles_1 = require("./iam-roles");
const kms_keys_1 = require("./kms-keys");
const lambda_functions_1 = require("./lambda-functions");
const lambda_permissions_1 = require("./lambda-permissions");
const outputs_1 = require("./outputs");
const policy_documents_1 = require("./policy-documents");
const policy_statements_1 = require("./policy-statements");
const rules_1 = require("./rules");
const s3_buckets_1 = require("./s3-buckets");
const sns_topics_1 = require("./sns-topics");
const sqs_queues_1 = require("./sqs-queues");
const step_functions_1 = require("./step-functions");
const step_functions_choices_1 = require("./step-functions-choices");
const step_functions_passes_1 = require("./step-functions-passes");
const step_functions_tasks_1 = require("./step-functions-tasks");
const _context_variables_1 = require("./_context-variables");
class CdkVodSolutionStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Set constant values from the Stack
        const account = this.account;
        const partition = this.partition;
        const region = this.region;
        const stackName = this.stackName;
        // Import Context Variables
        const contextVariables = new _context_variables_1.ContextVariables(this, 'ContextVariables', {});
        // Initialize Custom Constructs
        const cloudfrontOriginAccessIdentities = new cloudfront_origin_access_identities_1.CloudfrontOriginAccessIdentities(this, 'CloudFrontOriginAccessIdentities', {
            stackName: stackName,
        });
        const dynamoDbTables = new dynamodb_tables_1.DynamoDbTables(this, 'DynamoDbTables', {
            stackName: stackName,
        });
        const eventPatterns = new event_patterns_1.EventPatterns(this, 'EventPatterns', {
            stackName: stackName,
        });
        const kmsKeys = new kms_keys_1.KmsKeys(this, 'KmsKeys', {
            stackName: stackName,
        });
        const lambdaPermissions = new lambda_permissions_1.LambdaPermissions(this, 'Permissions', {
            stackName: stackName,
        });
        const s3Buckets = new s3_buckets_1.S3Buckets(this, 'S3Buckets', {
            stackName: stackName,
        });
        const snsTopics = new sns_topics_1.SnsTopics(this, 'SnsTopics', {
            adminEmail: contextVariables.adminEmail,
            kmsKeys: kmsKeys,
            stackName: stackName,
        });
        const sqsQueues = new sqs_queues_1.SqsQueues(this, 'SqsQueues', {
            kmsKeys: kmsKeys,
            stackName: stackName,
        });
        const cloudFronts = new cloudfronts_1.CloudFronts(this, 'CloudFronts', {
            cloudFrontDomain: contextVariables.cloudFrontDomain,
            cloudfrontOriginAccessIdentities: cloudfrontOriginAccessIdentities,
            hostedZoneId: contextVariables.hostedZoneId,
            region: region,
            s3Buckets: s3Buckets,
            stackName: stackName,
        });
        const policyStatements = new policy_statements_1.PolicyStatements(this, 'PolicyStatements', {
            account: account,
            cloudFronts: cloudFronts,
            cloudfrontOriginAccessIdentities: cloudfrontOriginAccessIdentities,
            dynamoDbTables: dynamoDbTables,
            kmsKeys: kmsKeys,
            partition: partition,
            region: region,
            s3Buckets: s3Buckets,
            snsTopics: snsTopics,
            sqsQueues: sqsQueues,
            stackName: stackName,
        });
        const policyDocuments = new policy_documents_1.PolicyDocuments(this, 'PolicyDocuments', {
            policyStatements: policyStatements,
            stackName: stackName,
        });
        const iamRoles = new iam_roles_1.IamRoles(this, 'IamRoles', {
            policyDocuments: policyDocuments,
            policyStatements: policyStatements,
            stackName: stackName,
        });
        const lambdaFunctions = new lambda_functions_1.LambdaFunctions(this, 'LambdaFunctions', {
            acceleratedTranscoding: contextVariables.acceleratedTranscoding,
            account: account,
            cloudFronts: cloudFronts,
            dynamoDbTables: dynamoDbTables,
            enableMediaPackage: contextVariables.enableMediaPackage,
            enableSns: contextVariables.enableSns,
            enableSqs: contextVariables.enableSqs,
            frameCapture: contextVariables.frameCapture,
            glacier: contextVariables.glacier,
            iamRoles: iamRoles,
            lambdaPermissions: lambdaPermissions,
            partition: partition,
            region: region,
            s3Buckets: s3Buckets,
            snsTopics: snsTopics,
            sqsQueues: sqsQueues,
            stackName: stackName,
        });
        const rules = new rules_1.Rules(this, 'Rules', {
            eventPatterns: eventPatterns,
            lambdaFunctions: lambdaFunctions,
            stackName: stackName,
        });
        const customResources = new custom_resources_1.CustomResources(this, 'CustomResources', {
            cloudFronts: cloudFronts,
            enableMediaPackage: contextVariables.enableMediaPackage,
            frameCapture: contextVariables.frameCapture,
            glacier: contextVariables.glacier,
            lambdaFunctions: lambdaFunctions,
            s3Buckets: s3Buckets,
            sendAnonymousMetrics: contextVariables.sendAnonymousMetrics,
            stackName: stackName,
            workflowTrigger: contextVariables.workflowTrigger,
        });
        const outputs = new outputs_1.Outputs(this, 'Outputs', {
            cloudFronts: cloudFronts,
            customResources: customResources,
            dynamoDbTables: dynamoDbTables,
            s3Buckets: s3Buckets,
            snsTopics: snsTopics,
            sqsQueues: sqsQueues,
            stackName: stackName,
        });
        const stepFunctionsChoices = new step_functions_choices_1.StepFunctionsChoices(this, 'StepFunctionsChoices', {
            stackName: stackName,
        });
        const stepFunctionsPasses = new step_functions_passes_1.StepFunctionsPasses(this, 'StepFunctionsPasses', {
            stackName: stackName,
        });
        const stepFunctionsTasks = new step_functions_tasks_1.StepFunctionsTasks(this, 'StepFunctionsTasks', {
            lambdaFunctions: lambdaFunctions,
            stackName: stackName,
        });
        const stepFunctions = new step_functions_1.StepFunctions(this, 'StepFunctions', {
            iamRoles: iamRoles,
            stackName: stackName,
            stepFunctionsChoices: stepFunctionsChoices,
            stepFunctionsPasses: stepFunctionsPasses,
            stepFunctionsTasks: stepFunctionsTasks,
        });
        // Add IamRoles to PolicyStatements as resources
        // This must be done here to prevent circular dependency issues
        policyStatements.encodeRoleIam.addResources(iamRoles.mediaConvert.roleArn);
        policyStatements.mediaPackageAssetRoleIam.addResources(iamRoles.mediaPackageVod.roleArn);
        // Associate destinationBucket PolicyStatement with destination S3Bucket
        // This must be done here to prevent circular dependency issues
        s3Buckets.destination.addToResourcePolicy(policyStatements.destinationBucket);
        // Add environment variables to LambdaFunctions
        // This must be done here to prevent circular dependency issues
        lambdaFunctions.encode.addEnvironment('EndPoint', customResources.mediaConvertEndPoint.getAttString('EndpointUrl'));
        lambdaFunctions.outputValidate.addEnvironment('EndPoint', customResources.mediaConvertEndPoint.getAttString('EndpointUrl'));
        lambdaFunctions.mediaPackageAssets.addEnvironment('GroupId', customResources.mediaPackageVod.getAttString('GroupId'));
        lambdaFunctions.mediaPackageAssets.addEnvironment('GroupDomainName', customResources.mediaPackageVod.getAttString('GroupDomainName'));
    }
}
exports.CdkVodSolutionStack = CdkVodSolutionStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXZvZC1zb2x1dGlvbi1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNkay12b2Qtc29sdXRpb24tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLCtGQUF5RjtBQUN6RiwrQ0FBNEM7QUFDNUMseURBQXFEO0FBQ3JELHVEQUFtRDtBQUNuRCxxREFBaUQ7QUFDakQsMkNBQXVDO0FBQ3ZDLHlDQUFxQztBQUNyQyx5REFBcUQ7QUFDckQsNkRBQXlEO0FBQ3pELHVDQUFvQztBQUNwQyx5REFBcUQ7QUFDckQsMkRBQXVEO0FBQ3ZELG1DQUFnQztBQUNoQyw2Q0FBeUM7QUFDekMsNkNBQXlDO0FBQ3pDLDZDQUF5QztBQUN6QyxxREFBaUQ7QUFDakQscUVBQWdFO0FBQ2hFLG1FQUE4RDtBQUM5RCxpRUFBNEQ7QUFDNUQsNkRBQXdEO0FBTXhELE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUErQjtRQUMzRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixxQ0FBcUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVqQywyQkFBMkI7UUFDM0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHFDQUFnQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1RSwrQkFBK0I7UUFDL0IsTUFBTSxnQ0FBZ0MsR0FDcEMsSUFBSSxzRUFBZ0MsQ0FDbEMsSUFBSSxFQUNKLGtDQUFrQyxFQUNsQztZQUNFLFNBQVMsRUFB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QUFlLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUNqRSxDQUFDO1FBRUYsZUFBZSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQzNDLFVBQVUsRUFDVixlQUFlLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUNqRSxDQUFDO1FBRUYsZUFBZSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FDL0MsU0FBUyxFQUNULGVBQWUsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUN4RCxDQUFDO1FBQ0YsZUFBZSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FDL0MsaUJBQWlCLEVBQ2pCLGVBQWUsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQ2hFLENBQUM7SUFTSixDQUFDO0NBQ0Y7QUFwTkQsa0RBb05DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgQ2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXRpZXMgfSBmcm9tICcuL2Nsb3VkZnJvbnQtb3JpZ2luLWFjY2Vzcy1pZGVudGl0aWVzJztcbmltcG9ydCB7IENsb3VkRnJvbnRzIH0gZnJvbSAnLi9jbG91ZGZyb250cyc7XG5pbXBvcnQgeyBDdXN0b21SZXNvdXJjZXMgfSBmcm9tICcuL2N1c3RvbS1yZXNvdXJjZXMnO1xuaW1wb3J0IHsgRHluYW1vRGJUYWJsZXMgfSBmcm9tICcuL2R5bmFtb2RiLXRhYmxlcyc7XG5pbXBvcnQgeyBFdmVudFBhdHRlcm5zIH0gZnJvbSAnLi9ldmVudC1wYXR0ZXJucyc7XG5pbXBvcnQgeyBJYW1Sb2xlcyB9IGZyb20gJy4vaWFtLXJvbGVzJztcbmltcG9ydCB7IEttc0tleXMgfSBmcm9tICcuL2ttcy1rZXlzJztcbmltcG9ydCB7IExhbWJkYUZ1bmN0aW9ucyB9IGZyb20gJy4vbGFtYmRhLWZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBMYW1iZGFQZXJtaXNzaW9ucyB9IGZyb20gJy4vbGFtYmRhLXBlcm1pc3Npb25zJztcbmltcG9ydCB7IE91dHB1dHMgfSBmcm9tICcuL291dHB1dHMnO1xuaW1wb3J0IHsgUG9saWN5RG9jdW1lbnRzIH0gZnJvbSAnLi9wb2xpY3ktZG9jdW1lbnRzJztcbmltcG9ydCB7IFBvbGljeVN0YXRlbWVudHMgfSBmcm9tICcuL3BvbGljeS1zdGF0ZW1lbnRzJztcbmltcG9ydCB7IFJ1bGVzIH0gZnJvbSAnLi9ydWxlcyc7XG5pbXBvcnQgeyBTM0J1Y2tldHMgfSBmcm9tICcuL3MzLWJ1Y2tldHMnO1xuaW1wb3J0IHsgU25zVG9waWNzIH0gZnJvbSAnLi9zbnMtdG9waWNzJztcbmltcG9ydCB7IFNxc1F1ZXVlcyB9IGZyb20gJy4vc3FzLXF1ZXVlcyc7XG5pbXBvcnQgeyBTdGVwRnVuY3Rpb25zIH0gZnJvbSAnLi9zdGVwLWZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBTdGVwRnVuY3Rpb25zQ2hvaWNlcyB9IGZyb20gJy4vc3RlcC1mdW5jdGlvbnMtY2hvaWNlcyc7XG5pbXBvcnQgeyBTdGVwRnVuY3Rpb25zUGFzc2VzIH0gZnJvbSAnLi9zdGVwLWZ1bmN0aW9ucy1wYXNzZXMnO1xuaW1wb3J0IHsgU3RlcEZ1bmN0aW9uc1Rhc2tzIH0gZnJvbSAnLi9zdGVwLWZ1bmN0aW9ucy10YXNrcyc7XG5pbXBvcnQgeyBDb250ZXh0VmFyaWFibGVzIH0gZnJvbSAnLi9fY29udGV4dC12YXJpYWJsZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENka1ZvZFNvbHV0aW9uU3RhY2tQcm9wcyBleHRlbmRzIGNkay5TdGFja1Byb3BzIHtcblxufVxuXG5leHBvcnQgY2xhc3MgQ2RrVm9kU29sdXRpb25TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQ2RrVm9kU29sdXRpb25TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBTZXQgY29uc3RhbnQgdmFsdWVzIGZyb20gdGhlIFN0YWNrXG4gICAgY29uc3QgYWNjb3VudCA9IHRoaXMuYWNjb3VudDtcbiAgICBjb25zdCBwYXJ0aXRpb24gPSB0aGlzLnBhcnRpdGlvbjtcbiAgICBjb25zdCByZWdpb24gPSB0aGlzLnJlZ2lvbjtcbiAgICBjb25zdCBzdGFja05hbWUgPSB0aGlzLnN0YWNrTmFtZTtcblxuICAgIC8vIEltcG9ydCBDb250ZXh0IFZhcmlhYmxlc1xuICAgIGNvbnN0IGNvbnRleHRWYXJpYWJsZXMgPSBuZXcgQ29udGV4dFZhcmlhYmxlcyh0aGlzLCAnQ29udGV4dFZhcmlhYmxlcycsIHt9KTtcblxuICAgIC8vIEluaXRpYWxpemUgQ3VzdG9tIENvbnN0cnVjdHNcbiAgICBjb25zdCBjbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcyA9XG4gICAgICBuZXcgQ2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXRpZXMoXG4gICAgICAgIHRoaXMsXG4gICAgICAgICdDbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcycsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGFja05hbWU6IHN0YWNrTmFtZSxcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIGNvbnN0IGR5bmFtb0RiVGFibGVzID0gbmV3IER5bmFtb0RiVGFibGVzKHRoaXMsICdEeW5hbW9EYlRhYmxlcycsIHtcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pOyAgICBcblxuICAgIGNvbnN0IGV2ZW50UGF0dGVybnMgPSBuZXcgRXZlbnRQYXR0ZXJucyh0aGlzLCAnRXZlbnRQYXR0ZXJucycsIHtcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3Qga21zS2V5cyA9IG5ldyBLbXNLZXlzKHRoaXMsICdLbXNLZXlzJywge1xuICAgICAgc3RhY2tOYW1lOiBzdGFja05hbWUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFQZXJtaXNzaW9ucyA9IG5ldyBMYW1iZGFQZXJtaXNzaW9ucyh0aGlzLCAnUGVybWlzc2lvbnMnLCB7XG4gICAgICBzdGFja05hbWU6IHN0YWNrTmFtZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHMzQnVja2V0cyA9IG5ldyBTM0J1Y2tldHModGhpcywgJ1MzQnVja2V0cycsIHtcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc25zVG9waWNzID0gbmV3IFNuc1RvcGljcyh0aGlzLCAnU25zVG9waWNzJywge1xuICAgICAgYWRtaW5FbWFpbDogY29udGV4dFZhcmlhYmxlcy5hZG1pbkVtYWlsLFxuICAgICAga21zS2V5czoga21zS2V5cyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3FzUXVldWVzID0gbmV3IFNxc1F1ZXVlcyh0aGlzLCAnU3FzUXVldWVzJywge1xuICAgICAga21zS2V5czoga21zS2V5cyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xvdWRGcm9udHMgPSBuZXcgQ2xvdWRGcm9udHModGhpcywgJ0Nsb3VkRnJvbnRzJywge1xuICAgICAgY2xvdWRGcm9udERvbWFpbjogY29udGV4dFZhcmlhYmxlcy5jbG91ZEZyb250RG9tYWluLFxuICAgICAgY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXRpZXM6IGNsb3VkZnJvbnRPcmlnaW5BY2Nlc3NJZGVudGl0aWVzLFxuICAgICAgaG9zdGVkWm9uZUlkOiBjb250ZXh0VmFyaWFibGVzLmhvc3RlZFpvbmVJZCxcbiAgICAgIHJlZ2lvbjogcmVnaW9uLFxuICAgICAgczNCdWNrZXRzOiBzM0J1Y2tldHMsXG4gICAgICBzdGFja05hbWU6IHN0YWNrTmFtZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHBvbGljeVN0YXRlbWVudHMgPSBuZXcgUG9saWN5U3RhdGVtZW50cyh0aGlzLCAnUG9saWN5U3RhdGVtZW50cycsIHtcbiAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICBjbG91ZEZyb250czogY2xvdWRGcm9udHMsXG4gICAgICBjbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllczogY2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXRpZXMsXG4gICAgICBkeW5hbW9EYlRhYmxlczogZHluYW1vRGJUYWJsZXMsXG4gICAgICBrbXNLZXlzOiBrbXNLZXlzLFxuICAgICAgcGFydGl0aW9uOiBwYXJ0aXRpb24sXG4gICAgICByZWdpb246IHJlZ2lvbixcbiAgICAgIHMzQnVja2V0czogczNCdWNrZXRzLFxuICAgICAgc25zVG9waWNzOiBzbnNUb3BpY3MsXG4gICAgICBzcXNRdWV1ZXM6IHNxc1F1ZXVlcyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcG9saWN5RG9jdW1lbnRzID0gbmV3IFBvbGljeURvY3VtZW50cyh0aGlzLCAnUG9saWN5RG9jdW1lbnRzJywge1xuICAgICAgcG9saWN5U3RhdGVtZW50czogcG9saWN5U3RhdGVtZW50cyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaWFtUm9sZXMgPSBuZXcgSWFtUm9sZXModGhpcywgJ0lhbVJvbGVzJywge1xuICAgICAgcG9saWN5RG9jdW1lbnRzOiBwb2xpY3lEb2N1bWVudHMsXG4gICAgICBwb2xpY3lTdGF0ZW1lbnRzOiBwb2xpY3lTdGF0ZW1lbnRzLFxuICAgICAgc3RhY2tOYW1lOiBzdGFja05hbWUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFGdW5jdGlvbnMgPSBuZXcgTGFtYmRhRnVuY3Rpb25zKHRoaXMsICdMYW1iZGFGdW5jdGlvbnMnLCB7XG4gICAgICBhY2NlbGVyYXRlZFRyYW5zY29kaW5nOiBjb250ZXh0VmFyaWFibGVzLmFjY2VsZXJhdGVkVHJhbnNjb2RpbmcsXG4gICAgICBhY2NvdW50OiBhY2NvdW50LFxuICAgICAgY2xvdWRGcm9udHM6IGNsb3VkRnJvbnRzLFxuICAgICAgZHluYW1vRGJUYWJsZXM6IGR5bmFtb0RiVGFibGVzLFxuICAgICAgZW5hYmxlTWVkaWFQYWNrYWdlOiBjb250ZXh0VmFyaWFibGVzLmVuYWJsZU1lZGlhUGFja2FnZSxcbiAgICAgIGVuYWJsZVNuczogY29udGV4dFZhcmlhYmxlcy5lbmFibGVTbnMsXG4gICAgICBlbmFibGVTcXM6IGNvbnRleHRWYXJpYWJsZXMuZW5hYmxlU3FzLFxuICAgICAgZnJhbWVDYXB0dXJlOiBjb250ZXh0VmFyaWFibGVzLmZyYW1lQ2FwdHVyZSxcbiAgICAgIGdsYWNpZXI6IGNvbnRleHRWYXJpYWJsZXMuZ2xhY2llcixcbiAgICAgIGlhbVJvbGVzOiBpYW1Sb2xlcyxcbiAgICAgIGxhbWJkYVBlcm1pc3Npb25zOiBsYW1iZGFQZXJtaXNzaW9ucyxcbiAgICAgIHBhcnRpdGlvbjogcGFydGl0aW9uLFxuICAgICAgcmVnaW9uOiByZWdpb24sXG4gICAgICBzM0J1Y2tldHM6IHMzQnVja2V0cyxcbiAgICAgIHNuc1RvcGljczogc25zVG9waWNzLFxuICAgICAgc3FzUXVldWVzOiBzcXNRdWV1ZXMsXG4gICAgICBzdGFja05hbWU6IHN0YWNrTmFtZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJ1bGVzID0gbmV3IFJ1bGVzKHRoaXMsICdSdWxlcycsIHtcbiAgICAgIGV2ZW50UGF0dGVybnM6IGV2ZW50UGF0dGVybnMsXG4gICAgICBsYW1iZGFGdW5jdGlvbnM6IGxhbWJkYUZ1bmN0aW9ucyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VzdG9tUmVzb3VyY2VzID0gbmV3IEN1c3RvbVJlc291cmNlcyh0aGlzLCAnQ3VzdG9tUmVzb3VyY2VzJywge1xuICAgICAgY2xvdWRGcm9udHM6IGNsb3VkRnJvbnRzLFxuICAgICAgZW5hYmxlTWVkaWFQYWNrYWdlOiBjb250ZXh0VmFyaWFibGVzLmVuYWJsZU1lZGlhUGFja2FnZSxcbiAgICAgIGZyYW1lQ2FwdHVyZTogY29udGV4dFZhcmlhYmxlcy5mcmFtZUNhcHR1cmUsXG4gICAgICBnbGFjaWVyOiBjb250ZXh0VmFyaWFibGVzLmdsYWNpZXIsXG4gICAgICBsYW1iZGFGdW5jdGlvbnM6IGxhbWJkYUZ1bmN0aW9ucyxcbiAgICAgIHMzQnVja2V0czogczNCdWNrZXRzLFxuICAgICAgc2VuZEFub255bW91c01ldHJpY3M6IGNvbnRleHRWYXJpYWJsZXMuc2VuZEFub255bW91c01ldHJpY3MsXG4gICAgICBzdGFja05hbWU6IHN0YWNrTmFtZSxcbiAgICAgIHdvcmtmbG93VHJpZ2dlcjogY29udGV4dFZhcmlhYmxlcy53b3JrZmxvd1RyaWdnZXIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRzID0gbmV3IE91dHB1dHModGhpcywgJ091dHB1dHMnLCB7XG4gICAgICBjbG91ZEZyb250czogY2xvdWRGcm9udHMsXG4gICAgICBjdXN0b21SZXNvdXJjZXM6IGN1c3RvbVJlc291cmNlcyxcbiAgICAgIGR5bmFtb0RiVGFibGVzOiBkeW5hbW9EYlRhYmxlcyxcbiAgICAgIHMzQnVja2V0czogczNCdWNrZXRzLFxuICAgICAgc25zVG9waWNzOiBzbnNUb3BpY3MsXG4gICAgICBzcXNRdWV1ZXM6IHNxc1F1ZXVlcyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RlcEZ1bmN0aW9uc0Nob2ljZXMgPSBuZXcgU3RlcEZ1bmN0aW9uc0Nob2ljZXMoXG4gICAgICB0aGlzLFxuICAgICAgJ1N0ZXBGdW5jdGlvbnNDaG9pY2VzJyxcbiAgICAgIHtcbiAgICAgICAgc3RhY2tOYW1lOiBzdGFja05hbWUsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHN0ZXBGdW5jdGlvbnNQYXNzZXMgPSBuZXcgU3RlcEZ1bmN0aW9uc1Bhc3NlcyhcbiAgICAgIHRoaXMsXG4gICAgICAnU3RlcEZ1bmN0aW9uc1Bhc3NlcycsXG4gICAgICB7XG4gICAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBzdGVwRnVuY3Rpb25zVGFza3MgPSBuZXcgU3RlcEZ1bmN0aW9uc1Rhc2tzKFxuICAgICAgdGhpcyxcbiAgICAgICdTdGVwRnVuY3Rpb25zVGFza3MnLFxuICAgICAge1xuICAgICAgICBsYW1iZGFGdW5jdGlvbnM6IGxhbWJkYUZ1bmN0aW9ucyxcbiAgICAgICAgc3RhY2tOYW1lOiBzdGFja05hbWUsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHN0ZXBGdW5jdGlvbnMgPSBuZXcgU3RlcEZ1bmN0aW9ucyh0aGlzLCAnU3RlcEZ1bmN0aW9ucycsIHtcbiAgICAgIGlhbVJvbGVzOiBpYW1Sb2xlcyxcbiAgICAgIHN0YWNrTmFtZTogc3RhY2tOYW1lLFxuICAgICAgc3RlcEZ1bmN0aW9uc0Nob2ljZXM6IHN0ZXBGdW5jdGlvbnNDaG9pY2VzLFxuICAgICAgc3RlcEZ1bmN0aW9uc1Bhc3Nlczogc3RlcEZ1bmN0aW9uc1Bhc3NlcyxcbiAgICAgIHN0ZXBGdW5jdGlvbnNUYXNrczogc3RlcEZ1bmN0aW9uc1Rhc2tzLFxuICAgIH0pO1xuXG4gICAgLy8gQWRkIElhbVJvbGVzIHRvIFBvbGljeVN0YXRlbWVudHMgYXMgcmVzb3VyY2VzXG4gICAgLy8gVGhpcyBtdXN0IGJlIGRvbmUgaGVyZSB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcGVuZGVuY3kgaXNzdWVzXG4gICAgcG9saWN5U3RhdGVtZW50cy5lbmNvZGVSb2xlSWFtLmFkZFJlc291cmNlcyhpYW1Sb2xlcy5tZWRpYUNvbnZlcnQucm9sZUFybik7XG5cbiAgICBwb2xpY3lTdGF0ZW1lbnRzLm1lZGlhUGFja2FnZUFzc2V0Um9sZUlhbS5hZGRSZXNvdXJjZXMoXG4gICAgICBpYW1Sb2xlcy5tZWRpYVBhY2thZ2VWb2Qucm9sZUFyblxuICAgICk7XG5cbiAgICAvLyBBc3NvY2lhdGUgZGVzdGluYXRpb25CdWNrZXQgUG9saWN5U3RhdGVtZW50IHdpdGggZGVzdGluYXRpb24gUzNCdWNrZXRcbiAgICAvLyBUaGlzIG11c3QgYmUgZG9uZSBoZXJlIHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwZW5kZW5jeSBpc3N1ZXNcbiAgICBzM0J1Y2tldHMuZGVzdGluYXRpb24uYWRkVG9SZXNvdXJjZVBvbGljeShcbiAgICAgIHBvbGljeVN0YXRlbWVudHMuZGVzdGluYXRpb25CdWNrZXRcbiAgICApO1xuXG4gICAgLy8gQWRkIGVudmlyb25tZW50IHZhcmlhYmxlcyB0byBMYW1iZGFGdW5jdGlvbnNcbiAgICAvLyBUaGlzIG11c3QgYmUgZG9uZSBoZXJlIHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwZW5kZW5jeSBpc3N1ZXNcbiAgICBsYW1iZGFGdW5jdGlvbnMuZW5jb2RlLmFkZEVudmlyb25tZW50KFxuICAgICAgJ0VuZFBvaW50JyxcbiAgICAgIGN1c3RvbVJlc291cmNlcy5tZWRpYUNvbnZlcnRFbmRQb2ludC5nZXRBdHRTdHJpbmcoJ0VuZHBvaW50VXJsJylcbiAgICApO1xuXG4gICAgbGFtYmRhRnVuY3Rpb25zLm91dHB1dFZhbGlkYXRlLmFkZEVudmlyb25tZW50KFxuICAgICAgJ0VuZFBvaW50JyxcbiAgICAgIGN1c3RvbVJlc291cmNlcy5tZWRpYUNvbnZlcnRFbmRQb2ludC5nZXRBdHRTdHJpbmcoJ0VuZHBvaW50VXJsJylcbiAgICApO1xuXG4gICAgbGFtYmRhRnVuY3Rpb25zLm1lZGlhUGFja2FnZUFzc2V0cy5hZGRFbnZpcm9ubWVudChcbiAgICAgICdHcm91cElkJyxcbiAgICAgIGN1c3RvbVJlc291cmNlcy5tZWRpYVBhY2thZ2VWb2QuZ2V0QXR0U3RyaW5nKCdHcm91cElkJylcbiAgICApO1xuICAgIGxhbWJkYUZ1bmN0aW9ucy5tZWRpYVBhY2thZ2VBc3NldHMuYWRkRW52aXJvbm1lbnQoXG4gICAgICAnR3JvdXBEb21haW5OYW1lJyxcbiAgICAgIGN1c3RvbVJlc291cmNlcy5tZWRpYVBhY2thZ2VWb2QuZ2V0QXR0U3RyaW5nKCdHcm91cERvbWFpbk5hbWUnKVxuICAgICk7XG5cblxuXG5cbiAgICBcblxuXG4gICAgXG4gIH1cbn0iXX0=