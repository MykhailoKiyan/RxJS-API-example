/*
Base URL - https://api.github.com/search/users?q=mkiyan
*/

import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const url = 'https://api.github.com/search/users?q='

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input')
	.pipe(
		map(event => event.target.value), // получаем чистые значения из события input-а
		debounceTime(1000), // задержка 1 секунда для события - чтобы не "дергать" API при каждом изменении input-а
		distinctUntilChanged() // фильтруем событие потока, если значение не изменилось
	)

stream$.subscribe(value => {
	console.log(value)
})