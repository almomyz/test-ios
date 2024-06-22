import * as React from "react";
import Svg, { Path } from "react-native-svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Define the SvgComponent functional component
const SvgComponent = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        // Set the width and height using responsive functions
        width={wp("15%")} // Adjust the percentage based on your requirement
        height={hp("5.5%")} // Adjust the percentage based on your requirement
        // Ensure the SVG is scalable and maintains its aspect ratio
        viewBox="0 0 50 50" // Set the viewBox to match the aspect ratio of the SVG content
        preserveAspectRatio="xMinYMin meet" // Preserve aspect ratio and align to the top-left corner
        {...props}
    >
        {/* Define the first path element with specific styles */}
        <Path
            fill="#F28F3B"
            fillRule="evenodd"
            d="M21.342 9.785 1.249 29.735c-1.665 1.652-1.665 4.38 0 6.032l10.647 10.567c1.666 1.651 4.406 1.653 6.072 0l20.095-19.958c.239-.236.378-.554.39-.888.192-5.026.585-10.399.585-15.388a1.328 1.328 0 0 0-1.377-1.274l-15.322.572a1.34 1.34 0 0 0-.997.387Zm5.87 6.61a2.978 2.978 0 0 1 4.19 0 2.927 2.927 0 0 1 0 4.16 2.977 2.977 0 0 1-4.19 0 2.926 2.926 0 0 1 0-4.16Z"
            clipRule="evenodd"
        />
        {/* Define the second path element with specific styles */}
        <Path
            fill="#F28F3B"
            fillRule="evenodd"
            d="m2.194 30.672 20.092-19.949 15.422-.576-.586 15.294-20.099 19.955a2.986 2.986 0 0 1-4.187 0L2.194 34.83a2.933 2.933 0 0 1 0-4.158Zm25.02-14.276a2.978 2.978 0 0 1 4.189 0 2.927 2.927 0 0 1 0 4.159 2.977 2.977 0 0 1-4.19 0 2.926 2.926 0 0 1 0-4.16Z"
            clipRule="evenodd"
        />
        {/* Define the third path element with specific styles */}
        <Path
            fill="#D57829"
            fillRule="evenodd"
            d="m37.178 23.979-.056 1.462-20.099 19.955a2.968 2.968 0 0 1-2.275.852l22.43-22.27Z"
            clipRule="evenodd"
        />
        {/* Define the fourth path element with specific styles */}
        <Path
            fill="#F5A058"
            fillRule="evenodd"
            d="m2.194 30.672 20.092-19.949 1.436-.054L1.334 32.898a2.923 2.923 0 0 1 .86-2.226Z"
            clipRule="evenodd"
        />
        {/* Define the fifth path element with specific styles */}
        <Path
            fill="#263C3C"
            fillRule="evenodd"
            d="M29.89 21.364c0-1.754.514-4.185 1.426-6.78.91-2.589 2.204-5.304 3.737-7.624 1.538-2.33 3.288-4.218 5.094-5.208 1.764-.966 3.562-1.073 5.345.1.896.848 1.347 1.733 1.485 2.629.14.913-.038 1.886-.48 2.905-.544 1.25-1.47 2.53-2.612 3.782h1.33c.932-1.103 1.702-2.242 2.198-3.383.495-1.139.729-2.306.552-3.456-.178-1.157-.763-2.247-1.82-3.236l-.03-.028-.034-.022C43.925-.395 41.71-.244 39.667.875c-2.012 1.103-3.871 3.145-5.449 5.534-1.583 2.397-2.912 5.188-3.845 7.843-.931 2.648-1.482 5.199-1.482 7.112h1Z"
            clipRule="evenodd"
        />
    </Svg>
);

// Export the SvgComponent for use in other parts of the application
export default SvgComponent;
