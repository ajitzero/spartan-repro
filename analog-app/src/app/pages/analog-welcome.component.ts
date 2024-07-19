import { Component, inject, signal } from '@angular/core';
import {
	HlmCardContentDirective,
	HlmCardDescriptionDirective,
	HlmCardDirective,
	HlmCardFooterDirective,
	HlmCardHeaderDirective,
	HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';

type User = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
};

@Component({
	selector: 'analog-app-analog-welcome',
	standalone: true,
	imports: [
		AsyncPipe,
		HlmCardContentDirective,
		HlmCardDescriptionDirective,
		HlmCardDirective,
		HlmCardFooterDirective,
		HlmCardHeaderDirective,
		HlmCardTitleDirective,
		HlmAvatarImageDirective,
		HlmAvatarComponent,
		HlmAvatarFallbackDirective,
	],
	host: {
		class: 'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
	},
	template: `
		<main class="flex-1 mx-auto">
			<section class="w-[30rem]" hlmCard>
				<div hlmCardHeader>
					<h3 hlmCardTitle>Card Title</h3>
					<p hlmCardDescription>Card Description</p>
				</div>
				<p hlmCardContent>
					<hlm-avatar>
						<img [src]="user().picture" alt="" hlmAvatarImage />
						<span class="text-white bg-destructive" hlmAvatarFallback>{{ user().name }}</span>
					</hlm-avatar>

					<hlm-avatar>
						<img [src]="(user$ | async)?.avatar_url" alt="" hlmAvatarImage />
						<span class="text-white bg-destructive" hlmAvatarFallback>{{ user().name }}</span>
					</hlm-avatar>

					@let u1 = (user$ | async) ?? { avatar_url: '' };
					@let u2 = u1.avatar_url;
					@if (u2) {
						<hlm-avatar>
							<img [src]="u2" alt="" hlmAvatarImage />
							<span class="text-white bg-destructive" hlmAvatarFallback>{{ user().name }}</span>
						</hlm-avatar>
					}
				</p>
				<p hlmCardFooter>User: {{ (user$ | async)?.avatar_url }}</p>
			</section>
		</main>
	`,
})
export class AnalogWelcomeComponent {
	http = inject(HttpClient);
	readonly apiUrl = 'https://api.github.com/users/ajitzero';

	user$ = this.http.get<User>(this.apiUrl);

	user = signal({ name: 'RG', picture: '' });

	getUser() {
		return this.http.get<User>(this.apiUrl);
	}
}
