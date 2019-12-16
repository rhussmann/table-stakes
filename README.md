# table-stakes

`table-stakes` will be a baseline setup for getting a SaaS running on AWS.

This repo includes support for the whole bootstrap from a new AWS account;
provisioning new infrastructure via CloudFormation, a JAM-stack based front-end with
baseline user-management functionality, and a SaaS backend with a user-model and
authentication and authorization, and integration with Stripe for payment processing.

Any manual process automated via script (e.g. creating a new AWS user), will be explained
step-by-step.

## Founding Principles

Make it. Make it easy. Make it cheap.

* There doesn't seem to be much innovation when building the foundation of a SaaS; it's
  considered table-stakes for a new project. Let's make it so.
* While there isn't much new innovation in SaaS foundations, innovative and new ideas
  still require that foundation be in place. Let's make it easy.
* Sometimes you just want to tinker with an idea, without having to pay a large bill.
  `table-stakes` takes advantage of the AWS free-tier (the perpetual and 12-month tiers)
  to leverage the value AWS is providing without blowing your budget. Make it cheap.

## Reference
* [Building a VPC with CloudFormation - Part 1](https://www.infoq.com/articles/aws-vpc-cloudformation/)
* [Building a VPC with CloudFormation - Part 2](https://www.infoq.com/articles/aws-vpc-cloudformation-part2/)
