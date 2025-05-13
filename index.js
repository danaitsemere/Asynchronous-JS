async function reminder() {
	
  return new Promise(resolve => {
	setTimeout(() => {
  	console.log("Reminder on progress...");
  	resolve("Reminder sent!");
	}, 3000);
  });
}

reminder().then(remind => console.log(remind));



async function checkServer() {
  return new Promise((resolve, reject) => {
	const serverStatuses = ["running", "running", "running", "down"];
	const recentStatus = recentStatus[index];

	if (currentStatus === "running") {
  	resolve("Server is running");
	} else {
  	reject("Server down");
	}

	index = (index + 1) % serverStatuses.length;

  });
}

let intervalId;
let index = 0;

intervalId = setInterval(() => {
  checkServer()
	.then(result => console.log(result))
	.catch(error => console.log(error));

  if (index >= 12) { 
	clearInterval(intervalId);
	console.log("Server checks ended.");
  }
}, 5000);


async function showNotifications(messages) {
  for (const message of messages) {
	await new Promise(resolve => setTimeout(() => {
  	console.log(message);
  	resolve();
	}, 1000));
  }
  console.log("All notifications sent");
}

const notifications = ["first notification", "second", "Third!"];
showNotifications(notifications);

async function fetchDataWithRetry(attempt = 1) {
  const maxAttempts = 3;
  try {
  	const status = Math.random() < 0.5 ? "ok" : "error" 
	if (status === "error") {
  	throw new Error("API failed");
	}
	return "Data fetched";
  } catch (error) {
	if (attempt < maxAttempts) {
  	console.log(`Attempt ${attempt} failed. Retrying...`);
  	await new Promise(resolve => setTimeout(resolve, 2000));
  	return fetchDataWithRetry(attempt + 1);
	} else {
  	console.log("Failed after 3 attempts");
  	return Promise.reject("Failed")
	}
  }
}

fetchDataWithRetry()
.catch(err => console.log(err));

async function launchProduct() {
	return new Promise(resolve => {
  	setTimeout(() => {
      	resolve("Product Launched!");
    	}, 1000) 
  	})
}

function countdownTimer(n) {
  let count = n;
  const intervalId = setInterval(() => {
	console.log(count);
	count--;

	if (count < 0) {
  	clearInterval(intervalId);
  	launchProduct().then(result => console.log(result));
	}
  }, 1000);
}

countdownTimer(3);



