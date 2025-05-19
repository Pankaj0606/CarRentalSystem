# RentalRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_name** | **str** |  | 
**start_date** | **date** |  | 
**end_date** | **date** |  | 

## Example

```python
from openapi_client.models.rental_request import RentalRequest

# TODO update the JSON string below
json = "{}"
# create an instance of RentalRequest from a JSON string
rental_request_instance = RentalRequest.from_json(json)
# print the JSON string representation of the object
print(RentalRequest.to_json())

# convert the object into a dict
rental_request_dict = rental_request_instance.to_dict()
# create an instance of RentalRequest from a dict
rental_request_from_dict = RentalRequest.from_dict(rental_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


