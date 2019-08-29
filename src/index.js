/*
Base URL - https://api.github.com/search/users?q=mkiyan
*/

import { fromEvent, EMPTY } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const url = 'https://api.github.com/search/users?q=';

const search = document.getElementById('search');
const result = document.getElementById('result');

const stream$ = fromEvent(search, 'input')
	.pipe(
		map(event => event.target.value), // получаем чистые значения из события input-а
		debounceTime(1000), // задержка 1 секунда для события - чтобы не "дергать" API при каждом изменении input-а
		distinctUntilChanged(), // фильтруем событие потока, если значение не изменилось
		tap(() => result.innerHTML = ''), // перед отправкой запроса на web API, очищаем блок результата
		filter(value => value.trim()), // Пропускаем не пустые значение, если значение будет пустой строкой (''), то сработает фильтр
		switchMap(value => ajax.getJSON(url + value) // переключаемся на новый поток событий - от ajax-запроса
			.pipe(catchError(err => EMPTY))), // создаем под-поток, который в случае возникновения ошибки при ajax-запросе, возвращает пустой уже завершенный (completed) поток событий (EMPTY = Observable<never>)
		map(webApiResponse => webApiResponse.items), // получаем из ответа коллекцию пользователей
		mergeMap(items => items) // делаем масси плоским - из одного экземпляра объекта массива делаем несколько экземпляров - элементов массива, в потоке событий
	);

stream$.subscribe(user => {
	const html = `
	<div class="card">
		<div class="card-image">
			<img src="${user.avatar_url}" />
			<span class="card-title">${user.login}</span>
		</div>
		<div class="card-action">
			<a href="${user.html_url}" target="_blank">Открыть GitHub</a>
		</div>
	</div>
	`;
	result.insertAdjacentHTML('beforeend', html);
});