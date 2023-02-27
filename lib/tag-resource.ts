import { IConstruct, Tags } from '@aws-cdk/core';

export const tagResource = (resource: IConstruct) => {
    Tags.of(resource).add('Name', `cce-chris-local-http-auth-poc`);
    Tags.of(resource).add('Environment', `chris-local`);
    Tags.of(resource).add('Management', 'cdk');
    Tags.of(resource).add('Owner', 'marketing-technology');
};