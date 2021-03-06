#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const aws_sam_cli_cdk_hello_world_stack_1 = require("../lib/aws-sam-cli-cdk-hello-world-stack");
const app = new cdk.App();
new aws_sam_cli_cdk_hello_world_stack_1.AwsSamCliCdkHelloWorldStack(app, 'cdk-vod-solution');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXNhbS1jbGktY2RrLWhlbGxvLXdvcmxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLXNhbS1jbGktY2RrLWhlbGxvLXdvcmxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMsZ0dBQXVGO0FBRXZGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksK0RBQTJCLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBBd3NTYW1DbGlDZGtIZWxsb1dvcmxkU3RhY2sgfSBmcm9tICcuLi9saWIvYXdzLXNhbS1jbGktY2RrLWhlbGxvLXdvcmxkLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBBd3NTYW1DbGlDZGtIZWxsb1dvcmxkU3RhY2soYXBwLCAnY2RrLXZvZC1zb2x1dGlvbicpO1xuIl19