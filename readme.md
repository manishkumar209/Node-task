# npm
`Install npm`

# node
`Install nodejs v8.11.4`

# monogdb
`Install monogdb`

# mongoose 
`Install npm mongoose` to database connectivity
Database name set in local `productDB` as db name in `C:\data\db`

# swagger
Install swagger to view api work-flow.

This api task intgrated with swagger work flow for `CRUD` operation.

Workflow:

    Task: Delete category with all assiciated products to that category.

    /post/category :    First add new category 
    /post/product  :    place category _id to category key in product schema (If product exist then it update                       with quantity else it add new roduct)

    /get/categories :   List all categories
    /api/products   :   List all products

    /delete/category/id :   Delete category with associated products to that category

    Swagger view:
## Swagger execution
Select GET `method`, click Try it out then execute it.
Select POST `method`, click Try it out Edit the json value which you want then execute it.
Select DELEE `mehod`, click Try it out insert required parameter then execute it.

Swagger response handled with response code as well as response message.
## Development server

Run `npm start` for a dev server it start `App Server Listening at 3001`. Navigate to `http://localhost:3001/api-docs/#/`. Open in browser.
