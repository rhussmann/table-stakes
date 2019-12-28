#!/usr/bin/env sh

#
# Deploy a VPC with two public subnets in two availability zones
#

aws cloudformation create-stack --stack-name MyNetwork --template-body file://cloudformation/vpc.yml \
    --parameters ParameterKey=NumberOfAZs,ParameterValue=3 \
    ParameterKey=PrivateSubnets,ParameterValue=true
