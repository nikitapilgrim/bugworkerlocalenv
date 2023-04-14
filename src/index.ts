import {
	DurableObjectNamespace,
	ServiceWorkerGlobalScope,
} from "@cloudflare/workers-types";

export interface Env {
	random: ServiceWorkerGlobalScope;
	Test: DurableObjectNamespace;
}

export { Test } from "./test";
export default {
	async fetch(request: Request, env: Env) {
		try {
			console.log(env, "worker");
			return await handleRequest(env);
		} catch (e) {
			console.log(e);
			return new Response(`${e}`);
		}
	},
};

async function handleRequest(env: Env) {
	const id = env.Test.idFromName("test");
	const obj = env.Test.get(id);
	const resp = await obj.fetch("https://example.com");
	const data = await resp.json();
	return new Response(JSON.stringify({ worker: env, ...data }));
}
