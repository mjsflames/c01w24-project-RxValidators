import React from "react";
import ContentContainer from "../components/ContentContainer";

const UserLogin = () => {
	return (
		<>
			<ContentContainer>
                <form class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please enter your username</label>
                    <input type="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Username" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please enter your password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Password" required />
                </div>
                    <button type="submit" class="text-white bg-grey-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </form>
			</ContentContainer>
		</>
	);
};

export default UserLogin;