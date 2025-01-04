import { CustomException } from "./interface/exception.interface";

export class DuplicatedResourceException extends CustomException {
  constructor(message: string) {
    super(message, 409);
    this.name = DuplicatedResourceException.name;
  }
}
