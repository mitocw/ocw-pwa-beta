# ocw-pwa-beta
Prototyping progressive features for OCW as part of a broader design process for the next generation OCW platform.

# Contentful CMS
Contentful is a hosted headless CMS with great APIs and an intuitive user interface for defining content models. This version of the OCW PWA uses Contentful as its backend by simply migrating as much OCW content into a Contentful space. Learn more about Contentful [here](https://www.contentful.com/).

# Running this application locally
### Set up your Gatsby development environment
[Gatsby advice for local development](https://www.gatsbyjs.org/tutorial/part-zero/).

### Clone this Github Repository
```bash
git clone <this repository>
```
### Contenful Configuration 
Create a .contentful.json configuration file in the root directory of this github repository.
```JSON
{
  "spaceId": "<Insert Space ID provided by Contentful>",
  "accessToken": "<Insert Access Token provided by Contentful>"
}
```
### Launch the project using Gatsby CLI
If you haven't already installed it, you will need the Gatsby CLI (you will need node/npm; see Gatsby dev environment instructions).
```bash
npm i gatsby-cli
```

Run the project locally using:
```bash
gatsby develop
```
