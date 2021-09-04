#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const cdk_vod_solution_stack_1 = require("../lib/cdk-vod-solution-stack");
// for development, use account/region from cdk cli
const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const app = new cdk.App();
const stackStage = app.node.tryGetContext('stackStage') !== undefined
    ? `${app.node.tryGetContext('stackStage')}-`
    : '';
const stackName = app.node.tryGetContext('stackName') !== undefined
    ? `${app.node.tryGetContext('stackName')}`
    : 'CdkVodSolutionStack';
new cdk_vod_solution_stack_1.CdkVodSolutionStack(app, stackName, {
    stackName: `${stackStage}${stackName}`
    /* If you don't specify 'env', this stack will be environment-agnostic.
     * Account/Region-dependent features and context lookups will not work,
     * but a single synthesized template can be deployed anywhere. */
    /* Uncomment the next line to specialize this stack for the AWS Account
     * and Region that are implied by the current CLI configuration. */
    // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    /* Uncomment the next line if you know exactly what Account and Region you
     * want to deploy the stack to. */
    // env: { account: '123456789012', region: 'us-east-1' },
    /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXZvZC1zb2x1dGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNkay12b2Qtc29sdXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQywwRUFBb0U7QUFFcEUsbURBQW1EO0FBQ25ELE1BQU0sTUFBTSxHQUFHO0lBQ2IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO0lBQ3hDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtDQUN2QyxDQUFDO0FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxVQUFVLEdBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUztJQUNoRCxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRztJQUM1QyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRVQsTUFBTSxTQUFTLEdBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUztJQUMvQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUMxQyxDQUFDLENBQUMscUJBQXFCLENBQUM7QUFFNUIsSUFBSSw0Q0FBbUIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFO0lBQ3RDLFNBQVMsRUFBRSxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUU7SUFDdEM7O3FFQUVpRTtJQUNqRTt1RUFDbUU7SUFDbkUsNkZBQTZGO0lBQzdGO3NDQUNrQztJQUNsQyx5REFBeUQ7SUFDekQsOEZBQThGO0NBQy9GLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IENka1ZvZFNvbHV0aW9uU3RhY2sgfSBmcm9tICcuLi9saWIvY2RrLXZvZC1zb2x1dGlvbi1zdGFjayc7XG5cbi8vIGZvciBkZXZlbG9wbWVudCwgdXNlIGFjY291bnQvcmVnaW9uIGZyb20gY2RrIGNsaVxuY29uc3QgZGV2RW52ID0ge1xuICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULFxuICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTixcbn07XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbmNvbnN0IHN0YWNrU3RhZ2UgPVxuICBhcHAubm9kZS50cnlHZXRDb250ZXh0KCdzdGFja1N0YWdlJykgIT09IHVuZGVmaW5lZFxuICAgID8gYCR7YXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnc3RhY2tTdGFnZScpfS1gXG4gICAgOiAnJztcblxuY29uc3Qgc3RhY2tOYW1lID1cbiAgYXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnc3RhY2tOYW1lJykgIT09IHVuZGVmaW5lZFxuICAgID8gYCR7YXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnc3RhY2tOYW1lJyl9YFxuICAgIDogJ0Nka1ZvZFNvbHV0aW9uU3RhY2snO1xuXG5uZXcgQ2RrVm9kU29sdXRpb25TdGFjayhhcHAsIHN0YWNrTmFtZSwge1xuICBzdGFja05hbWU6IGAke3N0YWNrU3RhZ2V9JHtzdGFja05hbWV9YFxuICAvKiBJZiB5b3UgZG9uJ3Qgc3BlY2lmeSAnZW52JywgdGhpcyBzdGFjayB3aWxsIGJlIGVudmlyb25tZW50LWFnbm9zdGljLlxuICAgKiBBY2NvdW50L1JlZ2lvbi1kZXBlbmRlbnQgZmVhdHVyZXMgYW5kIGNvbnRleHQgbG9va3VwcyB3aWxsIG5vdCB3b3JrLFxuICAgKiBidXQgYSBzaW5nbGUgc3ludGhlc2l6ZWQgdGVtcGxhdGUgY2FuIGJlIGRlcGxveWVkIGFueXdoZXJlLiAqL1xuICAvKiBVbmNvbW1lbnQgdGhlIG5leHQgbGluZSB0byBzcGVjaWFsaXplIHRoaXMgc3RhY2sgZm9yIHRoZSBBV1MgQWNjb3VudFxuICAgKiBhbmQgUmVnaW9uIHRoYXQgYXJlIGltcGxpZWQgYnkgdGhlIGN1cnJlbnQgQ0xJIGNvbmZpZ3VyYXRpb24uICovXG4gIC8vIGVudjogeyBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULCByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTiB9LFxuICAvKiBVbmNvbW1lbnQgdGhlIG5leHQgbGluZSBpZiB5b3Uga25vdyBleGFjdGx5IHdoYXQgQWNjb3VudCBhbmQgUmVnaW9uIHlvdVxuICAgKiB3YW50IHRvIGRlcGxveSB0aGUgc3RhY2sgdG8uICovXG4gIC8vIGVudjogeyBhY2NvdW50OiAnMTIzNDU2Nzg5MDEyJywgcmVnaW9uOiAndXMtZWFzdC0xJyB9LFxuICAvKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9jZGsvbGF0ZXN0L2d1aWRlL2Vudmlyb25tZW50cy5odG1sICovXG59KTtcbiJdfQ==