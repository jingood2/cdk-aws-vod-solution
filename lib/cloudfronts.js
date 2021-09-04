"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFronts = void 0;
const cdk = require("@aws-cdk/core");
const acm = require("@aws-cdk/aws-certificatemanager");
const route53 = require("@aws-cdk/aws-route53");
const cloudFront = require("@aws-cdk/aws-cloudfront");
const origins = require("@aws-cdk/aws-cloudfront-origins");
class CloudFronts extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const hostedZoneCheck = props.hostedZoneId !== undefined &&
            props.hostedZoneId &&
            props.hostedZoneId !== '';
        const cloudFrontDomainCheck = props.cloudFrontDomain !== undefined &&
            props.cloudFrontDomain &&
            props.cloudFrontDomain !== '';
        // Only create the following if all of the required information
        // for a domain name has been provided
        if (hostedZoneCheck && cloudFrontDomainCheck) {
            this.hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'ExternalHostedZone', {
                hostedZoneId: props.hostedZoneId,
                zoneName: props.cloudFrontDomain,
            });
            this.certificate = new acm.DnsValidatedCertificate(this, `${props.cloudFrontDomain}-DnsValidatedCertificate`, {
                domainName: `${props.cloudFrontDomain}`,
                hostedZone: this.hostedZone,
            });
        }
        this.distribution = new cloudFront.Distribution(this, 'CloudFrontDistribution', {
            // Only create a domain name if all of the pieces are required
            domainNames: hostedZoneCheck && cloudFrontDomainCheck
                ? [`${props.cloudFrontDomain}`]
                : undefined,
            certificate: 
            // Only add the certificate if required
            hostedZoneCheck && cloudFrontDomainCheck
                ? this.certificate
                : undefined,
            defaultBehavior: {
                origin: new origins.S3Origin(props.s3Buckets.destination, {
                    originAccessIdentity: props.cloudfrontOriginAccessIdentities.destination,
                }),
                allowedMethods: cloudFront.AllowedMethods.ALLOW_GET_HEAD,
                compress: true,
                viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: new cloudFront.CachePolicy(this, 'CloudFrontDistributionCachePolicy', {
                    cookieBehavior: cloudFront.CacheCookieBehavior.none(),
                    headerBehavior: cloudFront.CacheHeaderBehavior.allowList('Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers'),
                    queryStringBehavior: cloudFront.CacheQueryStringBehavior.none(),
                }),
            },
            priceClass: cloudFront.PriceClass.PRICE_CLASS_100,
            enableLogging: true,
            logBucket: props.s3Buckets.logs,
            logFilePrefix: 'cloudfront/',
        });
    }
}
exports.CloudFronts = CloudFronts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRmcm9udHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbG91ZGZyb250cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsdURBQXVEO0FBQ3ZELGdEQUFnRDtBQUNoRCxzREFBc0Q7QUFDdEQsMkRBQTJEO0FBYzNELE1BQWEsV0FBWSxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBSzVDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBdUI7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLGVBQWUsR0FDbkIsS0FBSyxDQUFDLFlBQVksS0FBSyxTQUFTO1lBQ2hDLEtBQUssQ0FBQyxZQUFZO1lBQ2xCLEtBQUssQ0FBQyxZQUFZLEtBQUssRUFBRSxDQUFDO1FBRTVCLE1BQU0scUJBQXFCLEdBQ3pCLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTO1lBQ3BDLEtBQUssQ0FBQyxnQkFBZ0I7WUFDdEIsS0FBSyxDQUFDLGdCQUFnQixLQUFLLEVBQUUsQ0FBQztRQUVoQywrREFBK0Q7UUFDL0Qsc0NBQXNDO1FBQ3RDLElBQUksZUFBZSxJQUFJLHFCQUFxQixFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FDM0QsSUFBSSxFQUNKLG9CQUFvQixFQUNwQjtnQkFDRSxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7Z0JBQ2hDLFFBQVEsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO2FBQ2pDLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsdUJBQXVCLENBQ2hELElBQUksRUFDSixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsMEJBQTBCLEVBQ25EO2dCQUNFLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQzVCLENBQ0YsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQzdDLElBQUksRUFDSix3QkFBd0IsRUFDeEI7WUFDRSw4REFBOEQ7WUFDOUQsV0FBVyxFQUNULGVBQWUsSUFBSSxxQkFBcUI7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxTQUFTO1lBQ2YsV0FBVztZQUNULHVDQUF1QztZQUN2QyxlQUFlLElBQUkscUJBQXFCO2dCQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ2xCLENBQUMsQ0FBQyxTQUFTO1lBQ2YsZUFBZSxFQUFFO2dCQUNmLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7b0JBQ3hELG9CQUFvQixFQUNsQixLQUFLLENBQUMsZ0NBQWdDLENBQUMsV0FBVztpQkFDckQsQ0FBQztnQkFDRixjQUFjLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxjQUFjO2dCQUN4RCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxvQkFBb0IsRUFDbEIsVUFBVSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjtnQkFDbkQsV0FBVyxFQUFFLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FDckMsSUFBSSxFQUNKLG1DQUFtQyxFQUNuQztvQkFDRSxjQUFjLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRTtvQkFDckQsY0FBYyxFQUFFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQ3RELFFBQVEsRUFDUiwrQkFBK0IsRUFDL0IsZ0NBQWdDLENBQ2pDO29CQUNELG1CQUFtQixFQUFFLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUU7aUJBQ2hFLENBQ0Y7YUFDRjtZQUNELFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWU7WUFDakQsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUMvQixhQUFhLEVBQUUsYUFBYTtTQUM3QixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFwRkQsa0NBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgYWNtIGZyb20gJ0Bhd3MtY2RrL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInO1xuaW1wb3J0ICogYXMgcm91dGU1MyBmcm9tICdAYXdzLWNkay9hd3Mtcm91dGU1Myc7XG5pbXBvcnQgKiBhcyBjbG91ZEZyb250IGZyb20gJ0Bhd3MtY2RrL2F3cy1jbG91ZGZyb250JztcbmltcG9ydCAqIGFzIG9yaWdpbnMgZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQtb3JpZ2lucyc7XG5pbXBvcnQgeyBDbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcyB9IGZyb20gJy4vY2xvdWRmcm9udC1vcmlnaW4tYWNjZXNzLWlkZW50aXRpZXMnO1xuaW1wb3J0IHsgUzNCdWNrZXRzIH0gZnJvbSAnLi9zMy1idWNrZXRzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbG91ZEZyb250c1Byb3BzIHtcbiAgY2xvdWRGcm9udERvbWFpbjogc3RyaW5nO1xuICBjbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllczogQ2xvdWRmcm9udE9yaWdpbkFjY2Vzc0lkZW50aXRpZXM7XG4gIGhvc3RlZFpvbmVJZDogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgczNCdWNrZXRzOiBTM0J1Y2tldHM7XG4gIHN0YWNrTmFtZTogc3RyaW5nO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEZyb250cyBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgZGlzdHJpYnV0aW9uOiBjbG91ZEZyb250LkRpc3RyaWJ1dGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IGNlcnRpZmljYXRlOiBhY20uRG5zVmFsaWRhdGVkQ2VydGlmaWNhdGU7XG4gIHB1YmxpYyByZWFkb25seSBob3N0ZWRab25lOiByb3V0ZTUzLklIb3N0ZWRab25lO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQ2xvdWRGcm9udHNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBob3N0ZWRab25lQ2hlY2sgPVxuICAgICAgcHJvcHMuaG9zdGVkWm9uZUlkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHByb3BzLmhvc3RlZFpvbmVJZCAmJlxuICAgICAgcHJvcHMuaG9zdGVkWm9uZUlkICE9PSAnJztcblxuICAgIGNvbnN0IGNsb3VkRnJvbnREb21haW5DaGVjayA9XG4gICAgICBwcm9wcy5jbG91ZEZyb250RG9tYWluICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHByb3BzLmNsb3VkRnJvbnREb21haW4gJiZcbiAgICAgIHByb3BzLmNsb3VkRnJvbnREb21haW4gIT09ICcnO1xuXG4gICAgLy8gT25seSBjcmVhdGUgdGhlIGZvbGxvd2luZyBpZiBhbGwgb2YgdGhlIHJlcXVpcmVkIGluZm9ybWF0aW9uXG4gICAgLy8gZm9yIGEgZG9tYWluIG5hbWUgaGFzIGJlZW4gcHJvdmlkZWRcbiAgICBpZiAoaG9zdGVkWm9uZUNoZWNrICYmIGNsb3VkRnJvbnREb21haW5DaGVjaykge1xuICAgICAgdGhpcy5ob3N0ZWRab25lID0gcm91dGU1My5Ib3N0ZWRab25lLmZyb21Ib3N0ZWRab25lQXR0cmlidXRlcyhcbiAgICAgICAgdGhpcyxcbiAgICAgICAgJ0V4dGVybmFsSG9zdGVkWm9uZScsXG4gICAgICAgIHtcbiAgICAgICAgICBob3N0ZWRab25lSWQ6IHByb3BzLmhvc3RlZFpvbmVJZCxcbiAgICAgICAgICB6b25lTmFtZTogcHJvcHMuY2xvdWRGcm9udERvbWFpbixcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgdGhpcy5jZXJ0aWZpY2F0ZSA9IG5ldyBhY20uRG5zVmFsaWRhdGVkQ2VydGlmaWNhdGUoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIGAke3Byb3BzLmNsb3VkRnJvbnREb21haW59LURuc1ZhbGlkYXRlZENlcnRpZmljYXRlYCxcbiAgICAgICAge1xuICAgICAgICAgIGRvbWFpbk5hbWU6IGAke3Byb3BzLmNsb3VkRnJvbnREb21haW59YCxcbiAgICAgICAgICBob3N0ZWRab25lOiB0aGlzLmhvc3RlZFpvbmUsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5kaXN0cmlidXRpb24gPSBuZXcgY2xvdWRGcm9udC5EaXN0cmlidXRpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ0Nsb3VkRnJvbnREaXN0cmlidXRpb24nLFxuICAgICAge1xuICAgICAgICAvLyBPbmx5IGNyZWF0ZSBhIGRvbWFpbiBuYW1lIGlmIGFsbCBvZiB0aGUgcGllY2VzIGFyZSByZXF1aXJlZFxuICAgICAgICBkb21haW5OYW1lczpcbiAgICAgICAgICBob3N0ZWRab25lQ2hlY2sgJiYgY2xvdWRGcm9udERvbWFpbkNoZWNrXG4gICAgICAgICAgICA/IFtgJHtwcm9wcy5jbG91ZEZyb250RG9tYWlufWBdXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2VydGlmaWNhdGU6XG4gICAgICAgICAgLy8gT25seSBhZGQgdGhlIGNlcnRpZmljYXRlIGlmIHJlcXVpcmVkXG4gICAgICAgICAgaG9zdGVkWm9uZUNoZWNrICYmIGNsb3VkRnJvbnREb21haW5DaGVja1xuICAgICAgICAgICAgPyB0aGlzLmNlcnRpZmljYXRlXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICAgICAgb3JpZ2luOiBuZXcgb3JpZ2lucy5TM09yaWdpbihwcm9wcy5zM0J1Y2tldHMuZGVzdGluYXRpb24sIHtcbiAgICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5OlxuICAgICAgICAgICAgICBwcm9wcy5jbG91ZGZyb250T3JpZ2luQWNjZXNzSWRlbnRpdGllcy5kZXN0aW5hdGlvbixcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBhbGxvd2VkTWV0aG9kczogY2xvdWRGcm9udC5BbGxvd2VkTWV0aG9kcy5BTExPV19HRVRfSEVBRCxcbiAgICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTpcbiAgICAgICAgICAgIGNsb3VkRnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXG4gICAgICAgICAgY2FjaGVQb2xpY3k6IG5ldyBjbG91ZEZyb250LkNhY2hlUG9saWN5KFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICdDbG91ZEZyb250RGlzdHJpYnV0aW9uQ2FjaGVQb2xpY3knLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb29raWVCZWhhdmlvcjogY2xvdWRGcm9udC5DYWNoZUNvb2tpZUJlaGF2aW9yLm5vbmUoKSxcbiAgICAgICAgICAgICAgaGVhZGVyQmVoYXZpb3I6IGNsb3VkRnJvbnQuQ2FjaGVIZWFkZXJCZWhhdmlvci5hbGxvd0xpc3QoXG4gICAgICAgICAgICAgICAgJ09yaWdpbicsXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLVJlcXVlc3QtTWV0aG9kJyxcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBxdWVyeVN0cmluZ0JlaGF2aW9yOiBjbG91ZEZyb250LkNhY2hlUXVlcnlTdHJpbmdCZWhhdmlvci5ub25lKCksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJpY2VDbGFzczogY2xvdWRGcm9udC5QcmljZUNsYXNzLlBSSUNFX0NMQVNTXzEwMCxcbiAgICAgICAgZW5hYmxlTG9nZ2luZzogdHJ1ZSxcbiAgICAgICAgbG9nQnVja2V0OiBwcm9wcy5zM0J1Y2tldHMubG9ncyxcbiAgICAgICAgbG9nRmlsZVByZWZpeDogJ2Nsb3VkZnJvbnQvJyxcbiAgICAgIH1cbiAgICApO1xuICB9XG59Il19