from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()
#checking web-hook
# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# MySQL connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "blog_db"
}

# Create database and table if not exist
def init_db():
    conn = mysql.connector.connect(host="localhost", user="root", password="root")
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS blog_db")
    conn.close()

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL
    )
    """)
    conn.close()

# Call the function to initialize the DB and Table
init_db()

# Pydantic model for validating incoming data
class Post(BaseModel):
    title: str
    content: str

# Routes
@app.get("/posts")
def get_posts():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM posts")
    posts = cursor.fetchall()
    conn.close()
    return posts

@app.get("/posts/{id}")
def get_post(id: int):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM posts WHERE id = %s", (id,))
    post = cursor.fetchone()
    conn.close()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.post("/posts")
def create_post(post: Post = Depends()):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO posts (title, content) VALUES (%s, %s)", 
                   (post.title, post.content))  # Fixed query by removing extra parameter
    conn.commit()
    conn.close()
    return {"message": "Post created successfully"}

@app.put("/posts/{id}")
def update_post(id: int, post: Post = Depends()):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("UPDATE posts SET title = %s, content = %s WHERE id = %s", 
                       (post.title, post.content, id))
        conn.commit()
        conn.close()
        return {"message": "Post updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating post: {str(e)}")

@app.delete("/posts/{id}")
def delete_post(id: int):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM posts WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return {"message": "Post deleted successfully"}
