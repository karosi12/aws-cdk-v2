export class Exception extends Error {
  code: string;
  constructor(message: string){
    super(message)

    Object.setPrototypeOf(this, Exception.prototype)
  }
}

export const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`;
export const  DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;
