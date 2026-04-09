export abstract class BaseEntity<T> {
  abstract id: number | string;
  constructor(data?: Partial<T>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
