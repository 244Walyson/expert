import { CustomException } from "./interface/exception.interface";

export class ResourceNotFoundException extends CustomException {
  constructor(message: string) {
    super(message, 404);
    this.name = ResourceNotFoundException.name;
  }
}
