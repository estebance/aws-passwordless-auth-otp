# passwordless-auth-pool

This project is just an aproximation to the project [amazon-cognito-passwordless-auth](https://github.com/aws-samples/amazon-cognito-passwordless-auth), we are using AWS SAM  to simplify things

The users sign up without verification but to sign in and OTP delivered thru email must be provided.

## Copy

Create a copy of your file ```samconfig.example.toml``` as ``` samconfig.toml```

## Deploy the sample application


```bash
  sam build --use-container
```

Replace the following parameters in your ```samconfig.toml```

1. stack_name: a stack name for your application
2. AppEnv: environment you'd like to deploy
3. CognitoUserPoolName: a nice name for your userpool
4. EmailSender: a valid email approved by AWS SES to deliver emails
5. profile: your AWS profile

Note: the default.deploy.parameters are not required they will apprear as soon as you apply the ```sam deploy --guided``` command mentioned in below

```
[default]
[default.global.parameters]
stack_name = "<your_app_stack_name>"
parameter_overrides = "AppEnv=\"test\" CognitoUserPoolName=\"my-passwordless-userpool\" EmailSender=\"your-ses-approved-email@example.co\""

[default.deploy.parameters]
parameter_overrides = "CognitoUserPoolName=\"my-passwordless-userpool\" EmailSender=\"your-ses-approved-email@example.co\" AppEnv=\"test\""
```

## Deploy

To deploy your application for the first time


```bash
 sam deploy --guided
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name passwordless-auth-pool --profile <your_aws_profile>
```

## Resources

- [amazon-cognito-passwordless-auth](https://github.com/aws-samples/amazon-cognito-passwordless-auth)