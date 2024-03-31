import { expect, jest, test } from "@jest/globals";
const SERVER_URL = "http://localhost:3130";
const { MongoClient } = require("mongodb");

let connection;
let db;

beforeAll(async () => {
	connection = await MongoClient.connect("mongodb://localhost:27017");
	db = connection.db();
});

afterAll(async () => {
	await connection.close();
});

beforeEach(async () => {
	await db.collection("notifications").deleteMany({});
});


test("GET /notifications", async () => {
	const notifications = [
		{ message: "Hello" },
		{ message: "World" },
	];
	await db.collection("notifications").insertMany(notifications);

	const response = await fetch(`${SERVER_URL}/notifications`);
	const data = await response.json();

	expect(data).toEqual(notifications);
});