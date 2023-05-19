export abstract class MockModel<T> {
  protected abstract abstractStub: T;

  constructor(createAbstractData: T) {
    this.constructorSpy(createAbstractData);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  constructorSpy(_createAbstractData: T): void {}

  async findOne(): Promise<T> {
    return this.abstractStub;
  }

  async find(): Promise<T[]> {
    return [this.abstractStub];
  }

  async save(): Promise<T> {
    return this.abstractStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.abstractStub;
  }

  async findOneAndDelete(): Promise<object> {
    return { deletedCount: 1 };
  }
}
