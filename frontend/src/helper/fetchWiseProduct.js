import SummaryAPI from '../common/index'

const fetchWiseProduct = async (category) =>{ 
    const response = await fetch(SummaryAPI.wiseProduct.url, {
        method: SummaryAPI.wiseProduct.method,
        headers: {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category: category
        })
    })

    const result = await response.json();

    return result
}

export default fetchWiseProduct