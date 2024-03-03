# This file is for any useful functions that will be reused multiple times.

# This function converts a 2D array into a list of dictionaries
def toDictList(arr):
    person_dict_list = []
    
    for i in range(0, len(arr)):
        person_dict = {
            "First Name": arr[i][0],
            "Last Name": arr[i][1],
            "Province": arr[i][2],
            "Regulatory College": arr[i][3],
            "License #": arr[i][4],
            "Status": arr[i][5]
        }
        person_dict_list.append(person_dict)
    
    return person_dict_list


# --------------------------------------------------------------------------------------------------------
# Example usage:
arr = [
    ['Emily','Ho','ON','Toronto Uni','232','VERIFIED'],
    ['Morgan','Lao','BC','British Columbia Uni','23123','INACTIVE'],
    ['Lance','Talban','SK','Saskatchewan Uni','12323','VERIFIED']
]

print(toDictList(arr))