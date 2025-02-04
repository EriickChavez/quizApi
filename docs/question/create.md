# Create Question

## Description

This endpoint allows you to create a new question.

**POST** `/questions`

## Request Body

### Example

```json
{
  "category": [
    {
      "id": "321",
      "name": "deportes"
    }
  ],
  "question": {
    "question": "Campeon del mundial 2002",
    "type": "text"
  },
  "answers": [
    {
      "answer": "Argentina",
      "isCorrect": false,
      "type": "text"
    },
    {
      "answer": "Mexico",
      "isCorrect": false,
      "type": "text"
    },
    {
      "answer": "Brasil",
      "isCorrect": true,
      "type": "text"
    },
    {
      "answer": "Alemania",
      "isCorrect": false,
      "type": "text"
    }
  ],
  "options": {
    "difficulty": 1,
    "type": "text"
  }
}
```

Fields

- `id` (string, required): The unique identifier for the question.
- `category` (array of objects, required): The categories to which the question belongs.
  - `id` (string, required): The unique identifier for the category.
  - `name` (string, required): The name of the category.
- `question` (object, required): The question details.
  - `question` (string, required): The text of the question.
  - `type` (string, required): The type of the question (e.g., "text").
- `answers` (array of objects, required): The possible answers for the question.

  - `answer` (string, required): The text of the answer.
  - `isCorrect` (boolean, required): Indicates if the answer is correct.
  - `type` (string, required): The type of the answer (e.g., "text").

- `options` (object, required): Additional options for the question.
  - `difficulty` (number, required): The difficulty level of the question.
  - `type` (string, required): The type of the question options (e.g., "text").

## Response

### Success

### Status Code: 201 Created

```json
{
    "success": true,
    "message": "Question created successfully",
    "data": {
        "id": "123",
        "category": [
            {
                "id": "321",
                "name": "deportes"
            }
        ],
        "question": {
            "question": "Campeon del mundial 2002",
            "type": "text"
        },
        "answers": [
            {
                "answer": "Argentina",
                "isCorrect": false,
                "type": "text"
            },
            {
                "answer": "Mexico",
                "isCorrect": false,
                "type": "text"
            },
            {
                "answer": "Brasil",
                "isCorrect": true,
                "type": "text"
            },
            {
                "answer": "Alemania",
                "isCorrect": false,
                "type": "text"
            }
        ],
        "options": {
            "difficulty": 1,
            "type": "text"
        }
    }
}
```

## Error

### Status Code: 400 Bad Request

```json
{
    "success": false,
    "message": "Invalid request data",
    "error": {
        "code": "VALIDATION_ERROR",
        "details": "Detailed error message here"
    }
}
```

### Notes

- Ensure that all required fields are provided in the request body.
- The `id` fields should be unique identifiers.
- The `difficulty` field in options should be a number representing the difficulty level.
