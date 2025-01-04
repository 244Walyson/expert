import { CustomException } from "./interface/exception.interface";

export class InvalidFieldValueException extends CustomException {
  constructor(message: string) {
    super(message, 422);
    this.name = InvalidFieldValueException.name;
  }
}
