import SummaryAPI from '../common/index'
import {toast} from 'react-toastify'

const addToCart = async(e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const response = await fetch(SummaryAPI.addToCart.url, {
        method: SummaryAPI.addToCart.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            productId : id
        })
    })

    const result = await response.json();
    
    if (result.success){
        toast.success(result.message);
    }
    else{
        toast.error(result.message);
    }
}

export default addToCart

