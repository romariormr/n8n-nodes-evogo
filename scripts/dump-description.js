// Gera dist/description.json a partir do node compilado, sem precisar do runtime
// do n8n (n8n-workflow é trocado por um stub só para carregar a descrição).
const Module = require('module');
const path = require('path');
const fs = require('fs');

const origLoad = Module._load;
Module._load = function (request, ...rest) {
	if (request === 'n8n-workflow') {
		class Stub extends Error {}
		return new Proxy({}, { get: (_t, k) => (k === '__esModule' ? false : k === 'NodeConnectionTypes' ? { Main: 'main' } : Stub) });
	}
	return origLoad.call(this, request, ...rest);
};

const { EvolutionGo } = require(path.join(__dirname, '..', 'dist', 'nodes', 'EvolutionGo', 'EvolutionGo.node.js'));
const out = path.join(__dirname, '..', 'dist', 'description.json');
fs.writeFileSync(out, JSON.stringify(new EvolutionGo().description, null, 1));
console.log('ok', out);
