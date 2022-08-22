import { FilterArrayByPropertyValuePipe } from './filter-array-by-property-value.pipe';

describe('FilterArrayByValuePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterArrayByPropertyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
