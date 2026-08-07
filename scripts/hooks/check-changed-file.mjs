#!/usr/bin/env node
// Credential + syntax backstop for recently edited files.
// Exit codes: 0 = clean, 1 = finding (blocks pre-commit in --strict mode).

import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename, extname } from "node:path";

const file = process.argv.find((arg, i) => i > 1 && !arg.startsWith("--"));
const strict = process.argv.includes("--strict");

if (!file) {
	console.error("Usage: node scripts/hooks/check-changed-file.mjs [--strict] <file>");
	process.exit(2);
}

let fail = false;

// --- 1. Credential scan ---
if (basename(file) !== ".env" && !file.includes("config.json")) {
	let content;
	try {
		content = readFileSync(file, "utf8");
	} catch (e) {
		console.error(`Unable to read ${file}: ${e.message}`);
		process.exit(1);
	}

	// WMATA API key assignment in source
	if (/WMATA_KEY\s*[:=]\s*['"][A-Za-z0-9_-]{20,}['"]/.test(content)) {
		console.error(`CREDENTIAL: ${file} contains a hardcoded WMATA_KEY value.`);
		fail = true;
	}

	// Common WMATA API key shape (UUID-like or long hex)
	const keyMatches = content.match(/['"][0-9a-f]{32,}['"]/gi) || [];
	for (const match of keyMatches) {
		console.error(`SUSPICIOUS: ${file} contains a long hex token that may be an API key: ${match.slice(0, 12)}...`);
		fail = true;
	}
}

// --- 2. JS syntax check ---
const ext = extname(file);
if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
	try {
		execFileSync("node", ["-c", file], { stdio: "pipe" });
	} catch (e) {
		console.error(`SYNTAX: ${file} failed node -c.`);
		if (e.stderr) console.error(e.stderr.toString());
		fail = true;
	}
}

if (fail) {
	if (strict) {
		console.error(`\nBlocked by --strict; fix the findings above before committing.`);
	}
	process.exit(strict ? 1 : 0);
}

console.log(`OK: ${file}`);
