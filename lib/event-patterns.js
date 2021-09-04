"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPatterns = void 0;
const cdk = require("@aws-cdk/core");
class EventPatterns extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.encodeComplete = {
            source: ['aws.mediaconvert'],
            detail: {
                status: ['COMPLETE'],
            },
        };
        this.encodeError = {
            source: ['aws.mediaconvert'],
            detail: {
                status: ['ERROR'],
            },
        };
    }
}
exports.EventPatterns = EventPatterns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtcGF0dGVybnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC1wYXR0ZXJucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFPckMsTUFBYSxhQUFjLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFLOUMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUF5QjtRQUNyRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDcEIsTUFBTSxFQUFFLENBQUMsa0JBQWtCLENBQUM7WUFDNUIsTUFBTSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUNyQjtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixDQUFDO1lBQzVCLE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDbEI7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBdEJELHNDQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICdAYXdzLWNkay9hd3MtZXZlbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBFdmVudFBhdHRlcm5zUHJvcHMge1xuICBzdGFja05hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50UGF0dGVybnMgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcblxuICBwdWJsaWMgcmVhZG9ubHkgZW5jb2RlQ29tcGxldGU6IGV2ZW50cy5FdmVudFBhdHRlcm47XG4gIHB1YmxpYyByZWFkb25seSBlbmNvZGVFcnJvcjogZXZlbnRzLkV2ZW50UGF0dGVybjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEV2ZW50UGF0dGVybnNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLmVuY29kZUNvbXBsZXRlID0ge1xuICAgICAgc291cmNlOiBbJ2F3cy5tZWRpYWNvbnZlcnQnXSxcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBzdGF0dXM6IFsnQ09NUExFVEUnXSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuZW5jb2RlRXJyb3IgPSB7XG4gICAgICBzb3VyY2U6IFsnYXdzLm1lZGlhY29udmVydCddLFxuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIHN0YXR1czogWydFUlJPUiddLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59Il19