
# Blog Website

blog Website


## API Reference

### Api base url

```http
  http://localhost:8000/api
```

### Posts Routes
#### Get all posts
```http
  GET /posts
```
```http
  GET /posts?cat=${catagory}&page=5
```
#### Get single post
```http
  GET /posts/${id}
```
#### Add new post
```http
  POST /posts
```
#### Update post
```http
  PUT /posts/${id}
```
#### Delete post
```http
  DELETE /posts/${id}
```

### Authentication Routes
#### Sign up 
```http
  POST /items/${id}
```


