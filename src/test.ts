import { Env } from "./index";
import {
	DurableObjectState,
	DurableObjectStorage,
} from "@cloudflare/workers-types";
export class Test {
	state: DurableObjectState;
	storage: DurableObjectStorage;
	env: Env;

	constructor(state: DurableObjectState, env: Env) {
		this.state = state;
		this.storage = state.storage;
		this.env = env;
	}

	async fetch(request: Request) {
		const url = new URL(request.url);
		return new Response(JSON.stringify({ DO: this.env }));
	}
}
