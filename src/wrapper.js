const NodeRSA = require("node-rsa");

const BASE_URL = 'https://developer.api.walmart.com';
const MAX = 200;

const products = async (headerData, numProducts, category) => {
    let url = BASE_URL + `/api-proxy/service/affil/product/v2/paginated/items?category=${category}&count=${String(getNumToRetrieve(0, numProducts))}&soldByWmt=true`

    let products = []
    do {
        // fetch the items and add it to the list. 
        let res = await fetchBody(url, headerData);
        products.push(...res.items);

        if (!res.nextPageExist) break;
        url = BASE_URL + res.nextPage.replace(/&count=([0-9]+)&/g, `&count=${String(getNumToRetrieve(products.length, numProducts))}&`);
    } while (!numProducts || (products.length < numProducts));

    return products;    
}

const stores = async (headerData, lon, lat) => {
    let res = await fetch(
        `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/stores?lon=${lon}&lat=${lat}`,
        {
            method: 'GET',
            headers: generateHeaders(headerData)
        }
    );
    return (await res).json();
    
}

const taxonomy = async (headerData) => {
    let res = await fetch(
        `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/taxonomy`,
        {
            method: 'GET',
            headers: generateHeaders(headerData)
        }
    );
    return (await res).json();
}

// TODO: What if the network call returns an error? We need to handle that case gracefully. 
const fetchBody = async (url, headerData) => {
    let res = await fetch(
        url,
        {
            method: 'GET',
            headers: generateHeaders(headerData)
        }
    )

    return (await res).json();
}

const getNumToRetrieve = (numRetrieved, requiredAmount) => {
    if (!requiredAmount) return MAX;

    let amountRemaining = requiredAmount - numRetrieved;
    if (amountRemaining < MAX) return amountRemaining;
    else return MAX;
}

const generateHeaders = (headerData) => {
    const { privateKey, consumerId, keyVer } = headerData;
    const timestamp = Date.now().toString();

    const sortedHashString = `${consumerId}\n${timestamp}\n${keyVer}\n`;

    const signature_enc = (new NodeRSA(privateKey, "pkcs8", options={encryptionScheme: { hash: 'sha256'}})).sign(sortedHashString).toString("base64");

    return {
        "WM_SEC.AUTH_SIGNATURE": signature_enc,
        "WM_CONSUMER.INTIMESTAMP": timestamp,
        "WM_CONSUMER.ID": consumerId,
        "WM_SEC.KEY_VERSION": keyVer,
    };
};

module.exports = {
    products,
    stores,
    taxonomy,
    generateHeaders
}