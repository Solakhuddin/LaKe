# Spend API Spec

## Create Spend API

Endpoint : POST /api/spends

Headers : 
- Authorization : token

Request Body :

```json
{
  "amount" : "100000",
  "cathegory" : "Liburan",
  "description" : "Liburan bareng temen", // nullable
  "date" : "YYYY-MM-DD",
}
```

Response Body Success : 

```json
{
  "data" : {
    "id" : 1,
    "amount" : "100000",
    "cathegory" : "Liburan",
    "description" : "Liburan bareng temen", 
    "date" : "YYYY-MM-DD",
  }
}
```

Response Body Error :

```json
{
  "errors" : "Input format is not valid"
}
```

## Update Spend API

Endpoint : PUT /api/spends/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "amount" : "100000",
  "cathegory" : "Liburan",
  "description" : "Liburan bareng temen",
  "date" : "YYYY-MM-DD",
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "amount" : "100000",
    "cathegory" : "Liburan",
    "description" : "Liburan bareng temen",
    "date" : "YYYY-MM-DD",
  }
}
```

Response Body Error :

```json
{
  "errors" : "Input format is not valid"
}
```

## Get Spend API

Endpoint : GET /api/spends/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "amount" : "100000",
    "cathegory" : "Liburan",
    "description" : "Liburan bareng temen",
    "date" : "YYYY-MM-DD",
    "created_at" : "YYYY-MM-DD",
    "updated_at" : "YYYY-MM-DD",
  }
}
```

Response Body Error :

```json
{
  "errors" : "Spend record is not found"
}
```

## Search Spend API

Endpoint : GET /api/spends

Headers :
- Authorization : token

Query params :
- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data" : [
    {
      "id" : 1,
      "amount" : "100000",
      "cathegory" : "Liburan",
      "description" : "Liburan bareng temen",
      "date" : "YYYY-MM-DD",
      "created_at" : "YYYY-MM-DD",
      "updated_at" : "YYYY-MM-DD",
    },
    {
      "id" : 1,
      "amount" : "100000",
      "cathegory" : "Liburan",
      "description" : "Liburan bareng temen",
      "date" : "YYYY-MM-DD",
      "created_at" : "YYYY-MM-DD",
      "updated_at" : "YYYY-MM-DD",
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Spend API

Endpoint : DELETE /api/spends/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Spend is not found"
}
```
