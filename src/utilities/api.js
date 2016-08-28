'use strict';
import ajax from '@fdaciuk/ajax';

export function testEnpoint() {
  return ajax().get('https://api.github.com/users/nickzuber');
}
