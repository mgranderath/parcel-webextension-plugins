# Parcel v2 Webextension Plugins

This repository holds plugins for the development of webextensions using Parcel v2.

Parcel v2 has included [support](https://v2.parceljs.org/recipes/web-extension/) for webextensions. However, we need extra steps for resolving
the `manifest.json`. Currently this provides functionality where the `manifest.json` is merged with `manifest.{NODE_ENV}.json` before building.

For more information about manifest.json, please refer to the [MDN docs](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json).

## Installation
    
Install via npm:
```shell
npm install --save-dev @mgranderath/parcel-config-webextension
```
or via yarn:
````shell
yarn add -D @mgranderath/parcel-config-webextension
````

## Usage

This wraps the [default webextension config](https://v2.parceljs.org/recipes/web-extension/) and extends it by using a different resolver for the `manifest.json`.

You can bundle webextensions by setting the `.parcelrc` to this:
````json
{
  "extends": "@mgranderath/parcel-config-webextension"
}
````

and running a build by targeting the `manifest.json`:
````shell
parcel build manifest.json
````

## Environments

This plugin will try to resolve and merge environment-specific manifest files in the format `manifest.${NODE_ENV}.json`. 
For example, in development, you can run:
```shell
NODE_ENV=development parcel build src/manifest.json
```
and the plugin will also look for manifest.development.json and merge those keys into the base manifest.