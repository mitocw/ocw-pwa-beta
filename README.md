# ocw-pwa-beta
Prototyping features for OCW as part of a broader design process for the next generation OCW platform. At this stage, we are building a [Progressive Web App](https://developers.google.com/web/progressive-web-apps) (PWA) within a [JAMstack](https://jamstack.org/) architecture to explore the boundaries of desktop and mobile design. Our technology stack involves React, Gatsby, Material UI, a headless Content Management System, and FaunaDB.

## What is MIT OpenCourseWare (OCW)
Learn more [here](https://ocw.mit.edu/about/). We are utilizing data exported from the current OCW platform to explore next generation features.

## Content Management Systems
We have utilized two content management systems within this project: [Contentful](https://www.contentful.com/) and [DatoCMS](https://www.datocms.com/). Both are headless, hosted CMS with great APIs and intuitive user interfaces for defining content models. 

## Running this application locally
### Set up your Gatsby development environment
[Gatsby advice for local development](https://www.gatsbyjs.org/tutorial/part-zero/).

## Installation
### Clone this GitHub Repository
```bash
git clone <this repository>
```
### Install NPM modules
```bash
cd ocw-pwa-beta
npm install
```
### DatoCMS Configuration 
##### [latest version](https://github.com/mitocw/ocw-pwa-beta/releases/tag/v0.4.0)
Two files need to be present in the project's root directory `.env.development` and `.env.production`. They must contain the following:

* ##### DatoCMS
  - GATSBY_DATOCMS_FULL_ACCESS_TOKEN=yourDatocmsFullAccessToken
  - GATSBY_DATOCMS_READ_ONLY_ACCESS_TOKEN=yourDatocmsReadOnlyToken

* ##### Google Analytics
  - GATSBY_GA_TRACKING_ID=yourGaTrackingId
  - GATSBY_GA_OPTIMIZE_ID=yourGaOptimizeId
  - GATSBY_GA_EXPERIMENT_ID=yourGaExperimentId
  - GATSBY_GA_VARIATION_ID=yourGaVariationId

* ##### Auth0
  - GATSBY_AUTH0_DOMAIN=yourAuth0Domain
  - GATSBY_AUTH0_CLIENTID=yourAuth0ClientId
  - GATSBY_AUTH0_CALLBACK=yourAuth0Callback
  - (for development: 'http://localhost:8000/callback', for production: 'https://your-production-domain/callback')

* ##### FaunaDB
  - GATSBY_FAUNADB_SECRET=yourFaunaDbSecret

* ##### Heap Analytics
  - GATSBY_HA_APP_ID=yourHaAppId

### Contenful Configuration
##### [commit](https://github.com/mitocw/ocw-pwa-beta/commit/99f2ac1ad2430bbbdb1d038db91b53fccda3a1a3)
Create a .contentful.json configuration file in the root directory of this github repository.
```JSON
{
  "spaceId": "<Insert Space ID provided by Contentful>",
  "contentDeliveryAccessToken": "<Insert Content Delivey Token provided by Contentful>",
  "contentPreviewAccessToken": "<Insert Content Preview Token provided by Contentful>"
}
```
### Using the Gatsby CLI
If you haven't already installed it, you will need the Gatsby CLI (you will need node/npm; see Gatsby dev environment instructions).
```bash
npm i gatsby-cli
```
#### Run the project locally 

```bash
gatsby develop
```
then open your browser at `http://localhost:8000/`

#### Build the project
```bash
gatsby build
```
the deployable application will be found in `./public`

#### Clean cache and build directories
```bash
gatsby clean
```

#### Notes
If you do not intent to use Gatsby in other projects, global installation (`npm i gatsby-cli`) can be avoided. The following commands can be used instead:
```bash
npx gatsby develop
```
```bash
npx gatsby build
```
```bash
npx gatsby clean
```
