import { Pipe, PipeTransform } from '@angular/core';
import { Test } from '../types';

@Pipe({
  name: 'testsFilter',
  pure: false,
})
export class TestsFilterPipe implements PipeTransform {
  transform(tests: Test[], search = '', allTests): Test[] {
    if (!search.trim()) {
      return tests;
    }

    return allTests.filter((test) =>
      test.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
