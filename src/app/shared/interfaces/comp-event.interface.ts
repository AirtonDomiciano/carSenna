export interface ICompEvent<T> {
  event: 'onBlur' | 'onChange';
  data?: T;
}
