# AMA-IDEABOX-MOBILE
Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

* Node js
* React Native command line interface
* JDK
* Android Studio

### Node JDK
```
choco install -y nodejs-lts openjdk11
```
If you have already installed Node on your system, make sure it is Node 12 or newer. If you already have a JDK on your system, make sure it is version 11 or newer.

### Android Development Environment
#### 1. Install Android Studio
While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:
* Android SDK
* Android SDK Platform
* Android Virtual Device
* If you are not already using Hyper-V: Performance (Intel ® HAXM)
Then, click "Next" to install all of these components.

#### 2. Install Android SDK
Building a React Native app with native code, however, requires the Android 10 (Q) SDK in particular. Make sure the following items are checked:
* Android SDK Platform 29
* Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

#### 3. Configure the ANDROID_HOME environment variable
The React Native tools require some environment variables to be set up in order to build apps with native code.
* Open the Windows Control Panel.
* Click on User Accounts, then click User Accounts again
* Click on Change my environment variables
* Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK

#### 4. Add platform-tools to Path
* Open the Windows Control Panel.
* Click on User Accounts, then click User Accounts again
* Click on Change my environment variables
* Select the Path variable.
* Click Edit.
* Click New and add the path to platform-tools to the list.

For more information, click this https://reactnative.dev/docs/environment-setup

### Installing

* First you must clone this repo
* then install the packages
```
yarn install
```

### Executing program

* Running this apps
- Start Metro
```
npx react-native start
```
```
yarn start
```

- Start Your Application
```
npx react-native run-android
```
```
yarn android 
```

## Help
Any advise for common problems or issues.

## Authors

Contributors names and contact info

* [Nicholas Evan Lindartono](https://github.com/Nicholasevann)
* [Kenji Valentino Liebertus](https://github.com/KenjiVale/cv)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details