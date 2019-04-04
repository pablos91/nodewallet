// sample api service constant. Instance of this class will be constructed once at the first access and will persist between react router navigation.

export class WebApi {

    samplePost(order:any): JQuery.jqXHR<any> {
        return $.ajax({
            type: 'POST',
            url: REACT_APP_API_URL + '/sample/post',
            data: JSON.stringify(order),
            contentType: "application/json",
            dataType: 'json'
        });
    }

    sampleGet(orderId: string): JQuery.jqXHR<any> {
        return $.get(REACT_APP_API_URL + '/sample/get/' + orderId)
    }

}

const api = new WebApi();

export default api