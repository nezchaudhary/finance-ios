## Application Summary

### Limitations

- Compatibility: iPhone 5 and above.
- Orientation: Portrait Only.
- Language: English only.
- Currency: USD only.
- Accessibility: Not ARIA compliant.
- No network usage so no network related error checking. Strictly UI.
- No persistance of data or routing. Inputs have to be re-submitted if browser was closed or a button was clicked.
- No routing urls. Back/Forward button cannot be used. 
- Investment Types: Stocks, Bonds, Cash, Gold and Mutual Funds only.
- Risk Portfolios are hard-coded mock-data.
-  No Testing suite.

### Expected Inputs

- Risk Tolerance: Integers between 1-10 (inclusive and no floating points). 
- Form Input - Integers only (No floating points).

### Additional Features

- Input fields are persisted with portfolio inputs of the current user portfolio.
- Clear button to clear input fields.
- Changes to portfolio to match ideal portfolio are clickable and they take effect on the charts.

###  Execution Time

- About 23 hours of work to put the whole project together.

### Possible Optimizations

- Make charts animated with D3 and ART/React-Native SVG and responsive to touch and touch of the corresponding legend data.
- If desired, use Navigator to scroll between different screens to fill form or compare charts.
- Add undo change button if the output changes were clicked.
- Add Testing.