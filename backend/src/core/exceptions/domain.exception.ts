import { CustomException } from "./interface/exception.interface";

export class DomainException extends CustomException {
  constructor(message: string) {
    super(message, 400);
    this.name = DomainException.name;
  }
}
