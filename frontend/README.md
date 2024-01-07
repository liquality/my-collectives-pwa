# Liquality Group Mints

## Getting Started

- Install [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) if you don't have it
- run `nvm use` to take the version from the `.nvmrc` file (install the requested version if you don't have it)
- run `npm ci` to install all the dependencies
- copy the file file named `.env.example` and rename it to `.env.local` and add the dev values

## Development

- Copy the file named `.env.example` and set the name `.env.local`, fill all the environment variables with the proper values.
- run `npm run start`

## PWA asset generator

- run `npm run generate-pwa-assets` this will take the `/public/icon.svg` and generate all the images/assets required inside the same folder
