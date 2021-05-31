# Webframes - Backend

This little API serves as an interface to add and remove the URLs of the sites that will be framed in the webapp.

## Dependency Installation

In order to run this API you'll need to install the required dependencies with:

```text
npm install
```

Or in production with a frozen lock file with:

```text
npm ci --only=prod
```

## Running

If in development, you can run the server with reload-on-save with:

```text
npm run dev
```

If in production, you can run the server with:

```text
npm start
```

## Documentation

### GET /api/sites

Get all the sites saved in the database.

**Response**:

```json
{
  "success": true,
  "status": 200,
  "data": [
    {
      "name": "Sonarr",
      "url": "http://192.168.100.4:8989",
      "image": null,
      "id": "16357b13-851f-4e8f-a124-36688a36b759"
    },
    {
      "name": "Sonarr",
      "url": "http://192.168.100.4:8989",
      "image": null,
      "id": "64452191-342f-4b24-82af-fc12c7a9a159"
    },
    {
      "name": "Sonarr",
      "url": "http://192.168.100.4:8989",
      "image": null,
      "id": "705cf50a-e612-4da0-b8dc-cf87c859bae2"
    }
  ]
}
```

### POST /api/sites

Create a new site in the database. Requires an `application/json` body with the following properties:

| Property | Type                | Description                                             |
|----------|---------------------|---------------------------------------------------------|
| name     | String **Required** | The site's name.                                        |
| url      | String **Required** | The site's URL.                                         |
| image    | String              | The site's image dataURI in base64. Defaults to `null`. |

**Response**:

```json
{
  "success": true,
  "status": 201,
  "data": {
    "name": "Sonarr",
    "url": "http://192.168.100.4:8989",
    "image": null,
    "id": "64452191-342f-4b24-82af-fc12c7a9a159"
  }
}
```

### GET /api/sites/:id

Get a particular site from the database.

**Response**:

```json
{
  "success": true,
  "status": 200,
  "data": {
    "name": "Sonarr",
    "url": "http://192.168.100.4:8989",
    "image": null,
    "id": "1b2c68a0-6ff1-4cd8-964c-fb45631def0f"
  }
}
```

### DELETE /api/sites/:id

Delete a particular site from the database.

**Response**:

```json
{
  "success": true,
  "status": 200,
  "data": {
    "name": "Sonarr",
    "url": "http://192.168.100.4:8989",
    "image": null,
    "id": "1b2c68a0-6ff1-4cd8-964c-fb45631def0f"
  }
}
```

### PATCH /api/sites/:id

Update a particular site from the database. Requires an `application/json` body with the following properties.

| Property | Type   | Description                                             |
|----------|--------|---------------------------------------------------------|
| name     | String | The site's name.                                        |
| url      | String | The site's URL.                                         |
| image    | String | The site's image dataURI in base64. Defaults to `null`. |

> Only add the properties you wish to edit.

**Response**:

```json
{
  "success": true,
  "status": 200,
  "data": {
    "name": "Radarr",
    "url": "http://192.168.100.4:8989",
    "image": null,
    "id": "1b2c68a0-6ff1-4cd8-964c-fb45631def0f"
  }
}
```

### GET /api/sites/order

Get the order of the sites.

**Response**:

```json
{
  "success": true,
  "status": 200,
  "data": [
    "16357b13-851f-4e8f-a124-36688a36b759",
    "705cf50a-e612-4da0-b8dc-cf87c859bae2",
    "64452191-342f-4b24-82af-fc12c7a9a159"
  ]
}
```

### PUT /api/sites/order

Completely update the order of the sites. Requires an `application/json` body with an array of the new order for the sites. All site IDs must be present.

**Request Body Example**:

```json
[
  "16357b13-851f-4e8f-a124-36688a36b759",
  "64452191-342f-4b24-82af-fc12c7a9a159",
  "705cf50a-e612-4da0-b8dc-cf87c859bae2"
]
```

**Response**:

```json
{
  "success": true,
  "status": 200,
  "data": [
    "16357b13-851f-4e8f-a124-36688a36b759",
    "64452191-342f-4b24-82af-fc12c7a9a159",
    "705cf50a-e612-4da0-b8dc-cf87c859bae2"
  ]
}
```
