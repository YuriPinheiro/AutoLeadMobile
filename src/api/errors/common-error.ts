export class CommonError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
