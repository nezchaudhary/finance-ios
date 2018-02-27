## Finance-IOS
This application displays a doughnut chart for different level-risk portfolios and custom portfolios. You can compare custom portfolios to the risk portfolio. It will tell you how to adjust investments to match the risk portfolio. Click on the adjustments to see the change take on your portfolio.

![finance-ios](https://github.com/nehacp/finance-ios/blob/master/assets/Finance-IOS%20-%20Image%20(1).png "Finance-ios-1")

### Application and Execution Summary

This project was built in the Expo XDE environment. It is strictly an IOS application only. It is compatible with iPhone 5 and above.

Read the application and execution summary [here](https://github.com/nehacp/finance-ios/blob/master/summary.md)

### Video

Watch a demo of the app [here](https://youtu.be/oHEFiRYLG9s)

### Instructions

To use the application, you will need Expo, Node, Watchman, and XCode. XCode is to use the IOS Simulator in development mode. Follow instructions [here](https://docs.expo.io/versions/latest/introduction/installation.html) to download all dependencies and then clone as a git repository or download as a zip file.

#### Dependencies

- "expo": "^25.0.0",
- "react": "16.2.0",
- "react-native":"https://github.com/expo/react-native/archive/sdk-25.0.0.tar.gz",
- "react-native-keyboard-aware-scroll-view": "^0.4.4",
- "react-native-pie-chart": "^1.0.12",
- "react-native-slider": "^0.11.0",
- "react-redux": "^5.0.7",
- "redux": "^3.7.2"

#### Scripts

##### To install dependencies

Once you download/clone the application to your local computer, go into the repository root folder in the terminal. To install all the dependencies, run the command:

`npm install`

##### Link Dependencies

Then you need to link all your dependencies to React-Native. Run:

```react-native link```

##### To start application

After all the dependencies are installed, you need to run:

`exp start`

This will runs the app in the development mode. You can now scan the QR code provided in the command line or use the link to go to running app on your mobile device. You can use the Expo XDE with XCOde to open the application in the IOS Simulator on your computer.


### Files and Structure

- The entry point javascript file is [App.js](https://github.com/nehacp/finance-ios/blob/master/App.js) in the 'src' folder.
- All of the components are under [ios/components](https://github.com/nehacp/finance-ios/tree/master/ios/components).
- The algorithm to calculate the change needed in the portfolio is [here](https://github.com/nehacp/finance-ios/blob/master/ios/calculate-portfolio-shift/index.js).