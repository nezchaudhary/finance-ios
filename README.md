## Finance-ios
This application displays a doughnut chart for different level-risk portfolios and custom portfolios. You can compare custom portfolios to the risk portfolio. It will tell you how to adjust investments to match the risk portfolio. Click on the adjustments to see them effect the change to your portfolio.

![finance-ios](https://github.com/nehacp/finance-ui/blob/master/finance-ui-image.png "Finance-ios")

### Application and Execution Summary

This project was built in the Expo XDE environment. The main reason for the choice was project deadline. The main focus was to add features, CSS and responsiveness.

Read the application and execution summary [here](https://github.com/nehacp/finance-ui/blob/master/summary.md)

### Video

Watch a demo of the app [here](https://youtu.be/4C0ZBM7eWnw)

### Instructions

To use the application, you will need Node, Watchman, and XCode if you want to use the IOS Simulator. Follow instructions [here](https://docs.expo.io/versions/latest/introduction/installation.html) to download all dependencies. Clone as a git repository or download as a zip file.

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


##### To start application

After all the dependencies are installed, you need to run:

`exp start`

This will runs the app in the development mode.You can now scan the QR code provided in the command line or use the link to go to running app in development mode. Alternatively you can use the Expo XDE to open the application in the IOS Simulator.


### Files and Structure


- The entry point javascript file is [App.js](https://github.com/nehacp/finance-ui/blob/master/src/index.js) in the 'src' folder.
- All of the components are under [src/components](https://github.com/nehacp/finance-ui/blob/master/src/components).
- The CSS files for each component are in the same folder as the component.
- The algorithm to calculate the change needed in the portfolio is [here](https://github.com/nehacp/finance-ui/blob/master/src/calculate-portfolio-shift/index.js).
- The test suite is in the [__tests__](https://github.com/nehacp/finance-ui/blob/master/src/__tests__) folder in 'src'. It has a limited number of tests.