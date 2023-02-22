import * as cdk from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as path from 'path';
import { HttpLambdaAuthorizer, HttpLambdaResponseType } from '@aws-cdk/aws-apigatewayv2-authorizers';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { HttpApi, HttpMethod, CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HttpAuthPocStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const NODEJS_RUNTIME = Runtime.NODEJS_16_X;
    // The code that defines your stack goes here

  const authLambdaId = 'martech-http-api-auth-POC';
  const consumerLambdaId = 'martech-http-api-auth-POC-handler';
  const authHandler = new NodejsFunction(this, authLambdaId, {
    functionName: authLambdaId,
    runtime: Runtime.NODEJS_16_X,
    timeout: cdk.Duration.seconds(10),
    memorySize: 256,
    entry: path.join(__dirname, '..', 'resources', 'LambdaAuthorizer', 'lambda-authorizer.ts'),
    handler: 'lambda-authorizer.authHandler'
  }
  );

  const lambdaConsumer = new NodejsFunction(this, consumerLambdaId, {
    functionName: consumerLambdaId,
    runtime: Runtime.NODEJS_16_X,
    entry: path.join(__dirname, '..', 'resources', 'LambdaConsumer', 'lambda-consumer.ts'),
    handler: 'lambda-consumer.consumerhandler'
  }
  );

const lamAuthorizer = new HttpLambdaAuthorizer('TestAuthorizer', authHandler, {
  responseTypes: [HttpLambdaResponseType.SIMPLE], // Define if returns simple and/or iam response
});

const apiName = 'martech-http-auth-poc';
const api = new HttpApi(this, apiName, {
  createDefaultStage: true,
  apiName: apiName,
  corsPreflight: {
    allowCredentials: false,
    allowHeaders: ["*"],
    allowOrigins: ["https://*"],
    allowMethods: [
      CorsHttpMethod.POST,
    ]
  }
});

  api.addRoutes({
    integration: new HttpLambdaIntegration(consumerLambdaId + '-integ', lambdaConsumer),
    path: '/test',
    authorizer: lamAuthorizer,
    methods: [HttpMethod.POST],
  }); 
  }
}
