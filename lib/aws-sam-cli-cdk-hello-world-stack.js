"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSamCliCdkHelloWorldStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigateway = require("@aws-cdk/aws-apigateway");
const path = require("path");
class AwsSamCliCdkHelloWorldStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const backend = new lambda.Function(this, 'hello-world-lambda-function', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'app.lambdaHandler',
            code: lambda.Code.fromAsset(path.join(__dirname, '..', 'hello-world')),
        });
        const api = new apigateway.LambdaRestApi(this, 'hello-world-api', {
            handler: backend,
            proxy: false
        });
        const hello = api.root.addResource('hello');
        hello.addMethod('GET');
    }
}
exports.AwsSamCliCdkHelloWorldStack = AwsSamCliCdkHelloWorldStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXNhbS1jbGktY2RrLWhlbGxvLXdvcmxkLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLXNhbS1jbGktY2RrLWhlbGxvLXdvcmxkLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3RELDZCQUE2QjtBQUU3QixNQUFhLDJCQUE0QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3hELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsNkJBQTZCLEVBQUU7WUFDdkUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDdkUsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUNoRSxPQUFPLEVBQUUsT0FBTztZQUNoQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNGO0FBbkJELGtFQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNsYXNzIEF3c1NhbUNsaUNka0hlbGxvV29ybGRTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICBjb25zdCBiYWNrZW5kID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnaGVsbG8td29ybGQtbGFtYmRhLWZ1bmN0aW9uJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBoYW5kbGVyOiAnYXBwLmxhbWJkYUhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdoZWxsby13b3JsZCcpKSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFSZXN0QXBpKHRoaXMsICdoZWxsby13b3JsZC1hcGknLCB7XG4gICAgICBoYW5kbGVyOiBiYWNrZW5kLFxuICAgICAgcHJveHk6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBjb25zdCBoZWxsbyA9IGFwaS5yb290LmFkZFJlc291cmNlKCdoZWxsbycpO1xuICAgIGhlbGxvLmFkZE1ldGhvZCgnR0VUJyk7XG4gIH1cbn1cbiJdfQ==