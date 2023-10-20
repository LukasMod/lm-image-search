# lm-image-search
A simple photo search application thanks to the Unsplash api.

# Installation
Provide step-by-step instructions on how to install your project. Include commands where applicable. For example:

1. Clone repo: `git clone https://github.com/LukasMod/lm-image-search.git`
2. `cd lm-image-search`
3. `npm install`

## Android:
5. `npm run android`
## iOS:
6. `npx pod-install`
7. `npm run ios`
## Start metro:
8. `npm run start`

# E2E tests
1. Install maestro, follow: [maestro docs](https://maestro.mobile.dev/getting-started/installing-maestro)
2. Build android/iOS on device (virtual or physical)
3. `npm run test:e2e`

# Selected technologies
1. Axios (with Apisauce and error handling from Infinite Red)
2. React-query for caching feature  (2 min) and infinity list feature
3. @react-native-community/netinfo for checking net status
4. @backpackapp-io/react-native-toast for displaing toasts messages
5. expo-image for better performance images
6. maestro for e2e tests

# To do
1. i18n localization
2. improve dev experience and static checks: eslint, prettier, husky
3. add jest confing for unit testing
4. add storybook



