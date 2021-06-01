# vue-firebase-auth

## Project setup
```
npm install
```

### Setup firebase 🔥
Go to [Firebase console](https://console.firebase.google.com/):
```
+ Add project
Enter your project name
Disable Google Analytics
Create project
```

Once the project is created, inside Project Overview, add Firebase to your web app (</>):
```
Add an app nickname
Register app
```

Finally, create an .env file at the root of your project and add Firebase config:
```
VUE_APP_API_KEY=
VUE_APP_AUTH_DOMAIN=
VUE_APP_PROJECT_ID=
VUE_APP_STORAGE_BUCKET=
VUE_APP_MESSAGING_SENDER_ID=
VUE_APP_APP_ID=
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
