"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDbTables = void 0;
const cdk = require("@aws-cdk/core");
const dynamoDb = require("@aws-cdk/aws-dynamodb");
class DynamoDbTables extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Utilize CfnTable Construct to allow access to
        // required items such as KeySchema, etc.
        this.videoInfo = new dynamoDb.CfnTable(this, 'VideoInfoDynamoDbTable', {
            tableName: `${props.stackName}-VideoInfo`,
            attributeDefinitions: [
                {
                    attributeName: 'guid',
                    attributeType: 'S',
                },
                {
                    attributeName: 'srcBucket',
                    attributeType: 'S',
                },
                {
                    attributeName: 'startTime',
                    attributeType: 'S',
                },
            ],
            keySchema: [
                {
                    attributeName: 'guid',
                    keyType: 'HASH',
                },
            ],
            globalSecondaryIndexes: [
                {
                    indexName: 'srcBucket-startTime-index',
                    keySchema: [
                        {
                            attributeName: 'srcBucket',
                            keyType: 'HASH',
                        },
                        {
                            attributeName: 'startTime',
                            keyType: 'RANGE',
                        },
                    ],
                    projection: {
                        projectionType: 'ALL',
                    },
                },
            ],
            pointInTimeRecoverySpecification: {
                pointInTimeRecoveryEnabled: true,
            },
            billingMode: 'PAY_PER_REQUEST',
        });
        this.videoInfo.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;
        this.videoInfo.cfnOptions.updateReplacePolicy = cdk.CfnDeletionPolicy.RETAIN;
    }
}
exports.DynamoDbTables = DynamoDbTables;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGItdGFibGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHluYW1vZGItdGFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxrREFBa0Q7QUFNbEQsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFJL0MsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUEwQjtRQUN0RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLGdEQUFnRDtRQUNoRCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ3JFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLFlBQVk7WUFDekMsb0JBQW9CLEVBQUU7Z0JBQ3BCO29CQUNFLGFBQWEsRUFBRSxNQUFNO29CQUNyQixhQUFhLEVBQUUsR0FBRztpQkFDbkI7Z0JBQ0Q7b0JBQ0UsYUFBYSxFQUFFLFdBQVc7b0JBQzFCLGFBQWEsRUFBRSxHQUFHO2lCQUNuQjtnQkFDRDtvQkFDRSxhQUFhLEVBQUUsV0FBVztvQkFDMUIsYUFBYSxFQUFFLEdBQUc7aUJBQ25CO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLE9BQU8sRUFBRSxNQUFNO2lCQUNoQjthQUNGO1lBQ0Qsc0JBQXNCLEVBQUU7Z0JBQ3RCO29CQUNFLFNBQVMsRUFBRSwyQkFBMkI7b0JBQ3RDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxhQUFhLEVBQUUsV0FBVzs0QkFDMUIsT0FBTyxFQUFFLE1BQU07eUJBQ2hCO3dCQUNEOzRCQUNFLGFBQWEsRUFBRSxXQUFXOzRCQUMxQixPQUFPLEVBQUUsT0FBTzt5QkFDakI7cUJBQ0Y7b0JBQ0QsVUFBVSxFQUFFO3dCQUNWLGNBQWMsRUFBRSxLQUFLO3FCQUN0QjtpQkFDRjthQUNGO1lBQ0QsZ0NBQWdDLEVBQUU7Z0JBQ2hDLDBCQUEwQixFQUFFLElBQUk7YUFDakM7WUFDRCxXQUFXLEVBQUUsaUJBQWlCO1NBQy9CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7SUFDL0UsQ0FBQztDQUNGO0FBMURELHdDQTBEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGR5bmFtb0RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1vRGJUYWJsZXNQcm9wcyB7XG4gIHN0YWNrTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRHluYW1vRGJUYWJsZXMgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcblxuICBwdWJsaWMgcmVhZG9ubHkgdmlkZW9JbmZvOiBkeW5hbW9EYi5DZm5UYWJsZTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IER5bmFtb0RiVGFibGVzUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gVXRpbGl6ZSBDZm5UYWJsZSBDb25zdHJ1Y3QgdG8gYWxsb3cgYWNjZXNzIHRvXG4gICAgLy8gcmVxdWlyZWQgaXRlbXMgc3VjaCBhcyBLZXlTY2hlbWEsIGV0Yy5cbiAgICB0aGlzLnZpZGVvSW5mbyA9IG5ldyBkeW5hbW9EYi5DZm5UYWJsZSh0aGlzLCAnVmlkZW9JbmZvRHluYW1vRGJUYWJsZScsIHtcbiAgICAgIHRhYmxlTmFtZTogYCR7cHJvcHMuc3RhY2tOYW1lfS1WaWRlb0luZm9gLFxuICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6ICdndWlkJyxcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiAnUycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnc3JjQnVja2V0JyxcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiAnUycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnc3RhcnRUaW1lJyxcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiAnUycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAga2V5U2NoZW1hOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnZ3VpZCcsXG4gICAgICAgICAga2V5VHlwZTogJ0hBU0gnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGdsb2JhbFNlY29uZGFyeUluZGV4ZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGluZGV4TmFtZTogJ3NyY0J1Y2tldC1zdGFydFRpbWUtaW5kZXgnLFxuICAgICAgICAgIGtleVNjaGVtYTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnc3JjQnVja2V0JyxcbiAgICAgICAgICAgICAga2V5VHlwZTogJ0hBU0gnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogJ3N0YXJ0VGltZScsXG4gICAgICAgICAgICAgIGtleVR5cGU6ICdSQU5HRScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgcHJvamVjdGlvbjoge1xuICAgICAgICAgICAgcHJvamVjdGlvblR5cGU6ICdBTEwnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgcG9pbnRJblRpbWVSZWNvdmVyeVNwZWNpZmljYXRpb246IHtcbiAgICAgICAgcG9pbnRJblRpbWVSZWNvdmVyeUVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgYmlsbGluZ01vZGU6ICdQQVlfUEVSX1JFUVVFU1QnLFxuICAgIH0pO1xuXG4gICAgdGhpcy52aWRlb0luZm8uY2ZuT3B0aW9ucy5kZWxldGlvblBvbGljeSA9IGNkay5DZm5EZWxldGlvblBvbGljeS5SRVRBSU47XG4gICAgdGhpcy52aWRlb0luZm8uY2ZuT3B0aW9ucy51cGRhdGVSZXBsYWNlUG9saWN5ID0gY2RrLkNmbkRlbGV0aW9uUG9saWN5LlJFVEFJTjtcbiAgfVxufSJdfQ==