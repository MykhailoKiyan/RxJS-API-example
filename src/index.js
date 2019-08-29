/*
Base URL - https://api.github.com/search/users?q=mkiyan
*/

import { fromEvent } from 'rxjs'

const url = 'https://api.github.com/search/users?q='

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input')

stream$.subscribe(value => {
	console.log(value)
})