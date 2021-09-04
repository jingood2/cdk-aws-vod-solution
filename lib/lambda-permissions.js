"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaPermissions = void 0;
const cdk = require("@aws-cdk/core");
const iam = require("@aws-cdk/aws-iam");
class LambdaPermissions extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.s3LambdaInvokeVideo = {
            principal: new iam.ServicePrincipal('s3.amazonaws.com'),
            action: 'lambda:InvokeFunction',
            sourceAccount: `${cdk.Stack.of(this).account}`
        };
        this.cloudwatchLambdaInvokeErrors = {
            principal: new iam.ServicePrincipal('events.amazonaws.com'),
            action: 'lambda:InvokeFunction',
        };
        this.cloudwatchLambdaInvokeComplete = {
            principal: new iam.ServicePrincipal('events.amazonaws.com'),
            action: 'lambda:InvokeFunction'
        };
    }
}
exports.LambdaPermissions = LambdaPermissions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLXBlcm1pc3Npb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLXBlcm1pc3Npb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUVyQyx3Q0FBd0M7QUFNeEMsTUFBYSxpQkFBa0IsU0FBUSxHQUFHLENBQUMsU0FBUztJQUtsRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQTZCO1FBQ3pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQ3pCLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUN2RCxNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLGFBQWEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtTQUMvQyxDQUFDO1FBRUYsSUFBSSxDQUFDLDRCQUE0QixHQUFHO1lBQ2xDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzRCxNQUFNLEVBQUUsdUJBQXVCO1NBQ2hDLENBQUE7UUFFRCxJQUFJLENBQUMsOEJBQThCLEdBQUc7WUFDcEMsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDO1lBQzNELE1BQU0sRUFBRSx1QkFBdUI7U0FDaEMsQ0FBQTtJQUdILENBQUM7Q0FDRjtBQTFCRCw4Q0EwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnQGF3cy1jZGsvYXdzLWlhbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFtYmRhUGVybWlzc2lvbnNQcm9wcyB7XG5cbn1cblxuZXhwb3J0IGNsYXNzIExhbWJkYVBlcm1pc3Npb25zIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBzM0xhbWJkYUludm9rZVZpZGVvOiBsYW1iZGEuUGVybWlzc2lvbjtcbiAgcHVibGljIHJlYWRvbmx5IGNsb3Vkd2F0Y2hMYW1iZGFJbnZva2VFcnJvcnM6IGxhbWJkYS5QZXJtaXNzaW9uO1xuICBwdWJsaWMgcmVhZG9ubHkgY2xvdWR3YXRjaExhbWJkYUludm9rZUNvbXBsZXRlOiBsYW1iZGEuUGVybWlzc2lvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IExhbWJkYVBlcm1pc3Npb25zUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgdGhpcy5zM0xhbWJkYUludm9rZVZpZGVvID0ge1xuICAgICAgcHJpbmNpcGFsOiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ3MzLmFtYXpvbmF3cy5jb20nKSxcbiAgICAgIGFjdGlvbjogJ2xhbWJkYTpJbnZva2VGdW5jdGlvbicsXG4gICAgICBzb3VyY2VBY2NvdW50OiBgJHtjZGsuU3RhY2sub2YodGhpcykuYWNjb3VudH1gXG4gICAgfTtcblxuICAgIHRoaXMuY2xvdWR3YXRjaExhbWJkYUludm9rZUVycm9ycyA9IHtcbiAgICAgIHByaW5jaXBhbDogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdldmVudHMuYW1hem9uYXdzLmNvbScpLFxuICAgICAgYWN0aW9uOiAnbGFtYmRhOkludm9rZUZ1bmN0aW9uJyxcbiAgICB9XG5cbiAgICB0aGlzLmNsb3Vkd2F0Y2hMYW1iZGFJbnZva2VDb21wbGV0ZSA9IHtcbiAgICAgIHByaW5jaXBhbDogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdldmVudHMuYW1hem9uYXdzLmNvbScpLFxuICAgICAgYWN0aW9uOiAnbGFtYmRhOkludm9rZUZ1bmN0aW9uJ1xuICAgIH1cblxuICAgIFxuICB9XG59Il19