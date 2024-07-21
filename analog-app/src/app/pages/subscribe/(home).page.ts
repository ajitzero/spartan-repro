import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, timer } from 'rxjs';

@Component({
	selector: 'analog-app-test',
	standalone: true,
	template: `
		<form
			#form
			action="/api/v1/subscribe"
			method="get"
			class="flex flex-col gap-4 max-w-2xl mx-auto mt-16"
			(submit)="submit($event)"
		>
			<h1>{{ hello().message }}</h1>
			<div class="flex flex-col gap-4">
				<label for="name">Name</label>
				<input type="text" name="name" placeholder="Name" required value="Ajit" />
				<label for="email">Email</label>
				<input type="email" name="email" placeholder="Email" required value="hello@example.com" />
			</div>
			<button type="submit">Submit</button>
		</form>
	`,
})
export default class TestComponent {
	http = inject(HttpClient);

	form = viewChild.required<ElementRef<HTMLFormElement>>('form');

	hello = toSignal(
		combineLatest({
			api: this.http.get<{ message: string }>('/api/v1/hello'),
			defer: timer(2500), // simulates a delay
		}).pipe(map(({ api }) => ({ message: api.message }))),
		{
			// will not change when Js is disabled
			initialValue: { message: 'Fetching...' },
		}
	);

	// only affects the form if Js is enabled
	submit(event: Event) {
		event.preventDefault();

		const form = new FormData(this.form().nativeElement);
		this.http
			.get<{ message: string }>('/api/v1/subscribe', {
				params: {
					name: form.get('name') as string,
					email: form.get('email') as string,
					format: 'json',
				},
			})
			.subscribe({
				next: response => window.alert(`${response.message}`),
				error: error => window.alert('Error occured'),
			});
	}
}
