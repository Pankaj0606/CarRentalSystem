# Car


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | [optional] 
**make** | **str** |  | 
**model** | **str** |  | 
**year** | **int** |  | 
**daily_rate** | **float** |  | 
**available** | **bool** |  | 

## Example

```python
from openapi_client.models.car import Car

# TODO update the JSON string below
json = "{}"
# create an instance of Car from a JSON string
car_instance = Car.from_json(json)
# print the JSON string representation of the object
print(Car.to_json())

# convert the object into a dict
car_dict = car_instance.to_dict()
# create an instance of Car from a dict
car_from_dict = Car.from_dict(car_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


