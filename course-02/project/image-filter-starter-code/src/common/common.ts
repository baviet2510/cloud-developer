/******************************************************************************/
// Description: Common static class
/******************************************************************************/

import { Result } from './result';

export class Common {

    /**
     * Validate the inputted url
     * @param inputURL 
     * @returns 
     */
    public static validateURL(inputURL: string): Result {

        let returnCode = 0;
        let message = "Image url is valid."
        if (!inputURL || inputURL.length == 0) {
            // input url was not inputted 
            returnCode = -1;
            message = "Image url is required.";
        } else {
            // input url was not correct
            const regex = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/

            if (!regex.test(inputURL)) {
                returnCode = -1;
                message = "Image url format is not correct.";
            }
        }

        return new Result(returnCode, message);
    }
}

