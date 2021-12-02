# BE Take Home Project

## Overview 

This is a small take home assignment to learn and be familiarized with our stack and the development workflow we use in our daily basis.

## Goals

- The main goal is to create a new endpoint behind a feature flag, that allow filtering users based on zip code value
- Setup of Optimizely and Feature Flags definition are required
- Exposing the new endpoint with Swagger is important
- You are free to modify existent code as much as you want
- Use as many best practices you feel are useful for leverage collaboration and communication
- The suggested is to commit about 2 hours, maximum. If you need more it's okey, and you can indicate why you needed more time.

## Requirements

1. Create a new Optimizely free account and setup the API keys
2. Build the Login endpoint to support user identification
3. Create a new feature flag as defined in `featureRamp.config`
4. Define a new Optimizely Audience to enable the FF to certain email addresses
5. Build a new endpoint to check if current logged in user has a valid Zip Code

### Optimizely

You can follow the steps to create a new Optimizely free account here: https://www.optimizely.com/free-feature-flagging/#sign-up

### User Identification 

You can implement any library you want. Initially, we provide you with and Auth module that uses Passport and different strategies 

### Zip Code data

You can use the [Google GeoCoding API](http://code.google.com/apis/maps/documentation/geocoding/) to quickly get more information from a Zip Code.

For example, to lookup zip 77379 use a request like this:

https://maps.googleapis.com/maps/api/geocode/json?address=77379&sensor=true&key=YOUR_GOOGLE_PLATFORM_API_KEY

### New Endpoint – Zip Code validation

Users that can login to the platform should have a Zip Code property associated. The endpoint should consider logged in users having a Zip Code, and only the state of NY should be valid. I.e: Users with Zip Code like 10001 are valid.

```
GET /the-new-endpoint
{
  zipCodeValid: true
}
```

## Running the app

This app was built using the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

You can use Docker, but we suggest for the sake of speed to setup a local env for using MySQL and Redis

### Dependencies

- NestJS
- Optimizely SDK
- Typescript 4.3.5
- Swagger (OpenAPI)
- MySQL (as main storage)
- Redis (for caching and sessions)

### Commands

```sh
# To start working, install dependencies:
$ npm install

# You can run the app in watch mode
$ npm run start:dev

# Alternatively you can use Docker compose:
# Builds the db and services in containers
$ docker-compose up --build
```
