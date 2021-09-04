"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KmsKeys = void 0;
const cdk = require("@aws-cdk/core");
const kms = require("@aws-cdk/aws-kms");
class KmsKeys extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.snsMasterKey = new kms.Key(this, 'SnsKmsMasterKey', {
            alias: `${props.stackName}-SnsMasterKey`,
        });
        this.sqsMasterKey = new kms.Key(this, 'SqsKmsMasterKey', {
            alias: `${props.stackName}-SqsMasterKey`,
        });
    }
}
exports.KmsKeys = KmsKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zLWtleXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJrbXMta2V5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsd0NBQXdDO0FBTXhDLE1BQWEsT0FBUSxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBSXhDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBbUI7UUFDL0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdkQsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsZUFBZTtTQUN6QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdkQsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsZUFBZTtTQUN6QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFmRCwwQkFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGttcyBmcm9tICdAYXdzLWNkay9hd3Mta21zJztcblxuZXhwb3J0IGludGVyZmFjZSBLbXNLZXlzUHJvcHMge1xuICBzdGFja05hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEttc0tleXMgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IHNuc01hc3RlcktleToga21zLktleTtcbiAgcHVibGljIHJlYWRvbmx5IHNxc01hc3RlcktleToga21zLktleTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEttc0tleXNQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICB0aGlzLnNuc01hc3RlcktleSA9IG5ldyBrbXMuS2V5KHRoaXMsICdTbnNLbXNNYXN0ZXJLZXknLCB7XG4gICAgICBhbGlhczogYCR7cHJvcHMuc3RhY2tOYW1lfS1TbnNNYXN0ZXJLZXlgLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zcXNNYXN0ZXJLZXkgPSBuZXcga21zLktleSh0aGlzLCAnU3FzS21zTWFzdGVyS2V5Jywge1xuICAgICAgYWxpYXM6IGAke3Byb3BzLnN0YWNrTmFtZX0tU3FzTWFzdGVyS2V5YCxcbiAgICB9KTtcbiAgfVxufSJdfQ==