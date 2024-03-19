import { expect, jest, test } from "@jest/globals";
const SERVER_URL = "http://localhost:3130";
const { MongoClient } = require("mongodb");

beforeAll(async () => {});
afterAll(async () => {});

describe("ping", () => {
	let connection;
	let db;

	test("Should check if server is up", async () => {
		try {
			const pingRes = await fetch(`${SERVER_URL}/ping`);
			const pingBody = await pingRes.json();

			expect(pingRes.status).toBe(200);
			expect(pingBody.response).toBe("Server is up.");
		} catch (error) {
			console.log(error);
			expect(error).toBeNull();
		}
	});
});

describe("Service Registry", () => {
	test("Should get all services", async () => {
		try {
			const servicesRes = await fetch(`${SERVER_URL}/service-registry/services`);
			const servicesBody = await servicesRes.json();

			expect(servicesRes.status).toBe(200);
			expect(servicesBody.services).toBeDefined();
		} catch (error) {
			console.log(error);
			expect(error).toBeNull();
		}
	});

	test("Should get a service by name", async () => {
		const serviceName = "verification-service";
		try {
			const serviceRes = await fetch(`${SERVER_URL}/service-registry/service/${serviceName}`);
			const serviceBody = await serviceRes.json();

			expect(serviceRes.status).toBe(200);
			expect(serviceBody.service).toBeDefined();
		} catch (error) {
			console.log(error);
			expect(error).toBeNull();
		}
	});

	test("Should add a service", async () => {
		const serviceName = "test-service";
		const serviceURL = "http://localhost:3130";
		try {
			const addServiceRes = await fetch(`${SERVER_URL}/service-registry/service`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: serviceName,
					url: serviceURL,
				}),
			});

			const addServiceBody = await addServiceRes.json();

			expect(addServiceRes.status).toBe(200);
			expect(addServiceBody.response).toBe("Service added succesfully.");
		} catch (error) {
			console.log(error);
			expect(error).toBeNull();
		}
	});

	test("Should delete a service", async () => {
		const serviceName = "test-service";
		try {
			const deleteServiceRes = await fetch(`${SERVER_URL}/service-registry/service/${serviceName}`, {
				method: "DELETE",
			});

			const deleteServiceBody = await deleteServiceRes.json();

			expect(deleteServiceRes.status).toBe(200);
			expect(deleteServiceBody.response).toBe("Service deleted succesfully.");
		} catch (error) {
			console.log(error);
			expect(error).toBeNull();
		}
	});
});
