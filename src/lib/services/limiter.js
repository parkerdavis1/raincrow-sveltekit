export function setWithExpiry(key, value, ttl) {
    // get item in localStorage
	const itemStr = localStorage.getItem(key)
	const now = new Date()
    // If there is no item, create one with the time to expire
    if (!itemStr) {
        const itemToSet = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(itemToSet));
    } else {
        // parse it into a JSON object
        const item = JSON.parse(itemStr)
        // if there is an expiry already, use it
        if (item.expiry) {
            const itemToSet = {
                value: value,
                expiry: item.expiry
            }
            localStorage.setItem(key, JSON.stringify(itemToSet));
        } else {
        // if there somehow is an item but no expiry, give it a new one, this is probably not possible and redundant
            const itemToSet = {
                value: value,
                expiry: now.getTime() + ttl,
            } 
            localStorage.setItem(key, JSON.stringify(itemToSet));
        }
    }
}

export function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export function incrementDailyCount(store) {
    let count = parseInt(store);
    count += 1;
    store = count.toString();
    console.log("$dailyCount: ", store);
}