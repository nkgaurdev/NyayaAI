from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "NyayaAI Backend Running"}