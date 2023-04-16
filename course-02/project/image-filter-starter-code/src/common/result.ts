/******************************************************************************/
// Class name: FunctionResult
// Description: Define the return object for function
/******************************************************************************/

export class Result {

    returnCode: number; // Return code
    message: string;    // Return message

    constructor(returnCode: number, message: string) {
        this.returnCode = returnCode;
        this.message = message;
    }
}
