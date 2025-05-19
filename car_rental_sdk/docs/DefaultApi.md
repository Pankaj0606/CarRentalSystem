# openapi_client.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**api_add_car_cars_post**](DefaultApi.md#api_add_car_cars_post) | **POST** /cars/ | Api Add Car
[**api_cancel_rental_rentals_rental_id_delete**](DefaultApi.md#api_cancel_rental_rentals_rental_id_delete) | **DELETE** /rentals/{rental_id} | Api Cancel Rental
[**api_get_car_cars_car_id_get**](DefaultApi.md#api_get_car_cars_car_id_get) | **GET** /cars/{car_id} | Api Get Car
[**api_get_cars_cars_get**](DefaultApi.md#api_get_cars_cars_get) | **GET** /cars/ | Api Get Cars
[**api_rent_car_cars_car_id_rent_post**](DefaultApi.md#api_rent_car_cars_car_id_rent_post) | **POST** /cars/{car_id}/rent | Api Rent Car


# **api_add_car_cars_post**
> Car api_add_car_cars_post(car)

Api Add Car

### Example


```python
import openapi_client
from openapi_client.models.car import Car
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    car = openapi_client.Car() # Car | 

    try:
        # Api Add Car
        api_response = api_instance.api_add_car_cars_post(car)
        print("The response of DefaultApi->api_add_car_cars_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->api_add_car_cars_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **car** | [**Car**](Car.md)|  | 

### Return type

[**Car**](Car.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **api_cancel_rental_rentals_rental_id_delete**
> object api_cancel_rental_rentals_rental_id_delete(rental_id)

Api Cancel Rental

### Example


```python
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    rental_id = 56 # int | 

    try:
        # Api Cancel Rental
        api_response = api_instance.api_cancel_rental_rentals_rental_id_delete(rental_id)
        print("The response of DefaultApi->api_cancel_rental_rentals_rental_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->api_cancel_rental_rentals_rental_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **rental_id** | **int**|  | 

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **api_get_car_cars_car_id_get**
> Car api_get_car_cars_car_id_get(car_id)

Api Get Car

### Example


```python
import openapi_client
from openapi_client.models.car import Car
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    car_id = 56 # int | 

    try:
        # Api Get Car
        api_response = api_instance.api_get_car_cars_car_id_get(car_id)
        print("The response of DefaultApi->api_get_car_cars_car_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->api_get_car_cars_car_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **car_id** | **int**|  | 

### Return type

[**Car**](Car.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **api_get_cars_cars_get**
> List[Car] api_get_cars_cars_get()

Api Get Cars

### Example


```python
import openapi_client
from openapi_client.models.car import Car
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)

    try:
        # Api Get Cars
        api_response = api_instance.api_get_cars_cars_get()
        print("The response of DefaultApi->api_get_cars_cars_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->api_get_cars_cars_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[Car]**](Car.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **api_rent_car_cars_car_id_rent_post**
> Rental api_rent_car_cars_car_id_rent_post(car_id, rental_request)

Api Rent Car

### Example


```python
import openapi_client
from openapi_client.models.rental import Rental
from openapi_client.models.rental_request import RentalRequest
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    car_id = 56 # int | 
    rental_request = openapi_client.RentalRequest() # RentalRequest | 

    try:
        # Api Rent Car
        api_response = api_instance.api_rent_car_cars_car_id_rent_post(car_id, rental_request)
        print("The response of DefaultApi->api_rent_car_cars_car_id_rent_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->api_rent_car_cars_car_id_rent_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **car_id** | **int**|  | 
 **rental_request** | [**RentalRequest**](RentalRequest.md)|  | 

### Return type

[**Rental**](Rental.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

