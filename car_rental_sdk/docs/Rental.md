# Rental


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**car_id** | **int** |  | 
**user_name** | **str** |  | 
**start_date** | **date** |  | 
**end_date** | **date** |  | 

## Example

```python
from openapi_client.models.rental import Rental

# TODO update the JSON string below
json = "{}"
# create an instance of Rental from a JSON string
rental_instance = Rental.from_json(json)
# print the JSON string representation of the object
print(Rental.to_json())

# convert the object into a dict
rental_dict = rental_instance.to_dict()
# create an instance of Rental from a dict
rental_from_dict = Rental.from_dict(rental_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


