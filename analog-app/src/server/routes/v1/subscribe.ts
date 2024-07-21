import { defineEventHandler, getQuery, sendRedirect } from 'h3';

export default defineEventHandler(event => {
	const { name, email, format } = getQuery(event);

	if (name && email && format === 'json') {
		// js is enabled, return the response for client-side handling
		return { message: `Hello ${name}! Your email is ${email}` };
	}

	// No js, redirect to the next page
	return sendRedirect(event, '/subscribe/thanks');
});
