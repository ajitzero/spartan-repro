import { Component } from '@angular/core';

@Component({
	selector: 'analog-app-analog-welcome',
	standalone: true,
	host: {
		class: 'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
	},
	template: `
		<main class="flex-1 mx-auto">
			<section id="counter-demo" class="container py-8 md:py-12 lg:py-24">
				<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
					<h2 class="text-[#DD0031] font-medium text-3xl leading-[1.1]">Counter</h2>
					<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						This is a simple interactive counter. Powered by Angular.
					</p>
					<button
						(click)="increment()"
						class="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-zinc-100 hover:text-zinc-950 h-11 px-8 rounded-md"
					>
						Count:
						<span class="ml-1 font-mono">{{ count }}</span>
					</button>
				</div>
			</section>
		</main>
	`,
})
export class AnalogWelcomeComponent {
	public count = 0;
	public increment() {
		this.count++;
	}
}
