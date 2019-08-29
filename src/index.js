/*
Base URL - https://api.github.com/search/users?q=mkiyan
*/

import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

const url = 'https://api.github.com/search/users?q='

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input')
	.pipe(
		map(event => event.target.value) // получаем чистые значения из события input-а
	)

stream$.subscribe(value => {
	console.log(value)
})